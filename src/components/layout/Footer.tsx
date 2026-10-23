import { useTranslations } from 'next-intl';
import { site } from '@/config/site';
import { Link } from '@/i18n/navigation';
import { serviceKeys } from '../sections/services';
import { Logo } from '../Logo';
import { AuroraWordmark } from '../ui/AuroraWordmark';
import { Container } from '../ui/Container';
import { LinkedInIcon } from '../ui/LinkedInIcon';
import { ComplianceSeals } from './ComplianceSeals';
import { mainNav } from './nav';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet/60 to-transparent"
      />
      <Container>
        <div className="grid gap-12 pb-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" aria-label={t('nav.home')}>
              <Logo />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {t('footer.tagline')}
            </p>
          </div>

          <FooterCol title={t('footer.company')} className="md:col-span-2">
            {mainNav
              .filter((n) => n.key !== 'services')
              .map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="footer-link">
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            <li>
              <Link href="/contact" className="footer-link">
                {t('nav.contact')}
              </Link>
            </li>
          </FooterCol>

          <FooterCol title={t('footer.services')} className="md:col-span-3">
            {serviceKeys.map((key) => (
              <li key={key}>
                <Link href="/services" className="footer-link">
                  {t(`services.items.${key}.title`)}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title={t('footer.contact')} className="md:col-span-3">
            <li>
              <a href={`mailto:${site.email}`} className="footer-link">
                {site.email}
              </a>
            </li>
            <li className="text-sm text-muted">{t('contact.info.hoursValue')}</li>
            <li className="text-sm text-muted">{site.location}</li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link inline-flex items-center gap-2"
              >
                <LinkedInIcon className="size-4" />
                LinkedIn
              </a>
            </li>
          </FooterCol>
        </div>

        <ComplianceSeals />
      </Container>

      {/* Oversized wordmark */}
      <div
        aria-hidden
        className="pointer-events-none select-none px-4 [mask-image:linear-gradient(to_bottom,black_20%,transparent_85%)] sm:px-8"
      >
        <AuroraWordmark className="mx-auto -mb-[3%] w-full max-w-[1400px] opacity-[0.4] dark:opacity-[0.32]" />
      </div>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t('footer.rights')}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/imprint" className="hover:text-fg transition-colors">
              {t('meta.pages.imprint.title')}
            </Link>
            <Link href="/privacy" className="hover:text-fg transition-colors">
              {t('meta.pages.privacy.title')}
            </Link>
            <span className="font-mono text-faint">{t('footer.made')}</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">{title}</h3>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  );
}
