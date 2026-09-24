"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check, Clock, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Form";
import { Reveal } from "@/components/ui/Reveal";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre"),
  email: z.string().trim().email("Introduce un email válido"),
  subject: z.string().trim().min(4, "Cuéntanos brevemente el asunto"),
  message: z.string().trim().min(10, "El mensaje es demasiado corto"),
});

type ContactValues = z.infer<typeof contactSchema>;

const infoItems = [
  { Icon: MapPin, label: "Dirección", value: SITE.address },
  { Icon: Phone, label: "Teléfono", value: SITE.phone },
  { Icon: Clock, label: "Horario", value: SITE.hours },
];

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section className="container-site py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <Reveal>
            <span className="eyebrow text-olive-600 dark:text-olive-300">¿Hablamos?</span>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink-950 dark:text-foreground sm:text-4xl">
              Estamos a un mensaje de distancia
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              Nos encanta escuchar a nuestra comunidad. Escríbenos con cualquier
              duda y te responderemos con un toque humano.
            </p>
          </Reveal>

          <ul className="flex flex-col gap-5">
            {infoItems.map((item, i) => (
              <Reveal key={item.label} delay={0.1 + i * 0.06}>
                <li className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
                    <item.Icon size={18} strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-ink-950 dark:text-foreground">
                      {item.value}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3}>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hola JULEHOME 👋 tengo una consulta.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5b]"
            >
              <MessageCircle size={17} />
              Escríbenos por WhatsApp
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft sm:p-9">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-96 flex-col items-center justify-center gap-4 text-center"
              >
                <span className="grid size-14 place-items-center rounded-full bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
                  <Check size={26} />
                </span>
                <h3 className="font-display text-2xl font-medium text-ink-950 dark:text-foreground">
                  Mensaje enviado
                </h3>
                <p className="max-w-xs text-sm text-ink-500 dark:text-ink-400">
                  Gracias por escribirnos. Te responderemos muy pronto, en un
                  máximo de 24 horas.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                <h3 className="font-display text-xl font-medium text-ink-950 dark:text-foreground">
                  Envíanos un mensaje
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nombre" htmlFor="contact-name" error={errors.name?.message}>
                    <Input
                      id="contact-name"
                      placeholder="Tu nombre"
                      autoComplete="name"
                      {...register("name")}
                    />
                  </Field>
                  <Field label="Email" htmlFor="contact-email" error={errors.email?.message}>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="tu@email.com"
                      autoComplete="email"
                      {...register("email")}
                    />
                  </Field>
                </div>
                <Field label="Asunto" htmlFor="contact-subject" error={errors.subject?.message}>
                  <Input
                    id="contact-subject"
                    placeholder="¿En qué podemos ayudarte?"
                    {...register("subject")}
                  />
                </Field>
                <Field label="Mensaje" htmlFor="contact-message" error={errors.message?.message}>
                  <Textarea
                    id="contact-message"
                    placeholder="Cuéntanos tu historia…"
                    {...register("message")}
                  />
                </Field>
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-fit">
                  <Send size={16} />
                  {isSubmitting ? "Enviando…" : "Enviar mensaje"}
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-16 overflow-hidden rounded-3xl border border-line">
          <iframe
            title="Ubicación de JULEHOME"
            src="https://maps.google.com/maps?q=Bucaramanga%2C%20Santander%2C%20Colombia&t=&z=12&ie=UTF8&iwloc=&output=embed"
            className="h-96 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </section>
  );
}
