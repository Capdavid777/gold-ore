// Node runtime – AWS SDK needs Node, not Edge.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import {
  S3Client,
  ListObjectsV2Command,
  _Object as S3Object,
} from "@aws-sdk/client-s3";

type DocItem = {
  key: string;
  name: string;
  size: number;
  lastModified: string;
};

type ListResponse =
  | { items: DocItem[]; prefix: string }
  | { error: string };

function required(name: string, value: string | undefined): string {
  if (!value || !value.trim()) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function env() {
  // Support both historic and current names if you ever renamed them.
  const bucket = process.env.S3_BUCKET_NAME ?? process.env.S3_BUCKET;
  const region = process.env.S3_REGION;
  // Optional prefix to keep objects under a folder-like namespace.
  const prefix = process.env.S3_PREFIX ?? "";

  return {
    bucket: required("S3_BUCKET_NAME", bucket),
    region: required("S3_REGION", region),
    prefix,
  };
}

function toDocItem(o: S3Object): DocItem | null {
  if (!o.Key) return null;
  return {
    key: o.Key,
    name: o.Key.split("/").pop() ?? o.Key,
    size: typeof o.Size === "number" ? o.Size : 0,
    lastModified: o.LastModified
      ? new Date(o.LastModified).toISOString()
      : new Date(0).toISOString(),
  };
}

export async function GET(req: NextRequest) {
  let cfg;
  try {
    cfg = env();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Config error";
    return Response.json<ListResponse>({ error: msg }, { status: 500 });
  }

  // Allow an optional ?prefix= override (but constrain to configured base prefix).
  const url = new URL(req.url);
  const qsPrefix = url.searchParams.get("prefix") ?? "";
  const effectivePrefix =
    cfg.prefix && qsPrefix
      ? `${cfg.prefix.replace(/\/?$/, "/")}${qsPrefix.replace(/^\/+/, "")}`
      : cfg.prefix || qsPrefix || ""; // one of them or empty

  const client = new S3Client({
    region: cfg.region,
    // Credentials will be picked from env (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY) automatically.
  });

  try {
    const cmd = new ListObjectsV2Command({
      Bucket: cfg.bucket,
      Prefix: effectivePrefix || undefined,
      MaxKeys: 1000,
    });
    const res = await client.send(cmd);
    const items =
      (res.Contents ?? [])
        .map(toDocItem)
        .filter((v): v is DocItem => Boolean(v)) ?? [];

    return Response.json<ListResponse>(
      { items, prefix: effectivePrefix },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (e) {
    // Be descriptive but not leak credentials.
    const msg =
      e instanceof Error
        ? e.message
        : "Failed to list objects from S3 (unknown error)";
    return Response.json<ListResponse>({ error: msg }, { status: 500 });
  }
}
