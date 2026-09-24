"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuantitySelector } from "@/components/ui/QuantitySelector";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    updateQuantity,
    removeItem,
    subtotal,
  } = useCart();

  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      title="Tu carrito"
      subtitle={items.length > 0 ? `${items.length} ${items.length === 1 ? "artículo" : "artículos"}` : undefined}
      footer={
        items.length > 0 ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-500 dark:text-ink-400">Subtotal</span>
                <span className="font-medium text-ink-950 dark:text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-500 dark:text-ink-400">Envío</span>
                <span className="font-medium text-ink-700 dark:text-ink-100">Por calcular</span>
              </div>
              <div className="flex items-baseline justify-between gap-x-3 gap-y-1 border-t border-line pt-3 text-base">
                <span className="font-medium text-ink-950 dark:text-foreground">Total</span>
                <span className="font-display text-base font-semibold text-ink-950 dark:text-foreground">
                  {formatPrice(subtotal)}{" "}
                  <span className="text-xs font-medium text-ink-400">+ valor del envío</span>
                </span>
              </div>
            </div>
            <Button href="/checkout" onClick={closeCart} className="w-full" size="lg">
              <ShoppingBag size={17} />
              Tramitar pedido
            </Button>
            <button
              onClick={closeCart}
              className="w-full text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-500 underline-offset-4 hover:text-olive-700 hover:underline dark:text-ink-400 dark:hover:text-olive-300"
            >
              Seguir comprando
            </button>
          </div>
        ) : undefined
      }
    >
      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={26} />}
          title="Tu carrito está vacío"
          description="Descubre nuestras velas y difusores para llenar tu hogar de calidez."
          action={
            <Button href="/tienda" onClick={closeCart}>
              Explorar tienda
            </Button>
          }
        />
      ) : (
        <div className="flex flex-col gap-6 p-5">
          <ul className="flex flex-col gap-5">
            <AnimatePresence initial={false}>
              {items.map((item) => {
                const { product, quantity } = item;
                return (
                <motion.li
                  key={item.key}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4"
                >
                  <Link
                    href={`/producto/${product.slug}`}
                    onClick={closeCart}
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
                          onClick={closeCart}
                          className="line-clamp-1 text-sm font-medium text-ink-950 hover:text-olive-700 dark:text-foreground dark:hover:text-olive-300"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-ink-400">
                          {item.aroma ? `Aroma: ${item.aroma}` : product.aroma}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        aria-label={`Eliminar ${product.name}`}
                        className="grid size-7 shrink-0 place-items-center rounded-full text-ink-400 transition-colors hover:bg-embers-600/10 hover:text-embers-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantitySelector
                        size="sm"
                        value={quantity}
                        onChange={(q) => updateQuantity(item.key, q)}
                      />
                      <span className="text-sm font-medium text-ink-950 dark:text-foreground">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
      )}
    </Drawer>
  );
}
