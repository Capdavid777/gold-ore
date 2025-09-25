export const dynamic = 'force-dynamic';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { Session } from 'next-auth';
import type { Role } from '@/lib/rbac';
import { Heading, FadeIn, Card } from '@/lib/ui';
import NextDynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

type FileItem = {
  key: string;
  name: string;
  size: number;
  lastModified?: string;
};

type ListResponse = {
  prefix: string;
  items: FileItem[];
};

// Tell TS what props the dynamically imported component expects
type DocumentGridProps = { prefix: string; items: FileItem[] };

const DocumentGrid = NextDynamic<DocumentGridProps>(
  () => import('./_components/DocumentGrid'),
  {
    ssr: false,
    loading: () => <div className="text-muted">Loading documents…</div>,
  }
);

async function fetchList(prefix?: string): Promise<ListResponse> {
  const qs = prefix ? `?prefix=${encodeURIComponent(prefix)}` : '';
  const base =
    process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL.length > 0
      ? process.env.NEXT_PUBLIC_BASE_URL
      : '';
  const res = await fetch(`${base}/api/content/list${qs}`, { cache: 'no-store' });

  if (!res.ok) {
    // Parse JSON safely without using `any`
    let errorDetail: string | undefined;
    try {
      const raw = (await res.json()) as unknown;
      if (raw && typeof raw === 'object' && 'error' in raw) {
        const err = (raw as { error?: unknown }).error;
        if (typeof err === 'string') errorDetail = err;
      }
    } catch {
      /* ignore JSON parse errors */
    }
    throw new Error(errorDetail ?? `Failed to load list (${res.status})`);
  }

  const data = (await res.json()) as unknown;
  // runtime check to satisfy TS without any
  if (
    !data ||
    typeof data !== 'object' ||
    !('prefix' in data) ||
    !('items' in data) ||
    typeof (data as { prefix: unknown }).prefix !== 'string' ||
    !Array.isArray((data as { items: unknown }).items)
  ) {
    throw new Error('Invalid list response');
  }

  return data as ListResponse;
}

export default async function PortalPage() {
  const session = (await getServerSession(authOptions)) as Session & {
    user?: { roles?: Role[]; email?: string };
  };

  if (!session) redirect('/login');

  const roles = session.user?.roles ?? [];

  if (!roles.length) {
    return (
      <main className="container py-14">
        <Heading title="Secure Portal" />
        <p className="mt-3 text-muted">
          You’re signed in but do not have any assigned roles.
        </p>
      </main>
    );
  }

  let data: ListResponse | null = null;
  try {
    data = await fetchList();
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Failed to load';
    return (
      <main className="container py-14">
        <Heading title="Secure Portal" />
        <div className="mt-6">
          <Card>
            <p className="text-danger">Error: {msg}</p>
            <p className="mt-2 text-sm text-muted">
              If you just changed AWS permissions, give it a minute and refresh.
            </p>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-14">
      <FadeIn>
        <Heading title="Secure Portal" />
        <p className="mt-2 text-muted">
          Signed in as <strong>{session.user?.email}</strong>
          {roles.length ? ` • Roles: ${roles.join(', ')}` : null}
        </p>
      </FadeIn>

      <section className="mt-10">
        <DocumentGrid prefix={data!.prefix} items={data!.items} />
      </section>
    </main>
  );
}
