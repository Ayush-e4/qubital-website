'use client';

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';

const DEFAULT_MARGIN = '0px 0px -40px 0px';

/** Per-direction travel, matching the values the previous variants used. */
const DIRECTIONS = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Reveal-on-scroll, driven by CSS.
 *
 * The important property is what happens *without* JavaScript. These elements
 * render visible; the hidden state lives behind the `.js` class, which
 * src/app/layout.js adds pre-paint only when IntersectionObserver exists. A
 * no-JS load, a blocked bundle or a hydration error therefore leaves the page
 * fully readable, instead of server-rendering `opacity: 0` and showing a blank
 * section. Motion is suppressed under `prefers-reduced-motion` in globals.css.
 */
function useReveal({ once = true, margin = DEFAULT_MARGIN } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    // No observer means no `.js` class either, so the element is already
    // visible; nothing to do.
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: margin, threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, margin]);

  return [ref, visible];
}

const revealVars = (direction, distance, duration, delay) => {
  const vector = DIRECTIONS[direction] ?? DIRECTIONS.up;
  return {
    '--reveal-x': `${vector.x * distance}px`,
    '--reveal-y': `${vector.y * distance}px`,
    '--reveal-duration': `${duration}s`,
    '--reveal-delay': `${delay}s`,
  };
};

export function AnimateOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5,
  once = true,
  margin = DEFAULT_MARGIN,
}) {
  const [ref, visible] = useReveal({ once, margin });

  return (
    <div
      ref={ref}
      data-reveal=""
      className={visible ? `${className} is-visible` : className}
      style={revealVars(direction, 24, duration, delay)}
    >
      {children}
    </div>
  );
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.08,
  once = true,
  margin = DEFAULT_MARGIN,
}) {
  const [ref, visible] = useReveal({ once, margin });

  return (
    <div ref={ref} data-stagger="" className={visible ? `${className} is-visible` : className}>
      {Children.map(children, (child, index) =>
        isValidElement(child) ? cloneElement(child, { staggerIndex: index, staggerDelay }) : child
      )}
    </div>
  );
}

export function StaggerItem({
  children,
  className = '',
  direction = 'up',
  duration = 0.45,
  staggerIndex = 0,
  staggerDelay = 0.08,
}) {
  return (
    <div
      data-reveal=""
      className={className}
      style={revealVars(direction, 20, duration, staggerIndex * staggerDelay)}
    >
      {children}
    </div>
  );
}
