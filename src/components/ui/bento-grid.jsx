'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        'grid w-full auto-rows-[minmax(18rem,auto)] md:auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4 md:gap-6',
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ name, className, background, Icon, description, href, cta }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      key={name}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative col-span-1 md:col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 min-h-[260px] md:min-h-[auto]',
        'bg-surface-card border border-outline-variant/60 shadow-xs hover:border-primary/40 hover:shadow-md',
        className
      )}
    >
      {/* Interactive Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 hidden md:block"
        style={{
          background: isHovered
            ? `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 80, 203, 0.10), transparent 85%)`
            : '',
        }}
      />

      {/* Spotlight Illuminated Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 hidden md:block"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 80, 203, 0.35), transparent 75%)`
            : '',
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          WebkitMaskImage:
            'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      <div className="absolute inset-0 z-0">{background}</div>

      <div className="pointer-events-none z-20 flex transform-gpu flex-col gap-2 p-5 sm:p-6 md:p-8 transition-all duration-300 md:group-hover:-translate-y-3">
        {React.isValidElement(Icon) ? (
          Icon
        ) : Icon ? (
          <Icon className="h-9 w-9 md:h-10 md:w-10 origin-left transform-gpu text-primary transition-all duration-300 ease-in-out group-hover:scale-110" />
        ) : null}
        <h3 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">{name}</h3>
        <p className="max-w-lg text-secondary text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Card Action — Visible on Mobile, Animated on Desktop */}
      <div
        className={cn(
          'pointer-events-auto relative md:absolute bottom-0 flex w-full transform-gpu flex-row items-center p-5 sm:p-6 md:p-8 z-30',
          'opacity-100 translate-y-0 md:opacity-0 md:translate-y-10 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300'
        )}
      >
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-primary font-semibold group/link text-sm uppercase tracking-wider py-1 hover:underline"
        >
          <span>{cta}</span>
          <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover/link:translate-x-1">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
};

export { BentoCard, BentoGrid };
