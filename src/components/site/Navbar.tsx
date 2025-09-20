'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import type { Route } from 'next'; // typedRoutes support
import GoldWordmark from '@/components/ui/GoldWordmark';

type NavItem = {
  label: string;
  href: Route; // require a real route path
};

/** Keep hrefs as string literals so they satisfy `Route`. */
const NAV_ITEMS: readonly NavItem[] = [
  { label: 'About',      href: '/about' },
  { label: 'Operations', href: '/operations' },
  { label: 'ESG',        href: '/esg' },
  { label: 'Investors',  href: '/investors' },
  { label: 'News',       href: '/news' },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  // Theme handling
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Use the emblem you've been using across pages
  const logoSrc = '/brand/Logo Only_Transparent.png'; // ensure exists at /public/brand/...

  return (
    <header className="sticky top-0 z-40 border-b border-[hsl(var(--border-subtle))] bg-[hsl(var(--surface)/0.8)] backdrop-blur-xs">
      <div className="container flex items-center justify-between py-3">
        {/* Brand lockup with animated ring + shimmer (honors reduced motion) */}
        <Link
          href="/"
          className="group relative inline-flex items-center gap-3 rounded-xl px-2 py-1 will-change-transform"
          aria-label="Gold Ore – Home"
        >
          {/* Emblem with animated conic gold ring */}
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-black/30 ring-1 ring-white/10 backdrop-blur brand-ring">
            {imgOk ? (
              <Image
                src={logoSrc}
                alt=""
                width={28}
                height={28}
                priority
                onError={() => setImgOk(false)}
                className="pointer-events-none select-none h-7 w-7 object-contain"
              />
            ) : null}
          </span>

          {/* Wordmark with gold shimmer; fall back if emblem missing */}
          <span className="leading-none">
            {imgOk ? (
              <span className="brand-gold-text font-display text-xl tracking-[0.22em] md:text-2xl">
                GOLD ORE
              </span>
            ) : (
              <GoldWordmark
                text="GOLD ORE"
                animated={false}
                className="brand-gold-text text-xl md:text-2xl uppercase tracking-[0.22em]"
              />
            )}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            className="hidden md:inline-flex focus-ring rounded-xl px-3 py-2 text-sm"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <span aria-hidden="true">{mounted ? (resolvedTheme === 'dark' ? '☀️' : '🌙') : ''}</span>
          </button>

          <button
            className="md:hidden focus-ring rounded-xl px-3 py-2"
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label="Toggle navigation"
          >
            Menu
          </button>
        </div>

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
        </nav>
      </div>

      {/* Scoped styles for shimmer + ring + micro-tilt; reduced motion safe */}
      <style jsx>{`
        /* Subtle micro-tilt/scale on the whole brand when hovering */
        @media (prefers-reduced-motion: no-preference) {
          a.group:hover { transform: translateZ(0) scale(1.02); transition: transform .25s cubic-bezier(.2,.8,.2,1); }
        }

        /* ---- Gold shimmer text ---- */
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
          animation-play-state: paused; /* idle until hover */
        }
        a.group:hover .brand-gold-text { animation-play-state: running; }

        @keyframes brand-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 220% center; }
        }

        /* ---- Animated ring behind emblem ---- */
        .brand-ring::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          background:
            conic-gradient(
              from 0deg,
              rgba(255,215,128,0.0) 0%,
              rgba(255,215,128,0.35) 15%,
              rgba(255,215,128,0.0) 30%,
              rgba(202,161,50,0.25) 45%,
              rgba(255,215,128,0.0) 60%,
              rgba(255,215,128,0.18) 75%,
              rgba(255,215,128,0.0) 100%
            );
          filter: blur(.5px);
          z-index: -1;
          animation: brand-rotate 8s linear infinite;
          animation-play-state: paused; /* idle until hover */
        }
        a.group:hover .brand-ring::before { animation-play-state: running; }

        @keyframes brand-rotate { to { transform: rotate(360deg); } }

        /* Reduced motion: disable animations */
        @media (prefers-reduced-motion: reduce) {
          a.group:hover { transform: none !important; }
          .brand-gold-text { animation: none !important; }
          .brand-ring::before { animation: none !important; }
        }
      `}</style>
    </header>
  );
}
