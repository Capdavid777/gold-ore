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

// Example: https://cognito-idp.af-south-1.amazonaws.com/af-south-1_XXXXXX
const ISSUER = must("COGNITO_ISSUER");

export const authOptions: NextAuthOptions = {
  secret: must("NEXTAUTH_SECRET"),
  providers: [
    CognitoProvider({
      clientId: must("COGNITO_CLIENT_ID"),
      clientSecret: must("COGNITO_CLIENT_SECRET"), // confidential client => secret required
      issuer: ISSUER,
      // IMPORTANT: confidential apps should not use PKCE
      checks: ["state"],
      // Do NOT override authorization/token/userinfo here.
      // NextAuth will use the issuer's OIDC discovery to get the correct endpoints.
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
          typeof c.email_verified === "boolean"
            ? c.email_verified
            : token.email_verified ?? null;

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
