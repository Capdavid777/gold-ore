'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function FooterGoldOre() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-footer="goldore"
      className="border-t border-white/10 bg-[#0F1215] text-white/80"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Three-column layout on md+, stacked on mobile.
            Left = Company, Center = Logo, Right = Investors */}
        <div
          className="grid grid-cols-1 gap-10 md:grid-cols-3"
          style={{ alignItems: 'flex-start' }}
        >
          {/* LEFT: Company */}
          <nav aria-label="Company" className="justify-self-start text-left">
            <h3 className="text-sm font-semibold text-white/90">Company</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="transition-opacity hover:opacity-90"
                  style={{ color: 'var(--go-gold, #caa132)' }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/operations"
                  className="transition-opacity hover:opacity-90"
                  style={{ color: 'var(--go-gold, #caa132)' }}
                >
                  Operations
                </Link>
              </li>
              <li>
                <Link
                  href="/esg"
                  className="transition-opacity hover:opacity-90"
                  style={{ color: 'var(--go-gold, #caa132)' }}
                >
                  ESG
                </Link>
              </li>
            </ul>
          </nav>

          {/* CENTER: Brand / Logo */}
          <div className="brand m-0 flex flex-col items-center gap-2 justify-self-center text-center">
            <Link href="/" className="inline-flex">
              {/* Negative margin trims internal top padding from the artwork */}
              <Image
                src="/brand/logo-goldore.svg" // ensure this exists under /public/brand/
                width={900}
                height={220}
                alt="Gold Ore"
                className="block h-[220px] w-auto -mt-8 md:-mt-10 lg:-mt-12 select-none"
                priority={false}
              />
            </Link>
            <p className="m-0 text-sm leading-tight text-white/70">
              Sandton, Gauteng, South Africa
            </p>
          </div>

          {/* RIGHT: Investors */}
          <nav
            aria-label="Investors"
            className="justify-self-start text-left md:justify-self-end md:text-right"
          >
            <h3 className="text-sm font-semibold text-white/90">Investors</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="md:flex md:justify-end">
                <Link
                  href="/investors"
                  className="transition-opacity hover:opacity-90"
                  style={{ color: 'var(--go-gold, #caa132)' }}
                >
                  Overview
                </Link>
              </li>
              <li className="md:flex md:justify-end">
                <Link
                  href="/news"
                  className="transition-opacity hover:opacity-90"
                  style={{ color: 'var(--go-gold, #caa132)' }}
                >
                  News
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Divider & legal */}
        <div className="mt-10 border-t border-white/10 pt-6 text-right text-xs text-white/50">
          © {year} Gold Ore. All rights reserved.
        </div>
      </div>

      {/* Scoped guards to keep spacing tight regardless of global styles */}
      <style jsx>{`
        [data-footer='goldore'] .brand :global(img) {
          display: block;
        }
        [data-footer='goldore'] .brand p {
          margin-top: 8px;
        }
      `}</style>
    </footer>
  );
}
