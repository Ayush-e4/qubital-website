import { useTranslations } from 'next-intl';
import { site } from '@/config/site';
import { rich } from '@/lib/rich';
import { ButtonAnchor, ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

export function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-20 text-center sm:rounded-[2.5rem] sm:px-16 sm:py-28">
            {/* rotating conic glow */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow opacity-40 [animation-duration:22s]"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgb(139 123 255 / 0.5) 60deg, transparent 120deg, transparent 180deg, rgb(63 227 242 / 0.4) 240deg, transparent 300deg)',
              }}
            />
            <div
              aria-hidden
              className="absolute inset-px -z-10 rounded-[calc(2rem-1px)] bg-surface/90 backdrop-blur-3xl sm:rounded-[calc(2.5rem-1px)]"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-70" />

            <h2 className="mx-auto max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              {t.rich('title', rich)}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
              {t('description')}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="/contact">{t('primary')}</ButtonLink>
              <ButtonAnchor href={`mailto:${site.email}`} variant="secondary">
                {t('secondary')}
              </ButtonAnchor>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
