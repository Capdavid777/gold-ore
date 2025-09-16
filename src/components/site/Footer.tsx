'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="border-t border-white/10 bg-[#0F1215] text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* All columns top-aligned */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 items-start">
          {/* BRAND COLUMN */}
          <div className="md:col-span-1">
            {/* A tight, explicit vertical stack that ignores any prose/global margins */}
            <div className="brand-stack not-prose flex flex-col items-start gap-2">
              <Link href="/" className="inline-flex">
                {/* Keep your 5× logo size. "block" removes baseline gap */}
                <Image
                  src="/brand/logo-goldore.svg"
                  width={900}
                  height={220}
                  alt="Gold Ore"
                  className="block h-[220px] w-auto"
                  priority={false}
                />
              </Link>
              <p className="m-0 leading-tight text-sm text-white/70">
                Sandton, Gauteng, South Africa
              </p>
            </div>
          </div>

          {/* COMPANY */}
          <nav aria-label="Company" className="md:col-span-1">
            <h3 className="text-sm font-semibold text-white/90">Company</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link className="hover:text-amber-400 transition-colors" href="/about">About</Link></li>
              <li><Link className="hover:text-amber-400 transition-colors" href="/operations">Operations</Link></li>
              <li><Link className="hover:text-amber-400 transition-colors" href="/esg">ESG</Link></li>
            </ul>
          </nav>

          {/* INVESTORS */}
          <nav aria-label="Investors" className="md:col-span-1">
            <h3 className="text-sm font-semibold text-white/90">Investors</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link className="hover:text-amber-400 transition-colors" href="/investors">Overview</Link></li>
              <li><Link className="hover:text-amber-400 transition-colors" href="/news">News</Link></li>
            </ul>
          </nav>

          {/* Spacer for balance */}
          <div className="md:col-span-1" />
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-right text-xs text-white/50">
          © {year} Gold Ore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
