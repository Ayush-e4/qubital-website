'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

// A "0" or "1" that briefly collapses into its opposite state now and then,
// like a qubit being measured.
export function QubitGlyph({ value }: { value: '0' | '1' }) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    if (reduce) return;
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(
        () => {
          setCurrent(value === '0' ? '1' : '0');
          timeout = setTimeout(() => {
            setCurrent(value);
            schedule();
          }, 420);
        },
        2600 + Math.random() * 3600
      );
    };
    schedule();
    return () => clearTimeout(timeout);
  }, [value, reduce]);

  return (
    <span className="relative inline-grid h-[1.02em] w-[0.72em] place-items-center overflow-hidden align-[-0.12em] font-mono font-light">
      <span className="sr-only">{value}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={current}
          aria-hidden
          initial={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient col-start-1 row-start-1"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
