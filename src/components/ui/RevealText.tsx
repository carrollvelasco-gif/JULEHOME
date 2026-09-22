"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "60%", rotate: 3 },
  visible: {
    opacity: 1,
    y: "0%",
    rotate: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

type RevealWordsProps = {
  text: string;
  className?: string;
};

/** Splits the text word-by-word and reveals it with a graceful rise. */
export function RevealWords({ text, className }: RevealWordsProps) {
  const words = text.split(" ");
  return (
    <motion.span
      className={cn("inline", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom" aria-hidden>
          <motion.span
            className="inline-block will-change-transform"
            variants={wordVariants}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </motion.span>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={wordVariants}>
      {children}
    </motion.div>
  );
}
