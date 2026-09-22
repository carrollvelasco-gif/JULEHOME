import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingStarsProps = {
  rating: number;
  size?: number;
  className?: string;
};

export function RatingStars({ rating, size = 14, className }: RatingStarsProps) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  const showHalf = rating - full >= 0.75;

  return (
    <span
      className={cn("inline-flex items-center gap-0.5 text-gold-500", className)}
      role="img"
      aria-label={`Valoración ${rating} de 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full || showHalf) return <Star key={i} size={size} fill="currentColor" strokeWidth={0} />;
        if (i === full && hasHalf) return <StarHalf key={i} size={size} fill="currentColor" strokeWidth={0} />;
        return <Star key={i} size={size} className="text-ink-200 dark:text-ink-700" strokeWidth={0} />;
      })}
    </span>
  );
}
