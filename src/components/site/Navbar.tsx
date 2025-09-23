'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Route } from 'next';
import { useSession, signOut } from 'next-auth/react';

type NavItem = { label: string; href: Route };

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'About',      href: '/about' },
  { label: 'Operations', href: '/operations' },
  { label: 'ESG',        href: '/esg' },
  { label: 'Investors',  href: '/investors' },
  { label: 'News',       href: '/news' },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-[hsl(var(--border-subtle))] bg-[hsl(var(--surface)/0.8)] backdrop-blur-xs">
      <div className="container flex items-center justify-between py-3">
        {/* Brand */}
        <Link
          href="/"
          className="group relative inline-flex items-center rounded-xl px-2 py-1 will-change-transform"
          aria-label="Gold Ore – Home"
        >
          <span className="brand-gold-text font-display font-semibold text-xl tracking-[0.22em] md:text-2xl">
            GOLD ORE
          </span>
        </Link>

        {/* mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            className="focus-ring rounded-xl px-3 py-2"
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label="Toggle navigation"
          >
            Menu
          </button>
        </div>

        {/* primary nav */}
        <nav
          id="primary-nav"
          className={`items-center gap-8 ${open ? 'block' : 'hidden'} md:flex`}
        >
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="block py-2 text-[hsl(var(--text))] hover:text-brand-gold-400 md:py-0"
              prefetch={false}
            >
              {label}
            </Link>
          ))}

          {/* Auth control (right side of the menu) */}
          {status === 'authenticated' ? (
            <div className="flex items-center gap-3">
              <Link
                href="/portal"
                className="rounded-xl bg-[#b08d2b] px-3 py-2 text-black font-semibold hover:bg-[#d4af37] transition"
              >
                Portal
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-xl border border-brand-gold-700 px-3 py-2 text-[hsl(var(--text))] hover:bg-brand-gold-700/20 transition"
                aria-label="Sign out"
                title={session.user?.email ?? 'Sign out'}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-[#b08d2b] px-3 py-2 text-black font-semibold hover:bg-[#d4af37] transition"
            >
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* shimmer on hover */}
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          a.group:hover {
            transform: translateZ(0) scale(1.02);
            transition: transform .25s cubic-bezier(.2,8,2,1);
          }
        }
        .brand-gold-text {
          background: linear-gradient(
            100deg,
            #8f6b29 0%,
            #e6c46d 20%,
            #f7e7a1 40%,
            #cf9f44 60%,
            #e6c46d 80%,
            #8f6b29 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 2px 8px rgba(0,0,0,0.35);
          background-size: 220% auto;
          animation: brand-shimmer 7s linear infinite;
          animation-play-state: paused;
        }
        a.group:hover .brand-gold-text { animation-play-state: running; }

        @keyframes brand-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 220% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          a.group:hover { transform: none !important; }
          .brand-gold-text { animation: none !important; }
        }
      `}</style>
    </header>
  );
}
