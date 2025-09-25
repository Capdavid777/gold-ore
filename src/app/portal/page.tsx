// Server Component
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// If you have a client DocumentGrid component, keep this path:
import DocumentGrid from "./_components/DocumentGrid";

export const dynamic = "force-dynamic"; // avoid stale cached render

function extractRoles(session: any): string[] {
  // We store roles on the root of the session; also fall back to user.*
  const raw =
    session?.roles ??
    session?.user?.roles ??
    session?.user?.["https://goldoresa.com/roles"] ??
    [];
  return Array.isArray(raw) ? raw : [];
}

export default async function PortalPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const roles = extractRoles(session);
  const allowed = roles.length > 0; // change if you want only Admins

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
          {/* If TS complains about props typing between server/client, we silence it */}
          {/* @ts-expect-error Server-to-client prop typing */}
          <DocumentGrid prefix={prefix} />
        </section>
      )}
    </main>
  );
}
