export function canonical(pathname = '/') {
const base = process.env.SITE_URL ?? 'http://localhost:3000';
return `${base}${pathname}`;
}