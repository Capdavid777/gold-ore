"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

function buildHostedUiLogoutUrl() {
  const hosted = (process.env.NEXT_PUBLIC_COGNITO_HOSTED_UI || "").replace(/\/$/, "");
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";
  const logoutRedirect =
    process.env.NEXT_PUBLIC_LOGOUT_REDIRECT || `${window.location.origin}/`;
  return `${hosted}/logout?client_id=${encodeURIComponent(
    clientId
  )}&logout_uri=${encodeURIComponent(logoutRedirect)}`;
}

export default function LogoutPage() {
  useEffect(() => {
    (async () => {
      try {
        await signOut({ redirect: false });
      } finally {
        window.location.assign(buildHostedUiLogoutUrl());
      }
    })();
  }, []);

  return (
    <main className="min-h-[60vh] grid place-items-center">
      <div className="text-center text-neutral-300">
        <p className="text-lg">Signing you out…</p>
        <p className="text-sm opacity-70">
          If nothing happens,{" "}
          <a className="underline" href={buildHostedUiLogoutUrl()}>
            click here
          </a>
          .
        </p>
      </div>
    </main>
  );
}
