import Link from 'next/link';
import { headers } from 'next/headers';
import { getDictionary } from '@/lib/i18n/translations';

export default async function NotFound() {
  const locale = (await headers()).get('x-locale') || 'en';
  const t = getDictionary(locale);
  const nf = t.not_found;

  const links = [
    { href: locale === 'de' ? '/de/about' : '/about',    label: t.nav.about },
    { href: locale === 'de' ? '/de/services' : '/services', label: t.nav.services },
    { href: locale === 'de' ? '/de/contact' : '/contact',  label: t.nav.contact },
  ];

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 bg-surface-canvas text-on-surface relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Glowing 404 number */}
        <span className="text-[6rem] xs:text-[8rem] sm:text-[10rem] leading-none font-black bg-gradient-to-b from-primary/80 to-primary/20 bg-clip-text text-transparent select-none tracking-tighter mb-2">
          {nf.code}
        </span>

        <h1 className="text-3xl md:text-4xl font-semibold text-on-surface mb-4 tracking-tight">
          {nf.heading}
        </h1>
        <p className="text-secondary text-lg mb-10 leading-relaxed">
          {nf.description}
        </p>

        {/* Primary CTA */}
        <Link
          href={locale === 'de' ? '/de' : '/'}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 mb-10 shadow-md"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          {nf.cta}
        </Link>

        {/* Secondary links */}
        <p className="text-xs font-mono text-secondary/70 uppercase tracking-widest mb-4">
          {nf.links_heading}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg border border-outline-variant text-sm text-on-surface-variant hover:border-primary/40 hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom location badge */}
      <div className="absolute bottom-8 flex items-center gap-2 text-xs font-mono text-secondary/60">
        <span className="material-symbols-outlined text-[14px]">location_on</span>
        <span>Herzogenaurach, Bavaria · qubital.eu</span>
      </div>
    </main>
  );
}
