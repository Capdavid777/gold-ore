// src/app/api/content/sas/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

// ---- ENV ----
const S3_REGION = process.env.S3_REGION || "auto";
const S3_BUCKET = process.env.S3_BUCKET_NAME!;
const S3_ENDPOINT = process.env.S3_ENDPOINT;              // for R2/MinIO
const S3_FORCE_PATH_STYLE = /^true$/i.test(process.env.S3_FORCE_PATH_STYLE || "");
const SAS_TTL_MIN = Number(process.env.SAS_TTL_MIN || "10"); // default 10 minutes

function s3() {
  return new S3Client({
    region: S3_REGION,
    endpoint: S3_ENDPOINT,
    forcePathStyle: S3_FORCE_PATH_STYLE,
  });
}

type Action = "preview" | "download" | "edit";

function can(roles: string[] | undefined, action: Action): boolean {
  const rs = (roles ?? []).map((r) => r.toLowerCase());
  if (action === "edit") return rs.some((r) => r.includes("admin") || r.includes("owner") || r.includes("staff"));
  if (action === "download") return rs.some((r) => ["admin","owner","staff","investor","partner"].some((k) => r.includes(k)));
  if (action === "preview") return rs.length > 0; // any authenticated role
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const roles: string[] = Array.isArray((session as any)?.roles) ? (session as any).roles : [];

    const body = (await req.json()) as { key?: string; blob?: string; action: Action; contentType?: string };
    const key = (body.key || body.blob || "").replace(/^\/+/, ""); // accept "key" or legacy "blob"
    const action = body.action;

    if (!key || !action) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    if (!can(roles, action)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const expiresIn = Math.max(60, Math.min(SAS_TTL_MIN, 60)) * 60; // clamp 1–60 min to be safe

    if (action === "edit") {
      // Pre-signed PUT for upload/overwrite
      const put = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        ContentType: body.contentType || "application/octet-stream",
      });
      const url = await getSignedUrl(s3(), put, { expiresIn });
      return NextResponse.json({ url, method: "PUT", expiresOn: new Date(Date.now() + expiresIn * 1000).toISOString() }, { status: 200 });
    }

    // preview / download -> GET
    const get = new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      ResponseContentDisposition: action === "download" ? `attachment; filename="${encodeURIComponent(key.split("/").pop() || "file")}"` : undefined,
    });
    const url = await getSignedUrl(s3(), get, { expiresIn });
    return NextResponse.json({ url, method: "GET", expiresOn: new Date(Date.now() + expiresIn * 1000).toISOString() }, { status: 200 });
  } catch (err: any) {
    console.error("[content.sas] error:", err);
    return NextResponse.json({ error: err?.message || "Failed to generate signed URL" }, { status: 500 });
  }
}
