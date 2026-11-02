import { Check, Compass, LifeBuoy, Users, Wrench } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { CTASection } from '@/components/sections/CTASection';
import { PageHero } from '@/components/sections/PageHero';
import { serviceIcons, serviceKeys, type ServiceKey } from '@/components/sections/services';
import { Accordion } from '@/components/ui/Accordion';
import { Clip, type ClipName } from '@/components/ui/Clip';
import { Container } from '@/components/ui/Container';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { initPage, pageMetadata } from '@/lib/page';
import { rich } from '@/lib/rich';

// Advisory, implementation, managed services, team extension
const modelIcons = [Compass, Wrench, LifeBuoy, Users];

// One product clip per area (rendered with Remotion)
const serviceClips: Record<ServiceKey, ClipName> = {
  pam: 'just-in-time',
  iga: 'access-request',
  ciam: 'passkey',
  wiam: 'workforce',
  ai: 'agent-scope',
};

const clipLabels = {
  'access-request': 'accessRequest',
  'just-in-time': 'justInTime',
  passkey: 'passkey',
  workforce: 'workforce',
  'agent-scope': 'agentScope',
} as const satisfies Record<ClipName, string>;

export function generateMetadata({ params }: PageProps<'/[locale]/services'>) {
  return pageMetadata(params, 'services', '/services');
}

export default async function ServicesPage({ params }: PageProps<'/[locale]/services'>) {
  await initPage(params);
  const t = await getTranslations('services');
  const tClips = await getTranslations('clips');
  const models = t.raw('page.models.items') as { title: string; text: string }[];
  const faq = t.raw('page.faq.items') as { q: string; a: string }[];

  // FAQ structured data, built from the same items the accordion renders.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // `<` escaped so no value can close the script element
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />
      <PageHero title={t.rich('page.title', rich)} description={t('page.description')} />

      <section className="pb-24 sm:pb-32">
        <Container>
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[key];
            const points = t.raw(`items.${key}.points`) as string[];
            const flip = i % 2 === 1;
            return (
              <Reveal key={key}>
                {/* Text on one side, clip on the other, alternating per area. The clip
                    stretches to the text's height so both edges line up; the
                    video is letterboxed in the page colour, never cropped. */}
                <article
                  id={key}
                  className="group grid scroll-mt-32 gap-10 border-t border-line py-14 lg:grid-cols-2 lg:gap-16 lg:py-20"
                >
                  <div className={flip ? 'lg:order-2' : undefined}>
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-violet/20 to-cyan/10 text-cyan transition-transform duration-700 group-hover:rotate-[-8deg] group-hover:scale-110">
                      <Icon className="size-5" strokeWidth={1.6} />
                    </span>
                    <h2 className="mt-6 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
                      {t(`items.${key}.title`)}
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">
                      {t(`items.${key}.description`)}
                    </p>
                    <h3 className="mt-8 text-sm text-muted">{t('page.deliverables')}</h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {points.map((p) => (
                        <li
                          key={p}
                          className="flex items-center gap-3 rounded-2xl border border-line bg-fg/[0.02] px-4 py-3 text-sm text-fg/90"
                        >
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-cyan">
                            <Check className="size-3.5" />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Clip
                    name={serviceClips[key]}
                    label={tClips(clipLabels[serviceClips[key]])}
                    fill
                    className={flip ? 'lg:order-1' : undefined}
                  />
                </article>
              </Reveal>
            );
          })}
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading title={t.rich('page.models.title', rich)} />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {models.map((m, i) => {
              const ModelIcon = modelIcons[i];
              return (
                <StaggerItem key={m.title}>
                  <SpotlightCard className="h-full">
                    <div className="flex h-full flex-col p-8">
                      <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-violet/20 to-cyan/10 text-cyan">
                        <ModelIcon className="size-5" strokeWidth={1.6} />
                      </span>
                      <h3 className="mt-10 text-2xl font-medium tracking-tight">{m.title}</h3>
                      <p className="mt-3 text-muted leading-relaxed">{m.text}</p>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading title={t.rich('page.faq.title', rich)} />
          </div>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <Accordion items={faq} />
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
