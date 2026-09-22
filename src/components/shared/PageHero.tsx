"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { EASE, fade } from "@/lib/motion";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  image?: string;
  imageAlt?: string;
  breadcrumbs?: BreadcrumbItem[];
  compact?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  breadcrumbs,
  compact = false,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        {image ? (
          <ImageWithFallback
            src={image}
            alt={imageAlt ?? "Ambiente JULEHOME"}
            fill
            priority
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-olive-100 via-cream-100 to-beige-300/50 dark:from-olive-900/30 dark:via-surface-muted dark:to-olive-950/60" />
        )}
        <div className="absolute inset-0 bg-ink-950/45 dark:bg-ink-950/60" />
      </div>

      <div
        className={
          compact
            ? "container-site relative flex min-h-[38vh] flex-col justify-center pb-14 pt-32"
            : "container-site relative flex min-h-[52vh] flex-col justify-center pb-20 pt-36"
        }
      >
        {breadcrumbs && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8"
          >
            <Breadcrumbs items={breadcrumbs} />
          </motion.div>
        )}
        <motion.div variants={{ hidden: {}, visible: {} }} initial="hidden" animate="visible">
          <motion.p
            variants={fade(0.1)}
            className="eyebrow mb-4 text-olive-200"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fade(0.2)}
            className="font-display max-w-3xl text-balance text-4xl font-medium leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={fade(0.3)}
              className="mt-5 max-w-xl text-balance text-base leading-relaxed text-white/80 sm:text-lg"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/90 to-transparent" />
    </section>
  );
}
