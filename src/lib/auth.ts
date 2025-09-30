// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CognitoProvider from "next-auth/providers/cognito";
import { jwtDecode } from "jwt-decode";

type CognitoIdToken = {
  email?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  "cognito:groups"?: string[];
  "custom:role"?: string;
};

function must(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

// Both must exist at runtime; ISSUER is now actively used (fixes lint)
const ISSUER = must("COGNITO_ISSUER"); // e.g. https://cognito-idp.af-south-1.amazonaws.com/<poolId>
const HOSTED = must("COGNITO_HOSTED_UI").replace(/\/$/, ""); // e.g. https://<prefix>.auth.af-south-1.amazoncognito.com

const HAS_SECRET = Boolean(process.env.COGNITO_CLIENT_SECRET && process.env.COGNITO_CLIENT_SECRET.length);

export const authOptions: NextAuthOptions = {
  secret: must("NEXTAUTH_SECRET"),
  providers: [
    CognitoProvider({
      clientId: must("COGNITO_CLIENT_ID"),
      // If a secret is provided, treat as Confidential (no PKCE). Otherwise Public (PKCE).
      ...(HAS_SECRET ? { clientSecret: must("COGNITO_CLIENT_SECRET") } : {}),
      issuer: ISSUER, // <-- actively used, resolves ESLint "unused" error

      checks: HAS_SECRET ? ["state"] : ["pkce", "state"],

      // Pin endpoints to the Hosted UI domain to avoid cross-domain issues
      wellKnown: `${ISSUER}/.well-known/openid-configuration`,
      authorization: {
        url: `${HOSTED}/oauth2/authorize`,
        params: { scope: "openid email profile" },
      },
      token: `${HOSTED}/oauth2/token`,
      userinfo: `${HOSTED}/oauth2/userInfo`,
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },

  callbacks: {
    async jwt({ token, account }): Promise<JWT> {
      if (account?.id_token) {
        const c = jwtDecode<CognitoIdToken>(account.id_token);

        token.email = c.email ?? token.email ?? null;
        token.email_verified =
          typeof c.email_verified === "boolean" ? c.email_verified : token.email_verified ?? null;

        const joined = [c.given_name ?? "", c.family_name ?? ""]
          .map((s) => s.trim())
          .filter(Boolean)
          .join(" ");
        token.name = c.name ?? (joined ? joined : token.name ?? null);

        token.groups = c["cognito:groups"] ?? token.groups ?? [];
        token.role = c["custom:role"] ?? token.role ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        email: token.email ?? session.user?.email ?? null,
        name: token.name ?? session.user?.name ?? null,
      };
      session.groups = Array.isArray(token.groups) ? token.groups : [];
      session.role = typeof token.role === "string" || token.role === null ? token.role : null;
      session.email_verified =
        typeof token.email_verified === "boolean" || token.email_verified === null
          ? token.email_verified
          : null;
      return session;
    },
  },

  debug: process.env.NODE_ENV === "development" ? true : false,
};
