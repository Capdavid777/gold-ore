import Image from 'next/image';
import Link from 'next/link';


export default function Footer() {
return (
<footer className="mt-24 border-t border-[hsl(var(--border-subtle))]">
<div className="container py-10 grid md:grid-cols-3 gap-8 text-sm text-text-muted">
<div>
<Image src="/brand/logo.svg" alt="Gold Ore" width={120} height={24} />
<p className="mt-3">Sandton, Gauteng, South Africa</p>
</div>
<div className="grid grid-cols-2 gap-4">
<div>
<p className="font-semibold text-[hsl(var(--text))]">Company</p>
<ul className="mt-3 space-y-2">
<li><Link href="/about" className="hover:text-brand-gold-400">About</Link></li>
<li><Link href="/operations" className="hover:text-brand-gold-400">Operations</Link></li>
<li><Link href="/esg" className="hover:text-brand-gold-400">ESG</Link></li>
</ul>
</div>
<div>
<p className="font-semibold text-[hsl(var(--text))]">Investors</p>
<ul className="mt-3 space-y-2">
<li><Link href="/investors" className="hover:text-brand-gold-400">Overview</Link></li>
<li><Link href="/news" className="hover:text-brand-gold-400">News</Link></li>
</ul>
</div>
</div>
<div className="md:text-right">© {new Date().getFullYear()} Gold Ore. All rights reserved.</div>
</div>
</footer>
);
}