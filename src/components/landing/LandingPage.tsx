import { Check } from 'lucide-react';
import { JsonLd } from '@/components/blog/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { Accordion } from '@/components/ui/Accordion';
import { ButtonAnchor } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import type { LandingContent, LandingSection } from '@/content/landing/types';
import { landingJsonLd } from '@/lib/landing';

/**
 * Renders a topic landing page from its JSON copy (src/content/landing).
 * Links in the copy are full localized paths (/de/kontakt), so they are plain
 * anchors rather than typed next-intl links.
 */
export function LandingPage({ page }: { page: LandingContent }) {
  const { hero } = page;
  return (
    <>
      <JsonLd data={landingJsonLd(page)} />

      <PageHero title={hero.h1} description={hero.lead}>
        <Reveal delay={0.24}>
          <p className="mt-8 font-mono text-xs uppercase tracking-wider text-cyan">
            {hero.eyebrow}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <ButtonAnchor href={hero.cta.href}>{hero.cta.label}</ButtonAnchor>
            <ButtonAnchor href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </ButtonAnchor>
          </div>
        </Reveal>
        <Reveal delay={0.32}>
          <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
            {hero.facts.map((f) => (
              <div key={f.label} className="bg-surface/90 p-6 backdrop-blur">
                <dt className="font-mono text-3xl text-gradient">{f.value}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{f.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </PageHero>

      {page.sections.map((s) => (
        <Section key={s.id} section={s} />
      ))}
    </>
  );
}

function Section({ section: s }: { section: LandingSection }) {
  if (s.type === 'proof' && !s.content) return null;

  if (s.type === 'cta') {
    return (
      <section id={s.id} className="scroll-mt-32 py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-20 text-center sm:rounded-[2.5rem] sm:px-16 sm:py-24">
              <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-70" />
              <h2 className="mx-auto max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl">
                {s.heading}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
                {s.text}
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <ButtonAnchor href={s.cta.href}>{s.cta.label}</ButtonAnchor>
                <ButtonAnchor href={s.secondary.href} variant="secondary">
                  {s.secondary.label}
                </ButtonAnchor>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    );
  }

  if (s.type === 'faq') {
    return (
      <section id={s.id} className="scroll-mt-32 py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading title={s.heading} />
          </div>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <Accordion items={s.items} />
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section id={s.id} className="scroll-mt-32 py-20 sm:py-24">
      <Container>
        <SectionHeading title={s.heading} description={'intro' in s ? s.intro : undefined} />
        <div className="mt-12">
          <Body section={s} />
        </div>
      </Container>
    </section>
  );
}

function Body({ section: s }: { section: LandingSection }) {
  switch (s.type) {
    case 'text':
      return (
        <Reveal className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted text-pretty">
          {s.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      );

    case 'table':
      return (
        <Reveal>
          <div className="overflow-x-auto rounded-3xl border border-line bg-surface/70">
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
              <thead>
                <tr>
                  {s.columns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="border-b border-line px-5 py-4 text-sm font-normal text-muted"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r) => (
                  <tr key={r[0]} className="align-top">
                    {r.map((cell, i) =>
                      i === 0 ? (
                        <th
                          key={cell}
                          scope="row"
                          className="w-[28%] border-b border-line px-5 py-4 font-medium"
                        >
                          {cell}
                        </th>
                      ) : (
                        <td key={cell} className="border-b border-line px-5 py-4 text-muted">
                          {cell}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {s.after && (
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted text-pretty">
              {s.after}
            </p>
          )}
        </Reveal>
      );

    case 'steps':
      return (
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((step, i) => (
            <StaggerItem key={step.title}>
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col p-8">
                  <span className="font-mono text-sm text-cyan">0{i + 1}</span>
                  <h3 className="mt-8 text-2xl font-medium tracking-tight">{step.title}</h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">
                    {step.duration}
                  </p>
                  <p className="mt-4 leading-relaxed text-muted">{step.text}</p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      );

    case 'checklist':
    case 'features':
      return (
        <>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.items.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex h-full gap-4 rounded-3xl border border-line bg-fg/[0.02] p-6">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-cyan">
                    <Check className="size-4" />
                  </span>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          {s.link && (
            <p className="mt-10">
              <a
                href={s.link.href}
                className="text-cyan underline-offset-4 transition-colors hover:underline"
              >
                {s.link.label} →
              </a>
            </p>
          )}
        </>
      );

    case 'proof':
      return s.content ? (
        <Reveal className="max-w-3xl rounded-3xl border border-line bg-surface/70 p-8">
          <p className="text-lg leading-relaxed">{s.content.text}</p>
          {s.content.quote && (
            <blockquote className="mt-6 border-l-2 border-cyan pl-4 text-muted">
              {s.content.quote}
              {s.content.source && <cite className="mt-2 block text-sm">{s.content.source}</cite>}
            </blockquote>
          )}
        </Reveal>
      ) : null;

    default:
      return null;
  }
}
