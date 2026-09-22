"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

type AccordionProps = {
  items: { id: string; question: string; answer: ReactNode }[];
  defaultOpen?: string;
  className?: string;
};

export function Accordion({ items, defaultOpen, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen ?? items[0]?.id ?? null);

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "font-display text-base font-medium transition-colors sm:text-lg",
                  isOpen ? "text-olive-700 dark:text-olive-300" : "text-ink-950 dark:text-foreground",
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                  isOpen
                    ? "rotate-45 border-olive-600 text-olive-700 dark:border-olive-400 dark:text-olive-300"
                    : "border-line-strong text-ink-500 dark:text-ink-400",
                )}
              >
                <Plus size={15} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-10 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
