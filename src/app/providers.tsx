'use client';
import { ThemeProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';
import { initAnalytics } from '@/lib/analytics';


export default function Providers({ children }: { children: ReactNode }) {
useEffect(() => { initAnalytics(); }, []);
return (
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
{children}
</ThemeProvider>
);
}