import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  variant?: "olive" | "gold" | "embers" | "neutral" | "outline";
  className?: string;
};

const variants = {
  olive: "bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300",
  gold: "bg-gold-500/15 text-gold-600 dark:text-gold-300",
  embers: "bg-embers-600/10 text-embers-600 dark:bg-embers-500/15 dark:text-embers-500",
  neutral: "bg-ink-950/5 text-ink-700 dark:bg-foreground/10 dark:text-ink-100",
  outline: "border border-ink-900/15 text-ink-700 dark:border-foreground/20 dark:text-ink-100",
} as const;

export function Badge({ children, variant = "olive", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] backdrop-blur",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
