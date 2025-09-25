// Runtime: Node.js because we use the AWS SDK v3.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse, type NextRequest } from 'next/server';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

type FileItem = {
  key: string;
  name: string;
  size: number;
  lastModified?: string;
};

type ListResponse = {
  prefix: string;
  items: FileItem[];
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name} env var`);
  return value;
}

function createS3() {
  const region = requireEnv('S3_REGION');
  const accessKeyId = requireEnv('AWS_ACCESS_KEY_ID');
  const secretAccessKey = requireEnv('AWS_SECRET_ACCESS_KEY');

  return new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export async function GET(req: NextRequest) {
  try {
    const s3 = createS3();
    const bucket = requireEnv('S3_BUCKET');
    const defaultPrefix = process.env.S3_PREFIX ?? '';
    const url = new URL(req.url);
    const prefix = url.searchParams.get('prefix') ?? defaultPrefix;

    const cmd = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix || undefined,
      Delimiter: undefined,
      MaxKeys: 1000,
    });

    const out = await s3.send(cmd);

    const items: FileItem[] =
      out.Contents?.map((o) => ({
        key: o.Key ?? '',
        name: (o.Key ?? '').split('/').pop() ?? '',
        size: Number(o.Size ?? 0),
        lastModified: o.LastModified?.toISOString(),
      })).filter((x) => x.key) ?? [];

    const payload: ListResponse = { prefix, items };
    return NextResponse.json(payload, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    // Don’t use generics on Response.json — just return a typed payload
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
