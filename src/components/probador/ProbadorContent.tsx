"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Images,
  Loader2,
  ShoppingBag,
  Sparkles,
  Upload,
  Wand2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { requiresAromaSelection } from "@/lib/cart";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Price } from "@/components/ui/Price";
import { RatingStars } from "@/components/ui/RatingStars";
import { Reveal } from "@/components/ui/Reveal";
import { EASE } from "@/lib/motion";

type ProbadorContentProps = {
  initialProduct: Product;
};

export function ProbadorContent({ initialProduct }: ProbadorContentProps) {
  const { addItem, openCart } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState(initialProduct);
  const [active, setActive] = useState(0);
  const [spacePhoto, setSpacePhoto] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [preview, setPreview] = useState(false);

  const categoryName =
    categories.find((c) => c.slug === product.category)?.name ?? product.category;

  const selectProduct = (p: Product) => {
    setProduct(p);
    setActive(0);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSpacePhoto(url);
    setPreview(false);
    setGenerating(true);
    window.setTimeout(() => {
      setGenerating(false);
      setPreview(true);
    }, 2200);
  };

  const resetPhoto = () => {
    setSpacePhoto(null);
    setPreview(false);
    setGenerating(false);
  };

  return (
    <div className="container-site pb-24 pt-8 md:pt-12">
      <Link
        href="/tienda"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-900 underline-offset-4 hover:text-olive-700 hover:underline dark:text-foreground dark:hover:text-olive-300"
      >
        <ArrowLeft size={15} />
        Volver a la tienda
      </Link>

      <Reveal>
        <div className="mt-6 flex flex-col items-start gap-5 rounded-3xl border border-olive-600/15 bg-surface p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
              <Wand2 size={22} strokeWidth={1.6} />
            </span>
            <div>
              <p className="eyebrow text-olive-700 dark:text-olive-300">Probador JULEHOME</p>
              <h1 className="font-display text-2xl font-medium text-ink-950 dark:text-foreground sm:text-3xl">
                Probar en mi espacio
              </h1>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-500 dark:text-ink-400">
            Visualiza cada pieza en tu hogar antes de comprar. Elegimos por ti el
            producto que estabas viendo: solo explora y decide.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface-muted">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={product.images[active]}
                    alt={`${product.name} — vista ${active + 1}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/85 px-3 py-1.5 text-xs font-semibold text-olive-700 shadow-soft backdrop-blur dark:text-olive-300">
                <Sparkles size={13} />
                Seleccionado
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Ver vista ${i + 1}`}
                    className={cn(
                      "relative aspect-square w-20 overflow-hidden rounded-xl border bg-surface-muted transition-all duration-300",
                      i === active
                        ? "border-olive-600 ring-2 ring-olive-600/20 dark:border-olive-300"
                        : "border-line opacity-70 hover:opacity-100",
                    )}
                  >
                    <ImageWithFallback src={src} alt="" fill sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-line bg-surface p-7 shadow-soft">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="neutral">{categoryName}</Badge>
                {product.badges.map((badge) => (
                  <Badge key={badge} variant="neutral">
                    {badge}
                  </Badge>
                ))}
              </div>

              <h2 className="mt-4 font-display text-3xl font-medium text-ink-950 dark:text-foreground">
                {product.name}
              </h2>
              <p className="mt-1 text-sm text-ink-400">{product.aroma}</p>

              <div className="mt-3 flex items-center gap-2">
                <RatingStars rating={product.rating} size={14} />
                <span className="text-xs text-ink-400">({product.reviews})</span>
              </div>

              <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" className="mt-5" />

              <p className="mt-5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                {product.description}
              </p>

              {product.benefits.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {product.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 text-sm text-ink-600 dark:text-ink-300"
                    >
                      <Check size={15} className="mt-0.5 shrink-0 text-olive-600 dark:text-olive-300" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              )}

              <Button
                size="lg"
                className="mt-8 w-full"
                onClick={() => {
                  if (requiresAromaSelection(product)) {
                    router.push(`/producto/${product.slug}`);
                    return;
                  }
                  addItem(product);
                  openCart();
                }}
              >
                <ShoppingBag size={18} />
                Añadir al carrito
              </Button>
              <p className="mt-3 text-center text-xs text-ink-400">
                {product.material ? `Material: ${product.material}` : ""}
                {product.dimensions ? ` · ${product.dimensions}` : ""}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
            <Upload size={17} strokeWidth={1.6} />
          </span>
          <div>
            <h2 className="font-display text-xl font-medium text-ink-950 dark:text-foreground">
              Adjunta la foto de tu espacio
            </h2>
            <p className="text-xs text-ink-400">
              Sube una foto de tu sala o rincón favorito y visualiza {product.name} en tu hogar.
            </p>
          </div>
        </div>

        <div className="mt-5">
          {!spacePhoto ? (
            <label
              htmlFor="space-photo"
              className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-olive-600/25 bg-surface px-6 py-14 text-center transition-colors duration-300 hover:border-olive-600/50 hover:bg-olive-600/5"
            >
              <span className="grid size-14 place-items-center rounded-full bg-olive-600/10 text-olive-700 transition-transform duration-300 group-hover:scale-105 dark:bg-olive-400/15 dark:text-olive-300">
                <Upload size={22} strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-950 dark:text-foreground">
                  Arrastra tu foto aquí o haz clic para subirla
                </p>
                <p className="mt-1 text-xs text-ink-400">
                  JPG, PNG o WebP · sala, dormitorio o tu rincón favorito
                </p>
              </div>
              <input
                id="space-photo"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFile}
              />
            </label>
          ) : (
            <div className="relative overflow-hidden rounded-3xl border border-line shadow-soft">
              <div className="relative aspect-[4/3] max-h-[440px] w-full bg-surface-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={spacePhoto}
                  alt="Foto de tu espacio"
                  className="h-full w-full object-cover"
                />
                {generating && (
                  <div className="absolute inset-0 z-10 grid place-items-center bg-ink-950/40 backdrop-blur-[2px]">
                    <div className="flex flex-col items-center gap-3 rounded-2xl bg-background/90 px-6 py-5 shadow-soft">
                      <Loader2 size={22} className="animate-spin text-olive-600 dark:text-olive-300" />
                      <p className="text-sm font-medium text-ink-900 dark:text-foreground">
                        Visualizando {product.name} en tu espacio…
                      </p>
                    </div>
                  </div>
                )}
                {preview && !generating && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="absolute bottom-4 right-4 z-10 flex flex-col items-center gap-2"
                  >
                    <div className="relative aspect-[4/5] w-28 overflow-hidden rounded-2xl border border-white/60 shadow-lift">
                      <ImageWithFallback
                        src={product.images[active]}
                        alt={product.name}
                        fill
                        sizes="112px"
                      />
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-olive-700 shadow-soft backdrop-blur dark:text-olive-300">
                      <Sparkles size={12} />
                      {product.name}
                    </span>
                  </motion.div>
                )}
                <button
                  onClick={resetPhoto}
                  aria-label="Quitar foto"
                  className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-background/90 text-ink-700 shadow-soft backdrop-blur transition-colors hover:text-embers-600"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
            <Images size={17} strokeWidth={1.6} />
          </span>
          <div>
            <h2 className="font-display text-xl font-medium text-ink-950 dark:text-foreground">
              Elige otro producto
            </h2>
            <p className="text-xs text-ink-400">
              Explora el resto del catálogo sin perder el contexto del probador.
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-2.5 overflow-x-auto pb-2">
          {products.map((p) => {
            const selected = p.id === product.id;
            return (
              <motion.button
                key={p.id}
                onClick={() => selectProduct(p)}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-300",
                  selected
                    ? "border-olive-600 bg-olive-600/10 text-olive-700 dark:border-olive-300 dark:text-olive-300"
                    : "border-line bg-surface text-ink-700 hover:border-olive-600/40 hover:text-olive-700 dark:text-ink-200 dark:hover:text-olive-300",
                )}
              >
                {p.name}
                {selected && (
                  <motion.span
                    layoutId={`probador-check-${p.id}`}
                    className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-olive-600 text-white"
                  >
                    <Check size={12} />
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}
