// src/app/api/content/list/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  _Object as S3Object,
} from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Permission = "view" | "download" | "edit";

type ContentItem = {
  id: string;                // object key
  name: string;              // file name
  type: string;              // extension (e.g., 'pdf')
  tags: string[];            // optional - empty by default
  modified: string;          // ISO date
  size: number;              // bytes
  acl: Record<string, Permission[]>; // role -> perms (for the current session's roles)
};

type ListResponse = {
  items: ContentItem[];
  nextToken?: string;
};

// ---- ENV ----
// Works with AWS S3 and any S3-compatible service (Cloudflare R2, MinIO, Wasabi...).
// For R2/MinIO, set S3_ENDPOINT and S3_FORCE_PATH_STYLE=true.
const S3_REGION = process.env.S3_REGION || "auto";
const S3_BUCKET = process.env.S3_BUCKET_NAME!;
const S3_PREFIX = (process.env.S3_PREFIX || "").replace(/^\/+/, "").replace(/\/+$/, ""); // optional virtual folder
const S3_ENDPOINT = process.env.S3_ENDPOINT; // e.g., https://<accountid>.r2.cloudflarestorage.com
const S3_FORCE_PATH_STYLE = /^true$/i.test(process.env.S3_FORCE_PATH_STYLE || "");

function s3() {
  return new S3Client({
    region: S3_REGION,
    endpoint: S3_ENDPOINT,
    forcePathStyle: S3_FORCE_PATH_STYLE,
  });
}

// Very simple role → permissions policy. Adjust to your needs.
function permissionsForRole(role: string): Permission[] {
  const r = role.toLowerCase();
  if (r.includes("admin") || r.includes("owner") || r.includes("staff")) return ["view", "download", "edit"];
  if (r.includes("investor") || r.includes("partner")) return ["view", "download"];
  if (r.includes("viewer") || r.includes("guest")) return ["view"];
  return [];
}

function pickAcl(roles: string[]): Record<string, Permission[]> {
  const acl: Record<string, Permission[]> = {};
  for (const r of roles) {
    const perms = permissionsForRole(r);
    if (perms.length) acl[r] = perms;
  }
  return acl;
}

function toItem(obj: S3Object, roles: string[]): ContentItem | null {
  if (!obj.Key) return null;
  if (obj.Key.endsWith("/")) return null; // ignore folder placeholders

  const name = obj.Key.split("/").pop() || obj.Key;
  const ext = name.includes(".") ? name.split(".").pop()!.toLowerCase() : "";

  return {
    id: obj.Key,
    name,
    type: ext,
    tags: [],
    modified: (obj.LastModified ?? new Date()).toISOString(),
    size: Number(obj.Size ?? 0),
    acl: pickAcl(roles),
  };
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const roles: string[] = Array.isArray((session as any)?.roles) ? (session as any).roles : [];

    const url = new URL(req.url);
    const q = (url.searchParams.get("q") || "").trim().toLowerCase();
    const prefixQuery = (url.searchParams.get("prefix") || S3_PREFIX).replace(/^\/+/, "");
    const pageSize = Math.min(Number(url.searchParams.get("pageSize") ?? "50"), 200);
    const continuation = url.searchParams.get("cursor") || undefined;

    const prefix = prefixQuery ? `${prefixQuery}/` : "";

    const input: ListObjectsV2CommandInput = {
      Bucket: S3_BUCKET,
      Prefix: prefix || undefined,
      ContinuationToken: continuation,
      MaxKeys: pageSize,
    };

    const { Contents, NextContinuationToken } = await s3().send(new ListObjectsV2Command(input));

    const items = (Contents || [])
      .map((o) => toItem(o, roles))
      .filter((i): i is ContentItem => !!i)
      .filter((i) => (q ? (i.name.toLowerCase().includes(q) || i.id.toLowerCase().includes(q)) : true));

    const body: ListResponse = { items, nextToken: NextContinuationToken };
    return NextResponse.json(body, { status: 200 });
  } catch (err: any) {
    console.error("[content.list] error:", err);
    return NextResponse.json({ error: err?.message || "Failed to list content" }, { status: 500 });
  }
}
