'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function FooterGoldOre() {
  const year = new Date().getFullYear();

  return (
    <footer data-footer="goldore" className="border-t border-white/10 bg-[#0F1215] text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Hard top-aligned columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3" style={{ alignItems: 'flex-start' }}>
          {/* Brand column */}
          <div className="brand flex flex-col items-start gap-2 m-0">
            <Link href="/" className="inline-flex">
              {/* The negative margin removes the PNG's internal top padding so the artwork aligns to column tops */}
              <Image
                src="/brand/logo-goldore.png"   // ensure this exists under /public/brand/
                width={900}
                height={220}
                alt="Gold Ore"
                className="block h-[220px] w-auto -mt-8 md:-mt-10 lg:-mt-12"
                priority={false}
              />
            </Link>
            <p className="m-0 text-sm text-white/70 leading-tight">
              Sandton, Gauteng, South Africa
            </p>
          </div>

          {/* Company */}
          <nav aria-label="Company">
            <h3 className="text-sm font-semibold text-white/90">Company</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/about" className="transition-colors hover:text-amber-400">About</Link></li>
              <li><Link href="/operations" className="transition-colors hover:text-amber-400">Operations</Link></li>
              <li><Link href="/esg" className="transition-colors hover:text-amber-400">ESG</Link></li>
            </ul>
          </nav>

          {/* Investors */}
          <nav aria-label="Investors">
            <h3 className="text-sm font-semibold text-white/90">Investors</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/investors" className="transition-colors hover:text-amber-400">Overview</Link></li>
              <li><Link href="/news" className="transition-colors hover:text-amber-400">News</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-right text-xs text-white/50">
          © {year} Gold Ore. All rights reserved.
        </div>
      </div>

      {/* Scoped guards to keep spacing tight regardless of global styles */}
      <style jsx>{`
        [data-footer="goldore"] .brand :global(img) { display: block; }
        [data-footer="goldore"] .brand p { margin-top: 8px; }
      `}</style>
    </footer>
  );
}
