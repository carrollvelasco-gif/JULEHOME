"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Form";
import { RatingPicker } from "@/components/ui/RatingPicker";
import { REVIEW_SUCCESS_MESSAGE } from "@/lib/reviewTypes";
import { reviewFormSchema } from "@/lib/reviews";

type ReviewFormProps = {
  productId?: string | null;
  onSubmitted?: () => void;
  compact?: boolean;
};

type FormValues = z.infer<typeof reviewFormSchema>;

export function ReviewForm({ productId, onSubmitted, compact }: ReviewFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { nombre: "", rating: 0, comentario: "" },
  });

  const rating = watch("rating");

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const res = await fetch("/api/resenas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: values.nombre,
          rating: values.rating,
          comentario: values.comentario,
          productId: productId ?? null,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;
      if (!res.ok) {
        setServerError(data?.error ?? "No se pudo enviar tu comentario.");
        return;
      }
      reset({ nombre: "", rating: 0, comentario: "" });
      setSubmitted(true);
      onSubmitted?.();
    } catch {
      setServerError("No se pudo enviar tu comentario. Inténtalo de nuevo.");
    }
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-line bg-surface p-8 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
          <Check size={26} />
        </span>
        <h3 className="font-display text-2xl font-medium text-ink-950 dark:text-foreground">
          ¡Comentario recibido!
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-ink-500 dark:text-ink-400">
          {REVIEW_SUCCESS_MESSAGE}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {serverError && (
        <p className="flex items-start gap-2 rounded-2xl border border-embers-600/25 bg-embers-600/5 px-4 py-3 text-sm font-medium text-embers-600 dark:text-embers-500">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {serverError}
        </p>
      )}

      <Field label="Nombre" htmlFor={`review-name-${productId ?? "global"}`} error={errors.nombre?.message}>
        <Input
          id={`review-name-${productId ?? "global"}`}
          placeholder="Tu nombre"
          autoComplete="name"
          maxLength={80}
          {...register("nombre")}
        />
      </Field>

      <Field label="Calificación" error={errors.rating?.message}>
        <RatingPicker
          value={rating}
          onChange={(v) => setValue("rating", v, { shouldValidate: true })}
          error={!!errors.rating}
        />
        {rating === 0 && !errors.rating && (
          <p className="text-xs text-ink-400">Selecciona de 1 a 5 estrellas.</p>
        )}
      </Field>

      <Field
        label="Comentario"
        htmlFor={`review-text-${productId ?? "global"}`}
        error={errors.comentario?.message}
        hint="Mínimo 10 caracteres · sin HTML ni scripts"
      >
        <Textarea
          id={`review-text-${productId ?? "global"}`}
          placeholder="Cuéntanos cómo fue tu experiencia con JULEHOME…"
          maxLength={1000}
          className={compact ? "min-h-24" : undefined}
          {...register("comentario")}
        />
      </Field>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-fit">
        {isSubmitting ? "Publicando…" : "Publicar comentario"}
      </Button>
    </form>
  );
}