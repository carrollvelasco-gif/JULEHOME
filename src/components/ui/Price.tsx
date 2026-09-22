import { cn, formatPrice, discountPercent } from "@/lib/utils";

type PriceProps = {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
} as const;

export function Price({ price, compareAtPrice, size = "md", className }: PriceProps) {
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2", className)}>
      <span
        className={cn(
          "font-display font-medium text-ink-950 dark:text-foreground",
          sizes[size],
        )}
      >
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <span
          className={cn(
            "text-ink-400 line-through dark:text-ink-500",
            size === "sm" ? "text-xs" : "text-sm",
          )}
        >
          {formatPrice(compareAtPrice!)}
        </span>
      )}
      {hasDiscount && (
        <span className="text-xs font-semibold text-embers-600 dark:text-embers-500">
          −{discountPercent(price, compareAtPrice!)}%
        </span>
      )}
    </div>
  );
}
