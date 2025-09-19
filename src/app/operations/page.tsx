"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import type { ReactNode } from "react";

/** Minimal, inline icons (strokes follow currentColor) */
const Icon = {
  Pickaxe: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M3 8.5C6.5 6 10 5.5 13.5 7M21 8.5C17.5 6 14 5.5 10.5 7M12 7v13" />
      <path strokeWidth="1.5" d="m12 13 7 7" />
    </svg>
  ),
  MapPin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M19.5 10.5c0 5.25-7.5 11.25-7.5 11.25S4.5 15.75 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      <circle cx="12" cy="10.5" r="2.25" strokeWidth="1.5" />
    </svg>
  ),
  Factory: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M3 21V9l6 4V9l6 4V9l6 4v8H3Z" />
      <path strokeWidth="1.5" d="M7 21v-3M11 21v-3M15 21v-3M19 21v-3" />
    </svg>
  ),
  Calendar: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5" />
      <path strokeWidth="1.5" d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  Coin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <ellipse cx="12" cy="7" rx="8" ry="4" strokeWidth="1.5" />
      <path strokeWidth="1.5" d="M4 7v10c0 2.2 3.6 4 8 4s8-1.8 8-4V7" />
    </svg>
  ),
  ShieldCheck: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M12 3.25 4.5 6v6.5c0 4.5 3.5 6.75 7.5 8.25 4-1.5 7.5-3.75 7.5-8.25V6L12 3.25Z" />
      <path strokeWidth="1.5" d="m8.75 12 2.25 2.25 4.25-4.25" />
    </svg>
  ),
  ArrowRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M4 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};

type Stat = { label: string; value: string; sublabel?: string; icon?: ReactNode };
type Asset = {
  key: "NK" | "TB";
  name: string;
  type: "Opencast" | "Underground";
  highlights: Stat[];
  blurb: string;
};

const OVERVIEW: Stat[] = [
  { label: "District", value: "Benoni South, Gauteng", icon: <Icon.MapPin className="h-5 w-5" /> },
  { label: "Sections", value: "Turnbridge (UG) • New Kleinfontein (OC)", icon: <Icon.Pickaxe className="h-5 w-5" /> },
  { label: "Prospecting Right", value: "GP10448 PR", sublabel: "Valid to Oct 2025 • extendable +3 yrs", icon: <Icon.ShieldCheck className="h-5 w-5" /> },
  { label: "Target First Production", value: "2026", icon: <Icon.Calendar className="h-5 w-5" /> },
  { label: "Combined LOM", value: "≈10 years", icon: <Icon.Calendar className="h-5 w-5" /> },
  { label: "Combined Gold (LoM)", value: "≈3,038 kg", icon: <Icon.Coin className="h-5 w-5" /> },
  { label: "Offtake / Processing", value: "Goldplat PLC (MOU)", sublabel: "Toll treatment ~8 km", icon: <Icon.Factory className="h-5 w-5" /> },
];

const ASSETS: Asset[] = [
  {
    key: "NK",
    name: "New Kleinfontein",
    type: "Opencast",
    blurb:
      "Four shallow mining permits along ~1.5 km strike (max ~10 m deep). Rapid, low-capex free-dig pits enable early ounces and concurrent rehabilitation.",
    highlights: [
      { label: "Life-of-Mine", value: "2 years" },
      { label: "Gold (LoM)", value: "≈430 kg" },
      { label: "Tonnage", value: "≈161 kt @ 2.68 g/t" },
      { label: "NPV (illustrative)", value: "R97m @ 20%" },
    ],
  },
  {
    key: "TB",
    name: "Turnbridge",
    type: "Underground",
    blurb:
      "Conventional underground access to ~240 m depth over ~2 km strike. Initial plan supports a disciplined ramp-up and strong free cash conversion.",
    highlights: [
      { label: "Life-of-Mine", value: "≥8 years" },
      { label: "Gold (initial)", value: "≈2,700 kg" },
      { label: "Tonnage", value: "≈1.25 Mt @ ~2.1–2.5 g/t" },
      { label: "NPV (illustrative)", value: "$50m @ 15%" },
    ],
  },
];

export default function OperationsPage() {
  const r = useReducedMotion();

  return (
    <main id="main" className="relative">
      {/* HERO */}
      <section aria-labelledby="ops-hero" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,#a17838_12%,transparent_60%)] opacity-10" />
        <Section className="pt-20 pb-10 md:pt-28 md:pb-16">
          <motion.div
            initial={r ? false : { opacity: 0, y: 18 }}
            whileInView={r ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Reverted to original muted color */}
            <div className="flex items-center gap-3">
              <Icon.Pickaxe aria-hidden className="h-6 w-6 text-text-muted" />
              <p className="text-sm uppercase tracking-[0.18em] text-text-muted">Assets</p>
            </div>

            <h1 id="ops-hero" className="mt-3 font-display text-4xl md:text-6xl lg:text-7xl">
              <span className="text-gold-shimmer">Operations</span>
            </h1>
            <p className="mt-4 max-w-2xl text-text-muted">
              Benoni South is our flagship district, comprising the Turnbridge underground section and the New
              Kleinfontein opencast permits. This page summarises location, throughput and development roadmap.
            </p>
          </motion.div>

          {/* Overview stats */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OVERVIEW.map((s) => (
              <motion.div
                key={s.label}
                initial={r ? false : { opacity: 0, y: 10 }}
                whileInView={r ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-surface-3/50 bg-surface-2/40 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-surface-2/30"
              >
                <div className="flex items-center gap-3">
                  <span style={{ color: "var(--go-gold,#caa132)" }}>{s.icon}</span>
                  <span className="text-sm text-text-muted">{s.label}</span>
                </div>
                <div className="mt-3 font-display text-2xl">{s.value}</div>
                {s.sublabel && <div className="mt-1 text-sm text-text-muted/80">{s.sublabel}</div>}
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ASSETS */}
      <Section className="py-12 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-4xl">Assets</h2>
            <p className="mt-2 max-w-3xl text-text-muted">
              Two complimentary ore sources enable staged ramp-up: early, shallow ounces at New Kleinfontein, followed by
              sustained underground production at Turnbridge.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {ASSETS.map((asset) => (
            <article
              key={asset.key}
              className="group rounded-3xl border border-surface-3/50 bg-surface-2/40 p-6 transition hover:border-[var(--go-gold,#caa132)]/50"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-xl md:text-2xl">
                  {asset.name} <span className="text-text-muted font-sans text-base">• {asset.type}</span>
                </h3>
                <span
                  className="rounded-full border border-[var(--go-gold,#caa132)] px-3 py-1 text-xs"
                  style={{ color: "var(--go-gold,#caa132)" }}
                >
                  {asset.key}
                </span>
              </div>
              <p className="mt-3 text-sm text-text-secondary">{asset.blurb}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {asset.highlights.map((h) => (
                  <div key={h.label} className="rounded-xl border border-surface-3/50 p-4">
                    <div className="text-xs text-text-muted">{h.label}</div>
                    <div className="mt-1 font-display text-xl">{h.value}</div>
                    {h.sublabel && <div className="text-xs text-text-muted/80">{h.sublabel}</div>}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* PROCESSING & LOGISTICS */}
      <Section className="py-12 md:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl md:text-4xl">Processing & Logistics</h2>
            <ul className="mt-4 grid gap-3">
              <li className="flex items-start gap-3">
                <Icon.Factory className="mt-0.5 h-5 w-5" style={{ color: "var(--go-gold,#caa132)" }} />
                <span className="text-sm text-text-secondary">
                  Toll treatment via Goldplat PLC (MOU) with haulage of ore by road — approximately 8 km to plant.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Icon.Pickaxe className="mt-0.5 h-5 w-5" style={{ color: "var(--go-gold,#caa132)" }} />
                <span className="text-sm text-text-secondary">
                  Mobile surface infrastructure for permits; disciplined underground capital for Turnbridge.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Icon.Calendar className="mt-0.5 h-5 w-5" style={{ color: "var(--go-gold,#caa132)" }} />
                <span className="text-sm text-text-secondary">
                  Target first production in 2026, with staged ramp-up from opencast into underground.
                </span>
              </li>
            </ul>
          </div>

          {/* Simple milestone track */}
          <div className="rounded-3xl border border-surface-3/50 bg-surface-2/40 p-6">
            <h3 className="font-semibold">Milestones</h3>
            <ol className="mt-3 space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-text-muted">Prospecting Right</span>
                <span className="rounded-full border border-surface-3/50 px-2 py-0.5">GP10448 PR</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-text-muted">NK Mining Permits</span>
                <span className="rounded-full border border-surface-3/50 px-2 py-0.5">4 permits</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-text-muted">Turnbridge MWP & access</span>
                <span className="rounded-full border border-surface-3/50 px-2 py-0.5">Scoping complete</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-text-muted">Start of Production</span>
                <span className="rounded-full border border-surface-3/50 px-2 py-0.5">2026</span>
              </li>
            </ol>
          </div>
        </div>
      </Section>

      {/* ESG & REHABILITATION */}
      <Section className="py-12 md:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl md:text-4xl">Rehabilitation-Led Operations</h2>
            <p className="mt-3 text-text-secondary">
              Shallow permit areas double as engineered plugs for historic access points. Progressive backfill, compaction,
              topsoil replacement and re-seeding limit illegal access and restore the landscape while generating early
              ounces for the ramp-up.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              "Minimum 5–6 m trenching at historic openings (expose → secure → backfill).",
              "Concurrent rehab reduces community risk near schools, roads, rail and services.",
              "Formal underground access under a controlled plan at Turnbridge.",
            ].map((t) => (
              <div key={t} className="rounded-xl border border-surface-3/50 p-4 text-sm text-text-muted">
                {t}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-surface-3/50 bg-surface-2/30 p-5 text-xs leading-relaxed text-text-muted">
          Notes: figures are indicative project study outcomes and subject to further engineering, permitting and market
          conditions. Numbers are shown at study discount rates and prevailing FX/commodity assumptions at time of
          analysis.
        </div>
      </Section>

      {/* Scoped shimmer for title */}
      <style jsx>{`
        .text-gold-shimmer {
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
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
          background-size: 200% auto;
          animation: shimmer 4.5s linear infinite;
        }
        @keyframes shimmer { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
        @media (prefers-reduced-motion: reduce) { .text-gold-shimmer { animation: none; } }
      `}</style>
    </main>
  );
}
