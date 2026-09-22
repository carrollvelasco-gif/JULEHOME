"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";

/** Fades the new page in on every route change. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
