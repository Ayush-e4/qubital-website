"use client";

import { useRef } from "react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function MethodologySteps() {
  const { t } = useLanguage();
  const steps = t.methodology_steps ?? [];

  const containerRef = useRef(null);
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);

  const refs = [step1Ref, step2Ref, step3Ref, step4Ref];
  
  const timelineSteps = (steps.length || 4) * 2 - 1; // 4 steps -> 7

  return (
    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative mt-8">
      {/* Animated Beams linking the steps */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={step1Ref}
        toRef={step2Ref}
        pathColor="#e2e8f0"
        gradientStartColor="#0066da"
        gradientStopColor="#0066da"
        index={0}
        timelineSteps={timelineSteps}
        className="hidden lg:block"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={step2Ref}
        toRef={step3Ref}
        pathColor="#e2e8f0"
        gradientStartColor="#0066da"
        gradientStopColor="#0066da"
        index={1}
        timelineSteps={timelineSteps}
        className="hidden lg:block"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={step3Ref}
        toRef={step4Ref}
        pathColor="#e2e8f0"
        gradientStartColor="#0066da"
        gradientStopColor="#0066da"
        index={2}
        timelineSteps={timelineSteps}
        className="hidden lg:block"
      />
      
      {steps.map((step, index) => {
        const stepFraction = 1 / timelineSteps;
        
        const exactStart = (2 * index) * stepFraction;
        const start = Math.max(exactStart, 0.001);
        const mid = exactStart + (stepFraction / 2);
        const end = Math.min(exactStart + stepFraction, 0.999);
        
        const times = [0, start, mid, end, 1];
        const borderColors = ["#e5e7eb", "#e5e7eb", "#0066da", "#e5e7eb", "#e5e7eb"];
        const colors = ["#6b7280", "#6b7280", "#0066da", "#6b7280", "#6b7280"];
        const scales = [1, 1, 1.1, 1, 1];
        const shadows = [
          "0px 0px 0px rgba(0, 102, 218, 0)",
          "0px 0px 0px rgba(0, 102, 218, 0)",
          "0px 0px 16px rgba(0, 102, 218, 0.35)",
          "0px 0px 0px rgba(0, 102, 218, 0)",
          "0px 0px 0px rgba(0, 102, 218, 0)"
        ];
        const titleColors = ["#0b1c30", "#0b1c30", "#0066da", "#0b1c30", "#0b1c30"];
        
        return (
          <div 
            key={step.id} 
            className="relative z-10 bg-surface border border-outline rounded-xl p-6 shadow-sm flex flex-col items-center justify-between text-center h-full hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col items-center text-center w-full">
              {/* Header: Centered Number Circle */}
              <div className="flex items-center justify-center mb-4">
                <motion.div 
                  ref={refs[index]}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold bg-surface-canvas shrink-0"
                  initial={{
                    borderColor: "#e5e7eb",
                    color: "#6b7280",
                    scale: 1,
                  }}
                  animate={{
                    borderColor: borderColors,
                    color: colors,
                    scale: scales,
                    boxShadow: shadows
                  }}
                  transition={{
                    duration: timelineSteps,
                    times: times,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  0{step.id}
                </motion.div>
              </div>

              {/* Title & Icon */}
              <div className="flex items-center justify-center gap-2 mb-2 w-full">
                <span className="material-symbols-outlined text-primary text-[22px]">{step.icon}</span>
                <motion.h3 
                  className="text-base font-semibold font-title-md text-on-surface text-center"
                  initial={{ color: "#0b1c30" }}
                  animate={{ color: titleColors }}
                  transition={{
                    duration: timelineSteps,
                    times: times,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {step.title}
                </motion.h3>
              </div>

              {/* Description */}
              <p className="text-on-surface-variant text-sm font-body-md leading-relaxed text-center">
                {step.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
