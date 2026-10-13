'use client';

import { motion, useInView, useScroll, useSpring } from 'motion/react';
import { Check } from 'lucide-react';
import { useRef } from 'react';
import { cn } from '@/lib/cn';

export type Step = {
  title: string;
  duration: string;
  text: string;
  outputs: string[];
};

const stepNumber = (i: number) => String(i + 1);

// Compact horizontal version for the home page.
export function ProcessRow({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.6'],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="relative">
      <div className="absolute inset-x-0 top-[22px] hidden h-px bg-line lg:block">
        <motion.div
          style={{ scaleX }}
          className="h-full origin-left bg-gradient-to-r from-violet to-cyan"
        />
      </div>
      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <span className="relative z-10 flex size-11 items-center justify-center rounded-full border border-line-strong bg-bg font-mono text-sm text-fg">
              {stepNumber(i)}
            </span>
            <div className="mt-6 flex items-baseline justify-between gap-3">
              <h3 className="text-2xl font-medium tracking-tight">{step.title}</h3>
              <span className="font-mono text-xs text-faint">{step.duration}</span>
            </div>
            <p className="mt-3 text-muted leading-relaxed line-clamp-4">{step.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

// Detailed vertical timeline for the approach page.
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.6', 'end 0.6'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative">
      <div className="absolute bottom-0 left-[21px] top-0 w-px bg-line sm:left-[27px]">
        <motion.div
          style={{ scaleY }}
          className="h-full w-full origin-top bg-gradient-to-b from-violet via-cyan to-violet"
        />
      </div>
      {steps.map((step, i) => (
        <TimelineItem key={step.title} step={step} index={i} />
      ))}
    </ol>
  );
}

function TimelineItem({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { margin: '-45% 0px -45% 0px' });
  const seen = useInView(ref, { once: true, margin: '-40% 0px -40% 0px' });

  return (
    <li
      ref={ref}
      className="relative grid gap-6 pb-20 pl-16 last:pb-0 sm:pl-24 lg:grid-cols-12 lg:gap-12"
    >
      <span
        className={cn(
          'absolute left-0 top-0 z-10 flex size-11 items-center justify-center rounded-full border font-mono text-sm transition-all duration-700 sm:size-14 sm:text-base',
          seen
            ? 'border-transparent bg-gradient-to-br from-violet to-cyan text-bg shadow-[0_0_40px_-4px_rgb(139_123_255/0.7)]'
            : 'border-line-strong bg-bg text-muted'
        )}
      >
        {stepNumber(index)}
      </span>
      <div className="lg:col-span-5">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
          {step.duration}
        </span>
        <h3
          className={cn(
            'mt-3 text-4xl font-medium tracking-tight transition-colors duration-700 sm:text-5xl',
            active || seen ? 'text-fg' : 'text-fg/40'
          )}
        >
          {step.title}
        </h3>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20% 0px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-7"
      >
        <p className="text-lg leading-relaxed text-muted">{step.text}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {step.outputs.map((o) => (
            <li
              key={o}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-fg/[0.03] px-4 py-2 text-sm text-fg/90"
            >
              <Check className="size-3.5 text-cyan" />
              {o}
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
}
