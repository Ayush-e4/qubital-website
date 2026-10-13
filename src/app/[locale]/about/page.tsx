import { MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { BitVsQubit } from '@/components/sections/BitVsQubit';
import { CTASection } from '@/components/sections/CTASection';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
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
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t.rich('hero.title', rich)}
        description={t('hero.description')}
      />

      {/* Story behind the name */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={t('story.eyebrow')} title={t.rich('story.title', rich)} />
            <Reveal delay={0.15} className="mt-10">
              <BitVsQubit />
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
                  <Eyebrow>{t(`${key}.eyebrow`)}</Eyebrow>
                  <p className="mt-8 text-3xl font-medium leading-[1.15] tracking-tight text-balance sm:text-4xl">
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
          <SectionHeading eyebrow={t('values.eyebrow')} title={t.rich('values.title', rich)} />
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
                <Eyebrow>{t('location.eyebrow')}</Eyebrow>
                <h2 className="mt-6 text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl">
                  {t.rich('location.title', rich)}
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                  {t('location.text')}
                </p>
              </div>
              <div className="relative flex aspect-[4/3] items-center justify-center">
                {[0, 1, 2, 3].map((r) => (
                  <span
                    key={r}
                    aria-hidden
                    className="absolute rounded-full border border-cyan/20 animate-ping"
                    style={{
                      width: `${30 + r * 22}%`,
                      aspectRatio: '1',
                      animationDuration: '4s',
                      animationDelay: `${r * 0.8}s`,
                    }}
                  />
                ))}
                <span className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan text-bg shadow-[0_0_80px_-10px_rgb(63_227_242/0.8)]">
                  <MapPin className="size-8" />
                </span>
                <span className="absolute bottom-2 right-2 font-mono text-xs text-faint">
                  DE · 51.1657° N, 10.4515° E
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
