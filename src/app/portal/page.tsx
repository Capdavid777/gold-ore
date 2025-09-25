// Server Component – no "use client"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// If you use your own UI primitives, keep these imports as they are in your repo
import { Heading } from "@/lib/ui/heading";
import { Card } from "@/lib/ui/card";
import DocumentGrid from "./_components/DocumentGrid";

// Don't cache this page (avoids seeing a stale "no roles" view)
export const dynamic = "force-dynamic";

function extractRoles(session: any): string[] {
  // We put roles on the root of the session in callbacks,
  // but also fall back to user.* and a namespaced claim just in case.
  const raw =
    session?.roles ??
    session?.user?.roles ??
    session?.user?.["https://goldoresa.com/roles"] ??
    [];

  return Array.isArray(raw) ? raw : [];
}

export default async function PortalPage() {
  const session = await getServerSession(); // App Router can infer options
  if (!session) redirect("/login");

  const roles = extractRoles(session);
  // Gate however you want; here we allow anyone with at least one role.
  // If you want only Admins:
  // const allowed = roles.some(r => r.toLowerCase() === "admin");
  const allowed = roles.length > 0;

  return (
    <main className="container py-14">
      <Heading title="Secure Portal" />

      {!allowed ? (
        <Card className="mt-6 p-6">
          <p className="text-muted-foreground">
            You’re signed in but do not have any assigned roles.
          </p>
        </Card>
      ) : (
        <section className="mt-10">
          {/* Use your configured prefix if you added one via env; default to "secure" */}
          <DocumentGrid prefix={process.env.S3_PREFIX || "secure"} />
        </section>
      )}
    </main>
  );
}
