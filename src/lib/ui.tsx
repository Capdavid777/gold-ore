'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/** Gold Ore card container */
export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#654e1a]/40 bg-black/40 backdrop-blur shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
      {children}
    </div>
  );
}

/** Lux heading + optional subtitle */
export function Heading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-serif text-4xl md:text-5xl text-[#d4af37] tracking-tight">{title}</h1>
      {subtitle && <p className="mt-2 text-gray-400">{subtitle}</p>}
    </div>
  );
}

/** Simple fade/slide-in wrapper for micro-interactions */
export function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  );
}

/** Sentinel so the file is always treated as a module under isolatedModules */
export const UI_MODULE = true;

