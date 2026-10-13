import { ArrowUpRight, GraduationCap, House, Laptop, Network, Users, Zap } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/sections/PageHero';
import { arrowRotate, ButtonAnchor } from '@/components/ui/Button';
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
  const roles = t.raw('roles.items') as { title: string; meta: string }[];

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t.rich('hero.title', rich)}
        description={t('hero.description')}
      />

      <section className="pb-24 sm:pb-32">
        <Container>
          <SectionHeading eyebrow={t('perks.eyebrow')} title={t.rich('perks.title', rich)} />
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

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow={t('roles.eyebrow')} title={t.rich('roles.title', rich)} />
          <ul className="mt-14 border-t border-line">
            {roles.map((role, i) => (
              <Reveal key={role.title} delay={i * 0.05}>
                <li>
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent(role.title)}`}
                    className="group relative flex items-center justify-between gap-6 overflow-hidden border-b border-line py-8 sm:py-10"
                  >
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-r from-violet/10 to-cyan/5 transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
                    <span className="relative flex items-baseline gap-6">
                      <span>
                        <span className="block text-2xl font-medium tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-2 sm:text-4xl">
                          {role.title}
                        </span>
                        <span className="mt-2 block font-mono text-xs text-muted">{role.meta}</span>
                      </span>
                    </span>
                    <span className="relative flex items-center gap-3 text-sm text-muted transition-colors group-hover:text-fg">
                      <span className="hidden md:inline">{t('roles.apply')}</span>
                      <span className="flex size-11 items-center justify-center rounded-full border border-line-strong transition-colors duration-200 group-hover:border-transparent group-hover:bg-fg group-hover:text-bg">
                        <ArrowUpRight className={arrowRotate} />
                      </span>
                    </span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <div className="relative mt-16 overflow-hidden rounded-[2rem] border border-line bg-surface p-8 sm:p-12">
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
