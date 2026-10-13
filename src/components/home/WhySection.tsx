import { useTranslations } from 'next-intl';
import { rich } from '@/lib/rich';
import { Container } from '../ui/Container';
import { CountUp } from '../ui/CountUp';
import { SectionHeading } from '../ui/SectionHeading';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Stagger, StaggerItem } from '../ui/Reveal';

type Item = { prefix: string; value: number; suffix: string; label: string; text: string };

export function WhySection() {
  const t = useTranslations('home.why');
  const items = t.raw('items') as Item[];

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <SectionHeading title={t.rich('title', rich)} description={t('description')} />
          </div>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {items.map((item, i) => (
              <StaggerItem key={item.label} className={i % 2 ? 'sm:translate-y-12' : ''}>
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col p-7 sm:p-8">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
                      {item.label}
                    </span>
                    <CountUp
                      value={item.value}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      className="mt-6 block text-6xl font-medium tracking-tighter text-gradient sm:text-7xl"
                    />
                    <p className="mt-6 text-muted leading-relaxed">{item.text}</p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
