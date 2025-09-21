'use client';

import Link from 'next/link';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import type { Route } from 'next';
import type { UrlObject } from 'url';

type InternalHref = Route | UrlObject;
type ExternalHref = `http://${string}` | `https://${string}` | `mailto:${string}` | `tel:${string}`;

type Props = {
  children: ReactNode;
  /** Internal app route or external URL */
  href?: InternalHref | ExternalHref;
  className?: string;
  prefetch?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

function isExternal(href: InternalHref | ExternalHref): href is ExternalHref {
  return typeof href === 'string' && /^(https?:\/\/|mailto:|tel:)/i.test(href);
}

const Button = ({
  children,
  href,
  className,
  prefetch = false,
  type = 'button',
  ...btnProps
}: Props) => {
  const cls =
    className ??
    'inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium ' +
      'bg-[#b08d2b] text-black hover:bg-[#d4af37] transition';

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

export { Button };        // named export
export default Button;    // default export
