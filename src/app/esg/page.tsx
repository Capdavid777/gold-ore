"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import type { ReactNode } from "react";

/** Inline icons (no extra deps) */
const Icon = {
  Leaf: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="M3 12c0 5 4 9 9 9 5 0 9-4 9-9-6-2-11-2-18 0Z" />
      <path strokeWidth="1.5" d="M12 21c0-6 0-9 9-9" />
    </svg>
  ),
  Water: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="M12 3s6 6 6 10a6 6 0 1 1-12 0c0-4 6-10 6-10Z" />
    </svg>
  ),
  Users: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="9" cy="8" r="3" strokeWidth="1.5" />
      <path strokeWidth="1.5" d="M15 10a3 3 0 1 0 0-6" />
      <path strokeWidth="1.5" d="M3.75 19.5a5.25 5.25 0 0 1 10.5 0M14.25 19.5a5.25 5.25 0 0 1 6 0" />
    </svg>
  ),
  Shield: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="M12 3.25 4.5 6v6.5c0 4.5 3.5 6.75 7.5 8.25 4-1.5 7.5-3.75 7.5-8.25V6L12 3.25Z" />
      <path strokeWidth="1.5" d="m8.75 12 2.25 2.25 4.25-4.25" />
    </svg>
  ),
  CheckDoc: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5Z" />
      <path strokeWidth="1.5" d="M14 2v5h5M9 14l2 2 4-4" />
    </svg>
  ),
  Pickaxe: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="M3 8.5C6.5 6 10 5.5 13.5 7M21 8.5C17.5 6 14 5.5 10.5 7M12 7v13" />
      <path strokeWidth="1.5" d="m12 13 7 7" />
    </svg>
  ),
  ArrowRight: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="M4 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};

type Pillar = { icon: ReactNode; title: string; body: string; bullets?: string[] };
type Stat = { label: string; value: string; sub?: string };

const PILLARS: Pillar[] = [
  {
    icon: <Icon.Shield className="h-6 w-6" />,
    title: "Safety & Risk",
    body:
      "Zero-harm design is non-negotiable. We engineer out risk and secure legacy workings while ramping production.",
    bullets: [
      "Formal access control & monitoring at historic shafts.",
      "Design-led hazard elimination across pits and declines.",
    ],
  },
  {
    icon: <Icon.Leaf className="h-6 w-6" />,
    title: "Environment & Biodiversity",
    body:
      "Concurrent rehabilitation restores surface integrity and indigenous vegetation while shallow ounces are mined responsibly.",
    bullets: ["Topsoil preservation and re-seeding", "Dust/noise mitigation and progressive closure"],
  },
  {
    icon: <Icon.Water className="h-6 w-6" />,
    title: "Water & Waste",
    body:
      "Prospecting-phase baseline completed. Mining Permits use Basic Assessment Reports; water/waste licensing sits with the offtake processor.",
    bullets: ["Closed-loop housekeeping at permits", "Haulage to toll treatment ~8 km"],
  },
  {
    icon: <Icon.Users className="h-6 w-6" />,
    title: "Social & Local Value",
    body:
      "Local jobs, skills uplift and supplier inclusion—paired with actions that directly improve surface safety in nearby communities.",
    bullets: ["Local employment and procurement", "Stakeholder engagement and SLP planning"],
  },
];

const COMPLIANCE: Stat[] = [
  { label: "Prospecting Right (PR)", value: "GP10448 PR", sub: "Valid to Oct 2025; extendable +3 years" },
  { label: "Environmental Authorisations", value: "Approved", sub: "BARs for permits; compliance maintained" },
  { label: "Offtake / Processor", value: "Goldplat PLC (MOU)", sub: "Toll treatment ~8 km; licences at processor" },
  { label: "Start of Production (target)", value: "2026", sub: "Staged ramp-up" },
];

export default function ESGPage() {
  const r = useReducedMotion();

  return (
    <main id="main" className="relative">
      {/* HERO */}
      <section aria-labelledby="esg-hero" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,#a17838_12%,transparent_60%)] opacity-10" />
        <Section className="pt-20 pb-10 md:pt-28 md:pb-16">
          <motion.div
            initial={r ? false : { opacity: 0, y: 18 }}
            whileInView={r ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3">
              <Icon.Pickaxe aria-hidden className="h-6 w-6 text-accent-gold" />
              <p className="text-sm uppercase tracking-[0.18em] text-text-muted">ESG & Sustainability</p>
            </div>
            <h1 id="esg-hero" className="mt-3 font-display text-4xl md:text-6xl lg:text-7xl">
              <span className="text-gold-shimmer">ESG & Sustainability</span>
            </h1>
            <p className="mt-4 max-w-2xl text-text-muted">
              Our approach is practical and measurable: secure legacy workings, protect water and biodiversity, grow
              local prosperity, and maintain transparent governance.
            </p>
          </motion.div>
        </Section>
      </section>

      {/* PILLARS */}
      <Section className="py-12 md:py-20">
        <h2 className="font-display text-2xl md:text-4xl">Our Pillars</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PILLARS.map((p) => (
            <motion.article
              key={p.title}
              initial={r ? false : { opacity: 0, y: 10 }}
              whileInView={r ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group rounded-3xl border border-surface-3/50 bg-surface-2/40 p-6 hover:border-accent-gold/50"
            >
              <div className="flex items-center gap-3">
                <span className="text-accent-gold">{p.icon}</span>
                <h3 className="font-semibold">{p.title}</h3>
              </div>
              <p className="mt-3 text-sm text-text-secondary">{p.body}</p>
              {p.bullets && (
                <ul className="mt-3 space-y-1.5 text-sm text-text-muted">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span aria-hidden>•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </div>
      </Section>

      {/* REHABILITATION PROGRAM */}
      <Section className="py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl md:text-4xl">Rehabilitation-Led Safety Program</h2>
            <p className="mt-3 text-text-secondary">
              In New Kleinfontein, we will expose and seal historic openings along the outcrop to deter illegal access
              and stabilise the surface near homes, schools, roads, rail and services. Steps include deep trenching to
              reveal voids, removal of shallow ore, backfilling with broken waste rock, compaction to form an
              impassable plug, and finally topsoil replacement and re-seeding of indigenous species.
            </p>
            <p className="mt-3 text-text-muted">
              This program directly addresses community safety risks caused by illegal access and undermining of
              critical infrastructure adjacent to residential areas and rail.
            </p>
            <div className="mt-4 rounded-2xl border border-surface-3/50 bg-surface-2/30 p-4 text-xs leading-relaxed text-text-muted">
              Why it matters: without sealing, the area faces long-term environmental, social and economic harm,
              impacting thousands of residents.
            </div>
          </div>
          <div className="rounded-3xl border border-surface-3/50 bg-surface-2/40 p-6">
            <h3 className="font-semibold">Measurable Outcomes (initial)</h3>
            <ul className="mt-3 grid gap-3 text-sm">
              <li className="rounded-xl border border-surface-3/50 p-4">
                <div className="text-text-muted">Access points permanently sealed</div>
                <div className="font-display text-xl">100% of known openings</div>
              </li>
              <li className="rounded-xl border border-surface-3/50 p-4">
                <div className="text-text-muted">Concurrent rehab progress</div>
                <div className="font-display text-xl">Quarterly hectares restored</div>
              </li>
              <li className="rounded-xl border border-surface-3/50 p-4">
                <div className="text-text-muted">Community incidents</div>
                <div className="font-display text-xl">Zero harm target</div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* COMPLIANCE SNAPSHOT */}
      <Section className="py-12 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-4xl">Compliance Snapshot</h2>
            <p className="mt-2 max-w-3xl text-text-muted">
              Our rights, authorisations and processing route are structured for compliant, low-impact ramp-up.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMPLIANCE.map((s) => (
            <div key={s.label} className="rounded-2xl border border-surface-3/50 bg-surface-2/40 p-5">
              <div className="flex items-center gap-3">
                <span className="text-accent-gold">
                  <Icon.CheckDoc className="h-5 w-5" />
                </span>
                <span className="text-sm text-text-muted">{s.label}</span>
              </div>
              <div className="mt-3 font-display text-2xl">{s.value}</div>
              {s.sub && <div className="mt-1 text-sm text-text-muted/80">{s.sub}</div>}
            </div>
          ))}
        </div>

        <ul className="mt-6 space-y-2 text-sm text-text-muted">
          <li>PR validity & extension: valid to Oct 2025 with potential 3-year extension.</li>
          <li>Environmental status: authorisations approved; Mining Permits utilise Basic Assessment Reports.</li>
          <li>Licensing & logistics: water/waste licences at the offtake processor; ore haul ~8 km to toll treatment under MOU.</li>
        </ul>
      </Section>

      {/* SOCIAL IMPACT */}
      <Section className="py-12 md:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl md:text-4xl">People & Communities</h2>
            <p className="mt-3 text-text-secondary">
              Turnbridge and New Kleinfontein together are planned to create substantial local employment and supplier
              opportunities, scaling with the ramp-up and life-of-mine.
            </p>
            <p className="mt-3 text-text-muted">
              Planning indicates a minimum of ~600 sustained jobs, with potential to exceed 800 as access is formalised
              and legacy openings are sealed.
            </p>
          </div>
          <div className="rounded-3xl border border-surface-3/50 bg-surface-2/40 p-6">
            <h3 className="font-semibold">Local Value Focus</h3>
            <ul className="mt-3 grid gap-3 text-sm">
              <li className="rounded-xl border border-surface-3/50 p-4">Local hiring & training for operators and supervisors</li>
              <li className="rounded-xl border border-surface-3/50 p-4">Inclusive procurement for approved regional suppliers</li>
              <li className="rounded-xl border border-surface-3/50 p-4">Transparent grievance & engagement channels</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* TARGETS */}
      <Section className="py-12 md:py-20">
        <h2 className="font-display text-2xl md:text-4xl">2025–2027 Targets</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { k: "Zero lost-time injuries", y25: "Target", y26: "Maintain", y27: "Maintain" },
            { k: "All known access points sealed", y25: "60%", y26: "100%", y27: "Monitor" },
            { k: "Rehab – surface restored (cumulative)", y25: "5 ha", y26: "12 ha", y27: "20+ ha" },
            { k: "Local procurement (share of opex)", y25: "25%", y26: "35%", y27: "40%+" },
            { k: "Potable water use intensity", y25: "Baseline", y26: "−10%", y27: "−20%" },
            { k: "Community incidents", y25: "0", y26: "0", y27: "0" },
          ].map((t) => (
            <div key={t.k} className="rounded-2xl border border-surface-3/50 bg-surface-2/40 p-5">
              <div className="text-sm text-text-muted">{t.k}</div>
              <div className="mt-3 flex items-center justify-between font-display">
                <div className="text-xl">’25 {t.y25}</div>
                <div className="text-xl">’26 {t.y26}</div>
                <div className="text-xl">’27 {t.y27}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-text-muted">
          Targets are internal planning markers and will be updated as studies and permitting progress.
        </p>
      </Section>

      {/* CTA */}
      <Section className="pb-24">
        <div className="grid items-center gap-6 rounded-3xl border border-surface-3/50 bg-surface-2/40 p-6 md:grid-cols-3 md:p-8">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl md:text-3xl">Read more</h2>
            <ul className="mt-2 grid gap-3 text-sm text-text-secondary sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <Icon.Pickaxe className="mt-0.5 h-5 w-5 text-accent-gold" />
                <span>
                  Operations overview and ramp-up plan (Turnbridge & New Kleinfontein).{" "}
                  <a className="underline hover:text-accent-gold" href="/operations">
                    View Operations
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon.CheckDoc className="mt-0.5 h-5 w-5 text-accent-gold" />
                <span>
                  Investor materials and governance.{" "}
                  <a className="underline hover:text-accent-gold" href="/investors">
                    Investor Overview
                  </a>
                </span>
              </li>
            </ul>
          </div>
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-accent-gold/40 px-5 py-3 text-sm font-medium text-accent-gold"
          >
            Contact Us <Icon.ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>
      </Section>

      {/* Scoped shimmer styles */}
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
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .text-gold-shimmer { animation: none; }
        }
      `}</style>
    </main>
  );
}
