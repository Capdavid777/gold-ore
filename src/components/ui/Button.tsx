'use client';

import Link from 'next/link';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import type { Route } from 'next';
import type { UrlObject } from 'url';
import { twMerge } from 'tailwind-merge';

type InternalHref = Route | UrlObject;
type ExternalHref =
  | `http://${string}`
  | `https://${string}`
  | `mailto:${string}`
  | `tel:${string}`;

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  children: ReactNode;
  /** Internal app route or external URL */
  href?: InternalHref | ExternalHref;
  className?: string;
  prefetch?: boolean;
  variant?: Variant;
  size?: Size;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

function isExternal(href: InternalHref | ExternalHref): href is ExternalHref {
  return typeof href === 'string' && /^(https?:\/\/|mailto:|tel:)/i.test(href);
}

function buttonClasses(variant: Variant, size: Size, extra?: string) {
  const base =
    'inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none ' +
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-black';
  const byVariant: Record<Variant, string> = {
    primary: 'bg-[#b08d2b] text-black hover:bg-[#d4af37]',
    secondary:
      'bg-transparent border border-[#654e1a]/60 text-[#d4af37] hover:bg-[#1a1f24]',
    ghost: 'bg-transparent text-[#d4af37] hover:bg-[#1a1f24]/50',
  };
  const bySize: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-3 text-base',
  };
  return twMerge(base, byVariant[variant], bySize[size], extra);
}

const Button = ({
  children,
  href,
  className,
  prefetch = false,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...btnProps
}: Props) => {
  const cls = buttonClasses(variant, size, className);

  if (href) {
    if (isExternal(href)) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={typeof children === 'string' ? (children as string) : undefined}
        >
          {children}
        </a>
      );
    }
    // Internal, typed route
    return (
      <Link
        href={href as InternalHref}
        className={cls}
        prefetch={prefetch}
        aria-label={typeof children === 'string' ? (children as string) : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} {...btnProps}>
      {children}
    </button>
  );
};

export { Button };      // named export (so existing `import { Button } ...` still works)
export default Button;  // default export

