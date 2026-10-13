'use client';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ComponentProps,
  type ReactNode,
} from 'react';

// macOS-style dock magnification, adapted from Magic UI's <Dock /> for text
// links: items scale by their distance to the cursor and push their
// neighbours apart instead of overlapping them.

const MAGNIFICATION = 1.28;
const DISTANCE = 140;
// Same spring as Magic UI's DockIcon
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

const DockContext = createContext<MotionValue<number> | null>(null);

export function DockList({ children, onPointerLeave, ...props }: ComponentProps<typeof motion.ul>) {
  const mouseX = useMotionValue(Infinity);

  return (
    <DockContext.Provider value={mouseX}>
      <motion.ul
        {...props}
        onPointerMove={(e) => {
          if (e.pointerType === 'mouse') mouseX.set(e.clientX);
        }}
        onPointerLeave={(e) => {
          mouseX.set(Infinity);
          onPointerLeave?.(e);
        }}
      >
        {children}
      </motion.ul>
    </DockContext.Provider>
  );
}

export function DockItem({ children }: { children: ReactNode }) {
  const mouseX = useContext(DockContext);
  const fallback = useMotionValue(Infinity);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const baseWidth = useRef(0);

  // Natural (unscaled) width, used to push neighbours by the amount we grow
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      baseWidth.current = el.offsetWidth;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const distance = useTransform(mouseX ?? fallback, (x) => {
    const el = ref.current;
    if (!el || !Number.isFinite(x)) return Infinity;
    const r = el.getBoundingClientRect();
    return x - (r.left + r.width / 2);
  });

  const target = useTransform(
    distance,
    [-DISTANCE, 0, DISTANCE],
    [1, reduce ? 1 : MAGNIFICATION, 1]
  );
  const scale = useSpring(target, SPRING);
  const margin = useTransform(scale, (s) => ((s - 1) * baseWidth.current) / 2);

  return (
    <motion.li
      ref={ref}
      style={{ scale, marginLeft: margin, marginRight: margin }}
      className="origin-center"
    >
      {children}
    </motion.li>
  );
}
