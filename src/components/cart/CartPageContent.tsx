"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SITE } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { EmptyState } from "@/components/ui/EmptyState";

export function CartPageContent() {
  const { items, updateQuantity, removeItem, subtotal, shipping, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-site flex min-h-[60vh] flex-col items-center justify-center pb-24 pt-10">
        <EmptyState
          icon={<ShoppingBag size={28} />}
          title="Tu carrito está vacío"
          description="Llena tu hogar de luz, aroma y calidez con nuestra colección de velas y difusores."
          action={<Button href="/tienda" size="lg">Explorar la tienda</Button>}
        />
      </div>
    );
  }

  const remaining = Math.max(0, SITE.freeShippingFrom - subtotal);

  return (
    <div className="container-site pb-24 pt-8 md:pt-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink-950 dark:text-foreground sm:text-4xl">
            Tu carrito
          </h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            {itemCount} {itemCount === 1 ? "artículo" : "artículos"}
          </p>
        </div>
        <Link
          href="/tienda"
          className="hidden items-center gap-2 text-sm font-medium text-ink-900 underline-offset-4 hover:text-olive-700 hover:underline sm:inline-flex dark:text-foreground dark:hover:text-olive-300"
        >
          Seguir comprando
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <div className="mb-6 flex items-center gap-3 rounded-2xl bg-surface-muted p-4">
            <Truck size={18} className="shrink-0 text-olive-700 dark:text-olive-300" />
            <p className="text-sm text-ink-700 dark:text-ink-100">
              {remaining > 0 ? (
                <>
                  Te faltan <strong className="text-olive-700 dark:text-olive-300">{formatPrice(remaining)}</strong> para el envío gratuito
                </>
              ) : (
                <strong className="text-olive-700 dark:text-olive-300">¡Enhorabuena, tienes envío gratuito!</strong>
              )}
            </p>
          </div>

          <ul className="divide-y divide-line">
            {items.map(({ product, quantity }) => (
              <motion.li
                key={product.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 24 }}
                className="flex gap-5 py-6"
              >
                <Link
                  href={`/producto/${product.slug}`}
                  className="relative block size-24 shrink-0 overflow-hidden rounded-2xl bg-surface-muted sm:size-28"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/producto/${product.slug}`}
                        className="font-display text-base font-medium text-ink-950 hover:text-olive-700 dark:text-foreground dark:hover:text-olive-300 sm:text-lg"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-ink-400">
                        {product.aroma} · {product.subtitle}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      aria-label={`Eliminar ${product.name}`}
                      className="grid size-8 shrink-0 place-items-center rounded-full text-ink-400 transition-colors hover:bg-embers-600/10 hover:text-embers-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <QuantitySelector value={quantity} onChange={(q) => updateQuantity(product.id, q)} />
                    <span className="font-display text-lg font-semibold text-ink-950 dark:text-foreground">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-3xl border border-line bg-surface p-7 shadow-soft">
            <h2 className="font-display text-xl font-medium text-ink-950 dark:text-foreground">
              Resumen del pedido
            </h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-ink-500 dark:text-ink-400">Subtotal</span>
                <span className="font-medium text-ink-950 dark:text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-500 dark:text-ink-400">Envío</span>
                <span className="font-medium text-ink-950 dark:text-foreground">
                  {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-3 text-base">
                <span className="font-medium text-ink-950 dark:text-foreground">Total</span>
                <span className="font-display text-2xl font-semibold text-ink-950 dark:text-foreground">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
            <Button href="/checkout" size="lg" className="mt-6 w-full">
              Tramitar pedido
            </Button>
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-400">
              <ShieldCheck size={14} className="mt-0.5 shrink-0 text-olive-600 dark:text-olive-300" />
              Pago 100 % seguro. Puedes personalizar tu regalo en el siguiente paso.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
