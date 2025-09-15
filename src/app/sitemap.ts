export default function sitemap() {
const base = process.env.SITE_URL ?? 'http://localhost:3000';
const urls = ['', '/about', '/operations', '/esg', '/investors', '/news'];
return urls.map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));
}