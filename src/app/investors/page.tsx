"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import type { ReactNode } from "react";

/** Inline system icons (strokes follow currentColor) */
const Icon = {
  Pickaxe: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="M3 8.5C6.5 6 10 5.5 13.5 7M21 8.5C17.5 6 14 5.5 10.5 7M12 7v13" />
      <path strokeWidth="1.5" d="m12 13 7 7" />
    </svg>
  ),
  File: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5Z" />
      <path strokeWidth="1.5" d="M14 2v5h5" />
    </svg>
  ),
  Check: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="m5 13 4 4L19 7" />
    </svg>
  ),
  Factory: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="M3 21V9l6 4V9l6 4V9l6 4v8H3Z" />
      <path strokeWidth="1.5" d="M7 21v-3M11 21v-3M15 21v-3M19 21v-3" />
    </svg>
  ),
  Calendar: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5" />
      <path strokeWidth="1.5" d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  MapPin: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="M19.5 10.5c0 5.25-7.5 11.25-7.5 11.25S4.5 15.75 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      <circle cx="12" cy="10.5" r="2.25" strokeWidth="1.5" />
    </svg>
  ),
  Coin: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <ellipse cx="12" cy="7" rx="8" ry="4" strokeWidth="1.5" />
      <path strokeWidth="1.5" d="M4 7v10c0 2.2 3.6 4 8 4s8-1.8 8-4V7" />
    </svg>
  ),
  Shield: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="M12 3.25 4.5 6v6.5c0 4.5 3.5 6.75 7.5 8.25 4-1.5 7.5-3.75 7.5-8.25V6L12 3.25Z" />
      <path strokeWidth="1.5" d="m8.75 12 2.25 2.25 4.25-4.25" />
    </svg>
  ),
  Users: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="9" cy="8" r="3" strokeWidth="1.5" />
      <path strokeWidth="1.5" d="M15 10a3 3 0 1 0 0-6" />
      <path strokeWidth="1.5" d="M3.75 19.5a5.25 5.25 0 0 1 10.5 0M14.25 19.5a5.25 5.25 0 0 1 6 0" />
    </svg>
  ),
  ArrowRight: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="M4 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Mail: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" ry="2" strokeWidth="1.5" />
      <path strokeWidth="1.5" d="m3 7 9 6 9-6" />
    </svg>
  ),
};

type Stat = { label: string; value: string; sublabel?: string; icon?: ReactNode };

const gold = { color: "var(--go-gold,#caa132)" } as const;

/** Key investment snapshot */
const SNAPSHOT: Stat[] = [
  { label: "District", value: "Benoni South, Gauteng", icon: <Icon.MapPin className="h-5 w-5" /> },
  { label: "Development Path", value: "Opencast → Underground", icon: <Icon.Pickaxe className="h-5 w-5" /> },
  { label: "Prospecting Right", value: "GP10448 PR", sublabel: "Valid to Oct 2025; extendable +3 yrs", icon: <Icon.Shield className="h-5 w-5" /> },
  { label: "Target First Production", value: "2026", icon: <Icon.Calendar className="h-5 w-5" /> },
  { label: "Combined LoM", value: "≈10 years", icon: <Icon.Calendar className="h-5 w-5" /> },
  { label: "Gold (Combined LoM)", value: "≈3,038 kg", icon: <Icon.Coin className="h-5 w-5" /> },
  { label: "Offtake/Processing", value: "Goldplat PLC (MOU)", sublabel: "Toll treatment ~8 km", icon: <Icon.Factory className="h-5 w-5" /> },
  { label: "Planned Jobs", value: "600–800+", sublabel: "During sustained operations", icon: <Icon.Users className="h-5 w-5" /> },
];

export default function InvestorsPage() {
  const r = useReducedMotion();

  return (
    <main id="main" className="relative">
      {/* HERO */}
      <section aria-labelledby="inv-hero" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,#a17838_12%,transparent_60%)] opacity-10" />
        <Section className="pt-20 pb-10 md:pt-28 md:pb-16">
          <motion.div
            initial={r ? false : { opacity: 0, y: 18 }}
            whileInView={r ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3">
              <Icon.Pickaxe aria-hidden className="h-6 w-6" style={gold} />
              <p className="text-sm uppercase tracking-[0.18em] text-text-muted">Investors</p>
            </div>

            <h1 id="inv-hero" className="mt-3 font-display text-4xl md:text-6xl lg:text-7xl">
              <span className="text-gold-shimmer">Investors</span>
            </h1>

            <p className="mt-4 max-w-2xl text-text-muted">
              Financial reports, presentations, and regulatory disclosures for the Gold Ore portfolio in Benoni South,
              South Africa.
            </p>
          </motion.div>

          {/* Snapshot */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SNAPSHOT.map((s) => (
              <motion.article
                key={s.label}
                initial={r ? false : { opacity: 0, y: 10 }}
                whileInView={r ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-surface-3/50 bg-surface-2/40 p-5"
              >
                <div className="flex items-center gap-3">
                  <span style={gold}>{s.icon}</span>
                  <span className="text-sm text-text-muted">{s.label}</span>
                </div>
                <div className="mt-3 font-display text-2xl">{s.value}</div>
                {s.sublabel && <div className="mt-1 text-sm text-text-muted/80">{s.sublabel}</div>}
              </motion.article>
            ))}
          </div>
        </Section>
      </section>

      {/* INVESTMENT CASE */}
      <Section className="py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl md:text-4xl">Investment Case</h2>
            <ul className="mt-4 grid gap-3 text-sm text-text-secondary">
              <li className="flex items-start gap-3">
                <Icon.Pickaxe className="mt-0.5 h-5 w-5" style={gold} />
                Near-surface <strong>opencast ounces</strong> in New Kleinfontein enable early, capital-light cash flow while{" "}
                <strong>Turnbridge underground</strong> supports long-life production.
              </li>
              <li className="flex items-start gap-3">
                <Icon.Factory className="mt-0.5 h-5 w-5" style={gold} />
                <strong>Goldplat PLC MOU</strong> provides toll treatment close to site (~8 km), lowering logistics and capex burden.
              </li>
              <li className="flex items-start gap-3">
                <Icon.Shield className="mt-0.5 h-5 w-5" style={gold} />
                <strong>Compliance-first</strong> development: valid PR (GP10448), approved BARs for permits, and a rehabilitation-led
                surface safety programme.
              </li>
              <li className="flex items-start gap-3">
                <Icon.Users className="mt-0.5 h-5 w-5" style={gold} />
                <strong>Local jobs & value</strong>: planned <strong>600–800+</strong> roles at steady state, supplier inclusion, and transparent ESG reporting.
              </li>
            </ul>
          </div>

          {/* Timeline / Milestones */}
          <div className="rounded-3xl border border-surface-3/50 bg-surface-2/40 p-6">
            <h3 className="font-semibold">Milestones</h3>
            <ol className="mt-3 space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-text-muted">Prospecting Right & baseline studies</span>
                <span className="rounded-full border border-surface-3/50 px-2 py-0.5">Complete</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-text-muted">Mining permits (NK) via BAR process</span>
                <span className="rounded-full border border-surface-3/50 px-2 py-0.5">Approved</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-text-muted">Processing route (Goldplat MOU)</span>
                <span className="rounded-full border border-surface-3/50 px-2 py-0.5">In place</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-text-muted">Start of production</span>
                <span className="rounded-full border border-surface-3/50 px-2 py-0.5">2026 (target)</span>
              </li>
            </ol>
          </div>
        </div>
      </Section>

      {/* GOVERNANCE */}
      <Section className="py-12 md:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl md:text-4xl">Governance & Compliance</h2>
            <ul className="mt-4 grid gap-3 text-sm text-text-secondary">
              <li className="flex items-start gap-3">
                <Icon.Shield className="mt-0.5 h-5 w-5" style={gold} />
                Compliance with South African mining, water and environmental legislation, with transparent reporting.
              </li>
              <li className="flex items-start gap-3">
                <Icon.File className="mt-0.5 h-5 w-5" style={gold} />
                Environmental approvals via Basic Assessment Reports for Mining Permits; PR GP10448 in good standing.
              </li>
              <li className="flex items-start gap-3">
                <Icon.Factory className="mt-0.5 h-5 w-5" style={gold} />
                Processing partner maintains relevant water/waste licences; haulage distance kept short (~8 km).
              </li>
            </ul>
          </div>

          {/* IR Contact */}
          <div className="rounded-3xl border border-surface-3/50 bg-surface-2/40 p-6">
            <h3 className="font-semibold">Investor Relations</h3>
            <p className="mt-2 text-sm text-text-muted">
              For access to detailed data rooms, site visits, and Q&amp;A sessions, contact our IR team.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm"
              style={{ borderColor: "var(--go-gold,#caa132)", color: "var(--go-gold,#caa132)" }}
            >
              <Icon.Mail className="h-4 w-4" />
              Contact IR
            </a>
          </div>
        </div>
      </Section>

      {/* Title shimmer (scoped) */}
      <style jsx>{`
        .text-gold-shimmer {
          background: linear-gradient(100deg,#8f6b29 0%,#e6c46d 20%,#f7e7a1 40%,#cf9f44 60%,#e6c46d 80%,#8f6b29 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          text-shadow: 0 2px 10px rgba(0,0,0,.35);
          background-size: 200% auto; animation: shimmer 4.5s linear infinite;
        }
        @keyframes shimmer { 0% { background-position: 0% center } 100% { background-position: 200% center } }
        @media (prefers-reduced-motion: reduce) { .text-gold-shimmer { animation: none; } }
      `}</style>
    </main>
  );
}
