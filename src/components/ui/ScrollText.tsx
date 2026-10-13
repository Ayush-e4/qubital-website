'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/lib/cn';

// Paragraph whose words light up one by one as it scrolls through the viewport.
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  });
  const words = text.split(' ');

  return (
    <p ref={ref} className={cn('flex flex-wrap', className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const highlight = /^(0|1|qubit|Qubit)/.test(children);
  return (
    <motion.span
      aria-hidden
      style={{ opacity }}
      className={cn('mr-[0.25em] mt-[0.1em]', highlight && 'text-gradient')}
    >
      {children}
    </motion.span>
  );
}
