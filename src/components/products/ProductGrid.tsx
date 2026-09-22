"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";
import { cn } from "@/lib/utils";

type ProductGridProps = {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
  className?: string;
};

export function ProductGrid({
  products,
  loading = false,
  skeletonCount = 8,
  className,
}: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {loading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        : products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.5) }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
    </div>
  );
}
