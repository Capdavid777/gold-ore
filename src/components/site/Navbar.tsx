'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import GoldWordmark from '@/components/ui/GoldWordmark';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  // Theme handling
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const logoSrc = '/brand/logo.svg'; // ensure file exists at /public/brand/logo.svg

  return (
    <header className="sticky top-0 z-40 bg-[hsl(var(--surface)/0.8)] backdrop-blur-xs border-b border-[hsl(var(--border-subtle))]">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3" aria-label="Gold Ore – Home">
          {imgOk ? (
            <Image
              src={logoSrc}
              alt="Gold Ore"
              width={140}
              height={28}
              priority
              onError={() => setImgOk(false)}
              className="h-[28px] w-auto"
            />
          ) : (
            <GoldWordmark text="GOLD ORE" animated={false} className="text-2xl uppercase tracking-wide" />
          )}
        </Link>

        <div className="flex items-center gap-2">
          <button
            className="hidden md:inline-flex focus-ring rounded-xl px-3 py-2 text-sm"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {/* Render nothing until mounted so SSR and first client render match */}
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
          className={`md:flex items-center gap-8 ${open ? 'block' : 'hidden'} md:block`}
        >
          {[
            ['About', '/about'],
            ['Operations', '/operations'],
            ['ESG', '/esg'],
            ['Investors', '/investors'],
            ['News', '/news'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block py-2 md:py-0 text-[hsl(var(--text))] hover:text-brand-gold-400"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
