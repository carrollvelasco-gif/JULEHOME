"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { RatingStars } from "@/components/ui/RatingStars";
import { discountPercent, cn } from "@/lib/utils";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const { has, toggle } = useWishlist();
  const { addItem, openCart } = useCart();
  const { openQuickView } = useUI();
  const wished = has(product.id);

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
        <Link
          href={`/producto/${product.slug}`}
          className="relative block aspect-[4/5] overflow-hidden"
          aria-label={product.name}
        >
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="img-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badges.map((badge) => (
            <Badge key={badge} variant="neutral" className="bg-background/90 shadow-soft">
              {badge}
            </Badge>
          ))}
          {hasDiscount && (
            <Badge variant="embers">
              −{discountPercent(product.price, product.compareAtPrice!)}%
            </Badge>
          )}
        </div>

        <button
          onClick={() => toggle(product)}
          aria-label={wished ? `Quitar ${product.name} de favoritos` : `Añadir ${product.name} a favoritos`}
          aria-pressed={wished}
          className={cn(
            "absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/90 shadow-soft backdrop-blur transition-all duration-300",
            "hover:scale-110",
            wished
              ? "text-embers-600"
              : "text-ink-700 hover:text-embers-600 dark:text-ink-100",
          )}
        >
          <Heart size={16} fill={wished ? "currentColor" : "none"} />
        </button>

        <div className="absolute inset-x-3 bottom-3 flex translate-y-2 gap-2 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => openQuickView(product)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-background/95 py-2.5 text-xs font-semibold text-ink-900 shadow-soft backdrop-blur transition-colors hover:bg-olive-600 hover:text-white dark:bg-ink-950/90 dark:text-foreground dark:hover:bg-olive-600 dark:hover:text-white"
          >
            <Eye size={14} />
            Vista rápida
          </button>
          <button
            onClick={() => {
              addItem(product);
              openCart();
            }}
            aria-label={`Añadir ${product.name} al carrito`}
            className="grid size-9 place-items-center rounded-full bg-olive-600 text-white shadow-glow transition-colors hover:bg-olive-700"
          >
            <ShoppingBag size={15} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1 pt-4">
        <div className="flex items-center gap-2">
          <RatingStars rating={product.rating} size={12} />
          <span className="text-[0.68rem] text-ink-400">({product.reviews})</span>
        </div>
        <Link
          href={`/producto/${product.slug}`}
          className="font-display text-[0.95rem] font-medium text-ink-950 transition-colors hover:text-olive-700 dark:text-foreground dark:hover:text-olive-300"
        >
          {product.name}
        </Link>
        <p className="text-xs text-ink-400">{product.aroma}</p>
        <Price price={product.price} compareAtPrice={product.compareAtPrice} size="sm" className="pt-1" />

        <div className="mt-3 flex flex-col gap-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              addItem(product);
              openCart();
            }}
            aria-label={`Añadir ${product.name} al carrito`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-olive-600 px-4 py-3 text-xs font-semibold tracking-wide text-white shadow-glow transition-colors duration-300 hover:bg-olive-700"
          >
            <ShoppingBag size={14} />
            Añadir al carrito
          </motion.button>
        </div>
      </div>
    </article>
  );
}
