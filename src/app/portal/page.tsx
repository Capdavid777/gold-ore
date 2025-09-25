export const dynamic = 'force-dynamic'; // always fetch fresh list

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

// 👇 Tell TS what props DocumentGrid expects
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
    const j = await res.json().catch(() => ({} as any));
    throw new Error(j?.error ?? `Failed to load list (${res.status})`);
  }
  return (await res.json()) as ListResponse;
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
        {/* ✅ TS now knows these props are valid */}
        <DocumentGrid prefix={data!.prefix} items={data!.items} />
      </section>
    </main>
  );
}
