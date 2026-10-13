'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { QubitSphere } from './QubitSphere';

// Fills its parent; the hero decides where and how large the sphere sits.
export function HeroVisual() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 120]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-full w-full"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_123_255/0.18),rgb(63_227_242/0.05)_60%,transparent)] blur-2xl"
      />
      <QubitSphere />
    </motion.div>
  );
}
