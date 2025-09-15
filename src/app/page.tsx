import Hero from '@/components/ui/Hero';
import GoldWordmark from '@/components/ui/GoldWordmark';
import { Section } from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/Card';
import ESGBanner from '@/components/sections/ESGBanner';
import ContactCTA from '@/components/sections/ContactCTA';

export default function Home() {
  // Card content
  const cards = [
    {
      title: 'Geological Location',
      body:
        'Geologically located on the western flank of the East Rand Gold Basin of South Africa, which is world renowned for its gold production.',
    },
    {
      title: 'Mining Data',
      body:
        'The Company has acquired all the historical mining and exploration data of the Turnbridge and New Kleinfontein assets that are covered under the Prospecting right.',
    },
    {
      title: 'Infrastructure',
      body:
        'The Project is in a well-established gold producing area with good infrastructure. The gold processing will be on a toll treatment basis with nearby processing plants with capacity.',
    },
  ];

  return (
    <main id="main">
      <Hero
        title={<GoldWordmark as="span" text="GOLD ORE" animated className="uppercase tracking-wide" />}
        subtitle="A gold mining company based in Gauteng, South Africa."
        video={{
          sources: [
            { src: '/media/hero.webm', type: 'video/webm' },
            { src: '/media/hero.mp4', type: 'video/mp4' },
          ],
          poster: '/media/hero-poster.jpg',
          preload: 'metadata',
        }}
      />

      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <Card key={c.title}>
              <CardContent>
                <h3 className="font-display text-2xl mb-2">{c.title}</h3>
                <p className="text-text-muted">{c.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* ESG banner */}
      <ESGBanner
        imageSrc="/media/esg-hero.jpg"
        imageAlt="Mine headgear at sunrise"
        title="Sustainability at our core"
        subtitle="We align with global best practices, measure our impact transparently, and invest in projects that create shared value."
        ctaLabel="Our ESG Approach"
        ctaHref="/esg" // ensure the CTA matches main menu + footer
        align="left"
        minVH={70}
      />

      {/* NEW: Contact CTA section */}
      <ContactCTA />
    </main>
  );
}
