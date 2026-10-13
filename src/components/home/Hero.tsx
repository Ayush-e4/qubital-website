import { useTranslations } from 'next-intl';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { QubitGlyph } from '../ui/QubitGlyph';
import { Reveal } from '../ui/Reveal';
import { HeroVisual } from './HeroVisual';

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 size-[520px] rounded-full bg-violet/10 blur-[140px]"
      />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
        {/* Sphere: its own column on desktop, a faint backdrop behind the text on smaller screens */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-25 sm:opacity-35 lg:relative lg:inset-auto lg:z-auto lg:order-last lg:mx-auto lg:aspect-square lg:w-full lg:max-w-[40rem] lg:max-h-[calc(100svh-12rem)] lg:opacity-100"
        >
          <HeroVisual />
        </div>

        <div className="min-w-0">
          <Reveal>
            <h1 className="text-[clamp(2.75rem,8vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.035em] text-balance lg:text-[clamp(3rem,4.5vw,5rem)]">
              {t.rich('title', {
                // The serif sentence always starts on its own line
                em: (chunks) => (
                  <em className="accent text-gradient block pr-[0.08em]">{chunks}</em>
                ),
                zero: () => <QubitGlyph value="0" />,
                one: () => <QubitGlyph value="1" />,
              })}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">
              {t('description')}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact">{t('primary')}</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                {t('secondary')}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
