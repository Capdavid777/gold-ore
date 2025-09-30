"use client";

import { signIn, signOut } from "next-auth/react";

/**
 * Build Hosted UI authorize URL for manual fallback.
 */
function buildHostedUiAuthorizeUrl(): string {
  const hosted = (process.env.NEXT_PUBLIC_COGNITO_HOSTED_UI || "").replace(/\/$/, "");
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";
  const redirectUri = `${window.location.origin}/api/auth/callback/cognito`;
  const scope = encodeURIComponent("openid email profile");

  return `${hosted}/oauth2/authorize?client_id=${encodeURIComponent(
    clientId
  )}&response_type=code&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}`;
}

/**
 * Build Hosted UI logout URL. Cognito will clear its SSO cookies and send
 * the user back to `logout_uri` (must be allowed in the app client settings).
 */
function buildHostedUiLogoutUrl(): string {
  const hosted = (process.env.NEXT_PUBLIC_COGNITO_HOSTED_UI || "").replace(/\/$/, "");
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";
  const logoutRedirect =
    process.env.NEXT_PUBLIC_LOGOUT_REDIRECT || `${window.location.origin}/`;

  return `${hosted}/logout?client_id=${encodeURIComponent(
    clientId
  )}&logout_uri=${encodeURIComponent(logoutRedirect)}`;
}

export function LoginButton({ oauthError }: { oauthError?: string }) {
  const isOauthSignin = oauthError === "OAuthSignin";

  const handleClick = () => {
    if (isOauthSignin) {
      // If NextAuth couldn't kick off OAuth automatically, send user directly to Hosted UI.
      window.location.assign(buildHostedUiAuthorizeUrl());
      return;
    }
    void signIn("cognito", { callbackUrl: "/portal" });
  };

  return (
    <div className="grid gap-3">
      {isOauthSignin && (
        <div
          role="alert"
          className="rounded-md bg-red-900/40 border border-red-700 text-red-200 px-3 py-2 text-sm"
        >
          We couldn’t start the sign-in automatically. Click the button below to
          continue via Cognito.
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

/**
 * Full sign-out:
 * 1) Clear NextAuth cookies (no redirect)
 * 2) Redirect to Cognito Hosted UI logout endpoint (clears Cognito cookies)
 * 3) Cognito returns the user to NEXT_PUBLIC_LOGOUT_REDIRECT
 */
export function LogoutButton() {
  const doLogout = async () => {
    try {
      await signOut({ redirect: false });
    } catch {
      // ignore – even if NextAuth cookie was already gone, proceed to Hosted UI logout
    }
    window.location.assign(buildHostedUiLogoutUrl());
  };

  return (
    <button
      onClick={doLogout}
      className="rounded-2xl px-5 py-2.5 border border-[#C4A04A] text-[#C4A04A] hover:bg-[#C4A04A] hover:text-black transition"
      aria-label="Logout"
    >
      Logout
    </button>
  );
}
