// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import type { DefaultSession } from "next-auth";

// Namespaced claim where your Action writes roles
const ROLE_CLAIM = process.env.ROLE_CLAIM ?? "https://goldoresa.com/roles";

/**
 * Module augmentation: add `roles` to JWT & Session so we can type safely.
 */
declare module "next-auth/jwt" {
  interface JWT {
    roles?: string[];
  }
}

declare module "next-auth" {
  interface Session {
    roles: string[];
    user: DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    Auth0Provider({
      id: "auth0",
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: `https://${process.env.AUTH0_DOMAIN}`,
      // optional: force fresh login each time while testing
      // authorization: { params: { prompt: "login" } },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      // On first sign-in, read roles from the ID Token (namespaced claim)
      if (account?.id_token) {
        try {
          const [, payloadB64] = account.id_token.split(".");
          const json = Buffer.from(payloadB64, "base64").toString("utf8");
          const payload = JSON.parse(json) as Record<string, unknown>;
          const claim = payload[ROLE_CLAIM];

          if (Array.isArray(claim)) {
            token.roles = claim as string[];
          }
        } catch {
          // ignore decode errors; token.roles will default to []
        }
      }

      if (!Array.isArray(token.roles)) token.roles = [];
      return token;
    },

    async session({ session, token }) {
      session.roles = Array.isArray(token.roles) ? token.roles : [];
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
};
