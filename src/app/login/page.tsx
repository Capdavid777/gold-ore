'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <main className="grid min-h-[70dvh] place-items-center">
      <div className="rounded-2xl border border-[#654e1a]/40 bg-black/40 backdrop-blur p-8 w-[min(92vw,480px)]">
        <h1 className="font-serif text-4xl md:text-5xl text-[#d4af37] mb-6">Welcome</h1>
        <button
          onClick={() => signIn('auth0', { callbackUrl: '/portal' })}  // <-- use 'auth0'
          className="w-full rounded-xl bg-[#b08d2b] text-black font-semibold py-3 hover:bg-[#d4af37] transition"
        >
          Continue with Auth0
        </button>
        <p className="mt-4 text-sm text-gray-400">
          Staff & Investors secure access. By continuing you agree to our policies.
        </p>
      </div>
    </main>
  );
}
