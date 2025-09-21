import type { NextAuthOptions, Session, Account } from 'next-auth'
import AzureAD_B2C from 'next-auth/providers/azure-ad-b2c'
import type { JWT } from 'next-auth/jwt'
import { mapRolesFromToken, type Role } from '@/lib/rbac'

type TokenWithRoles = JWT & { roles?: Role[] }
type SessionWithRoles = Session & { roles?: Role[] }

const ROLE_CLAIM = process.env.AZURE_B2C_ROLE_CLAIM || 'extension_Roles'

function safeDecodeJwtPayload(idToken?: string): Record<string, unknown> | undefined {
  if (!idToken) return undefined
  const parts = idToken.split('.')
  if (parts.length < 2) return undefined
  try {
    const json = Buffer.from(parts[1], 'base64').toString('utf8')
    return JSON.parse(json) as Record<string, unknown>
  } catch {
    return undefined
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    AzureAD_B2C({
      tenantId: process.env.AZURE_AD_B2C_TENANT!,
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET!,
      primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW!,
      authorization: { params: { scope: 'openid profile email' } },
      checks: ['pkce', 'state'],
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account }): Promise<TokenWithRoles> {
      const t = token as TokenWithRoles
      // On sign-in, prefer roles from the provider ID token; otherwise keep existing
      const claims = safeDecodeJwtPayload((account as Account | null | undefined)?.id_token)
      const roles = mapRolesFromToken(claims ?? (token as unknown as Record<string, unknown>), ROLE_CLAIM)
      if (roles.length) t.roles = roles
      t.roles ??= []
      return t
    },
    async session({ session, token }): Promise<SessionWithRoles> {
      const s = session as SessionWithRoles
      s.roles = (token as TokenWithRoles).roles ?? []
      return s
    },
  },
  pages: { signIn: '/login' },
}
