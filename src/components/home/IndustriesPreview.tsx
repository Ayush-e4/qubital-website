import { useTranslations } from 'next-intl';
import { rich } from '@/lib/rich';
import { industryIcons, type Industry } from '../sections/industries';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { Marquee } from '../ui/Marquee';
import { SectionHeading } from '../ui/SectionHeading';

export function IndustriesPreview() {
  const t = useTranslations();
  const items = t.raw('industries.items') as Industry[];

  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <Container>
        <SectionHeading
          align="center"
          title={t.rich('home.industries.title', rich)}
          description={t('home.industries.description')}
        />
      </Container>
      <div className="mt-16 flex flex-col gap-4">
        {[items.slice(0, 4), items.slice(4)].map((row, r) => (
          <Marquee key={r} duration={40} reverse={r === 1}>
            {row.map((item) => {
              const Icon = industryIcons[item.key];
              return (
                <span
                  key={item.key}
                  className="mx-2 flex items-center gap-4 rounded-full border border-line bg-surface/70 py-3 pl-3 pr-7"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-violet/25 to-cyan/10 text-cyan">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <span className="whitespace-nowrap text-lg font-medium">{item.title}</span>
                </span>
              );
            })}
          </Marquee>
        ))}
      </div>
      <div className="mt-14 flex justify-center">
        <ButtonLink href="/industries" variant="secondary">
          {t('home.industries.link')}
        </ButtonLink>
      </div>
    </section>
  );
}
