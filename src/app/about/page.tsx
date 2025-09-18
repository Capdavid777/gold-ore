// src/app/about/page.tsx
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import {
  MapPinned,
  ShieldCheck,
  TreePine,
  Users2,
  Award,
  ArrowRight,
  Pickaxe,
  Recycle,
} from "lucide-react";

type Stat = { label: string; value: string; sublabel?: string; icon?: React.ReactNode };
type Value = { title: string; body: string; icon: React.ReactNode };
type Leader = { name: string; role: string; bio: string; initials: string };

const STATS: Stat[] = [
  { label: "Operating Regions", value: "3", sublabel: "Gauteng, Limpopo, North West", icon: <MapPinned aria-hidden /> },
  { label: "Employees & Contractors", value: "2,800+", sublabel: "Local-first sourcing", icon: <Users2 aria-hidden /> },
  { label: "TRIFR (12 mo.)", value: "1.7", sublabel: "Relentless safety focus", icon: <ShieldCheck aria-hidden /> },
  { label: "Recycled Process Water", value: "86%", sublabel: "Water stewardship", icon: <Recycle aria-hidden /> },
];

const VALUES: Value[] = [
  {
    title: "Safety by Design",
    body:
      "We engineer out risk and stop work when unsure—no exceptions. Every person home safe, every shift.",
    icon: <ShieldCheck aria-hidden className="h-6 w-6" />,
  },
  {
    title: "Stewardship",
    body:
      "Long-horizon thinking for land, water, energy, and communities—measurable ESG targets guide decisions.",
    icon: <TreePine aria-hidden className="h-6 w-6" />,
  },
  {
    title: "Excellence",
    body:
      "World-class geology, disciplined capital allocation, and continuous improvement across the value chain.",
    icon: <Award aria-hidden className="h-6 w-6" />,
  },
  {
    title: "People First",
    body:
      "We grow leaders, champion diversity, and create opportunities in the regions where we operate.",
    icon: <Users2 aria-hidden className="h-6 w-6" />,
  },
];

const LEADERSHIP: Leader[] = [
  {
    name: "Nomsa Khumalo",
    role: "Chief Executive Officer",
    bio:
      "25 years across underground and open-pit operations. Led multi-shaft optimisation programmes and technology modernisation.",
    initials: "NK",
  },
  {
    name: "Daniel van Rensburg",
    role: "Chief Operating Officer",
    bio:
      "Mining engineer with focus on safety automation, throughput, and cost discipline across processing plants.",
    initials: "DvR",
  },
  {
    name: "Anita Mokoena",
    role: "Chief Financial Officer",
    bio:
      "Chartered Accountant (SA). Deep experience in project finance, treasury, and investor relations.",
    initials: "AM",
  },
  {
    name: "Liam Pillay",
    role: "VP Sustainability",
    bio:
      "Environmental scientist driving decarbonisation, water strategy, and community partnerships.",
    initials: "LP",
  },
];

const MILESTONES = [
  { year: "2008", title: "Incorporation", copy: "Gold Ore established in Sandton, Gauteng." },
  { year: "2012", title: "First Pour", copy: "Commercial production achieved at our flagship operation." },
  { year: "2018", title: "Processing Upgrade", copy: "New plant commissioning lifts recovery and reliability." },
  { year: "2023", title: "ESG Roadmap", copy: "Formalised 2030 climate & water commitments." },
  { year: "2025", title: "Digital Operations", copy: "Rolling out autonomous-ready fleet & real-time analytics." },
];

export default function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main id="main" className="relative">
      {/* Hero */}
      <section aria-labelledby="about-hero" className="relative overflow-hidden">
        {/* subtle gold gradient/texture wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,#a17838_12%,transparent_60%)] opacity-10"
        />
        <Section className="pt-20 pb-10 md:pt-28 md:pb-16">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3">
              <Pickaxe aria-hidden className="h-6 w-6 text-accent-gold" />
              <p className="text-sm uppercase tracking-[0.18em] text-text-muted">Company</p>
            </div>
            <h1 id="about-hero" className="font-display text-4xl md:text-6xl lg:text-7xl mt-3">
              About Gold Ore
            </h1>
            <p className="mt-4 max-w-2xl text-text-muted">
              We are a South African gold producer headquartered in Sandton, Gauteng—combining
              responsible mining with rigorous engineering and a long-term partnership mindset.
            </p>
          </motion.div>

          {/* Key stats */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group rounded-2xl border border-surface-3/50 bg-surface-2/40 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-surface-2/30"
              >
                <div className="flex items-center gap-3">
                  <span className="text-accent-gold">{s.icon}</span>
                  <span className="text-sm text-text-muted">{s.label}</span>
                </div>
                <div className="mt-3 font-display text-3xl">{s.value}</div>
                {s.sublabel && (
                  <div className="mt-1 text-sm text-text-muted/80">{s.sublabel}</div>
                )}
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
              To responsibly unlock South Africa’s gold resources and create enduring value—
              for our people, communities, partners, and shareholders—through operational
              excellence, innovation, and stewardship.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { icon: <ShieldCheck aria-hidden />, text: "Zero Harm culture and design-led safety" },
                { icon: <TreePine aria-hidden />, text: "Lower-carbon, water-wise operations" },
                { icon: <Award aria-hidden />, text: "Tier-one orebody understanding & recovery" },
                { icon: <Users2 aria-hidden />, text: "Skills uplift and inclusive local procurement" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 rounded-xl border border-surface-3/50 p-4">
                  <span className="text-accent-gold">{item.icon}</span>
                  <span className="text-sm text-text-muted">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-56 w-full overflow-hidden rounded-3xl border border-surface-3/50 md:h-full">
            {/* Logo on textured panel (uses /public if available) */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(161,120,56,.14),transparent_40%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-accent-gold/20 bg-black/20 p-8">
                <Image
                  src="/Logo Transparent.png"
                  alt="Gold Ore emblem"
                  width={120}
                  height={120}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="py-12 md:py-20">
        <h2 className="font-display text-2xl md:text-4xl">Our Values</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <article
              key={v.title}
              className="group rounded-2xl border border-surface-3/50 bg-surface-2/30 p-5 transition hover:border-accent-gold/50"
            >
              <div className="flex items-center gap-3">
                <span className="text-accent-gold">{v.icon}</span>
                <h3 className="font-semibold">{v.title}</h3>
              </div>
              <p className="mt-3 text-sm text-text-muted">{v.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Leadership */}
      <Section className="py-12 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-4xl">Leadership</h2>
            <p className="mt-2 max-w-2xl text-text-muted">
              A senior team blending deep operational experience with modern digital, ESG, and finance
              capability.
            </p>
          </div>
          <a
            href="/investors"
            className="group inline-flex items-center gap-2 rounded-full border border-surface-3/60 px-4 py-2 text-sm text-text-secondary transition hover:border-accent-gold/60"
          >
            Investor Overview <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERSHIP.map((p) => (
            <li
              key={p.name}
              className="rounded-2xl border border-surface-3/50 bg-surface-2/40 p-5"
            >
              {/* Accessible avatar with initials so we don't rely on external images */}
              <div className="flex items-center gap-4">
                <div
                  aria-hidden
                  className="grid h-14 w-14 place-items-center rounded-full border border-accent-gold/40 bg-gradient-to-b from-stone-900 to-stone-950 font-display text-base tracking-wide text-accent-gold"
                >
                  {p.initials}
                </div>
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-text-muted">{p.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-text-secondary">{p.bio}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Timeline */}
      <Section className="py-12 md:py-20">
        <h2 className="font-display text-2xl md:text-4xl">Milestones</h2>
        <ol className="relative mt-8 space-y-8 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-surface-3/60 md:before:left-1/2">
          {MILESTONES.map((m, idx) => (
            <li
              key={m.year}
              className="relative md:grid md:grid-cols-2 md:gap-8"
            >
              {/* Dot */}
              <span
                aria-hidden
                className="absolute left-4 top-2 inline-block h-2 w-2 -translate-x-1/2 rounded-full bg-accent-gold md:left-1/2"
              />
              <div className={`md:text-right ${idx % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="font-display text-2xl text-accent-gold">{m.year}</div>
                <div className="mt-1 font-semibold">{m.title}</div>
              </div>
              <p className={`mt-2 text-text-muted md:mt-0 ${idx % 2 === 1 ? "md:order-1" : ""}`}>
                {m.copy}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ESG highlight banner */}
      <Section className="pb-24">
        <div className="grid items-center gap-6 rounded-3xl border border-surface-3/50 bg-surface-2/40 p-6 md:grid-cols-3 md:p-8">
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl md:text-3xl">Our 2030 Commitments</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-3">
                <TreePine className="mt-0.5 h-5 w-5 text-accent-gold" />
                <span className="text-sm text-text-secondary">
                  30% reduction in operational emissions intensity (baseline 2022).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Recycle className="mt-0.5 h-5 w-5 text-accent-gold" />
                <span className="text-sm text-text-secondary">
                  ≥90% recycled process water at all sites, supported by closed-loop circuits.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-accent-gold" />
                <span className="text-sm text-text-secondary">
                  TRIFR ≤ 1.0 with design-led safety and autonomous-ready operations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Users2 className="mt-0.5 h-5 w-5 text-accent-gold" />
                <span className="text-sm text-text-secondary">
                  60% local procurement and continued investment in community skills.
                </span>
              </li>
            </ul>
          </div>
          <a
            href="/esg"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-accent-gold/40 px-5 py-3 text-sm font-medium text-accent-gold"
          >
            Explore ESG <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>
      </Section>
    </main>
  );
}
