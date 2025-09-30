import { NextRequest, NextResponse } from "next/server";

function must(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const hosted = must("COGNITO_HOSTED_UI").replace(/\/$/, ""); // e.g. https://<prefix>.auth.af-south-1.amazoncognito.com
  const clientId = must("COGNITO_CLIENT_ID");

  // Prefer explicit callbackUrl query param; otherwise fall back to NextAuth callback
  const url = new URL(req.url);
  const cb = url.searchParams.get("callbackUrl");

  const base =
    process.env.NEXTAUTH_URL ||
    `${req.nextUrl.protocol}//${req.nextUrl.host}`;

  const redirectUri =
    cb && /^https?:\/\//i.test(cb) ? cb : `${base}/api/auth/callback/cognito`;

  const scope = encodeURIComponent("openid email profile");
  const authorizeUrl =
    `${hosted}/oauth2/authorize` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&response_type=code&scope=${scope}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return NextResponse.redirect(authorizeUrl, { status: 307 });
}
