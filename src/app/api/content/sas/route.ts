import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { audit } from '@/lib/logger'
import { getSignedUrl } from '@/lib/azure'
import type { Permission } from '@/lib/rbac'
import { GET as LIST_GET } from '../list/route'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return new NextResponse('Unauthorized', { status: 401 })

  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return new NextResponse('Missing id', { status: 400 })

  // reuse list endpoint to compute user-specific permissions
  const listRes = await LIST_GET(new Request(`${url.origin}/api/content/list`))
  const items = (await listRes.json()) as { id: string; permissions: Permission[] }[]
  const item = items.find(i => i.id === id)
  if (!item) return new NextResponse('Not found', { status: 404 })
  if (!item.permissions.includes('download')) {
    audit('download_denied', { user: session.user?.email, id })
    return new NextResponse('Forbidden', { status: 403 })
  }

  const blobPath = `${id}`
  const urlSas = await getSignedUrl(blobPath, session.user?.email || 'unknown')
  audit('download_granted', { user: session.user?.email, id })
  return NextResponse.json({ url: urlSas })
}
