import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { audit } from '@/lib/logger'
import type { ContentItem, Permission, Role } from '@/lib/rbac'

const ALL_ITEMS: Omit<ContentItem, 'permissions'> & { acl: Record<string, Permission[]> }[] = [
  { id: 'doc-1', name: 'K2015_AFS_2025.pdf', type: 'pdf', tags: ['financials','2025'], modified: '2025-06-30', size: 2300000, acl: { admin: ['view','download','edit'], staff: ['view','download'], investor: ['view','download'] } },
  { id: 'doc-2', name: 'Benoni South Project-UPDATE.pdf', type: 'pdf', tags: ['project','benoni'], modified: '2025-07-10', acl: { admin: ['view','download','edit'], staff: ['view','download','edit'], investor: ['view'] } },
  { id: 'doc-3', name: 'DMPR Presentation.pdf', type: 'pdf', tags: ['presentation'], modified: '2025-08-22', acl: { admin: ['view','download','edit'], staff: ['view','download'], investor: ['view','download'] } },
  { id: 'doc-4', name: 'Gold Prospecting Rights Due Diligence Package.docx', type: 'docx', tags: ['due-diligence'], modified: '2025-05-02', acl: { admin: ['view','download','edit'], staff: ['view','download','edit'], investor: ['view'] } },
]

function permsForRoles(acl: Record<string, Permission[]>, roles: Role[]): Permission[] {
  const out = new Set<Permission>()
  for (const r of roles) for (const p of (acl[r] || [])) out.add(p)
  return Array.from(out)
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return new NextResponse('Unauthorized', { status: 401 })
  const roles = (session as typeof session & { roles?: Role[] }).roles ?? []
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').toLowerCase()

  const items: ContentItem[] = ALL_ITEMS
    .filter(it => !q || it.name.toLowerCase().includes(q) || it.tags?.some(t => t.includes(q)))
    .map(it => ({ ...it, permissions: permsForRoles(it.acl, roles) }))

  audit('list_content', { user: session.user?.email, q, count: items.length })
  return NextResponse.json(items)
}
