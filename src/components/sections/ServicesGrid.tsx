import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Stagger, StaggerItem } from '../ui/Reveal';
import { serviceIcons, serviceKeys } from './services';

// Bento layout for five cards: three across the top, two wider ones below.
const spans = [
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-3',
  'sm:col-span-2 lg:col-span-3',
];

export function ServicesGrid() {
  const t = useTranslations('services.items');

  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {serviceKeys.map((key, i) => {
        const Icon = serviceIcons[key];
        return (
          <StaggerItem key={key} className={cn(spans[i])}>
            <Link href="/services" className="block h-full">
              <SpotlightCard className="h-full">
                <div className="flex h-full min-h-64 flex-col justify-between gap-10 p-7 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-violet/20 to-cyan/10 text-cyan">
                      <Icon className="size-5" strokeWidth={1.6} />
                    </span>
                  </div>
                  <div>
                    <h3 className="flex items-center justify-between gap-4 text-xl font-medium tracking-tight sm:text-2xl">
                      <span className="min-w-0 hyphens-auto break-words">{t(`${key}.title`)}</span>
                      <ArrowUpRight className="size-5 shrink-0 text-muted transition-all duration-500 ease-out-expo group-hover/card:rotate-45 group-hover/card:text-fg" />
                    </h3>
                    <p className="mt-3 max-w-md text-muted leading-relaxed">{t(`${key}.short`)}</p>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
