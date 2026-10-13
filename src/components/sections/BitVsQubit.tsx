'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { QubitSphere } from '../home/QubitSphere';

// Side-by-side illustration: a classical bit flips between 0 and 1,
// a qubit holds both at once.
export function BitVsQubit() {
  const reduce = useReducedMotion();
  const [bit, setBit] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setBit((b) => (b ? 0 : 1)), 1400);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex aspect-square flex-col justify-between rounded-3xl border border-line bg-surface/70 p-6">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Bit</span>
        <div className="flex items-center justify-center gap-6 font-mono text-7xl font-light">
          {[0, 1].map((v) => (
            <motion.span
              key={v}
              animate={{ opacity: bit === v ? 1 : 0.15, scale: bit === v ? 1 : 0.85 }}
              transition={{ duration: 0.4 }}
              className={bit === v ? 'text-fg' : 'text-fg'}
            >
              {v}
            </motion.span>
          ))}
        </div>
        <span className="font-mono text-sm text-muted">0 ∨ 1</span>
      </div>
      <div className="relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface/70 p-6">
        <span className="relative z-10 font-mono text-xs uppercase tracking-[0.2em] text-faint">
          Qubit
        </span>
        <div className="absolute inset-0">
          <QubitSphere />
        </div>
        <span className="relative z-10 font-mono text-sm text-gradient">α|0⟩ + β|1⟩</span>
      </div>
    </div>
  );
}
