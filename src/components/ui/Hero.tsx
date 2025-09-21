'use client';
import Image from 'next/image';
import { useEffect, useRef, ReactNode } from 'react';

type VideoSource = { src: string; type?: string };

type HeroProps = {
  /** Title content (text or a component, e.g., a logo) */
  title: ReactNode;
  /** Which element should wrap the title. Defaults to 'h1' for accessibility/SEO. */
  titleTag?: 'h1' | 'div' | 'span' | 'p' | 'figure';
  subtitle?: string;
  background?: string;
  video?: {
    sources: VideoSource[];
    poster?: string;
    preload?: 'none' | 'metadata' | 'auto';
  };
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

  const TitleTag = titleTag as keyof JSX.IntrinsicElements;

  return (
    <div className="relative min-h-[52vh] md:min-h-[64vh] w-full">
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

      <div
        className={`relative z-10 container py-24 md:py-36 ${
          align === 'center' ? 'text-center' : ''
        }`}
      >
        <TitleTag className="font-display text-4xl md:text-6xl">
          {title}
        </TitleTag>

        {subtitle && (
          <p
            className={`mt-4 max-w-2xl on-image text-lg ${
              align === 'center' ? 'mx-auto' : ''
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
