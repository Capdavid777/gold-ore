// src/lib/auth.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const ROLE_CLAIM_NS = process.env.ROLE_CLAIM || "https://goldoresa.com/roles";

export const authOptions: NextAuthOptions = {
  // NextAuth uses stateless JWTs by default in the App Router – perfect for us.
  session: { strategy: "jwt" },

  providers: [
    Auth0Provider({
      id: "auth0", // keep id stable; your UI/routes rely on it
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: `https://${process.env.AUTH0_DOMAIN}`,
      // Important for the App Router so we always come back to the same origin
      authorization: { params: { prompt: "login" } },
    }),
  ],

  callbacks: {
    /**
     * Runs whenever a JWT is created/updated.
     * We pull the namespaced roles claim from the ID Token and persist it on the JWT.
     */
    async jwt({ token, account, profile, user }) {
      // After the user signs in, account.id_token is available once
      if (account?.id_token) {
        try {
          // The ID Token is a JWT. Decode the payload to read the namespaced claim.
          const payload = JSON.parse(
            Buffer.from(account.id_token.split(".")[1], "base64").toString("utf8")
          ) as Record<string, unknown>;

          const fromClaim = Array.isArray(payload[ROLE_CLAIM_NS])
            ? (payload[ROLE_CLAIM_NS] as string[])
            : [];

          if (fromClaim.length) token.roles = fromClaim;
        } catch {
          // ignore – we’ll just fall back to whatever was on the token already
        }
      }

      // Ensure token.roles is always an array
      if (!Array.isArray((token as any).roles)) (token as any).roles = [];
      return token;
    },

    /**
     * Controls what the client (and your server components via getServerSession)
     * receives as "session".
     */
    async session({ session, token }) {
      (session as any).roles = Array.isArray((token as any).roles)
        ? (token as any).roles
        : [];
      return session;
    },
  },

  // Recommended: set explicit cookie names so they’re secure on production domains.
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  // Nice errors during setup
  debug: process.env.NODE_ENV !== "production",
  secret: process.env.NEXTAUTH_SECRET,
};
