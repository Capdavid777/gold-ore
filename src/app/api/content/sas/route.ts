export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type SasResponse = { url: string } | { error: string };

function required(name: string, value: string | undefined): string {
  if (!value || !value.trim()) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function env() {
  const bucket = process.env.S3_BUCKET_NAME ?? process.env.S3_BUCKET;
  const region = process.env.S3_REGION;
  const basePrefix = process.env.S3_PREFIX ?? "";
  const ttlMinRaw = process.env.SAS_TTL_MIN ?? "10";

  const ttlMinutes = Number.parseInt(ttlMinRaw, 10);
  const ttl = Number.isFinite(ttlMinutes) && ttlMinutes > 0 ? ttlMinutes : 10;

  return {
    bucket: required("S3_BUCKET_NAME", bucket),
    region: required("S3_REGION", region),
    basePrefix,
    ttlSeconds: Math.min(ttl, 120) * 60, // clamp to <= 2 hours for safety
  };
}

// Simple guard to ensure downloads stay in the configured namespace.
function isAllowedKey(key: string, basePrefix: string): boolean {
  if (!basePrefix) return true;
  const normalized = basePrefix.replace(/\/+$/, "") + "/";
  return key === basePrefix || key.startsWith(normalized);
}

export async function GET(req: NextRequest) {
  let cfg;
  try {
    cfg = env();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Config error";
    return Response.json<SasResponse>({ error: msg }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key") ?? "";
  const mode = searchParams.get("mode") ?? "inline"; // "inline" | "attachment"

  if (!key) {
    return Response.json<SasResponse>(
      { error: "Missing required query param: key" },
      { status: 400 }
    );
  }

  if (!isAllowedKey(key, cfg.basePrefix)) {
    return Response.json<SasResponse>(
      { error: "Requested key is outside the allowed prefix" },
      { status: 403 }
    );
  }

  const client = new S3Client({ region: cfg.region });

  try {
    const cmd = new GetObjectCommand({
      Bucket: cfg.bucket,
      Key: key,
      ResponseContentDisposition:
        mode === "attachment" ? "attachment" : "inline",
    });

    const url = await getSignedUrl(client, cmd, { expiresIn: cfg.ttlSeconds });
    return Response.json<SasResponse>({ url }, { status: 200 });
  } catch (e) {
    const msg =
      e instanceof Error
        ? e.message
        : "Failed to generate signed URL (unknown error)";
    return Response.json<SasResponse>({ error: msg }, { status: 500 });
  }
}
