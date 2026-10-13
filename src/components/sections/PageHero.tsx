import type { ReactNode } from 'react';
import { BinaryRain } from '../ui/BinaryRain';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

export function PageHero({
  title,
  description,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-40 sm:pb-28 sm:pt-48">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_123_255/0.28),transparent)] blur-2xl"
      />
      <BinaryRain className="absolute inset-y-0 right-0 hidden w-1/3 md:block" />
      <Container className="relative">
        <Reveal>
          <h1 className="max-w-4xl text-5xl font-medium leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl xl:text-8xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">
              {description}
            </p>
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
