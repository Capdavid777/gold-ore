import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { Cinzel, Manrope } from 'next/font/google';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';


const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });


export const metadata: Metadata = {
title: 'Gold Ore',
description: 'Gold Ore — a gold mining company based in Gauteng, South Africa.'
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en" suppressHydrationWarning>
<body className={`${cinzel.variable} ${manrope.variable} font-sans bg-surface text-text`}>
<a href="#main" className="sr-only focus:not-sr-only focus-ring px-3 py-2 bg-brand-gold-700 text-black rounded-xl">Skip to content</a>
<Providers>
<Navbar />
{children}
<Footer />
</Providers>
</body>
</html>
);
}