"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Star } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";
import { u } from "@/lib/images";

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: EASE },
  },
});

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-kenburns">
          <ImageWithFallback
            src={u("hero")}
            alt="Salón elegante iluminado con velas JULEHOME"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/45 to-ink-950/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/90 to-transparent" />
      </div>

      <div className="container-site relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-36">
        <div className="max-w-2xl">
          <motion.p
            variants={fadeUp(0.15)}
            initial="hidden"
            animate="visible"
            className="eyebrow mb-6 flex items-center gap-3 text-olive-200"
          >
            <span className="inline-block h-px w-10 bg-olive-300/60" />
            Velas · Aromas · Hogar
          </motion.p>

          <motion.h1
            variants={fadeUp(0.3)}
            initial="hidden"
            animate="visible"
            className="font-display text-balance text-5xl font-medium leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            Ilumina tu hogar
            <br />
            <em className="text-olive-300">con elegancia.</em>
          </motion.h1>

          <motion.p
            variants={fadeUp(0.45)}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-white/80 sm:text-lg"
          >
            Velas aromáticas y decoración para crear espacios llenos de
            tranquilidad y estilo. Cera natural, aromas que abrazan y detalles
            que convierten una casa en hogar.
          </motion.p>

          <motion.div
            variants={fadeUp(0.6)}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="/tienda" size="lg" variant="primary">
              Comprar ahora
              <ArrowRight size={17} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
            <Button href="/colecciones" size="lg" variant="light">
              Explorar colección
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp(0.75)}
            initial="hidden"
            animate="visible"
            className="mt-12 flex flex-wrap items-center gap-6 text-sm text-white/70"
          >
            <span className="flex items-center gap-1.5">
              <Star size={15} className="fill-gold-400 text-gold-400" />
              <strong className="text-white">4,9/5</strong> · +2.400 opiniones
            </span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span>Cera 100 % natural</span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span>Envío calculado según tu destino</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="absolute bottom-24 right-6 hidden flex-col items-end gap-4 lg:flex"
        >
          <div className="animate-float rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Vela nº 1</p>
            <p className="font-display text-lg text-white">Ambra Cálida</p>
            <p className="text-xs text-olive-200">185.000 COP · Cera natural</p>
          </div>
          <div
            className="animate-float rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md"
            style={{ animationDelay: "1.4s" }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Colección</p>
            <p className="font-display text-lg text-white">Navidad 2026</p>
            <p className="text-xs text-olive-200">Edición limitada</p>
          </div>
        </motion.div>

        {!reduce && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <a
              href="#categorias"
              aria-label="Ver categorías"
              className="flex flex-col items-center gap-2 text-white/60 transition-colors hover:text-white"
            >
              <span className="text-[0.62rem] uppercase tracking-[0.3em]">Descubre</span>
              <motion.span
                animate={reduce ? undefined : { y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={16} />
              </motion.span>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
