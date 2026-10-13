'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSyncExternalStore, type MouseEvent } from 'react';
import { cn } from '@/lib/cn';
import { getTheme, subscribeTheme, THEME_STORAGE_KEY, type Theme } from '@/lib/theme';

function applyTheme(theme: Theme, persist: boolean) {
  document.documentElement.setAttribute('data-theme', theme);
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations('nav');
  // null on the server: the real theme is only known after the inline script ran
  const theme = useSyncExternalStore<Theme | null>(subscribeTheme, getTheme, () => null);

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // The theme change itself is applied either way; the transition is only the reveal
    if (!document.startViewTransition || reduce || document.hidden) {
      applyTheme(next, true);
      return;
    }

    // Reveal the new theme in a circle expanding from the button
    const x = e.clientX || innerWidth - 40;
    const y = e.clientY || 40;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => applyTheme(next, true));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
          },
          {
            duration: 750,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      // Rejected when the browser skips the animation (e.g. a second click
      // interrupts it, or the tab is hidden). The theme is already applied.
      .catch(() => {});
  };

  const label = theme === 'light' ? t('themeDark') : t('themeLight');

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        'relative flex size-10 items-center justify-center overflow-hidden rounded-full border border-line bg-fg/[0.04] text-muted transition-colors hover:border-line-strong hover:text-fg',
        className
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {theme && (
          <motion.span
            key={theme}
            initial={{ y: 20, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -20, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {theme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
