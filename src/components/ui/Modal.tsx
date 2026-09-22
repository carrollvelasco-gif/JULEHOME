"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { type ReactNode } from "react";
import { useLockBodyScroll, useEscapeKey } from "@/hooks/useScrollLock";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  label?: string;
};

export function Modal({ open, onClose, children, className, label = "Diálogo" }: ModalProps) {
  useLockBodyScroll(open);
  useEscapeKey(onClose, open);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <motion.button
            aria-label="Cerrar"
            className="absolute inset-0 h-full w-full bg-ink-950/50 backdrop-blur-sm dark:bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              "relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-background shadow-lift",
              className,
            )}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full bg-surface text-ink-500 shadow-soft transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-foreground"
            >
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
