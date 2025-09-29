"use client";

import { signIn } from "next-auth/react";

function buildHostedUiUrl(): string {
  const hosted = (process.env.NEXT_PUBLIC_COGNITO_HOSTED_UI || "").replace(/\/$/, "");
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";
  const redirectUri = `${window.location.origin}/api/auth/callback/cognito`;
  const scope = encodeURIComponent("openid email profile");

  return `${hosted}/oauth2/authorize?client_id=${encodeURIComponent(
    clientId
  )}&response_type=code&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}`;
}

export function LoginButton({ oauthError }: { oauthError?: string }) {
  const isOauthSignin = oauthError === "OAuthSignin";

  // When NextAuth signals OAuthSignin, skip it and go straight to Hosted UI.
  const handleClick = () => {
    if (isOauthSignin) {
      window.location.assign(buildHostedUiUrl());
      return;
    }
    // Normal path (will redirect to /api/auth/signin/cognito)
    void signIn("cognito", { callbackUrl: "/portal" });
  };

  return (
    <div className="grid gap-3">
      {isOauthSignin && (
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
        {isOauthSignin ? "Continue with Cognito" : "Login to Gold Ore"}
      </button>
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
