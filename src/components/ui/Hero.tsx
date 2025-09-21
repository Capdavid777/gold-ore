'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import Image from 'next/image';

type VideoSource = { src: string; type?: string };

type HeroProps = {
  /** Title content (text or a component, e.g., a logo) */
  title: ReactNode;
  /**
   * Which element should wrap the title.
   * Defaults to 'h1'; use 'div' if you’re rendering a logo image.
   */
  titleTag?: 'h1' | 'div' | 'span' | 'p' | 'figure';
  subtitle?: string;
  background?: string;
  video?: {
    sources: VideoSource[];
    poster?: string;
    preload?: 'none' | 'metadata' | 'auto';
  };
  /** Align content left or center (both axis centering when 'center') */
  align?: 'left' | 'center';
  respectReducedMotion?: boolean;
};

export default function Hero({
  title,
  titleTag = 'h1',
  subtitle,
  background,
  video,
  align = 'left',
  respectReducedMotion = true,
}: HeroProps) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce =
      respectReducedMotion &&
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      ref.current.pause();
      return;
    }

    const v = ref.current;
    const tryPlay = () => v.play().catch(() => {});
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener('canplay', tryPlay, { once: true });
  }, [respectReducedMotion]);

  return (
    // ↓ Reduce hero height by ~20% (52→41.6vh, 64→51.2vh)
    <div className="relative min-h-[41.6vh] md:min-h-[51.2vh] w-full">
      {video ? (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          loop
          autoPlay
          preload={video.preload ?? 'metadata'}
          poster={video.poster ?? background}
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        >
          {video.sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type ?? 'video/mp4'} />
          ))}
        </video>
      ) : (
        background && (
          <Image src={background} alt="" fill priority className="object-cover" />
        )
      )}

      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div
        className={[
          'relative z-10 container',
          // ↓ Less vertical padding & centered layout when requested
          align === 'center'
            ? 'flex min-h-[41.6vh] md:min-h-[51.2vh] items-center justify-center text-center py-12 md:py-16'
            : 'py-20 md:py-28',
        ].join(' ')}
      >
        <div className={align === 'center' ? 'max-w-4xl' : ''}>
          {/* Render chosen tag without relying on JSX namespace types */}
          {React.createElement(
            titleTag,
            { className: 'font-display text-4xl md:text-6xl' },
            title
          )}

          {subtitle && (
            // ↓ Bring subtitle closer to the logo (mt-4 → mt-2)
            <p
              className={[
                'on-image text-lg',
                align === 'center' ? 'mx-auto mt-2 max-w-2xl' : 'mt-2 max-w-2xl',
              ].join(' ')}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
