"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
};

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const btn = cn(
    "grid place-items-center text-ink-700 transition-colors hover:text-olive-700 disabled:opacity-40 dark:text-ink-100 dark:hover:text-olive-300",
    size === "md" ? "size-10" : "size-8",
  );

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-line-strong bg-surface",
        size === "md" ? "h-11 px-1" : "h-9 px-0.5",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Disminuir cantidad"
        className={btn}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus size={size === "md" ? 15 : 13} />
      </button>
      <span
        className={cn(
          "min-w-8 text-center font-medium tabular-nums text-ink-950 dark:text-foreground",
          size === "md" ? "text-sm" : "text-xs",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Aumentar cantidad"
        className={btn}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus size={size === "md" ? 15 : 13} />
      </button>
    </div>
  );
}
