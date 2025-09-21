import Hero from '@/components/ui/Hero';
import { Section } from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/Card';
import ESGBanner from '@/components/sections/ESGBanner';
import ContactCTA from '@/components/sections/ContactCTA';
import Image from 'next/image';

export default function Home() {
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
        /* Replace text title with the same logo used in the footer */
        title={
          <span className="inline-block w-[220px] sm:w-[280px] md:w-[360px] lg:w-[440px]">
            <Image
              src="/brand/logo-footer.png" /* change to your actual footer-logo path if different */
              alt="Gold Ore"
              width={880}
              height={220}
              priority
              className="h-auto w-full object-contain select-none"
            />
          </span>
        }
        titleTag="div" /* logo should not be inside an <h1> */
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

      <ESGBanner
        imageSrc="/media/esg-hero.jpg"
        imageAlt="Mine headgear at sunrise"
        title="Sustainability at our core"
        subtitle="We align with global best practices, measure our impact transparently, and invest in projects that create shared value."
        ctaLabel="Our ESG Approach"
        ctaHref="/esg"
        align="left"
        minVH={63}
      />

      <ContactCTA />
    </main>
  );
}
