import { getTranslations } from 'next-intl/server';
import bavaria from '@/assets/photos/bavaria.jpg';
import { BitVsQubit } from '@/components/sections/BitVsQubit';
import { CTASection } from '@/components/sections/CTASection';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Photo } from '@/components/ui/Photo';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { initPage, pageMetadata } from '@/lib/page';
import { rich } from '@/lib/rich';

export function generateMetadata({ params }: PageProps<'/[locale]/about'>) {
  return pageMetadata(params, 'about', '/about');
}

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  await initPage(params);
  const t = await getTranslations('about');
  const paragraphs = t.raw('story.paragraphs') as string[];
  const values = t.raw('values.items') as { title: string; text: string }[];

  return (
    <>
      <PageHero title={t.rich('hero.title', rich)} description={t('hero.description')} />

      {/* Story behind the name */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading title={t.rich('story.title', rich)} />
            <Reveal delay={0.15} className="mt-10">
              <BitVsQubit bit={t.raw('story.bit')} qubit={t.raw('story.qubit')} />
            </Reveal>
          </div>
          <div className="flex flex-col gap-8 lg:col-span-7 lg:pt-24">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p
                  className={
                    i === 0
                      ? 'text-2xl leading-snug tracking-tight text-fg text-pretty sm:text-3xl'
                      : 'text-lg leading-relaxed text-muted text-pretty'
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission & vision */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-4 lg:grid-cols-2">
          {(['mission', 'vision'] as const).map((key, i) => (
            <Reveal key={key} delay={i * 0.1}>
              <div className="relative h-full overflow-hidden rounded-[2rem] border border-line bg-surface p-8 sm:p-12">
                <div
                  aria-hidden
                  className={
                    'pointer-events-none absolute -top-24 size-72 rounded-full blur-[100px] ' +
                    (i === 0 ? '-left-16 bg-violet/25' : '-right-16 bg-cyan/20')
                  }
                />
                <div className="relative">
                  <h2 className="text-sm font-medium text-muted">{t(`${key}.label`)}</h2>
                  <p className="mt-4 text-3xl font-medium leading-[1.15] tracking-tight text-balance sm:text-4xl">
                    {key === 'mission' ? t.rich('mission.title', rich) : t('vision.title')}
                  </p>
                  <span className="mt-12 block font-mono text-7xl font-light text-fg/[0.06]">
                    {i}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading title={t.rich('values.title', rich)} />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col p-8">
                    <h3 className="text-2xl font-medium tracking-tight">{v.title}</h3>
                    <p className="mt-3 text-muted leading-relaxed">{v.text}</p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Location */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="relative grid items-center gap-10 overflow-hidden rounded-[2rem] border border-line bg-surface p-8 sm:p-14 lg:grid-cols-2">
              <div aria-hidden className="absolute inset-0 bg-grid opacity-80" />
              <div className="relative">
                <h2 className="text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl">
                  {t.rich('location.title', rich)}
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                  {t('location.text')}
                </p>
              </div>
              <Photo
                src={bavaria}
                alt={t('location.photoAlt')}
                caption={t('location.photoCaption')}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="relative aspect-[4/3]"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
