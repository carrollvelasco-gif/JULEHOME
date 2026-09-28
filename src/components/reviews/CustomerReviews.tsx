"use client";

import { motion } from "framer-motion";
import { MessageSquare, MessageSquarePlus, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { RatingStars } from "@/components/ui/RatingStars";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { fetchReviews, formatReviewDate } from "@/lib/reviewClient";
import type { ReviewPublic } from "@/lib/reviewTypes";

export function CustomerReviews() {
  const [reviews, setReviews] = useState<ReviewPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchReviews();
      setReviews(data);
    } catch {
      setError("No se pudieron cargar las opiniones en este momento.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const average = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  return (
    <section className="relative overflow-hidden bg-surface-muted py-20 md:py-28">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Opiniones"
            title={
              <>
                Lo que dicen <em className="text-olive-600 dark:text-olive-300">nuestros clientes</em>
              </>
            }
            description="Historias reales de quienes ya hacen de su hogar un refugio con JULEHOME."
          />
          <Button onClick={() => setShowForm(true)} className="shrink-0">
            <MessageSquarePlus size={16} />
            Deja tu opinión
          </Button>
        </div>

        {average > 0 && reviews.length > 0 && (
          <div className="mt-8 flex items-center gap-3">
            <span className="font-display text-4xl font-semibold text-ink-950 dark:text-foreground">
              {average.toFixed(1)}
            </span>
            <div className="flex flex-col gap-1">
              <RatingStars rating={average} size={16} />
              <span className="text-xs text-ink-500 dark:text-ink-400">
                Basado en {reviews.length} {reviews.length === 1 ? "opinión" : "opiniones"}
              </span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-52 animate-pulse rounded-3xl border border-line bg-surface"
              />
            ))}
          </div>
        ) : error ? (
          <p className="mt-12 text-sm text-ink-500 dark:text-ink-400">{error}</p>
        ) : reviews.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line-strong bg-background p-10 text-center">
            <MessageSquare size={22} className="text-olive-600/60 dark:text-olive-300/60" />
            <p className="font-display text-lg font-medium text-ink-950 dark:text-foreground">
              Aún no hay opiniones
            </p>
            <p className="max-w-md text-sm text-ink-500 dark:text-ink-400">
              Sé el primero en compartir tu experiencia con JULEHOME.
            </p>
            <Button variant="outline" onClick={() => setShowForm(true)} className="mt-2">
              Deja tu opinión
            </Button>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <motion.figure
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.06, 0.3), duration: 0.45, ease: EASE }}
                className="flex flex-col gap-4 rounded-3xl border border-line bg-background p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-olive-600/10 font-display text-sm font-semibold text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
                    {r.nombre.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink-950 dark:text-foreground">
                      {r.nombre}
                    </p>
                    <p className="text-xs text-ink-400">{formatReviewDate(r.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gold-500">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={13}
                      className={cn(s < r.rating ? "" : "text-ink-200 dark:text-ink-700")}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  «{r.comentario}»
                </blockquote>
              </motion.figure>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-ink-950/60 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative my-8 w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-lift sm:p-8"
          >
            <button
              onClick={() => setShowForm(false)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-line-strong text-ink-500 transition-colors hover:text-olive-700 dark:text-ink-400"
            >
              <span className="text-lg leading-none">&times;</span>
            </button>
            <h3 className="font-display text-2xl font-medium text-ink-950 dark:text-foreground">
              Deja tu opinión
            </h3>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
              Cuéntanos cómo fue tu experiencia con JULEHOME.
            </p>
            <div className="mt-6">
              <ReviewForm
                onSubmitted={() => {
                  setTimeout(() => setShowForm(false), 1200);
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}