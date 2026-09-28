import { z } from "zod";

/**
 * Saneamiento de texto de reseñas:
 * - Elimina cualquier etiqueta HTML/script para evitar inyección de código.
 * - Normaliza espacios y recorta extremos.
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d{1,5};)/g, "&amp;")
    .replace(/\s+/g, " ")
    .trim();
}

/** Bloquea intentos evidentes de incluir scripts o HTML en el comentario. */
export function hasSuspiciousContent(input: string): boolean {
  const lower = input.toLowerCase();
  return (
    /<\s*\w[^>]*>/g.test(lower) ||
    /\bjavascript\s*:/g.test(lower) ||
    /\bonerror\b|\bonclick\b|\bonload\b|\b<script\b|\b<iframe\b|\b expression\(/g.test(
      lower,
    )
  );
}

export const reviewSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre (mínimo 2 caracteres)")
    .max(80, "El nombre no puede superar los 80 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ' .-]+$/, "El nombre contiene caracteres no válidos"),
  rating: z
    .number({ message: "Selecciona una calificación" })
    .int("La calificación debe ser un número entero")
    .min(1, "Selecciona al menos 1 estrella")
    .max(5, "La calificación máxima es 5 estrellas"),
  comentario: z
    .string()
    .trim()
    .min(10, "El comentario es demasiado corto (mínimo 10 caracteres)")
    .max(1000, "El comentario no puede superar los 1000 caracteres"),
  productId: z
    .string()
    .trim()
    .max(120, "Identificador de producto no válido")
    .nullable()
    .optional(),
});

/** Esquema para formularios de cliente (sin productId; este se asigna en el servidor). */
export const reviewFormSchema = reviewSchema.omit({ productId: true });

export type ReviewInput = z.infer<typeof reviewSchema>;
export type ReviewFormInput = z.infer<typeof reviewFormSchema>;
export type ReviewStatus = "pending" | "approved" | "rejected";

export const REVIEW_STATUSES: ReviewStatus[] = ["pending", "approved", "rejected"];