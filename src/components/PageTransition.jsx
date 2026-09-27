'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }) {
  const pathname = usePathname();

  // `initial={false}` is load-bearing, not a style choice. The first render is
  // the one the server sends, and framer-motion applies the `initial` state
  // inline — so a hidden initial state here (opacity 0) can never animate in
  // and the whole document stays invisible with JavaScript disabled.
  // Skipping the initial state keeps the first paint visible; the exit
  // animation on navigation still runs.
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
