'use client';

import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

// Card with a soft glow and border highlight that follows the cursor.
// `light` keeps a pale plate under third-party logos, which are designed for white.
export function SpotlightCard({
  children,
  className,
  variant = 'default',
}: {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'light';
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
        'group/card relative overflow-hidden border border-line [--x:50%] [--y:0%]',
        'transition-[translate,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_18px_50px_-20px_rgb(102_80_242/0.35)] motion-reduce:hover:translate-y-0',
        variant === 'light' ? 'card-gradient-light rounded-2xl' : 'card-gradient rounded-3xl',
        className
      )}
    >
      {/* stronger gradient wash on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet/15 via-transparent to-cyan/15 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
      />
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
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
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
