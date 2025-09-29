import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { headers } from "next/headers";

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

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
}

function getBaseUrl() {
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  return host ? `${proto}://${host}` : "";
}

export default async function PortalPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="min-h-[60vh] bg-[#0B0E13] text-white">
        <div className="max-w-3xl mx-auto py-16 px-6">
          <h1 className="text-3xl font-semibold">Secure Portal</h1>
          <p className="mt-6 text-zinc-400">You must be signed in to view this page.</p>
          <p className="mt-2 text-zinc-500">Please use the Login button above.</p>
        </div>
      </main>
    );
  }

  const groups = session.groups ?? [];
  const role = session.role ?? null;

  if (groups.length === 0) {
    return (
      <main className="min-h-[60vh] bg-[#0B0E13] text-white">
        <div className="max-w-3xl mx-auto py-16 px-6">
          <h1 className="text-3xl font-semibold">Secure Portal</h1>
          <p className="mt-6 text-zinc-400">
            You’re signed in as <span className="text-white">{session.user?.email}</span>, but no
            access group has been assigned to your account.
          </p>
          <p className="mt-2 text-zinc-500">
            Ask an administrator to add you to a group (e.g., <code>admin</code>,{" "}
            <code>staff</code>, <code>investor</code>).
          </p>
        </div>
      </main>
    );
  }

  const base = getBaseUrl();
  const res = await fetch(`${base}/api/content/list`, { cache: "no-store" });

  if (!res.ok) {
    const msg = await res.text();
    return (
      <main className="min-h-[60vh] bg-[#0B0E13] text-white">
        <div className="max-w-3xl mx-auto py-16 px-6">
          <h1 className="text-3xl font-semibold">Secure Portal</h1>
          <p className="mt-6 text-red-500">Error loading files: {msg || res.statusText}</p>
        </div>
      </main>
    );
  }

  const data = (await res.json()) as ListResponse;
  const files = (data.items ?? []).filter((i) => i && i.name?.trim().length > 0);

  return (
    <main className="min-h-[60vh] bg-[#0B0E13] text-white">
      <div className="max-w-6xl mx-auto py-16 px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold">Secure Portal</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Signed in as <span className="text-white">{session.user?.email}</span>
              {role ? (
                <>
                  {" "}
                  • Role: <span className="text-white">{role}</span>
                </>
              ) : null}{" "}
              • Groups: <span className="text-white">{groups.join(", ")}</span>
            </p>
          </div>
        </div>

        {files.length === 0 ? (
          <p className="mt-8 text-zinc-400">No files found.</p>
        ) : (
          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((f) => (
              <article key={f.key} className="rounded-xl border border-zinc-800 p-4 bg-black/30">
                <h2 className="font-medium">{f.name}</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  {formatSize(f.size)} · {new Date(f.lastModified).toLocaleDateString()}
                </p>
                <div className="mt-4 flex gap-3">
                  <Link
                    className="rounded-md px-3 py-2 bg-zinc-900 text-white hover:bg-zinc-800"
                    href={`/api/content/sas?key=${encodeURIComponent(f.key)}&mode=inline`}
                  >
                    Preview
                  </Link>
                  <Link
                    className="rounded-md px-3 py-2 border border-zinc-800 hover:bg-zinc-900"
                    href={`/api/content/sas?key=${encodeURIComponent(f.key)}&mode=download`}
                  >
                    Download
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
