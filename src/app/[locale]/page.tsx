import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { IndustriesPreview } from '@/components/home/IndustriesPreview';
import { PhotoStrip } from '@/components/home/PhotoStrip';
import { TechMarquee } from '@/components/home/TechMarquee';
import { WhySection } from '@/components/home/WhySection';
import { CTASection } from '@/components/sections/CTASection';
import { ProcessRow, type Step } from '@/components/sections/ProcessSteps';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { ButtonLink } from '@/components/ui/Button';
import { Clip } from '@/components/ui/Clip';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { ScrollText } from '@/components/ui/ScrollText';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { initPage } from '@/lib/page';
import { rich } from '@/lib/rich';

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  await initPage(params);
  const t = await getTranslations('home');
  const tSteps = await getTranslations('approach.steps');
  const tCommon = await getTranslations('common');
  const tClips = await getTranslations('clips');

  return (
    <>
      <Hero />
      <TechMarquee />

      <section className="py-28 sm:py-40">
        <Container>
          <ScrollText
            text={t('statement')}
            className="max-w-5xl text-3xl font-medium leading-[1.2] tracking-tight sm:text-5xl lg:text-[3.5rem]"
          />
        </Container>
      </section>

      <PhotoStrip />

      <section className="py-24 sm:py-32">
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              title={t.rich('services.title', rich)}
              description={t('services.description')}
            />
            <ButtonLink href="/services" variant="secondary" className="self-start lg:self-auto">
              {tCommon('allServices')}
            </ButtonLink>
          </div>
          <ServicesGrid />
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              title={t.rich('practice.title', rich)}
              description={t('practice.description')}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <Clip name="access-request" label={tClips('accessRequest')} />
          </Reveal>
        </Container>
      </section>

      <WhySection />

      <section className="py-24 sm:py-32">
        <Container>
          <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              title={t.rich('process.title', rich)}
              description={t('process.description')}
            />
            <ButtonLink href="/approach" variant="secondary" className="self-start lg:self-auto">
              {t('process.link')}
            </ButtonLink>
          </div>
          <ProcessRow steps={tSteps.raw('items') as Step[]} />
        </Container>
      </section>

      <IndustriesPreview />
      <CTASection />
    </>
  );
}
