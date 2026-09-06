"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const Dock = React.forwardRef(({ className, children, iconMagnification = 60, iconDistance = 100, ...props }, ref) => {
  const mouseX = useMotionValue(Infinity);

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          mouseX,
          iconMagnification,
          iconDistance,
        });
      }
      return child;
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-center gap-4 rounded-2xl bg-surface-card border border-outline-variant/50 px-4 shadow-sm",
        className
      )}
      {...props}
    >
      {renderChildren()}
    </motion.div>
  );
});
Dock.displayName = "Dock";

export const DockIcon = ({
  iconMagnification = 24, // Now acts as max font size in pixels
  iconDistance = 100,
  mouseX,
  className,
  children,
  ...props
}) => {
  const ref = useRef(null);
  
  const distanceCalc = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Map distance to a font size instead of a fixed width box
  let sizeSync = useTransform(
    distanceCalc, 
    [-iconDistance, 0, iconDistance], 
    [14, iconMagnification, 14] // Base size 14px, max size iconMagnification
  );
  let fontSize = useSpring(sizeSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ fontSize }}
      className={cn(
        "flex cursor-pointer items-center justify-center px-3 py-2 rounded-full transition-colors hover:bg-primary/10 text-on-surface whitespace-nowrap font-medium",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
