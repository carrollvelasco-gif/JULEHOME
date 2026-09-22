import { Flame, Gift, Gem, Heart, Leaf, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const benefits = [
  {
    Icon: Sparkles,
    title: "Fragancias exclusivas",
    text: "Notas únicas creadas junto a perfumistas para que ningún hogar huela igual.",
  },
  {
    Icon: Leaf,
    title: "Cera natural",
    text: "Cera de soja 100 % natural, vegana y de origen sostenible.",
  },
  {
    Icon: Flame,
    title: "Larga duración",
    text: "Hasta 60 horas de combustión limpia y constante en cada vela.",
  },
  {
    Icon: Heart,
    title: "Hecho con amor",
    text: "Elaboradas a mano en pequeños lotes con atención al detalle.",
  },
  {
    Icon: Gem,
    title: "Diseño elegante",
    text: "Envases reutilizables pensados para quedarse en tu casa para siempre.",
  },
  {
    Icon: Gift,
    title: "Regalo perfecto",
    text: "Presentaciones premium listas para sorprender en cualquier ocasión.",
  },
];

export function Benefits() {
  return (
    <section className="relative bg-surface-muted py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Por qué JULEHOME"
          title={
            <>
              Pequeños gestos, <em className="text-olive-600 dark:text-olive-300">grandes momentos</em>
            </>
          }
          description="Seis razones por las que miles de hogares ya confían en nuestras velas y difusores."
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={Math.min(i * 0.05, 0.3)} className="h-full">
              <div
                className={cn(
                  "group flex h-full flex-col gap-4 bg-background p-8 transition-colors duration-500 hover:bg-olive-50 dark:hover:bg-olive-900/30",
                )}
              >
                <span className="grid size-12 place-items-center rounded-full bg-olive-600/10 text-olive-700 transition-transform duration-500 group-hover:scale-110 dark:bg-olive-400/15 dark:text-olive-300">
                  <b.Icon size={21} strokeWidth={1.6} />
                </span>
                <h3 className="font-display text-xl font-medium text-ink-950 dark:text-foreground">
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                  {b.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
