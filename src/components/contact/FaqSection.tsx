"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { faqs, faqCategories } from "@/lib/data/faqs";
import { SITE } from "@/lib/constants";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [category, setCategory] = useState("Todas");
  const visible = faqs.filter((f) => category === "Todas" || f.category === category);

  return (
    <section className="container-site py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <span className="eyebrow text-olive-600 dark:text-olive-300">Ayuda</span>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink-950 dark:text-foreground sm:text-4xl">
            Resolvemos tus dudas
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
            No encuentras lo que buscas? Escríbenos y te ayudamos encantados.
          </p>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-900 underline-offset-4 hover:text-olive-700 hover:underline dark:text-foreground dark:hover:text-olive-300"
          >
            <MessageCircle size={16} className="text-[#25D366]" />
            Hablar con atención al cliente
          </a>

          <div className="mt-8 flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full border px-4 py-2 text-left text-sm font-medium transition-all duration-300 lg:rounded-xl",
                  category === cat
                    ? "border-olive-600 bg-olive-600 text-white dark:border-olive-400 dark:bg-olive-400 dark:text-ink-950"
                    : "border-line-strong text-ink-700 hover:border-olive-500 hover:text-olive-700 dark:text-ink-100 dark:hover:text-olive-300",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion
            items={visible.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
          />
        </Reveal>
      </div>
    </section>
  );
}
