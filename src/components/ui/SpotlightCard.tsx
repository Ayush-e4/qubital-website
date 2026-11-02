'use client';

import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

// Card with a soft glow and border highlight that follows the cursor.
// Gradient border in the brand colours; `light` keeps a white plate under
// third-party logos, which are designed for white.
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
        'group/card relative overflow-hidden [--x:50%] [--y:0%]',
        'transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_18px_50px_-20px_rgb(102_80_242/0.35)] motion-reduce:hover:translate-y-0',
        variant === 'light' ? 'rounded-2xl bg-white' : 'rounded-3xl bg-surface/70',
        className
      )}
    >
      {/* brand gradient border (violet to cyan, as in the accent text) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-60 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          padding: 1,
          background: 'linear-gradient(100deg, var(--violet) 10%, var(--cyan) 90%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
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
