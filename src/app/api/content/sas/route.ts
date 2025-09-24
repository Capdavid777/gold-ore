import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

export async function GET(req: Request) {
  try {
    const bucket = process.env.S3_BUCKET;
    if (!bucket) {
      return NextResponse.json(
        { error: "Missing S3_BUCKET env var" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const keyParam = searchParams.get("key");

    if (!keyParam || keyParam.trim().length === 0) {
      return NextResponse.json({ error: "Missing 'key' parameter" }, { status: 400 });
    }

    const key = decodeURIComponent(keyParam);

    const s3 = createS3();
    const getCmd = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    // URL is valid for 15 minutes. Adjust if you prefer.
    const url = await getSignedUrl(s3, getCmd, { expiresIn: 15 * 60 });

    return NextResponse.json({ url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create pre-signed URL";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
