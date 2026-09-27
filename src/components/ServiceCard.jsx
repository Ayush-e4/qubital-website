import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

/**
 * The one service card, used by both `/` and `/services`.
 *
 * Before this, the same six services were drawn three different ways — a white
 * bento card on the homepage, a navy card on /services, and a shared shell in
 * ui/bento-grid.jsx — so they drifted apart and neither page's pattern became
 * recognisable. The card is now defined once; the two pages differ only in
 * density: `/services` passes `items` (the detail bullets), the homepage passes
 * `href`/`ctaLabel` (the teaser link).
 *
 * @param {{
 *   id?: string,
 *   icon?: import('react').ReactNode,
 *   title: string,
 *   description: string,
 *   items?: string[],
 *   href?: string,
 *   ctaLabel?: string,
 *   className?: string,
 * }} props
 */
export default function ServiceCard({
  id,
  icon,
  title,
  description,
  items,
  href,
  ctaLabel,
  className = '',
}) {
  return (
    <div
      id={id}
      className={`group relative h-full rounded-2xl p-[2px] transition-all duration-500 scroll-mt-28 ${className}`}
    >
      {/* Ambient glow behind the card */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-gradient-to-r from-primary via-tertiary to-primary opacity-20 blur-xl transition-all duration-500 group-hover:scale-105 group-hover:opacity-70" />

      {/* Rotating conic border behind the card */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
        <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,var(--color-on-surface)_0%,var(--color-primary)_25%,var(--color-inverse-primary)_50%,var(--color-on-surface)_75%,var(--color-on-surface)_100%)] opacity-40 transition-all duration-1000 ease-out group-hover:rotate-180 group-hover:opacity-100" />
      </div>

      <div className="relative z-10 flex h-full flex-col rounded-2xl border border-inverse-on-surface/20 bg-inverse-surface p-6 text-inverse-on-surface shadow-xl transition-colors duration-300 group-hover:border-primary/50 sm:p-8">
        {icon ? <div className="mb-5 text-inverse-primary">{icon}</div> : null}

        <h3 className="text-style-headline-sm mb-3">{title}</h3>

        <p className="text-style-body-md flex-grow leading-relaxed text-inverse-on-surface/80">
          {description}
        </p>

        {items?.length ? (
          <ul className="mt-6 space-y-2.5">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-inverse-on-surface/90"
              >
                <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-inverse-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {href && ctaLabel ? (
          <Link
            href={href}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-inverse-primary hover:underline"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
