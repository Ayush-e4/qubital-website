'use client';

import { Check, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useId, useRef, useState, useTransition } from 'react';
import { translateSlug } from '@/content/blog/meta';
import { usePathname, useRouter } from '@/i18n/navigation';
import { localeInfo, routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { Flag } from '../ui/Flag';

/**
 * Language picker: the current language's flag and code; opens a list of every
 * language with its flag and native name. `placement="top"` opens it upwards
 * (used at the bottom of the mobile menu).
 */
export function LocaleSwitcher({
  className,
  placement = 'bottom',
}: {
  className?: string;
  placement?: 'bottom' | 'top';
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ slug?: string }>();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();

  // Close on a click outside or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // A blog post has its own slug in each language, so swap it for its counterpart.
  const switchTo = (l: Locale) => {
    setOpen(false);
    if (l === locale) return;
    startTransition(() => {
      if (pathname === '/blog/[slug]') {
        const slug = params.slug && translateSlug(params.slug, l);
        if (slug) router.replace({ pathname, params: { slug } }, { locale: l });
        else router.replace('/blog', { locale: l });
      } else {
        router.replace(pathname, { locale: l });
      }
    });
  };

  return (
    <div ref={root} className={cn('relative', className)}>
      <button
        type="button"
        aria-label={`${t('language')}: ${localeInfo[locale].name}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex h-9 items-center gap-2 rounded-full border border-line bg-fg/[0.03] pl-2.5 pr-2 font-mono text-xs uppercase text-muted transition-colors hover:text-fg',
          open && 'text-fg',
          isPending && 'opacity-60'
        )}
      >
        <Flag locale={locale} />
        <span>{locale}</span>
        <ChevronDown
          className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')}
          strokeWidth={1.8}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={t('language')}
            initial={{ opacity: 0, y: placement === 'top' ? 6 : -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: placement === 'top' ? 6 : -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={cn(
              'absolute right-0 z-[70] w-52 overflow-hidden rounded-2xl border border-line bg-bg/95 p-1.5 shadow-[0_18px_50px_-20px_rgb(0_0_0/0.35)] backdrop-blur-xl',
              placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
            )}
          >
            {routing.locales.map((l) => {
              const current = l === locale;
              return (
                <li key={l} role="option" aria-selected={current}>
                  <button
                    type="button"
                    onClick={() => switchTo(l)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors',
                      current
                        ? 'bg-fg/[0.06] text-fg'
                        : 'text-muted hover:bg-fg/[0.04] hover:text-fg'
                    )}
                  >
                    <Flag locale={l} />
                    <span lang={l} className="flex-1">
                      {localeInfo[l].name}
                    </span>
                    {current && <Check className="size-4 text-cyan" strokeWidth={2} />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
