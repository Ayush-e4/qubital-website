import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { QubitGlyph } from '@/components/ui/QubitGlyph';
import { rich } from '@/lib/rich';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />
      <Container className="relative text-center">
        <p className="font-mono text-[clamp(5rem,22vw,16rem)] font-light leading-none tracking-tighter text-fg/90">
          4<QubitGlyph value="0" />4
        </p>
        <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
          {t.rich('title', rich)}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-muted">{t('text')}</p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/">{t('button')}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
