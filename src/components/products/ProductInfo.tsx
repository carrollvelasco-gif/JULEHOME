"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { RatingStars } from "@/components/ui/RatingStars";
import { Accordion } from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const perks = [{ Icon: Truck, text: "Envío a calcular según destino" }];

export function ProductInfo({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const { has, toggle } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [aroma, setAroma] = useState<string | null>(null);
  const [aromaError, setAromaError] = useState(false);
  const [added, setAdded] = useState(false);
  const wished = has(product.id);

  const hasAromas = product.aromas && product.aromas.length > 0;

  const addToCart = () => {
    if (hasAromas && !aroma) {
      setAromaError(true);
      return;
    }
    setAromaError(false);
    addItem(product, quantity, aroma ?? undefined);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 650);
  };

  const buyNow = () => {
    if (hasAromas && !aroma) {
      setAromaError(true);
      return;
    }
    setAromaError(false);
    addItem(product, quantity, aroma ?? undefined);
    openCart();
  };

  const accordionItems = useMemo(
    () => [
      {
        id: "beneficios",
        question: "Beneficios",
        answer: (
          <ul className="space-y-2">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check size={15} className="mt-0.5 shrink-0 text-olive-600 dark:text-olive-300" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ),
      },
      {
        id: "uso",
        question: "Modo de uso",
        answer: <p>{product.usage}</p>,
      },
      {
        id: "detalles",
        question: "Detalles",
        answer: (
          <ul className="space-y-1 text-sm">
            <li>Duración: {product.duration}</li>
            {product.dimensions && <li>Medidas: {product.dimensions}</li>}
          </ul>
        ),
      },
    ],
    [product],
  );

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.name, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="olive">{product.aroma}</Badge>
        <Badge variant="neutral">{product.duration}</Badge>
        {!product.inStock && <Badge variant="embers">Agotado</Badge>}
      </div>

      <div>
        <h1 className="font-display text-balance text-3xl font-medium leading-tight text-ink-950 dark:text-foreground sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{product.subtitle}</p>
        <div className="mt-3 flex items-center gap-2">
          <RatingStars rating={product.rating} size={15} />
          <span className="text-sm text-ink-500 dark:text-ink-400">
            {product.rating.toFixed(1)} · {product.reviews} opiniones
          </span>
        </div>
      </div>

      <div className="border-y border-line py-5">
        <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
        <p className="mt-1 text-xs text-ink-400">
          IVA incluido · Envío por calcular según destino
        </p>
      </div>

      <p className="text-sm leading-relaxed text-ink-500 dark:text-ink-400">
        {product.description}
      </p>

      {hasAromas && (
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
              Aroma
            </h2>
            {aroma && (
              <span className="rounded-full bg-olive-600/10 px-2.5 py-0.5 text-xs font-semibold text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
                {aroma}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Selecciona tu aroma:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.aromas!.map((opt) => {
              const active = aroma === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setAroma(opt);
                    setAromaError(false);
                  }}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-300",
                    active
                      ? "border-olive-600 bg-olive-600/10 text-olive-700 ring-1 ring-olive-600/30 dark:border-olive-300 dark:bg-olive-400/15 dark:text-olive-300"
                      : "border-line-strong bg-surface text-ink-700 hover:border-olive-600/40 hover:text-olive-700 dark:text-ink-100 dark:hover:text-olive-300",
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {aromaError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-start gap-1.5 text-xs font-medium text-embers-600"
            >
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              Por favor, selecciona un aroma antes de continuar.
            </motion.p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-12 items-center rounded-full border border-line-strong px-1">
            <button
              aria-label="Reducir cantidad"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="grid size-9 place-items-center rounded-full text-ink-700 transition-colors hover:text-olive-700 dark:text-ink-100"
            >
              <Minus size={15} />
            </button>
            <span className="min-w-8 text-center text-sm font-medium tabular-nums">{quantity}</span>
            <button
              aria-label="Aumentar cantidad"
              onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              className="grid size-9 place-items-center rounded-full text-ink-700 transition-colors hover:text-olive-700 dark:text-ink-100"
            >
              <Plus size={15} />
            </button>
          </div>
          <Button
            className="h-12 flex-1"
            size="md"
            disabled={!product.inStock}
            onClick={addToCart}
          >
            <motion.span key={added ? "ok" : "add"} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {added ? <Check size={16} /> : <ShoppingBag size={16} />}
            </motion.span>
            {added ? "¡Añadido!" : "Añadir al carrito"}
          </Button>
          <button
            onClick={() => toggle(product)}
            aria-label={wished ? "Quitar de favoritos" : "Añadir a favoritos"}
            aria-pressed={wished}
            className={cn(
              "grid size-12 shrink-0 place-items-center rounded-full border transition-all duration-300",
              wished
                ? "border-embers-600/30 bg-embers-600/10 text-embers-600"
                : "border-line-strong text-ink-700 hover:border-embers-600/40 hover:text-embers-600 dark:text-ink-100",
            )}
          >
            <Heart size={18} fill={wished ? "currentColor" : "none"} />
          </button>
        </div>

        <Button
          variant="dark"
          size="md"
          className="h-12 w-full"
          disabled={!product.inStock}
          onClick={buyNow}
        >
          Comprar ahora
        </Button>
      </div>

      <div className="flex items-center gap-4 rounded-2xl bg-surface-muted px-5 py-4">
        {perks.map(({ Icon, text }, i) => (
          <span key={i} className="flex items-center gap-2 text-xs font-medium text-ink-700 dark:text-ink-100">
            <Icon size={15} className="text-olive-600 dark:text-olive-300" />
            {text}
          </span>
        ))}
      </div>

      <button
        onClick={share}
        className="inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ink-500 transition-colors hover:text-olive-700 dark:text-ink-400 dark:hover:text-olive-300"
      >
        <Share2 size={14} />
        Compartir
      </button>

      <Accordion items={accordionItems} defaultOpen="beneficios" />
    </div>
  );
}
