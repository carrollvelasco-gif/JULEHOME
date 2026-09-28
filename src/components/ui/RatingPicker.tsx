"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type RatingPickerProps = {
  value: number;
  onChange: (value: number) => void;
  size?: number;
  error?: boolean;
};

/** Selector interactivo de calificación de 1 a 5 estrellas. */
export function RatingPicker({ value, onChange, size = 28, error }: RatingPickerProps) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Calificación"
      aria-required="true"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= active;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} ${star === 1 ? "estrella" : "estrellas"}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onFocus={() => setHovered(star)}
            onBlur={() => setHovered(0)}
            className={cn(
              "rounded-full p-0.5 transition-transform duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-600/40",
            )}
          >
            <Star
              size={size}
              strokeWidth={0}
              className={cn(
                "transition-colors duration-200",
                filled ? "text-gold-500" : error ? "text-embers-400" : "text-ink-200 dark:text-ink-700",
              )}
              fill="currentColor"
            />
          </button>
        );
      })}
    </div>
  );
}