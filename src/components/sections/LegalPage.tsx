import { getTranslations } from 'next-intl/server';
import { Fragment } from 'react';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

type Section = { heading: string; body: string[] };

// A body line starting with "## " is a numbered sub-heading (e.g. "## 2.1 Server log files")
const SUBHEADING = '## ';

// Highlights [placeholders] so the client can spot what still needs filling in.
function withPlaceholders(text: string) {
  return text.split(/(\[[^\]]+\])/g).map((part, i) =>
    part.startsWith('[') ? (
      <mark key={i} className="rounded bg-violet/15 px-1 text-violet">
        {part}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export async function LegalPage({ page, locale }: { page: 'imprint' | 'privacy'; locale: string }) {
  const t = await getTranslations('legal');
  const sections = t.raw(`${page}.sections`) as Section[];

  return (
    <section className="pb-24 pt-40 sm:pb-32 sm:pt-48">
      <Container className="max-w-4xl">
        <Reveal>
          <h1 className="text-5xl font-medium tracking-tight sm:text-7xl">{t(`${page}.title`)}</h1>
        </Reveal>
        {/* The English legal texts are a courtesy translation */}
        {locale !== 'de' && (
          <Reveal delay={0.1}>
            <p className="mt-10 rounded-2xl border border-line bg-fg/[0.03] px-5 py-4 text-sm leading-relaxed text-muted">
              {t('bindingNote')}
            </p>
          </Reveal>
        )}
        <div className="mt-14 flex flex-col divide-y divide-line border-t border-line">
          {sections.map((s) => (
            <Reveal key={s.heading}>
              <div className="grid gap-4 py-10 md:grid-cols-3 md:gap-10">
                <h2 className="text-lg font-medium tracking-tight">{s.heading}</h2>
                <div className="flex flex-col gap-2 text-muted leading-relaxed md:col-span-2">
                  {s.body.map((line, i) =>
                    line.startsWith(SUBHEADING) ? (
                      <h3 key={i} className="mt-4 font-medium text-fg first:mt-0">
                        {line.slice(SUBHEADING.length)}
                      </h3>
                    ) : (
                      <p key={i}>{withPlaceholders(line)}</p>
                    )
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {t.has(`${page}.date`) && (
          <p className="mt-10 text-sm text-muted">
            {t('updated')}: {t(`${page}.date`)}
          </p>
        )}
      </Container>
    </section>
  );
}
