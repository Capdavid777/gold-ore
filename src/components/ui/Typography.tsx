import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { ComponentProps } from 'react';


const heading = cva('font-display tracking-tight', {
variants: {
size: { h1: 'text-5xl md:text-7xl', h2: 'text-4xl md:text-5xl', h3: 'text-2xl md:text-3xl' },
tone: { default: 'text-[hsl(var(--text))]', gold: 'text-brand-gold-400', onImage: 'on-image', onDark: 'on-dark' }
},
defaultVariants: { size: 'h2', tone: 'default' }
});


const body = cva('leading-relaxed', {
variants: {
size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
tone: { default: 'text-[hsl(var(--text))]', muted: 'text-[hsl(var(--text-muted))]', onImage: 'on-image', onDark: 'on-dark' }
},
defaultVariants: { size: 'md', tone: 'default' }
});


export function H1(props: ComponentProps<'h1'> & VariantProps<typeof heading>) { const { className, tone, ...rest } = props; return <h1 className={twMerge(heading({ size: 'h1', tone }), className)} {...rest} />; }
export function H2(props: ComponentProps<'h2'> & VariantProps<typeof heading>) { const { className, tone, ...rest } = props; return <h2 className={twMerge(heading({ size: 'h2', tone }), className)} {...rest} />; }
export function H3(props: ComponentProps<'h3'> & VariantProps<typeof heading>) { const { className, tone, ...rest } = props; return <h3 className={twMerge(heading({ size: 'h3', tone }), className)} {...rest} />; }
export function P(props: ComponentProps<'p'> & VariantProps<typeof body>) { const { className, tone, size, ...rest } = props; return <p className={twMerge(body({ tone, size }), className)} {...rest} />; }