'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';

type ESGBannerProps = {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string; // defaults to /esg
  align?: 'left' | 'center' | 'right';
  minVH?: number; // viewport height (70 = 70vh)
};

export default function ESGBanner({
  imageSrc = '/media/esg-hero.jpg',
  imageAlt = '',
  title = 'Sustainability at our core',
  subtitle = 'We align with global best practices, measure our impact transparently, and invest in projects that create shared value.',
  ctaLabel = 'Our ESG Approach',
  ctaHref = '/esg',
  align = 'left',
  minVH = 70,
}: ESGBannerProps) {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduce) return; // disable parallax for reduced motion users

    let raf = 0;
    const onScroll = () => {
      if (!imgRef.current || !copyRef.current) return;
      const y = window.scrollY || 0;
      // image drifts slightly faster; copy slightly slower
      imgRef.current.style.transform = `translate3d(0, ${Math.round(y * -0.06)}px, 0)`;
      copyRef.current.style.transform = `translate3d(0, ${Math.round(y * -0.02)}px, 0)`;
    };

    const loop = () => {
      onScroll();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const alignCls =
    align === 'center'
      ? 'items-center text-center'
      : align === 'right'
        ? 'items-end text-right'
        : 'items-start text-left';

  return (
    <section aria-label="ESG banner" className="relative w-full bg-[hsl(var(--surface))]">
      <div className="relative" style={{ minHeight: `${minVH}vh` }}>
        {/* Background image (parallax target) */}
        <div ref={imgRef} className="absolute inset-0 overflow-hidden will-change-transform" aria-hidden>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-center select-none"
          />
          {/* Readability overlay using your overlay style */}
          <div className="absolute inset-0 hero-overlay" />
        </div>

        {/* Copy */}
        <div className="relative z-10">
          <div className={`container flex ${alignCls} justify-center px-6 py-20 md:py-28`} ref={copyRef}>
            <div className="w-full md:w-5/6 lg:w-3/4 xl:w-2/3">
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-4 max-w-3xl text-[hsl(var(--text-muted))]">
                  {subtitle}
                </p>
              )}
              <div className="mt-8">
                <Button href={ctaHref} variant="primary" size="lg">
                  {ctaLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Gold band accent */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[22px]"
          style={{
            background:
              'linear-gradient(135deg, hsl(var(--gold-700)), hsl(var(--gold-500)) 45%, hsl(var(--gold-800)))',
          }}
        />
      </div>
    </section>
  );
}
