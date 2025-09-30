import { NextResponse } from "next/server";

function get(name: string) {
  return process.env[name] || "";
}

export async function GET() {
  const issuer = get("COGNITO_ISSUER");
  const hosted = get("COGNITO_HOSTED_UI").replace(/\/$/, "");
  const nextauthUrl = get("NEXTAUTH_URL");
  const clientId = get("COGNITO_CLIENT_ID");
  const hasSecret = !!get("COGNITO_CLIENT_SECRET");

  const out = {
    nodeEnv: process.env.NODE_ENV,
    nextauthUrl,
    issuer,
    hosted,
    clientIdOk: !!clientId,
    clientIdTail: clientId ? clientId.slice(-6) : null,
    hasSecret,
    computed: {
      wellKnown: issuer ? `${issuer}/.well-known/openid-configuration` : null,
      authorization: hosted ? `${hosted}/oauth2/authorize` : null,
      token: hosted ? `${hosted}/oauth2/token` : null,
      userinfo: hosted ? `${hosted}/oauth2/userInfo` : null,
      callback: nextauthUrl ? `${nextauthUrl}/api/auth/callback/cognito` : null,
    },
  };

  // No secrets returned
  return NextResponse.json(out);
}
