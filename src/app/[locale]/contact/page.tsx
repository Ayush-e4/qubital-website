import { CalendarClock, Clock, Mail, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/components/sections/ContactForm';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { site } from '@/config/site';
import { LinkedInIcon } from '@/components/ui/LinkedInIcon';
import { initPage, pageMetadata } from '@/lib/page';
import { rich } from '@/lib/rich';

export function generateMetadata({ params }: PageProps<'/[locale]/contact'>) {
  return pageMetadata(params, 'contact', '/contact');
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  await initPage(params);
  const t = await getTranslations('contact');

  const info = [
    { icon: Mail, label: t('info.email'), value: site.email, href: `mailto:${site.email}` },
    { icon: LinkedInIcon, label: 'LinkedIn', value: 'Qubital GmbH', href: site.linkedin },
    { icon: CalendarClock, label: t('info.hours'), value: t('info.hoursValue') },
    { icon: MapPin, label: t('info.location'), value: site.location },
  ];

  return (
    <>
      <PageHero title={t.rich('hero.title', rich)} description={t('hero.description')} />

      <section className="pb-24 sm:pb-32">
        <Container className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>
          <div className="flex flex-col gap-4 lg:col-span-5">
            {info.map(({ icon: Icon, label, value, href }, i) => {
              const content = (
                <SpotlightCard>
                  <div className="flex items-center gap-5 p-6">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-violet/20 to-cyan/10 text-cyan">
                      <Icon className="size-5" strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-xs uppercase tracking-[0.2em] text-faint">
                        {label}
                      </span>
                      <span className="mt-1 block truncate text-lg font-medium">{value}</span>
                    </span>
                  </div>
                </SpotlightCard>
              );
              return (
                <Reveal key={label} delay={0.1 + i * 0.08}>
                  {href ? (
                    <a
                      href={href}
                      {...(href.startsWith('http') && {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      })}
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </Reveal>
              );
            })}
            <Reveal delay={0.35}>
              <div className="flex items-start gap-4 rounded-3xl border border-dashed border-line-strong p-6 text-muted">
                <Clock className="mt-0.5 size-5 shrink-0 text-cyan" strokeWidth={1.6} />
                <p className="leading-relaxed">{t('info.response')}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
