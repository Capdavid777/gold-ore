// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import { jwtDecode } from "jwt-decode";

/**
 * Claims we care about from Cognito's ID token.
 * Add more fields here if you later add custom attributes.
 */
type CognitoIdToken = {
  email?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  "cognito:groups"?: string[];
  "custom:role"?: string; // example custom attribute
};

const hasClientSecret = Boolean(process.env.COGNITO_CLIENT_SECRET);

// Build the provider config. If your app client is public (no secret), we use PKCE.
// If it is confidential (has a secret), Cognito may not support PKCE → we only check "state".
const cognitoProvider = CognitoProvider({
  clientId: process.env.COGNITO_CLIENT_ID!,
  ...(hasClientSecret ? { clientSecret: process.env.COGNITO_CLIENT_SECRET! } : {}),
  issuer: process.env.COGNITO_ISSUER!, // e.g. https://cognito-idp.af-south-1.amazonaws.com/af-south-1_ABC123xyz
  checks: hasClientSecret ? ["state"] : ["pkce", "state"],
  // NOTE: The Hosted UI domain (e.g., https://auth.goldoresa.com) is configured in Cognito.
  // NextAuth discovers endpoints from the issuer's well-known OIDC config.
});

export const authOptions: NextAuthOptions = {
  // It's good practice to set the secret here too (reads from NEXTAUTH_SECRET)
  secret: process.env.NEXTAUTH_SECRET,
  providers: [cognitoProvider],

  session: { strategy: "jwt" },

  callbacks: {
    /**
     * Persist useful Cognito claims to the NextAuth JWT on first sign-in.
     */
    async jwt({ token, account }) {
      if (account?.id_token) {
        const claims = jwtDecode<CognitoIdToken>(account.id_token);

        token.email = claims.email ?? token.email;
        (token as any).email_verified = claims.email_verified ?? null;

        // Compose a display name if "name" is absent
        (token as any).name =
          claims.name ??
          [claims.given_name, claims.family_name].filter(Boolean).join(" ") ||
          (token as any).name;

        // RBAC-ish data
        (token as any).groups = claims["cognito:groups"] ?? [];
        (token as any).role = claims["custom:role"] ?? null;
      }
      return token;
    },

    /**
     * Expose selected token fields on the session for server & client use.
     */
    async session({ session, token }) {
      session.user = {
        ...session.user,
        name: (token as any).name ?? session.user?.name ?? null,
        email: (token as any).email ?? session.user?.email ?? null,
      };

      (session as any).email_verified = (token as any).email_verified ?? null;
      (session as any).groups = (token as any).groups ?? [];
      (session as any).role = (token as any).role ?? null;

      return session;
    },
  },

  // Optional: tighten cookies a bit; adjust 'domain' if you serve on a subdomain.
  cookies: {
    // NextAuth sets secure flags automatically in production when using https
  },

  // You can customize signIn/signOut/error pages if desired; defaults work fine.
  // pages: { signIn: "/login" },

  // Helpful for reverse proxies / custom domains
  // trustHost: true,
};
