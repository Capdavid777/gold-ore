'use client';

import Link, { type LinkProps } from 'next/link';
import type { UrlObject } from 'url';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-colors focus:outline-none focus-visible:ring-0 focus-ring',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-gold-500 text-black hover:bg-brand-gold-400',
        secondary:
          'bg-[hsl(var(--surface-elevated))] text-[hsl(var(--text))] hover:bg-[hsl(var(--surface-alt))] border border-[hsl(var(--border))]',
        ghost:
          'bg-transparent text-brand-gold-400 hover:bg-[hsl(var(--surface-alt))]',
      },
      size: { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2', lg: 'px-6 py-3 text-lg' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

// ✅ Derive the exact href type Next.js <Link> accepts in your version
type Href = LinkProps['href'] | UrlObject | string;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    /** When provided, renders as a Next.js <Link> */
    href?: Href;
    className?: string;
  };

export function Button({ variant, size, className, href, children, ...props }: ButtonProps) {
  const cls = twMerge(button({ variant, size }), className);

  if (href) {
    return (
      <Link
        href={href as LinkProps['href']}  // cast to what <Link> expects
        className={cls}
        prefetch={false}
        aria-label={typeof children === 'string' ? (children as string) : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

export default Button;
