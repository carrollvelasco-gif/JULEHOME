"use client";

import { sanitizeText } from "@/lib/reviews";
import type { ReviewFormValues, ReviewPublic, ReviewSummary } from "@/lib/reviewTypes";

export async function fetchReviews(productId?: string | null): Promise<ReviewPublic[]> {
  const url = productId
    ? `/api/resenas?productId=${encodeURIComponent(productId)}`
    : "/api/resenas";
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudieron cargar las reseñas.");
  const data = (await res.json()) as { reviews: ReviewPublic[] };
  return data.reviews;
}

export async function submitReview(values: ReviewFormValues): Promise<void> {
  const res = await fetch("/api/resenas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: sanitizeText(values.nombre),
      rating: values.rating,
      comentario: sanitizeText(values.comentario),
      productId: values.productId ?? null,
    }),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "No se pudo enviar tu comentario.");
  }
}

/** Calcula promedio y total a partir de reseñas aprobadas cargadas. */
export function summarizeReviews(reviews: ReviewPublic[]): ReviewSummary {
  if (reviews.length === 0) return { average: 0, count: 0 };
  const total = reviews.reduce((acc, r) => acc + r.rating, 0);
  return { average: total / reviews.length, count: reviews.length };
}

export function formatReviewDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}