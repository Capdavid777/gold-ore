// src/app/portal/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type FileItem = {
  key: string;
  name: string;
  size: number;
  lastModified: string;
};

type ListResponse = {
  prefix: string;
  items: FileItem[];
};

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function extractRoles(session: unknown): string[] {
  if (!session || typeof session !== "object") return [];
  // 1) next-auth session.roles (our callback puts roles here)
  const s = session as { roles?: unknown; user?: Record<string, unknown> };
  if (Array.isArray(s.roles) && s.roles.every(isString)) return s.roles as string[];

  // 2) sometimes people put roles on session.user[...] with a namespaced claim
  const user = s.user;
  const claim = process.env.ROLE_CLAIM ?? "https://goldoresa.com/roles";
  const fromUser =
    (user && (user.roles as unknown)) ?? (user && (user[claim] as unknown));

  if (Array.isArray(fromUser) && fromUser.every(isString)) {
    return fromUser as string[];
  }
  return [];
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
}

export default async function PortalPage() {
  const session = await getServerSession(authOptions);
  const roles = extractRoles(session);

  // Gate: you’re signed in but have no assigned roles
  if (!roles.length) {
    return (
      <main className="container py-14">
        <h1 className="text-3xl font-semibold">Secure Portal</h1>
        <p className="mt-6 text-muted-foreground">
          You’re signed in but do not have any assigned roles.
        </p>
      </main>
    );
  }

  // Load files from the API (no caching)
  const base =
    process.env.NEXTAUTH_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
  const res = await fetch(`${base}/api/content/list`, { cache: "no-store" });

  if (!res.ok) {
    const msg = await res.text();
    return (
      <main className="container py-14">
        <h1 className="text-3xl font-semibold">Secure Portal</h1>
        <p className="mt-6 text-red-500">
          Error loading files: {msg || res.statusText}
        </p>
      </main>
    );
  }

  const data = (await res.json()) as ListResponse;
  const files = data.items.filter((i) => i.name && i.name.trim().length > 0);

  return (
    <main className="container py-14">
      <h1 className="text-3xl font-semibold">Secure Portal</h1>

      {files.length === 0 ? (
        <p className="mt-6 text-muted-foreground">No files found.</p>
      ) : (
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {files.map((f) => (
            <article key={f.key} className="rounded-xl border p-4">
              <h2 className="font-medium">{f.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatSize(f.size)} ·{" "}
                {new Date(f.lastModified).toLocaleDateString()}
              </p>
              <div className="mt-4 flex gap-3">
                <Link
                  className="rounded-md px-3 py-2 bg-zinc-900 text-white hover:bg-zinc-800"
                  href={`/api/content/sas?key=${encodeURIComponent(
                    f.key
                  )}&mode=inline`}
                >
                  Preview
                </Link>
                <Link
                  className="rounded-md px-3 py-2 border hover:bg-zinc-50"
                  href={`/api/content/sas?key=${encodeURIComponent(
                    f.key
                  )}&mode=download`}
                >
                  Download
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
