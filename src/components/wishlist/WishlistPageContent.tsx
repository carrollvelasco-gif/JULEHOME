"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export function WishlistPageContent() {
  const { items, toggle } = useWishlist();
  const { addItem, openCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-site flex min-h-[60vh] flex-col items-center justify-center pb-24 pt-10">
        <EmptyState
          icon={<Heart size={28} />}
          title="Aún no tienes favoritos"
          description="Guarda aquí las piezas que te enamoren. Estarán esperándote cuando quieras."
          action={<Button href="/tienda" size="lg">Descubrir la tienda</Button>}
        />
      </div>
    );
  }

  return (
    <div className="container-site pb-24 pt-8 md:pt-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink-950 dark:text-foreground sm:text-4xl">
            Tus favoritos
          </h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            {items.length} {items.length === 1 ? "pieza guardada" : "piezas guardadas"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((product, i) => (
          <motion.article
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface"
          >
            <Link
              href={`/producto/${product.slug}`}
              className="relative block aspect-[4/5] overflow-hidden"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <Link
                href={`/producto/${product.slug}`}
                className="font-display text-base font-medium text-ink-950 hover:text-olive-700 dark:text-foreground dark:hover:text-olive-300"
              >
                {product.name}
              </Link>
              <p className="mt-0.5 text-xs text-ink-400">{product.aroma}</p>
              <p className="mt-2 text-sm font-semibold text-ink-950 dark:text-foreground">
                {formatPrice(product.price)}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    addItem(product);
                    openCart();
                  }}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-olive-600 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-olive-700"
                >
                  <ShoppingBag size={14} />
                  Al carrito
                </button>
                <button
                  onClick={() => toggle(product)}
                  aria-label={`Quitar ${product.name} de favoritos`}
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-ink-400 transition-colors hover:border-embers-600/40 hover:text-embers-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
