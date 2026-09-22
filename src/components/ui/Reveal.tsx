"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  once?: boolean;
};

/**
 * Elegant entrance reveal. Animated on mount (no scroll-observer dependency)
 * so the content is always visible. Respects reduced-motion preferences.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, x }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.7, delay: Math.min(delay, 0.4), ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
