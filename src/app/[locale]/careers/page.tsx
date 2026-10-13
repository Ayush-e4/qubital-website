import { GraduationCap, House, Laptop, Network, Users, Zap } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/sections/PageHero';
import { ButtonAnchor } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { site } from '@/config/site';
import { initPage, pageMetadata } from '@/lib/page';
import { rich } from '@/lib/rich';

const perkIcons = [House, GraduationCap, Laptop, Zap, Network, Users];

export function generateMetadata({ params }: PageProps<'/[locale]/careers'>) {
  return pageMetadata(params, 'careers', '/careers');
}

export default async function CareersPage({ params }: PageProps<'/[locale]/careers'>) {
  await initPage(params);
  const t = await getTranslations('careers');
  const perks = t.raw('perks.items') as { title: string; text: string }[];

  return (
    <>
      <PageHero title={t.rich('hero.title', rich)} description={t('hero.description')} />

      <section className="pb-24 sm:pb-32">
        <Container>
          <SectionHeading title={t.rich('perks.title', rich)} />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p, i) => {
              const Icon = perkIcons[i];
              return (
                <StaggerItem key={p.title}>
                  <SpotlightCard className="h-full">
                    <div className="p-8">
                      <Icon className="size-6 text-cyan" strokeWidth={1.5} />
                      <h3 className="mt-8 text-xl font-medium tracking-tight">{p.title}</h3>
                      <p className="mt-3 text-muted leading-relaxed">{p.text}</p>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-8 sm:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-violet/25 blur-[100px]"
              />
              <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                <div>
                  <h3 className="text-3xl font-medium tracking-tight">{t('open.title')}</h3>
                  <p className="mt-3 max-w-lg text-lg text-muted">{t('open.text')}</p>
                </div>
                <ButtonAnchor
                  href={`mailto:${site.email}?subject=${encodeURIComponent(t('open.button'))}`}
                >
                  {t('open.button')}
                </ButtonAnchor>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
