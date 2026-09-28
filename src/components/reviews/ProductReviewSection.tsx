"use client";

import { motion } from "framer-motion";
import { MessageSquare, Star } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RatingStars } from "@/components/ui/RatingStars";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { EASE } from "@/lib/motion";
import { fetchReviews, formatReviewDate, summarizeReviews } from "@/lib/reviewClient";
import type { ReviewPublic } from "@/lib/reviewTypes";

type ProductReviewSectionProps = {
  productSlug: string;
};

export function ProductReviewSection({ productSlug }: ProductReviewSectionProps) {
  const [reviews, setReviews] = useState<ReviewPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchReviews(productSlug);
      setReviews(data);
    } catch {
      setError("No se pudieron cargar las opiniones en este momento.");
    } finally {
      setLoading(false);
    }
  }, [productSlug]);

  useEffect(() => {
    load();
  }, [load]);

  const summary = useMemo(() => summarizeReviews(reviews), [reviews]);

  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr]">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <div className="rounded-3xl border border-line bg-surface p-8 text-center">
          {summary.count > 0 ? (
            <>
              <p className="font-display text-5xl font-semibold text-ink-950 dark:text-foreground">
                {summary.average.toFixed(1)}
              </p>
              <div className="mt-3 flex justify-center">
                <RatingStars rating={summary.average} size={18} />
              </div>
              <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
                {summary.count} {summary.count === 1 ? "reseña" : "reseñas"}
              </p>
            </>
          ) : (
            <>
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
                <Star size={20} />
              </span>
              <p className="mt-4 font-display text-lg font-medium text-ink-950 dark:text-foreground">
                Aún no hay reseñas
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                Sé el primero en compartir tu experiencia.
              </p>
            </>
          )}

          <div className="mt-6 border-t border-line pt-6 text-left">
            <RatingDistribution reviews={reviews} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="rounded-3xl border border-line bg-surface p-7">
          <h3 className="font-display text-xl font-medium text-ink-950 dark:text-foreground">
            Cuéntanos tu experiencia
          </h3>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Tu opinión será revisada antes de publicarse.
          </p>
          <div className="mt-5">
            <ReviewForm
              productId={productSlug}
              compact
              onSubmitted={load}
            />
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-36 animate-pulse rounded-3xl border border-line bg-surface" />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-ink-500 dark:text-ink-400">{error}</p>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line-strong bg-surface p-10 text-center">
            <MessageSquare size={22} className="text-olive-600/60 dark:text-olive-300/60" />
            <p className="text-sm text-ink-500 dark:text-ink-400">
              Sé el primero en compartir tu experiencia con este producto.
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {reviews.map((r, i) => (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.06, 0.3), duration: 0.45, ease: EASE }}
                className="rounded-3xl border border-line bg-surface p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-olive-600/10 font-display text-sm font-semibold text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
                      {r.nombre.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink-950 dark:text-foreground">
                        {r.nombre}
                      </p>
                      <p className="text-xs text-ink-400">{formatReviewDate(r.createdAt)}</p>
                    </div>
                  </div>
                  <RatingStars rating={r.rating} size={13} />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {r.comentario}
                </p>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function RatingDistribution({ reviews }: { reviews: ReviewPublic[] }) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const total = reviews.length;

  return (
    <div className="space-y-2 text-xs text-ink-500 dark:text-ink-400">
      {counts.map(({ star, count }) => {
        const pct = total ? Math.round((count / total) * 100) : 0;
        return (
          <div key={star} className="flex items-center gap-2">
            <span className="w-3">{star}★</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-gold-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-8 text-right">{pct}%</span>
          </div>
        );
      })}
      {total === 0 && <p className="pt-1">Sin reseñas aún.</p>}
    </div>
  );
}