// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
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

const hasClientSecret = Boolean(process.env.COGNITO_CLIENT_SECRET);

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      ...(hasClientSecret ? { clientSecret: process.env.COGNITO_CLIENT_SECRET! } : {}),
      issuer: process.env.COGNITO_ISSUER!, // e.g. https://cognito-idp.af-south-1.amazonaws.com/af-south-1_XXXXX
      checks: hasClientSecret ? ["state"] : ["pkce", "state"],
    }),
  ],
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        const claims = jwtDecode<CognitoIdToken>(account.id_token);

        // Base fields
        token.email = claims.email ?? token.email;
        (token as any).email_verified = claims.email_verified ?? null;

        // Name without mixing ?? and ||
        const given = (claims.given_name || "").trim();
        const family = (claims.family_name || "").trim();
        const joined = [given, family].filter(Boolean).join(" ");
        const currentName = (token as any).name as string | undefined;
        const resolvedName = claims.name ?? (joined ? joined : currentName ?? null);
        (token as any).name = resolvedName;

        // RBAC-ish data
        (token as any).groups = claims["cognito:groups"] ?? [];
        (token as any).role = claims["custom:role"] ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        name: ((token as any).name as string | null) ?? session.user?.name ?? null,
        email: ((token as any).email as string | null) ?? session.user?.email ?? null,
      };
      (session as any).email_verified =
        ((token as any).email_verified as boolean | null) ?? null;
      (session as any).groups = ((token as any).groups as string[] | undefined) ?? [];
      (session as any).role = ((token as any).role as string | null) ?? null;

      return session;
    },
  },
};
