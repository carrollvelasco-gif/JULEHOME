"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { u } from "@/lib/images";

const newsletterSchema = z.object({
  email: z.string().trim().email("Introduce un email válido"),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = () => {
    setSubscribed(true);
    reset();
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0">
            <ImageWithFallback
              src={u("cozyHome")}
              alt="Ambiente cálido con velas encendidas"
              fill
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-ink-950/65 dark:bg-ink-950/75" />
          </div>

          <div className="relative px-6 py-16 text-center sm:px-12 md:py-20">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-white/10 text-olive-200 backdrop-blur">
              <Mail size={20} />
            </span>
            <h2 className="mt-6 font-display text-balance text-3xl font-medium text-white sm:text-4xl">
              Recibe un <em className="text-olive-300">10 % de descuento</em> en tu primera compra
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-balance text-sm leading-relaxed text-white/75 sm:text-base">
              Suscríbete a nuestra newsletter y descubre primero las nuevas
              colecciones, ediciones limitadas y rituales de temporada.
            </p>

            <div className="mx-auto mt-8 max-w-md">
              {subscribed ? (
                <div className="flex items-center justify-center gap-2 rounded-full bg-olive-500/20 px-6 py-4 text-sm font-medium text-olive-200 backdrop-blur">
                  <Check size={17} />
                  ¡Gracias! Tu descuento te espera en tu correo.
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <div className="flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Tu correo electrónico
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      placeholder="Tu correo electrónico"
                      autoComplete="email"
                      {...register("email")}
                      className="h-12 w-full rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-white/50 backdrop-blur transition-all focus:border-olive-300 focus:outline-none focus:ring-4 focus:ring-olive-300/20"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-olive-500 px-7 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-olive-400 disabled:opacity-60"
                  >
                    Suscribirme
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              )}
              {errors.email && (
                <p className="mt-3 text-xs font-medium text-embers-500">{errors.email.message}</p>
              )}
              <p className="mt-4 text-[0.68rem] text-white/50">
                Al suscribirte aceptas nuestra política de privacidad. Puedes darte de baja cuando quieras.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
