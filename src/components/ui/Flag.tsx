import { useId } from 'react';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';

// Simplified national flags for the language picker (decorative: the language
// name is always shown or announced next to them). Drawn on a 3:2 canvas.
// English uses the UK flag, Portuguese the flag of Portugal (European Portuguese).
function Shapes({ locale, clipId }: { locale: Locale; clipId: string }) {
  switch (locale) {
    case 'de':
      return (
        <>
          <rect width="60" height="40" fill="#FFCE00" />
          <rect width="60" height="26.67" fill="#DD0000" />
          <rect width="60" height="13.33" fill="#000" />
        </>
      );
    case 'en':
      return (
        <svg viewBox="0 0 60 30" width="60" height="40" preserveAspectRatio="xMidYMid slice">
          <clipPath id={clipId}>
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
          </clipPath>
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path
            d="M0,0 L60,30 M60,0 L0,30"
            clipPath={`url(#${clipId})`}
            stroke="#C8102E"
            strokeWidth="4"
          />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      );
    case 'fr':
      return (
        <>
          <rect width="60" height="40" fill="#EF4135" />
          <rect width="40" height="40" fill="#fff" />
          <rect width="20" height="40" fill="#0055A4" />
        </>
      );
    case 'it':
      return (
        <>
          <rect width="60" height="40" fill="#CE2B37" />
          <rect width="40" height="40" fill="#fff" />
          <rect width="20" height="40" fill="#009246" />
        </>
      );
    case 'es':
      return (
        <>
          <rect width="60" height="40" fill="#AA151B" />
          <rect y="10" width="60" height="20" fill="#F1BF00" />
        </>
      );
    case 'nl':
      return (
        <>
          <rect width="60" height="40" fill="#21468B" />
          <rect width="60" height="26.67" fill="#fff" />
          <rect width="60" height="13.33" fill="#AE1C28" />
        </>
      );
    case 'pl':
      return (
        <>
          <rect width="60" height="40" fill="#DC143C" />
          <rect width="60" height="20" fill="#fff" />
        </>
      );
    case 'pt':
      return (
        <>
          <rect width="60" height="40" fill="#FF0000" />
          <rect width="24" height="40" fill="#006600" />
          <circle cx="24" cy="20" r="8" fill="none" stroke="#FFCC00" strokeWidth="2.5" />
          <circle cx="24" cy="20" r="4.5" fill="#fff" stroke="#FF0000" strokeWidth="1.5" />
        </>
      );
    case 'sv':
      return (
        <>
          <rect width="60" height="40" fill="#006AA7" />
          <rect x="17" width="7.5" height="40" fill="#FECC00" />
          <rect y="16.25" width="60" height="7.5" fill="#FECC00" />
        </>
      );
    case 'da':
      return (
        <>
          <rect width="60" height="40" fill="#C8102E" />
          <rect x="17" width="6" height="40" fill="#fff" />
          <rect y="17" width="60" height="6" fill="#fff" />
        </>
      );
  }
}

export function Flag({ locale, className }: { locale: Locale; className?: string }) {
  const clipId = useId();
  return (
    <svg
      viewBox="0 0 60 40"
      aria-hidden
      focusable="false"
      className={cn(
        'h-3.5 w-[21px] shrink-0 overflow-hidden rounded-[3px] ring-1 ring-fg/15',
        className
      )}
    >
      <Shapes locale={locale} clipId={clipId} />
    </svg>
  );
}
