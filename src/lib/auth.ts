import type { NextAuthOptions } from 'next-auth'
import AzureAD_B2C from 'next-auth/providers/azure-ad-b2c'
import { mapRolesFromToken } from '@/lib/rbac'

const roleClaim = process.env.AZURE_B2C_ROLE_CLAIM || 'extension_Roles'

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
    async jwt({ token, account }) {
      // capture roles from the ID token on sign-in
      const idt = (account as any)?.id_token
      const decoded = idt ? JSON.parse(Buffer.from(idt.split('.')[1], 'base64').toString()) : undefined
      token.roles = mapRolesFromToken(decoded ?? token, roleClaim)
      return token
    },
    async session({ session, token }) {
      (session as any).roles = (token as any).roles || []
      return session
    },
  },
  pages: { signIn: '/login' },
}
