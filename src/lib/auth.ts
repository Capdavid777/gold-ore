import type { NextAuthOptions, Session, Account } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Auth0Provider from "next-auth/providers/auth0";
import AzureAD_B2C from "next-auth/providers/azure-ad-b2c";

/**
 * If you already have a Role type elsewhere, you can switch this to
 * `type Role = import("./rbac").Role` and adjust the path.
 */
export type Role = "admin" | "staff" | "investor";

type TokenWithRoles = JWT & { roles?: Role[] };
type SessionWithRoles = Session & { roles?: Role[] };

const AUTH_PROVIDER = (process.env.AUTH_PROVIDER || "auth0").toLowerCase();

// Auth0 custom-claim namespace (must match your Action)
const AUTH0_ROLE_CLAIM = process.env.ROLE_CLAIM || "https://goldoresa.com/roles";
// Azure B2C roles claim (custom attribute)
const AZURE_ROLE_CLAIM = process.env.AZURE_B2C_ROLE_CLAIM || "extension_Roles";

/* ---------------------------- helpers ---------------------------- */

function safeDecodeJwtPayload(idToken?: string): Record<string, unknown> | undefined {
  if (!idToken) return undefined;
  const parts = idToken.split(".");
  if (parts.length < 2) return undefined;
  try {
    return JSON.parse(Buffer.from(parts[1], "base64").toString("utf8"));
  } catch {
    return undefined;
  }
}

function getByPath(obj: unknown, path: string): unknown {
  if (!obj || typeof obj !== "object") return undefined;
  return path.split(".").reduce<unknown>((acc, key) => {
    if (!acc || typeof acc !== "object") return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj);
}

function normalizeRoles(value: unknown): Role[] {
  const raw: string[] =
    Array.isArray(value) ? value.map(String) :
    typeof value === "string" ? value.split(/[,\s]+/).filter(Boolean) : [];
  const set = new Set(raw.map((v) => v.toLowerCase()));
  const out: Role[] = [];
  if (set.has("admin")) out.push("admin");
  if (set.has("staff")) out.push("staff");
  if (set.has("investor")) out.push("investor");
  return out;
}

/* --------------------------- providers --------------------------- */

function buildProviders() {
  if (AUTH_PROVIDER === "auth0") {
    const domain = process.env.AUTH0_DOMAIN!;
    const clientId = process.env.AUTH0_CLIENT_ID!;
    const clientSecret = process.env.AUTH0_CLIENT_SECRET!;
    if (!domain || !clientId || !clientSecret) {
      throw new Error("Auth0 env vars missing: AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET");
    }
    return [
      Auth0Provider({
        id: "auth0",
        issuer: `https://${domain}`,
        clientId,
        clientSecret,
      }),
    ];
  }

  // Fallback: Azure AD B2C
  const tenant = process.env.AZURE_AD_B2C_TENANT!;
  const clientId = process.env.AZURE_AD_B2C_CLIENT_ID!;
  const clientSecret = process.env.AZURE_AD_B2C_CLIENT_SECRET!;
  const userFlow = process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW!;
  if (!tenant || !clientId || !clientSecret || !userFlow) {
    throw new Error(
      "Azure B2C env vars missing: AZURE_AD_B2C_TENANT, AZURE_AD_B2C_CLIENT_ID, AZURE_AD_B2C_CLIENT_SECRET, AZURE_AD_B2C_PRIMARY_USER_FLOW"
    );
  }

  return [
    AzureAD_B2C({
      id: "azure-ad-b2c",
      tenantId: tenant, // e.g., goldoresaextid.onmicrosoft.com or the tenant GUID
      clientId,
      clientSecret,
      primaryUserFlow: userFlow, // e.g., B2C_1_signinsignup
      authorization: { params: { scope: "openid profile offline_access" } },
      // NextAuth will use defaults for checks; B2C works fine with nonce/pkce.
    }),
  ];
}

/* ---------------------------- callbacks -------------------------- */

export const authOptions: NextAuthOptions = {
  providers: buildProviders(),
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  // Enable if you want verbose logs during setup:
  debug: process.env.NEXTAUTH_DEBUG === "true",

  callbacks: {
    /**
     * Pull roles into the JWT at sign-in (from id_token) and persist them.
     */
    async jwt({ token, account }) {
      const t = token as TokenWithRoles;

      // Try to read roles from the current provider's id_token (first login)
      const claims = safeDecodeJwtPayload((account as Account | null | undefined)?.id_token);

      let fromIdToken: unknown;
      if (AUTH_PROVIDER === "auth0") {
        fromIdToken = claims ? getByPath(claims, AUTH0_ROLE_CLAIM) : undefined;
      } else {
        // Azure B2C
        fromIdToken = claims ? getByPath(claims, AZURE_ROLE_CLAIM) : undefined;
      }

      // Also support roles stored directly on the token under the claim key (subsequent requests)
      const fromTokenClaim =
        AUTH_PROVIDER === "auth0" ? getByPath(token as Record<string, unknown>, AUTH0_ROLE_CLAIM)
                                  : getByPath(token as Record<string, unknown>, AZURE_ROLE_CLAIM);

      const roles = normalizeRoles(fromIdToken ?? fromTokenClaim ?? (t.roles || []));
      if (roles.length) t.roles = roles; // set / overwrite once we have a value
      t.roles ??= [];
      return t;
    },

    /**
     * Expose roles on the session object
     */
    async session({ session, token }) {
      (session as SessionWithRoles).roles = (token as TokenWithRoles).roles ?? [];
      return session;
    },
  },
};
