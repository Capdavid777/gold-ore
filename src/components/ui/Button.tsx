import Link from 'next/link';
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

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    href?: string; // NEW: render as Link when present
  };

export function Button({ variant, size, className, href, ...props }: ButtonProps) {
  const cls = twMerge(button({ variant, size }), className);

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        aria-label={typeof props.children === 'string' ? (props.children as string) : 'Button link'}
      >
        {props.children}
      </Link>
    );
  }

  return <button className={cls} {...props} />;
}
