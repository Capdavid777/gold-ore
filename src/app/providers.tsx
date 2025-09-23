'use client';

import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  // Turn off tab-switch re-fetch to avoid flicker on static pages
  return <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>;
}
