import { Button } from '@/components/ui/Button';

export default function ContactCTA() {
  return (
    <section
      aria-label="Contact call to action"
      className="relative bg-gradient-to-r from-[hsl(var(--gold-500))] to-[hsl(var(--gold-700))] text-center"
    >
      <div className="container mx-auto px-6 py-20 md:py-28">
        <h2 className="font-display text-3xl md:text-5xl tracking-tight text-[hsl(var(--text))]">
          Partner with a performance-driven team
        </h2>
        {/* Changed to darker, reusable utility */}
        <p className="mt-4 text-lg text-cta-dark">
          Speak to our leadership and investor relations team today.
        </p>
        <div className="mt-8">
          <Button href="/contact" variant="secondary" size="lg">
            Contact the team
          </Button>
        </div>
      </div>
    </section>
  );
}
