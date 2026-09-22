"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RatingStars } from "@/components/ui/RatingStars";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = testimonials.length;
  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, count]);

  const t = testimonials[index];

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 select-none font-display text-[22vw] font-semibold leading-none text-olive-600/[0.04] dark:text-olive-300/[0.05]"
      >
        ”
      </span>

      <div className="container-site">
        <SectionHeading
          eyebrow="Testimonios"
          title={
            <>
              Hogares que ya <em className="text-olive-600 dark:text-olive-300">huelen a JULEHOME</em>
            </>
          }
        />

        <div
          className="mx-auto mt-12 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative min-h-72">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col items-center gap-6 text-center"
              >
                <span className="grid size-12 place-items-center rounded-full bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
                  <Quote size={20} />
                </span>
                <blockquote className="font-display text-balance text-xl font-medium leading-relaxed text-ink-900 dark:text-foreground sm:text-2xl">
                  «{t.text}»
                </blockquote>
                <div className="flex flex-col items-center gap-1">
                  <RatingStars rating={t.rating} size={15} />
                  <figcaption className="mt-2 text-sm font-semibold text-ink-950 dark:text-foreground">
                    {t.name}
                  </figcaption>
                  <p className="text-xs text-ink-400">{t.location}</p>
                </div>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => go(-1)}
              aria-label="Testimonio anterior"
              className="grid size-11 place-items-center rounded-full border border-line-strong text-ink-700 transition-all duration-300 hover:border-olive-600 hover:text-olive-700 dark:text-ink-100 dark:hover:text-olive-300"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-400",
                    i === index
                      ? "w-7 bg-olive-600 dark:bg-olive-300"
                      : "w-1.5 bg-ink-900/15 hover:bg-ink-900/30 dark:bg-foreground/15",
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Testimonio siguiente"
              className="grid size-11 place-items-center rounded-full border border-line-strong text-ink-700 transition-all duration-300 hover:border-olive-600 hover:text-olive-700 dark:text-ink-100 dark:hover:text-olive-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
