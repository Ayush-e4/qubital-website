'use client';

import { useReducedMotion } from 'motion/react';
import { useLocale } from 'next-intl';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { cn } from '@/lib/cn';
import { getTheme, subscribeTheme } from '@/lib/theme';

export type ClipName = 'access-request' | 'just-in-time' | 'passkey' | 'workforce' | 'agent-scope';

/**
 * A short product clip rendered with Remotion (see the qubital-videos project).
 * Each clip exists per locale and theme as public/videos/{name}-{locale}-{theme}.mp4
 * with a matching .jpg poster. It plays muted on loop while on screen, and shows
 * only the poster when the visitor prefers reduced motion.
 *
 * The videos have a solid background in the page colour (bg-bg), so with
 * object-contain the clip can sit in a box of any shape without visible bars.
 */
export function Clip({
  name,
  label,
  fill,
  className,
}: {
  name: ClipName;
  label: string;
  /** On large screens, take the height of the grid row instead of a fixed ratio. */
  fill?: boolean;
  className?: string;
}) {
  const locale = useLocale();
  // null while hydrating: the theme is only known in the browser
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => null);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const base = theme && `/videos/${name}-${locale}-${theme}`;

  // Only play while visible, so off-screen clips cost nothing
  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [base, reduce]);

  return (
    <div
      className={cn(
        'relative aspect-[1080/860] overflow-hidden rounded-[2rem] border border-line bg-bg',
        fill && 'lg:aspect-auto lg:min-h-96',
        className
      )}
    >
      {base &&
        (reduce ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${base}.jpg`}
            alt={label}
            className="absolute inset-0 size-full object-contain"
          />
        ) : (
          <video
            key={base}
            ref={ref}
            src={`${base}.mp4`}
            poster={`${base}.jpg`}
            aria-label={label}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 size-full object-contain"
          />
        ))}
    </div>
  );
}
