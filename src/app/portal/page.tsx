// Server Component
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { redirect } from "next/navigation";
// Keep this import/path as it exists in your repo
import DocumentGrid from "./_components/DocumentGrid";

export const dynamic = "force-dynamic"; // avoid stale cached render

function getRoles(session: Session | null): string[] {
  // Safely probe possible locations without using `any`
  const fromRoot =
    (session as unknown as { roles?: unknown } | null)?.roles;
  const fromUser =
    (session?.user as unknown as { roles?: unknown } | null)?.roles;
  const fromNs =
    (session?.user as unknown as Record<string, unknown> | null)?.[
      "https://goldoresa.com/roles"
    ];

  const raw: unknown = fromRoot ?? fromUser ?? fromNs ?? [];

  if (Array.isArray(raw)) {
    // Coerce elements to strings to keep a consistent type
    return raw.map((r) => String(r));
  }
  return [];
}

export default async function PortalPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const roles = getRoles(session);
  const allowed = roles.length > 0; // adjust if you want to gate by a specific role

  const prefix = process.env.S3_PREFIX || "secure";

  return (
    <main className="container mx-auto px-4 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Secure Portal</h1>

      {!allowed ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-muted-foreground">
            You’re signed in but do not have any assigned roles.
          </p>
        </div>
      ) : (
        <section className="mt-10">
          {/* If TS complains about server→client prop typing, we silence it here only */}
          {/* @ts-expect-error Server-to-client prop typing */}
          <DocumentGrid prefix={prefix} />
        </section>
      )}
    </main>
  );
}
