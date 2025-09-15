/** @type {import('next').NextConfig} */
const nextConfig = {
experimental: { typedRoutes: true },
images: {
remotePatterns: [{ protocol: 'https', hostname: '**' }]
},
async headers() {
// Security headers sane defaults (can be tightened per domain)
return [
{
source: '/(.*)',
headers: [
{ key: 'X-Frame-Options', value: 'SAMEORIGIN' },
{ key: 'X-Content-Type-Options', value: 'nosniff' },
{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
{ key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' }
]
}
];
}
};
export default nextConfig;