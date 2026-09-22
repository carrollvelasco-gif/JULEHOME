"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { type ReactNode } from "react";
import { useLockBodyScroll, useEscapeKey } from "@/hooks/useScrollLock";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  side?: "left" | "right";
  className?: string;
  footer?: ReactNode;
};

export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  side = "right",
  className,
  footer,
}: DrawerProps) {
  useLockBodyScroll(open);
  useEscapeKey(onClose, open);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true">
          <motion.button
            aria-label="Cerrar"
            className="absolute inset-0 h-full w-full bg-ink-950/40 backdrop-blur-sm dark:bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />
          <motion.aside
            className={cn(
              "absolute top-0 flex h-full w-full max-w-md flex-col bg-background shadow-lift",
              side === "right" ? "right-0" : "left-0",
              className,
            )}
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <header className="flex items-start justify-between border-b border-line px-6 py-5">
              <div>
                {title && (
                  <h2 className="font-display text-xl font-medium text-ink-950 dark:text-foreground">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">{subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar panel"
                className="grid size-9 place-items-center rounded-full text-ink-500 transition-colors hover:bg-surface-muted hover:text-ink-900 dark:text-ink-400 dark:hover:text-foreground"
              >
                <X size={18} />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto">{children}</div>
            {footer && (
              <footer className="border-t border-line p-5">{footer}</footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
