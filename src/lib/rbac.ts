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

/** All known roles (runtime export keeps this file a module) */
export const ROLES: readonly Role[] = ['admin', 'staff', 'investor'] as const

/**
 * Map roles from an ID token claim (e.g. `extension_Roles` or `roles`) to our Role[]
 * - Accepts array claims or a comma/space-separated string
 * - Fully typed; no `any`
 */
export function mapRolesFromToken(
  token: unknown,
  claimPath: string
): Role[] {
  if (token == null || typeof token !== 'object') return []
  const obj = token as Record<string, unknown>
  const raw = obj[claimPath]

  const values: string[] = Array.isArray(raw)
    ? (raw as unknown[]).map((v) => String(v))
    : typeof raw === 'string'
      ? raw.split(/[,\s]+/).filter(Boolean)
      : []

  const norm = values.map((v) => v.toLowerCase())
  const out: Role[] = []
  if (norm.includes('admin')) out.push('admin')
  if (norm.includes('staff')) out.push('staff')
  if (norm.includes('investor')) out.push('investor')
  return out
}

/** Sentinel to ensure module-ness under isolatedModules */
export const RBAC_MODULE = true
