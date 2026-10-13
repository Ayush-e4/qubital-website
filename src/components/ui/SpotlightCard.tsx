'use client';

import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

// Card with a soft glow and border highlight that follows the cursor.
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--x', `${e.clientX - r.left}px`);
        el.style.setProperty('--y', `${e.clientY - r.top}px`);
      }}
      className={cn(
        'group/card relative overflow-hidden rounded-3xl border border-line bg-surface/70 [--x:50%] [--y:0%]',
        className
      )}
    >
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            'radial-gradient(520px circle at var(--x) var(--y), rgb(139 123 255 / 0.14), transparent 45%)',
        }}
      />
      {/* border highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          padding: 1,
          background:
            'radial-gradient(320px circle at var(--x) var(--y), rgb(63 227 242 / 0.7), transparent 60%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
