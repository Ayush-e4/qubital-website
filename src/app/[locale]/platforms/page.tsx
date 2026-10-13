import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/sections/PageHero';
import type { ServiceKey } from '@/components/sections/services';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Link } from '@/i18n/navigation';
import { initPage, pageMetadata } from '@/lib/page';
import { rich } from '@/lib/rich';

// Names only, no vendor logos, and "work with" rather than "partner": nothing
// here claims an official partnership the client has not confirmed.
type Group = {
  key: string;
  service: ServiceKey;
  title: string;
  text: string;
  items: { name: string; vendor: string; text: string }[];
};

export function generateMetadata({ params }: PageProps<'/[locale]/platforms'>) {
  return pageMetadata(params, 'platforms', '/platforms');
}

export default async function PlatformsPage({ params }: PageProps<'/[locale]/platforms'>) {
  await initPage(params);
  const t = await getTranslations('platforms');
  const tServices = await getTranslations('services.items');
  const groups = t.raw('groups') as Group[];

  return (
    <>
      <PageHero title={t.rich('hero.title', rich)} description={t('hero.description')} />

      <section className="pb-16 sm:pb-24">
        <Container>
          {groups.map((group) => (
            <Reveal key={group.key}>
              <article
                id={group.key}
                className="grid scroll-mt-32 gap-8 border-t border-line py-14 lg:grid-cols-12 lg:gap-12 lg:py-20"
              >
                <div className="lg:col-span-4">
                  <h2 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
                    {group.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">
                    {group.text}
                  </p>
                  <Link
                    href={{ pathname: '/services', hash: group.service }}
                    className="group/link mt-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <span>
                      {t('service')}: {tServices(`${group.service}.title`)}
                    </span>
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:rotate-45" />
                  </Link>
                </div>
                <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-8" stagger={0.05}>
                  {group.items.map((item) => (
                    <StaggerItem key={item.name}>
                      <SpotlightCard className="h-full">
                        <div className="flex h-full flex-col p-7">
                          <span className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
                            {item.vendor}
                          </span>
                          <h3 className="mt-3 text-2xl font-medium tracking-tight">{item.name}</h3>
                          <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
                        </div>
                      </SpotlightCard>
                    </StaggerItem>
                  ))}
                </Stagger>
              </article>
            </Reveal>
          ))}

          <Reveal>
            <div className="relative mt-4 overflow-hidden rounded-[2rem] border border-line bg-surface p-8 sm:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-violet/25 blur-[100px]"
              />
              <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                <div>
                  <h2 className="text-3xl font-medium tracking-tight">{t('note.title')}</h2>
                  <p className="mt-3 max-w-xl text-lg text-muted">{t('note.text')}</p>
                </div>
                <ButtonLink href="/contact">{t('note.button')}</ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
