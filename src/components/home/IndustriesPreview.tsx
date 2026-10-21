import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { rich } from '@/lib/rich';
import {
  industryFocus,
  industryIcons,
  industryImages,
  type Industry,
} from '../sections/industries';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { Marquee } from '../ui/Marquee';
import { SectionHeading } from '../ui/SectionHeading';

// A slow filmstrip of the industry photos. The marquee duplicates its children
// for the loop, so the cards are not links (the copy would be focusable while
// aria-hidden); the button below goes to the industries page. Hover pauses it.
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
      <Marquee duration={75} className="mt-16">
        {items.map((item) => {
          const Icon = industryIcons[item.key];
          return (
            <figure
              key={item.key}
              className="group/card relative mx-2 h-80 w-60 shrink-0 overflow-hidden rounded-3xl border border-line sm:h-96 sm:w-72"
            >
              <Image
                src={industryImages[item.key]}
                alt=""
                fill
                sizes="(min-width: 640px) 288px, 240px"
                placeholder="blur"
                className="object-cover transition-transform duration-700 ease-out-expo group-hover/card:scale-105"
                style={{ objectPosition: industryFocus[item.key] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-white backdrop-blur-md">
                  <Icon className="size-5" strokeWidth={1.6} />
                </span>
                <span className="text-lg font-medium leading-tight text-white">{item.title}</span>
              </figcaption>
            </figure>
          );
        })}
      </Marquee>
      <div className="mt-14 flex justify-center">
        <ButtonLink href="/industries" variant="secondary">
          {t('home.industries.link')}
        </ButtonLink>
      </div>
    </section>
  );
}
