"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { requiresAromaSelection } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";

export function WishlistDrawer() {
  const { isOpen, closeWishlist, items, toggle } = useWishlist();
  const { addItem, openCart } = useCart();
  const router = useRouter();

  const addToCart = (product: Product) => {
    if (requiresAromaSelection(product)) {
      closeWishlist();
      router.push(`/producto/${product.slug}`);
      return;
    }
    addItem(product);
    closeWishlist();
    openCart();
  };

  return (
    <Drawer
      open={isOpen}
      onClose={closeWishlist}
      title="Favoritos"
      subtitle={items.length > 0 ? `${items.length} ${items.length === 1 ? "pieza guardada" : "piezas guardadas"}` : undefined}
    >
      {items.length === 0 ? (
        <EmptyState
          icon={<Heart size={26} />}
          title="Aún no tienes favoritos"
          description="Guarda las piezas que te enamoren para encontrarlas fácilmente más tarde."
          action={
            <Button href="/tienda" onClick={closeWishlist}>
              Descubrir la tienda
            </Button>
          }
        />
      ) : (
        <ul className="flex flex-col gap-5 p-5">
          {items.map((product) => (
            <li key={product.id} className="flex gap-4">
              <Link
                href={`/producto/${product.slug}`}
                onClick={closeWishlist}
                className="relative block size-20 shrink-0 overflow-hidden rounded-xl bg-surface-muted"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link
                      href={`/producto/${product.slug}`}
                      onClick={closeWishlist}
                      className="line-clamp-1 text-sm font-medium text-ink-950 hover:text-olive-700 dark:text-foreground dark:hover:text-olive-300"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-ink-400">{product.aroma}</p>
                    <p className="mt-1 text-sm font-medium text-ink-900 dark:text-foreground">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => toggle(product)}
                    aria-label={`Quitar ${product.name} de favoritos`}
                    className="grid size-7 shrink-0 place-items-center rounded-full text-ink-400 transition-colors hover:text-embers-600"
                  >
                    <Heart size={14} />
                  </button>
                </div>
                <div className="mt-auto pt-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-olive-700 transition-colors hover:text-olive-600 dark:text-olive-300"
                  >
                    <ShoppingBag size={13} />
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/favoritos"
              onClick={closeWishlist}
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-900 dark:text-foreground"
            >
              Ver todos los favoritos
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </li>
        </ul>
      )}
    </Drawer>
  );
}
