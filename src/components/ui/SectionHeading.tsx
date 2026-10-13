import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

export function SectionHeading({
  title,
  description,
  align = 'left',
  className,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'mx-auto items-center text-center',
        className
      )}
    >
      <Reveal delay={0.05}>
        <h2 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="max-w-xl text-lg leading-relaxed text-muted text-pretty">{description}</p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
