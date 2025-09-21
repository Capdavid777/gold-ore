// src/lib/rbac.ts

/** Roles available in the portal */
export type Role = 'admin' | 'staff' | 'investor'

/** Fine-grained permissions applied per item for the signed-in user */
export type Permission = 'view' | 'edit' | 'download'

/** Lightweight identity shape we pass around server-side */
export type UserIdentity = {
  id: string
  email: string
  name?: string
  roles: Role[]
}

/** Content item metadata sent to the client (permissions are user-specific) */
export type ContentItem = {
  id: string
  name: string
  type: 'pdf' | 'image' | 'video' | 'audio' | 'folder' | 'docx'
  tags?: string[]
  size?: number
  modified?: string
  permissions: Permission[]
}

/** Runtime helper: check if a user has a specific permission on an item */
export function hasPermission(item: ContentItem, perm: Permission): boolean {
  return item.permissions.includes(perm)
}

/** Runtime helper: map roles from an ID token claim (e.g. extension_Roles or roles) */
export function mapRolesFromToken(
  token: Record<string, unknown> | undefined,
  claimPath: string
): Role[] {
  const raw = Array.isArray((token as any)?.[claimPath])
    ? ((token as any)[claimPath] as unknown[])
    : []

  const norm = raw.map((r) => String(r).toLowerCase())
  const out: Role[] = []
  if (norm.includes('admin')) out.push('admin')
  if (norm.includes('staff')) out.push('staff')
  if (norm.includes('investor')) out.push('investor')
  return out
}

/**
 * Sentinel value to guarantee this file is treated as a module even if
 * all imports are `import type { … }`. Keeps isolatedModules happy.
 */
export const RBAC_MODULE = true

