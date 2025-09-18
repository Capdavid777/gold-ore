"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { useState } from "react";

/** Inline SVG icons (no external deps) */
const Icon = {
  MapPin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M19.5 10.5c0 5.25-7.5 11.25-7.5 11.25S4.5 15.75 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      <circle cx="12" cy="10.5" r="2.25" strokeWidth="1.5" />
    </svg>
  ),
  ShieldCheck: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M12 3.25 4.5 6v6.5c0 4.5 3.5 6.75 7.5 8.25 4-1.5 7.5-3.75 7.5-8.25V6L12 3.25Z" />
      <path strokeWidth="1.5" d="m8.75 12 2.25 2.25 4.25-4.25" />
    </svg>
  ),
  Tree: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M12 21v-4M6 13h12M7 10h10M8 7h8M12 3l6 9H6l6-9Z" />
    </svg>
  ),
  Users: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="9" cy="8" r="3" strokeWidth="1.5" />
      <path strokeWidth="1.5" d="M15 10a3 3 0 1 0 0-6" />
      <path strokeWidth="1.5" d="M3.75 19.5a5.25 5.25 0 0 1 10.5 0M14.25 19.5a5.25 5.25 0 0 1 6 0" />
    </svg>
  ),
  Award: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="9" r="4.5" strokeWidth="1.5" />
      <path strokeWidth="1.5" d="m8 13 1.5 7L12 18l2.5 2 1.5-7" />
    </svg>
  ),
  ArrowRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M4 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Pickaxe: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M3 8.5C6.5 6 10 5.5 13.5 7M21 8.5C17.5 6 14 5.5 10.5 7M12 7v13" />
      <path strokeWidth="1.5" d="m12 13 7 7" />
    </svg>
  ),
  FileCheck: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5Z" />
      <path strokeWidth="1.5" d="M14 2v5h5" />
      <path strokeWidth="1.5" d="m9 14 2 2 4-4" />
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
};

type Stat = { label: string; value: string; sublabel?: string; icon?: React.ReactNode };

const COMPANY_STATS: Stat[] = [
  { label: "Head Office", value: "Sandton, Gauteng", sublabel: "South Africa", icon: <Icon.MapPin aria-hidden className="h-5 w-5" /> },
];

const PROJECT_SNAPSHOT: Stat[] = [
  { label: "Benoni South LOM", value: "10 yrs", sublabel: "Opencast + Underground", icon: <Icon.Pickaxe aria-hidden className="h-5 w-5" /> },
  { label: "Gold (Combined)", value: "≈3,038 kg", sublabel: "LoM production target", icon: <Icon.Coin aria-hidden className="h-5 w-5" /> },
  { label: "NPV (illustrative)", value: "$55m+", sublabel: "At 15–20% discount rates", icon: <Icon.Award aria-hidden className="h-5 w-5" /> },
  { label: "Offtake", value: "Goldplat PLC", sublabel: "MOU – toll treatment", icon: <Icon.Factory aria-hidden className="h-5 w-5" /> },
];

const VALUES = [
  { title: "Safety by Design", body: "Engineer out risk. Every person home safe, every shift.", icon: <Icon.ShieldCheck aria-hidden className="h-6 w-6" /> },
  { title: "Stewardship", body: "Water-wise, lower-carbon operations and regional restoration.", icon: <Icon.Tree aria-hidden className="h-6 w-6" /> },
  { title: "Excellence", body: "World-class geology, disciplined capital allocation, continuous improvement.", icon: <Icon.Award aria-hidden className="h-6 w-6" /> },
  { title: "People First", body: "Develop leaders, champion diversity, grow local procurement.", icon: <Icon.Users aria-hidden className="h-6 w-6" /> },
];

/** Emblem with a visible metallic gold border that matches the logo */
function Emblem() {
  const candidates = [
    "/brand/logo-only-transparent.svg",
    "/brand/logo-only-transparent.png",
    "/Brand/Logo%20Only_Transparent.svg",
    "/Brand/Logo%20Only_Transparent.png",
    "/Brand/Logo Only_Transparent.svg",
    "/Brand/Logo Only_Transparent.png",
    "/Logo%20Only_Transparent.svg",
    "/Logo%20Only_Transparent.png",
    "/Logo Only_Transparent.svg",
    "/Logo Only_Transparent.png",
  ];
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-40 w-40 md:h-48 md:w-48 rounded-full ring-gold z-10">
      {/* Inner circle surface (kept) */}
      <div className="absolute inset-[2px] rounded-full bg-black/20 overflow-hidden">
        {!failed ? (
          <Image
            src={candidates[idx]}
            alt="Gold Ore emblem"
            fill
            sizes="(min-width: 768px) 192px, 160px"
            className="object-contain"
            priority
            onError={() => {
              if (idx < candidates.length - 1) setIdx((i) => i + 1);
              else setFailed(true);
            }}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-accent-gold/70 font-semibold">
            GOLD ORE
          </div>
        )}
      </div>
    </div>
  );
}

export default function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main id="main" className="relative">
      {/* Hero */}
      <section aria-labelledby="about-hero" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,#a17838_12%,transparent_60%)] opacity-10" />
        <Section className="pt-20 pb-10 md:pt-28 md:pb-16">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3">
              <Icon.Pickaxe aria-hidden className="h-6 w-6 text-accent-gold" />
              <p className="text-sm uppercase tracking-[0.18em] text-text-muted">Company</p>
            </div>

            {/* ✨ Gold shimmer title */}
            <h1 id="about-hero" className="font-display text-4xl md:text-6xl lg:text-7xl mt-3">
              <span className="text-gold-shimmer">About Gold Ore</span>
            </h1>

            <p className="mt-4 max-w-2xl text-text-muted">
              South African gold producer headquartered in Sandton, Gauteng. Combining responsible mining,
              rigorous engineering, and a long-term partnership mindset across our Benoni South assets.
            </p>
          </motion.div>

          {/* Company key stat(s) */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_STATS.map((s) => (
              <motion.div
                key={s.label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-surface-3/50 bg-surface-2/40 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-surface-2/30"
              >
                <div className="flex items-center gap-3">
                  <span className="text-accent-gold"><Icon.MapPin className="h-5 w-5" /></span>
                  <span className="text-sm text-text-muted">{s.label}</span>
                </div>
                <div className="mt-3 font-display text-2xl">{s.value}</div>
                {s.sublabel && <div className="mt-1 text-sm text-text-muted/80">{s.sublabel}</div>}
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* Mission */}
      <Section className="py-12 md:py-20">
        <div className="grid items-start gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl md:text-4xl">Our Mission</h2>
            <p className="mt-4 text-text-secondary">
              Responsibly unlock South Africa’s gold resources and create enduring value for our people,
              communities, partners, and shareholders through operational excellence, innovation, and stewardship.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { icon: <Icon.ShieldCheck aria-hidden className="h-5 w-5" />, text: "Zero Harm culture and design-led safety" },
                { icon: <Icon.Tree aria-hidden className="h-5 w-5" />, text: "Lower-carbon, water-wise operations" },
                { icon: <Icon.Award aria-hidden className="h-5 w-5" />, text: "Tier-one orebody understanding & recovery" },
                { icon: <Icon.Users aria-hidden className="h-5 w-5" />, text: "Skills uplift and inclusive local procurement" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 rounded-xl border border-surface-3/50 p-4">
                  <span className="text-accent-gold">{item.icon}</span>
                  <span className="text-sm text-text-muted">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo panel (neutral background, gold ring kept) */}
          <motion.div
            className="relative h-56 w-full overflow-hidden rounded-3xl border border-surface-3/50 md:h-full"
            initial={false}
            whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            style={{ perspective: "800px" }}
          >
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(900px_450px_at_50%_-15%,rgba(255,255,255,0.04),transparent_60%)]" />
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <Emblem />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Values */}
      <Section className="py-12 md:py-20">
        <h2 className="font-display text-2xl md:text-4xl">Our Values</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <article key={v.title} className="group rounded-2xl border border-surface-3/50 bg-surface-2/30 p-5 transition hover:border-accent-gold/50">
              <div className="flex items-center gap-3">
                <span className="text-accent-gold">{v.icon}</span>
                <h3 className="font-semibold">{v.title}</h3>
              </div>
                <p className="mt-3 text-sm text-text-muted">{v.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Benoni South snapshot */}
      <Section className="py-12 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-4xl">Benoni South at a Glance</h2>
            <p className="mt-2 max-w-3xl text-text-muted">
              Our flagship district includes the Turnbridge underground section and New Kleinfontein opencast permits,
              immediately south of Benoni CBD.
            </p>
          </div>
          <a
            href="/operations"
            className="group inline-flex items-center gap-2 rounded-full border border-surface-3/60 px-4 py-2 text-sm text-text-secondary transition hover:border-accent-gold/60"
          >
            View Projects <Icon.ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECT_SNAPSHOT.map((s) => (
            <div key={s.label} className="rounded-2xl border border-surface-3/50 bg-surface-2/40 p-5">
              <div className="flex items-center gap-3">
                <span className="text-accent-gold"><Icon.Pickaxe className="h-5 w-5" /></span>
                <span className="text-sm text-text-muted">{s.label}</span>
              </div>
              <div className="mt-3 font-display text-2xl">{s.value}</div>
              {s.sublabel && <div className="mt-1 text-sm text-text-muted/80">{s.sublabel}</div>}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-surface-3/50 bg-surface-2/30 p-5 text-xs leading-relaxed text-text-muted">
          Notes: figures are indicative project study outcomes and subject to further engineering, permitting and market
          conditions.
        </div>
      </Section>

      {/* Rehabilitation & community safety */}
      <Section className="py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl md:text-4xl">Rehabilitation & Community Safety</h2>
            <p className="mt-3 text-text-secondary">
              We are advancing a practical rehabilitation programme to seal historic shallow workings, deter illegal access,
              and restore the landscape. The concept includes exposing old access points along the outcrop, backfilling with
              compacted waste rock, and re-establishing indigenous vegetation. The programme is designed to protect nearby
              homes, schools, roads, rail and services while enabling safe, responsible development.
            </p>
            <ul className="mt-5 grid gap-3">
              <li className="flex items-start gap-3">
                <Icon.Tree className="mt-0.5 h-5 w-5 text-accent-gold" />
                <span className="text-sm text-text-muted">Concurrent rehabilitation and surface restoration.</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon.ShieldCheck className="mt-0.5 h-5 w-5 text-accent-gold" />
                <span className="text-sm text-text-muted">Sealed access to reduce illegal mining risk and surface subsidence.</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon.Users className="mt-0.5 h-5 w-5 text-accent-gold" />
                <span className="text-sm text-text-muted">Meaningful local employment and skills during operations.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-surface-3/50 bg-surface-2/40 p-6">
            <h3 className="font-semibold">Employment & Timeline</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-surface-3/50 p-4">
                <div className="text-sm text-text-muted">Planned Jobs</div>
                <div className="mt-1 font-display text-2xl">600–800+</div>
              </div>
              <div className="rounded-xl border border-surface-3/50 p-4">
                <div className="text-sm text-text-muted">Target First Production</div>
                <div className="mt-1 font-display text-2xl">2026</div>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-surface-3/50 p-4">
              <div className="text-sm text-text-muted">Offtake Partner</div>
              <div className="mt-1 font-display text-xl">Goldplat PLC (MOU)</div>
              <p className="mt-2 text-xs text-text-muted">
                Toll treatment proximity supports a disciplined, capital-light ramp-up.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Commitments */}
      <Section className="pb-24">
        <div className="grid items-center gap-6 rounded-3xl border border-surface-3/50 bg-surface-2/40 p-6 md:grid-cols-3 md:p-8">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl md:text-3xl">Our Commitments</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-3">
                <Icon.FileCheck className="mt-0.5 h-5 w-5 text-accent-gold" />
                <span className="text-sm text-text-secondary">
                  Compliance with South African mining regulation and environmental authorisations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Icon.ShieldCheck className="mt-0.5 h-5 w-5 text-accent-gold" />
                <span className="text-sm text-text-secondary">
                  Transparent reporting, ESG targets, and proactive stakeholder engagement.
                </span>
              </li>
            </ul>
          </div>
          <a
            href="/esg"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-accent-gold/40 px-5 py-3 text-sm font-medium text-accent-gold"
          >
            Explore ESG <Icon.ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>
      </Section>

      {/* Scoped styles */}
      <style jsx>{`
        .text-gold-shimmer {
          background: linear-gradient(100deg,#8f6b29 0%,#e6c46d 20%,#f7e7a1 40%,#cf9f44 60%,#e6c46d 80%,#8f6b29 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 2px 10px rgba(0,0,0,.35);
          background-size: 200% auto;
          animation: shimmerText 4.5s linear infinite;
        }
        @keyframes shimmerText {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* ✅ Real gold border that stays visible */
        .ring-gold {
          border: 2px solid transparent;
          border-image: conic-gradient(
            #f7e7a1 0%,
            #e6c46d 18%,
            #cf9f44 40%,
            #8f6b29 62%,
            #cf9f44 82%,
            #e6c46d 92%,
            #f7e7a1 100%
          ) 1;
          box-shadow: 0 0 0 0.5px rgba(207,159,68,0.35); /* subtle outer crispness on dark bg */
        }

        @media (prefers-reduced-motion: reduce) {
          .text-gold-shimmer { animation: none; }
        }
      `}</style>
    </main>
  );
}
