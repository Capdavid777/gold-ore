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

function mustGetEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export const authOptions: NextAuthOptions = {
  secret: mustGetEnv("NEXTAUTH_SECRET"),
  providers: [
    CognitoProvider({
      clientId: mustGetEnv("COGNITO_CLIENT_ID"),
      clientSecret: mustGetEnv("COGNITO_CLIENT_SECRET"), // ensure it's always a string
      issuer: mustGetEnv("COGNITO_ISSUER"), // e.g. https://cognito-idp.af-south-1.amazonaws.com/af-south-1_XXXX
      // (No explicit `checks`; NextAuth will handle this. PKCE works with Cognito.)
    }),
  ],
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, account }): Promise<JWT> {
      if (account?.id_token) {
        const claims = jwtDecode<CognitoIdToken>(account.id_token);

        // Email + verification
        token.email = claims.email ?? token.email ?? null;
        token.email_verified =
          typeof claims.email_verified === "boolean"
            ? claims.email_verified
            : token.email_verified ?? null;

        // Name resolution (no nullish/logical mixing)
        const given = (claims.given_name ?? "").trim();
        const family = (claims.family_name ?? "").trim();
        const joined = [given, family].filter(Boolean).join(" ");
        token.name = claims.name ?? (joined.length > 0 ? joined : token.name ?? null);

        // RBAC-style data
        token.groups = claims["cognito:groups"] ?? token.groups ?? [];
        token.role = claims["custom:role"] ?? token.role ?? null;
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
};
