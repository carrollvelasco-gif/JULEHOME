"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";

/** Elegant first-paint loader shown only once per session. */
export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const done = sessionStorage.getItem("julehome:loaded");
    if (done) {
      setLoading(false);
      return;
    }
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("julehome:loaded", "1");
      setLoading(false);
    }, 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          aria-hidden
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="grid size-16 place-items-center rounded-full border border-olive-600/30 bg-olive-600/10"
            >
              <Flame size={26} className="animate-flicker text-olive-700 dark:text-olive-300" strokeWidth={1.5} />
            </motion.div>
            <div className="flex items-baseline gap-1 overflow-hidden">
              {"JULEHOME".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: EASE }}
                  className="font-display text-2xl font-semibold tracking-[0.25em] text-ink-950 dark:text-foreground"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <div className="h-px w-32 overflow-hidden bg-line-strong">
              <motion.div
                className="h-full bg-olive-600 dark:bg-olive-300"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 1.1, ease: EASE }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
