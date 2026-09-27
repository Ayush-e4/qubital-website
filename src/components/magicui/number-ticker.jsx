'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

/** Module-level so the animation effect and the initial render share it. */
function formatNumber(input, decimalPlaces) {
  return Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(input);
}

export function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  className = '',
  decimalPlaces = 0,
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === 'down' ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 90,
  });
  const isInView = useInView(ref, { once: true, amount: 'some', margin: '0px 0px 50px 0px' });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === 'down' ? 0 : value);
      }, delay * 1000);
    }
  }, [isInView, delay, value, direction, motionValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = formatNumber(
          Number(latest.toFixed(decimalPlaces)),
          decimalPlaces
        );
      }
    });
  }, [springValue, decimalPlaces]);

  return (
    <span className={`inline-block tracking-normal font-bold ${className}`} ref={ref}>
      {/*
        The final value is rendered as text so the number exists in the
        server-rendered HTML. The effect above then overwrites `textContent`
        each frame, which is why this is deliberately not a controlled value.
      */}
      {formatNumber(value, decimalPlaces)}
    </span>
  );
}
