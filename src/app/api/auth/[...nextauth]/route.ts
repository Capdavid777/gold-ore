import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// Make sure we're not on the Edge runtime (NextAuth needs Node)
export const runtime = 'nodejs';
// Avoid caching the session route
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
