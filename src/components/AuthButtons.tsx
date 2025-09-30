// src/components/AuthButtons.tsx
"use client";

import { signIn } from "next-auth/react";

export function LoginButton({ oauthError }: { oauthError?: string }) {
  const handleClick = () => {
    // This hits /api/auth/signin/cognito which sets NextAuth's state/nonce cookie
    void signIn("cognito", { callbackUrl: "/portal" });
  };

  return (
    <div className="grid gap-3">
      {oauthError && (
        <div
          role="alert"
          className="rounded-md bg-red-900/40 border border-red-700 text-red-200 px-3 py-2 text-sm"
        >
          We couldn’t start the sign-in automatically. Click the button below to
          continue.
        </div>
      )}

      <button
        onClick={handleClick}
        className="rounded-2xl px-5 py-2.5 bg-[#C4A04A] text-black font-semibold hover:opacity-90 transition"
        aria-label="Login to Gold Ore"
      >
        Login to Gold Ore
      </button>

      {/* Non-JS fallback that also goes through NextAuth to set cookies */}
      <a
        href="/api/auth/signin/cognito?callbackUrl=%2Fportal"
        className="text-xs text-zinc-400 underline text-center"
      >
        If the button doesn’t work, click here.
      </a>
    </div>
  );
}

export function LogoutButton() {
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
