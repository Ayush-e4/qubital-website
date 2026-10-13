import { cn } from '@/lib/cn';
import { symbol, wordmark } from './logo-data';

// The "Superposition q": a 0 (bowl, violet) and an upside-down 1 (stem, cyan)
// sharing one stroke. Geometry comes from brand/tools/build_logo.py; colors
// follow the active theme.

export function LogoMark({ className }: { className?: string }) {
  const { zero, one } = symbol;
  return (
    <svg viewBox={symbol.viewBox} fill="none" aria-hidden className={cn('size-8', className)}>
      <ellipse
        cx={zero.cx}
        cy={zero.cy}
        rx={zero.rx}
        ry={zero.ry}
        className="stroke-violet"
        strokeWidth={zero.stroke}
      />
      <path
        d={one.d}
        className="stroke-cyan"
        strokeWidth={one.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className, mono = false }: { className?: string; mono?: boolean }) {
  const { zero, one } = wordmark;
  const zeroCls = mono ? 'stroke-current' : 'stroke-violet';
  const oneCls = mono ? 'stroke-current' : 'stroke-cyan';
  return (
    <svg
      viewBox={wordmark.viewBox}
      fill="none"
      role="img"
      aria-label="Qubital"
      className={cn('h-7 w-auto', className)}
    >
      <ellipse
        cx={zero.cx}
        cy={zero.cy}
        rx={zero.rx}
        ry={zero.ry}
        className={zeroCls}
        strokeWidth={zero.stroke}
      />
      <path
        d={one.d}
        className={oneCls}
        strokeWidth={one.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d={wordmark.letters} fill="currentColor" />
    </svg>
  );
}
