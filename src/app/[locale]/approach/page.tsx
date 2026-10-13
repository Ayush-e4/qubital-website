import { FileText, Lock, Scale, Unplug } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { CTASection } from '@/components/sections/CTASection';
import { PageHero } from '@/components/sections/PageHero';
import { ProcessTimeline, type Step } from '@/components/sections/ProcessSteps';
import { Container } from '@/components/ui/Container';
import { Stagger, StaggerItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { initPage, pageMetadata } from '@/lib/page';
import { rich } from '@/lib/rich';

const principleIcons = [Scale, Unplug, Lock, FileText];

export function generateMetadata({ params }: PageProps<'/[locale]/approach'>) {
  return pageMetadata(params, 'approach', '/approach');
}

export default async function ApproachPage({ params }: PageProps<'/[locale]/approach'>) {
  await initPage(params);
  const t = await getTranslations('approach');
  const principles = t.raw('principles.items') as { title: string; text: string }[];

  return (
    <>
      <PageHero title={t.rich('hero.title', rich)} description={t('hero.description')} />

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading title={t.rich('steps.title', rich)} />
          <div className="mt-20">
            <ProcessTimeline steps={t.raw('steps.items') as Step[]} />
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading title={t.rich('principles.title', rich)} />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => {
              const Icon = principleIcons[i];
              return (
                <StaggerItem key={p.title}>
                  <SpotlightCard className="h-full">
                    <div className="flex h-full flex-col p-7">
                      <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-violet/20 to-cyan/10 text-cyan">
                        <Icon className="size-5" strokeWidth={1.6} />
                      </span>
                      <h3 className="mt-10 text-xl font-medium tracking-tight">{p.title}</h3>
                      <p className="mt-3 text-muted leading-relaxed">{p.text}</p>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
