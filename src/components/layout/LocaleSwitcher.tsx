'use client';

import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/cn';

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={t('language')}
      className={cn(
        'relative flex items-center rounded-full border border-line bg-fg/[0.03] p-1 font-mono text-xs',
        isPending && 'opacity-60',
        className
      )}
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={l === locale}
          onClick={() => startTransition(() => router.replace(pathname, { locale: l }))}
          className={cn(
            'relative z-10 rounded-full px-2.5 py-1 uppercase transition-colors',
            l === locale ? 'text-bg' : 'text-muted hover:text-fg'
          )}
        >
          {l === locale && (
            <motion.span
              layoutId="locale-pill"
              className="absolute inset-0 -z-10 rounded-full bg-fg"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
          )}
          <span>{l}</span>
        </button>
      ))}
    </div>
  );
}
