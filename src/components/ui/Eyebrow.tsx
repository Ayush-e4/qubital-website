import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted',
        className
      )}
    >
      <span className="relative flex size-2">
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet to-cyan" />
        <span className="absolute inset-0 animate-ping rounded-full bg-cyan/50 [animation-duration:2.4s]" />
      </span>
      {children}
    </span>
  );
}
