import { NextResponse } from 'next/server';
export const runtime = 'nodejs';

export async function GET() {
  const domain = process.env.AUTH0_DOMAIN!;
  const clientId = process.env.AUTH0_CLIENT_ID!;
  const returnTo = encodeURIComponent('https://www.goldoresa.com/login');
  return NextResponse.redirect(`https://${domain}/v2/logout?client_id=${clientId}&returnTo=${returnTo}`);
}
