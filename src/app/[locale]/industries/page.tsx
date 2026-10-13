import { getTranslations } from 'next-intl/server';
import { CTASection } from '@/components/sections/CTASection';
import { industryIcons, type Industry } from '@/components/sections/industries';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Stagger, StaggerItem } from '@/components/ui/Reveal';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { initPage, pageMetadata } from '@/lib/page';
import { rich } from '@/lib/rich';

export function generateMetadata({ params }: PageProps<'/[locale]/industries'>) {
  return pageMetadata(params, 'industries', '/industries');
}

export default async function IndustriesPage({ params }: PageProps<'/[locale]/industries'>) {
  await initPage(params);
  const t = await getTranslations('industries');
  const items = t.raw('items') as Industry[];

  return (
    <>
      <PageHero title={t.rich('hero.title', rich)} description={t('hero.description')} />

      <section className="pb-24 sm:pb-32">
        <Container>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
            {items.map((item) => {
              const Icon = industryIcons[item.key];
              return (
                <StaggerItem key={item.key}>
                  <SpotlightCard className="h-full">
                    <div className="flex h-full min-h-44 flex-col justify-between gap-8 p-7">
                      <div className="flex items-start justify-between">
                        <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-violet/20 to-cyan/10 text-cyan transition-transform duration-700 group-hover/card:scale-110">
                          <Icon className="size-5" strokeWidth={1.6} />
                        </span>
                      </div>
                      <h2 className="text-xl font-medium tracking-tight text-balance">
                        {item.title}
                      </h2>
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
