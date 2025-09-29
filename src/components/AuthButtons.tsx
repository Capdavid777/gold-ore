"use client";

import { signIn } from "next-auth/react";
import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

function buildHostedUiUrl(): string {
  const hosted = (process.env.NEXT_PUBLIC_COGNITO_HOSTED_UI || "").replace(/\/$/, "");
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";
  const redirectUri = `${window.location.origin}/api/auth/callback/cognito`;
  const scope = encodeURIComponent("openid email profile");

  const url = `${hosted}/oauth2/authorize?client_id=${encodeURIComponent(
    clientId
  )}&response_type=code&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return url;
}

export function LoginButton() {
  const qp = useSearchParams();
  const oauthError = qp.get("error");

  const handleClick = useCallback(async () => {
    // Try NextAuth (preferred)
    try {
      // This does a 302 to /api/auth/signin/cognito which should then bounce to Hosted UI
      await signIn("cognito", { callbackUrl: "/portal" });
      return;
    } catch {
      // If NextAuth throws, fall back to direct Hosted UI
      const direct = buildHostedUiUrl();
      window.location.assign(direct);
    }
  }, []);

  const showFallbackHint = oauthError === "OAuthSignin";

  return (
    <div className="grid gap-3">
      {showFallbackHint && (
        <div
          role="alert"
          className="rounded-md bg-red-900/40 border border-red-700 text-red-200 px-3 py-2 text-sm"
        >
          We couldn’t start the sign-in automatically. Click the button below to continue via
          Cognito.
        </div>
      )}
      <button
        onClick={handleClick}
        className="rounded-2xl px-5 py-2.5 bg-[#C4A04A] text-black font-semibold hover:opacity-90 transition"
        aria-label="Login to Gold Ore"
      >
        {showFallbackHint ? "Continue with Cognito" : "Login to Gold Ore"}
      </button>
    </div>
  );
}

export function LogoutButton() {
  // NextAuth signOut works fine as-is
  return (
    <a
      href="/api/auth/signout"
      className="rounded-2xl px-5 py-2.5 border border-[#C4A04A] text-[#C4A04A] hover:bg-[#C4A04A] hover:text-black transition"
      aria-label="Logout"
    >
      Logout
    </a>
  );
}
