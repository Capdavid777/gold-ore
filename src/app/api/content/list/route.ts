import { NextResponse } from "next/server";
import {
  S3Client,
  ListObjectsV2Command,
  type _Object as S3Object,
  type ListObjectsV2CommandOutput,
} from "@aws-sdk/client-s3";

/**
 * The shape your UI expects for each file card.
 * Adjust fields if your frontend expects more/less.
 */
export interface ContentItem {
  id: string;
  name: string;
  type: string;
  tags: string[];
  modified: string; // ISO date
  size: number;
}

/**
 * Build a typed S3 client from env.
 */
function createS3(): S3Client {
  const region = process.env.S3_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing S3 credentials. Please set S3_REGION, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY."
    );
  }

  return new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

/**
 * Best-effort mapping from filename extension to a simple type label
 * you use on the card (e.g., 'pdf', 'docx', 'ppt', etc.)
 */
function guessTypeFromKey(key: string): string {
  const ext = key.split(".").pop()?.toLowerCase() ?? "";
  if (["pdf"].includes(ext)) return "pdf";
  if (["doc", "docx"].includes(ext)) return "docx";
  if (["ppt", "pptx"].includes(ext)) return "pptx";
  if (["xls", "xlsx", "csv"].includes(ext)) return "sheet";
  if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "image";
  if (["txt", "md"].includes(ext)) return "text";
  return "file";
}

function fileNameFromKey(key: string): string {
  const parts = key.split("/");
  return decodeURIComponent(parts[parts.length - 1] ?? key);
}

function mapS3ObjectToItem(obj: S3Object): ContentItem | null {
  const key = obj.Key ?? null;
  if (!key) return null;

  const name = fileNameFromKey(key);
  const type = guessTypeFromKey(key);
  const id = key; // stable ID — use key itself
  const size = typeof obj.Size === "number" ? obj.Size : 0;
  const modified =
    obj.LastModified instanceof Date
      ? obj.LastModified.toISOString()
      : new Date().toISOString();

  return {
    id,
    name,
    type,
    tags: [], // you can enrich later (e.g., with object metadata or a DB)
    modified,
    size,
  };
}

export async function GET() {
  try {
    const bucket = process.env.S3_BUCKET;
    if (!bucket) {
      return NextResponse.json(
        { error: "Missing S3_BUCKET env var" },
        { status: 500 }
      );
    }

    const prefix = process.env.S3_PREFIX ?? ""; // optional folder filter
    const s3 = createS3();

    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix.length > 0 ? prefix : undefined,
      MaxKeys: 1000,
    });

    const result: ListObjectsV2CommandOutput = await s3.send(command);
    const contents = result.Contents ?? [];

    const items: ContentItem[] = contents
      .map(mapS3ObjectToItem)
      .filter((x): x is ContentItem => x !== null);

    // Optionally sort newest first
    items.sort((a, b) => (a.modified > b.modified ? -1 : 1));

    return NextResponse.json({ items });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to list S3 objects";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
