'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function FooterGoldOre() {
  const year = new Date().getFullYear();

  return (
    <footer data-footer="goldore" className="border-t border-white/10 bg-[#0F1215] text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Three columns, hard top-aligned */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3" style={{ alignItems: 'flex-start' }}>
          {/* Brand column */}
          <div className="brand">
            <Link href="/" className="inline-flex">
              <Image
                src="/brand/logo-goldore.svg"   // ensure this file exists in /public/brand/
                width={900}
                height={220}
                alt="Gold Ore"
                className="block h-[220px] w-auto"
                priority={false}
              />
            </Link>
            <p className="text-sm text-white/70 leading-tight">Sandton, Gauteng, South Africa</p>
          </div>

          {/* Company */}
          <nav aria-label="Company">
            <h3 className="text-sm font-semibold text-white/90">Company</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link className="transition-colors hover:text-amber-400" href="/about">About</Link></li>
              <li><Link className="transition-colors hover:text-amber-400" href="/operations">Operations</Link></li>
              <li><Link className="transition-colors hover:text-amber-400" href="/esg">ESG</Link></li>
            </ul>
          </nav>

          {/* Investors */}
          <nav aria-label="Investors">
            <h3 className="text-sm font-semibold text-white/90">Investors</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link className="transition-colors hover:text-amber-400" href="/investors">Overview</Link></li>
              <li><Link className="transition-colors hover:text-amber-400" href="/news">News</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-right text-xs text-white/50">
          © {year} Gold Ore. All rights reserved.
        </div>
      </div>

      {/* Scoped, can't-be-overridden footer fixes */}
      <style jsx>{`
        [data-footer="goldore"] .brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;            /* tight space between logo and address */
          margin: 0;           /* kill any global margins */
        }
        [data-footer="goldore"] .brand :global(img) {
          display: block;      /* remove baseline gap under images */
        }
        [data-footer="goldore"] .brand p {
          margin: 8px 0 0 0;   /* address directly under the logo */
          line-height: 1.25;
        }
        /* Even if a typography plugin adds margins, the attribute selector wins */
        [data-footer="goldore"] :global(.prose),
        [data-footer="goldore"] :global(.prose *){
          margin: 0;
          line-height: inherit;
        }
      `}</style>
    </footer>
  );
}
