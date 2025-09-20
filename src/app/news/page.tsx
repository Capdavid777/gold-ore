"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import type { ReactNode } from "react";

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
  Calendar: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5" />
      <path strokeWidth="1.5" d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  ArrowRight: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="M4 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Tag: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path strokeWidth="1.5" d="M20.59 13.41 12 22l-9-9 8.59-8.59A2 2 0 0 1 13 4h5a2 2 0 0 1 2 2v5a2 2 0 0 1-.59 1.41Z" />
      <circle cx="7.5" cy="7.5" r="1.5" strokeWidth="1.5" />
    </svg>
  ),
  Mail: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" ry="2" strokeWidth="1.5" />
      <path strokeWidth="1.5" d="m3 7 9 6 9-6" />
    </svg>
  ),
};

const gold = { color: "var(--go-gold,#caa132)" } as const;

type NewsItem = {
  id: string;
  date: string;
  title: string;
  summary: string;
  image?: string;
  href?: string;
  tags?: string[];
  meta?: string;
  icon?: ReactNode;
};

const NEWS: NewsItem[] = [
  {
    id: "2025-02-nk-rehab",
    date: "2025-02-10",
    title: "New Kleinfontein: Rehabilitation & Community Safety Program",
    summary:
      "Gold Ore confirms a phased program to seal historic shallow workings, reduce illegal access, and restore the surface with indigenous vegetation. Works prioritise safety near homes, schools, roads, rail and services.",
    image: "/news/rehabilitation.jpg",
    href: "/esg",
    tags: ["ESG", "Rehabilitation", "Community"],
    meta: "Prospecting-phase baselines completed; BARs underpin mining permits.",
    icon: <Icon.Pickaxe className="h-5 w-5" />,
  },
  {
    id: "2025-01-goldplat-mou",
    date: "2025-01-28",
    title: "Processing MOU with Goldplat PLC",
    summary:
      "Gold Ore and Goldplat PLC have executed a toll treatment MOU for near-site processing (~8 km), supporting a capital-light ramp-up and disciplined logistics.",
    image: "/news/goldplat-plant.jpg",
    href: "/investors",
    tags: ["Processing", "Partnerships"],
    meta: "Toll treatment route in place for early production ounces.",
    icon: <Icon.File className="h-5 w-5" />,
  },
  {
    id: "2024-12-permitting",
    date: "2024-12-05",
    title: "Mining Permits supported by Approved Basic Assessment Reports",
    summary:
      "Mining Permit BARs are approved for relevant project areas in Benoni South. Water and waste licensing remains with the offtake processor; haulage kept short to reduce impact.",
    image: "/news/permits.jpg",
    href: "/investors",
    tags: ["Permitting", "Compliance"],
    meta: "Compliance-first development with transparent reporting.",
    icon: <Icon.Calendar className="h-5 w-5" />,
  },
  {
    id: "2024-10-project-update",
    date: "2024-10-18",
    title: "Benoni South Project Update: Target First Production in 2026",
    summary:
      "Gold Ore targets 2026 first production with an initial opencast focus and a staged transition to underground at Turnbridge. Planned 600–800+ local jobs at steady state.",
    image: "/news/benoni-aerial.jpg",
    href: "/operations",
    tags: ["Operations", "Jobs"],
    meta: "Combined LoM ~10 years; combined LoM gold ~3,038 kg.",
    icon: <Icon.Pickaxe className="h-5 w-5" />,
  },
];

export default function NewsPage() {
  const r = useReducedMotion();

  return (
    <main id="main" className="relative">
      {/* HERO */}
      <section aria-labelledby="news-hero" className="relative overflow-hidden">
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
              <p className="text-sm uppercase tracking-[0.18em] text-text-muted">Press</p>
            </div>

            <h1 id="news-hero" className="mt-3 font-display text-4xl md:text-6xl lg:text-7xl">
              <span className="text-gold-shimmer">News</span>
            </h1>
            <p className="mt-4 max-w-2xl text-text-muted">
              Press releases and updates covering permitting, partnerships, ESG progress, and development milestones.
            </p>
          </motion.div>
        </Section>
      </section>

      {/* FEED */}
      <Section className="py-12 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {NEWS.map((n) => (
            <motion.article
              key={n.id}
              initial={r ? false : { opacity: 0, y: 10 }}
              whileInView={r ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              /* MAKE CARDS EQUAL HEIGHT + BUTTON AT BOTTOM */
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-surface-3/50 bg-surface-2/40"
            >
              {/* media */}
              <div className="relative aspect-[16/9] w-full shrink-0">
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/35 via-black/0 to-black/10" />
                {n.image ? (
                  <Image
                    src={n.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority={false}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(800px_300px_at_50%_-10%,#a17838_12%,transparent_60%)] opacity-20" />
                )}
              </div>

              {/* content */}
              <div className="flex grow flex-col p-5 md:p-6">
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="inline-flex items-center gap-1.5" style={gold}>
                    <Icon.Calendar className="h-4 w-4" />
                    <span className="text-[inherit]">{formatDate(n.date)}</span>
                  </span>
                  {n.tags && n.tags.length > 0 && (
                    <span className="inline-flex items-center gap-1.5">
                      <Icon.Tag className="h-4 w-4" style={gold} />
                      <span className="text-text-muted">{n.tags.join(" · ")}</span>
                    </span>
                  )}
                </div>

                <h2 className="mt-2 font-display text-2xl md:text-[28px]">
                  <a
                    href={n.href ?? "#"}
                    className="transition hover:opacity-90"
                    style={{ color: "var(--go-gold,#caa132)" }}
                  >
                    {n.title}
                  </a>
                </h2>

                {n.meta && <p className="mt-1 text-xs text-text-muted">{n.meta}</p>}

                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{n.summary}</p>

                {/* BUTTON AREA PINNED TO BOTTOM */}
                <div className="mt-auto pt-4">
                  <a
                    href={n.href ?? "#"}
                    className="group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition hover:border-[var(--go-gold,#caa132)]/70"
                    style={{ borderColor: "var(--go-gold,#caa132)", color: "var(--go-gold,#caa132)" }}
                  >
                    Read More
                    <Icon.ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* MEDIA / CONTACT */}
      <Section className="pb-24">
        <div className="grid gap-6 rounded-3xl border border-surface-3/50 bg-surface-2/40 p-6 md:grid-cols-3 md:p-8">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl md:text-3xl">Media Enquiries</h2>
            <p className="mt-3 text-sm text-text-secondary">
              For interviews, site access, media kits, or high-resolution imagery, please reach out to our team.
            </p>
          </div>
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium"
            style={{ borderColor: "var(--go-gold,#caa132)", color: "var(--go-gold,#caa132)" }}
          >
            <Icon.Mail className="h-4 w-4" />
            Contact Communications
          </a>
        </div>
      </Section>

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
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .text-gold-shimmer {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}

function formatDate(d: string) {
  try {
    const date = new Date(d);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    }
    return d;
  } catch {
    return d;
  }
}
