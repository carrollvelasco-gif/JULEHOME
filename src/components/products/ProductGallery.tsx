"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div
        className="group relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-3xl border border-line bg-surface-muted"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
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
              src={images[active]}
              alt={`${name} — vista ${active + 1}`}
              fill
              priority={active === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={cn(
                "transition-transform duration-[1.6s] ease-out",
                zoomed ? "scale-125" : "scale-100",
              )}
            />
          </motion.div>
        </AnimatePresence>

        <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ink-500 shadow-soft backdrop-blur dark:text-ink-400">
          <Maximize2 size={12} />
          {zoomed ? "Alejar" : "Ampliar"}
        </span>
      </div>

      <div className="flex gap-3">
        {images.map((src, i) => (
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
    </div>
  );
}
