"use client";

import { useEffect, useState, useId } from "react";
import { motion } from "framer-motion";

export const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  pathColor = "rgba(0,0,0,0.1)",
  pathOpacity = 1,
  gradientStartColor = "#3b82f6",
  gradientStopColor = "#8b5cf6",
  index = 0,
  timelineSteps = 7,
  className = "",
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const fromRect = fromRef.current.getBoundingClientRect();
        const toRect = toRef.current.getBoundingClientRect();

        setSvgDimensions({
          width: containerRect.width,
          height: containerRect.height,
        });

        const startX = fromRect.left - containerRect.left + fromRect.width / 2;
        const startY = fromRect.top - containerRect.top + fromRect.height / 2;
        const endX = toRect.left - containerRect.left + toRect.width / 2;
        const endY = toRect.top - containerRect.top + toRect.height / 2;

        setPathD(`M ${startX},${startY} L ${endX},${endY}`);
      }
    };

    updatePath();
    const observer = new ResizeObserver(updatePath);
    if (containerRef.current) observer.observe(containerRef.current);
    
    // Fallback resize listener
    window.addEventListener("resize", updatePath);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [containerRef, fromRef, toRef]);

  if (!pathD) return null;

  // Sync math for a perfect 7-second universal timeline loop
  // Box 0: 0-1
  // Beam 0: 1-2
  // Box 1: 2-3
  // Beam 1: 3-4
  // Box 2: 4-5
  // Beam 2: 5-6
  // Box 3: 6-7
  const stepFraction = 1 / timelineSteps;
  
  const start = (2 * index + 1) * stepFraction;
  const mid = start + stepFraction * 0.5;
  const end = start + stepFraction;
  
  // 6 keyframes for perfect snappy visibility and shooting effect
  const times = [0, start, start + 0.001, mid, end, 1];
  const pathLength = [0, 0, 0, 0.4, 0, 0];
  const pathOffset = [0, 0, 0, 0.3, 1, 1];
  const opacity = [0, 0, 1, 1, 0, 0];

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute left-0 top-0 stroke-2 z-0 ${className}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth="2"
        strokeOpacity={pathOpacity}
      />
      <motion.path
        d={pathD}
        stroke={`url(#${id})`}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
        animate={{ 
          pathLength: pathLength, 
          pathOffset: pathOffset,
          opacity: opacity 
        }}
        transition={{
          duration: timelineSteps, // 1 sec per step
          times: times,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
};
