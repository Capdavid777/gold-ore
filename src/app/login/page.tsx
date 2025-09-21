'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <main className="grid min-h-[70dvh] place-items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1f24] via-[#0b0d10] to-black">
      <div className="rounded-2xl border border-[#654e1a]/40 bg-black/40 backdrop-blur shadow-[0_10px_30px_rgba(212,175,55,0.2)] p-8 w-[min(92vw,480px)]">
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl text-[#d4af37] tracking-tight">Welcome</h1>
          <p className="mt-2 text-gray-400">Staff & Investors secure access</p>
        </div>
        <button
          onClick={() => signIn('azure-ad-b2c', { callbackUrl: '/portal' })}
          className="w-full rounded-xl bg-[#b08d2b] text-black font-semibold py-3 hover:bg-[#d4af37] transition"
        >
          Continue with Azure AD B2C
        </button>
        <p className="mt-4 text-sm text-gray-400">
          By continuing you agree to our Acceptable Use and Confidentiality Policy.
        </p>
      </div>
    </main>
  );
}

