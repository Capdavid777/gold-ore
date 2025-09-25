export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse, type NextRequest } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
    const bucket = requireEnv('S3_BUCKET_NAME');
    const s3 = createS3();

    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');
    if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 });

    const ttlMin = Number(process.env.SAS_TTL_MIN ?? '10');
    const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });

    const url = await getSignedUrl(s3, cmd, { expiresIn: ttlMin * 60 });

    return NextResponse.json({ url }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
