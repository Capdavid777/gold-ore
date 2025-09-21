import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import type { Session } from 'next-auth'
import type { Role } from '@/lib/rbac'
import { Heading, FadeIn, Card } from '@/lib/ui'
import dynamic from 'next/dynamic'
const DocumentGrid = dynamic(() => import('./_components/DocumentGrid'), { ssr: false })

function rolesFromSession(s: Session | null): Role[] {
  const maybe = s as (Session & { roles?: Role[] }) | null
  return maybe?.roles ?? []
}

export default async function PortalPage() {
  const session = await getServerSession(authOptions)
  const roles = rolesFromSession(session)

  return (
    <main className="px-6 py-8">
      <Heading
        title="Secure Portal"
        subtitle={`Signed in as ${session?.user?.email ?? 'unknown'} • Roles: ${roles.join(', ') || 'none'}`}
      />
      <FadeIn>
        <Card>
          <div className="p-6">
            <DocumentGrid />
          </div>
        </Card>
      </FadeIn>
    </main>
  )
}
