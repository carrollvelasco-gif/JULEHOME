"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { RatingStars } from "@/components/ui/RatingStars";
import { QuantitySelector } from "@/components/ui/QuantitySelector";

export function ProductQuickView() {
  const { quickViewProduct, closeQuickView } = useUI();
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = quickViewProduct;

  return (
    <Modal open={!!product} onClose={closeQuickView} label="Vista rápida del producto">
      {product && (
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <RatingStars rating={product.rating} size={13} />
              <span className="text-xs text-ink-400">
                {product.reviews} opiniones
              </span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-medium text-ink-950 dark:text-foreground">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{product.subtitle}</p>
            <div className="mt-4">
              <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
            </div>

            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              {product.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="olive">{product.aroma}</Badge>
              <Badge variant="neutral">{product.duration}</Badge>
              {product.inStock ? (
                <Badge variant="neutral">
                  <span className="size-1.5 rounded-full bg-olive-500" /> En stock
                </Badge>
              ) : (
                <Badge variant="embers">Agotado</Badge>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <QuantitySelector value={quantity} onChange={setQuantity} />
                <Button
                  className="flex-1"
                  disabled={!product.inStock}
                  onClick={() => {
                    addItem(product, quantity);
                    closeQuickView();
                    openCart();
                  }}
                >
                  <ShoppingBag size={16} />
                  Añadir al carrito
                </Button>
              </div>
            </div>

            <Link
              href={`/producto/${product.slug}`}
              onClick={closeQuickView}
              className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-olive-700 dark:text-olive-300"
            >
              Ver ficha completa
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      )}
    </Modal>
  );
}
