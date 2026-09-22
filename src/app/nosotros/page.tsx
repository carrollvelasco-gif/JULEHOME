import type { Metadata } from "next";
import { ArrowRight, Flame, Home as HomeIcon, Leaf, Sparkles } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { u } from "@/lib/images";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "La historia de JULEHOME: velas artesanales con cera natural para crear hogares cálidos, elegantes y llenos de bienestar.",
};

const pillars = [
  {
    Icon: HomeIcon,
    title: "El hogar",
    text: "Creemos que el hogar es el lugar más importante del mundo. Cada producto está pensado para que ese espacio se sienta tuyo, cálido y sereno.",
  },
  {
    Icon: Leaf,
    title: "El bienestar",
    text: "Los aromas tienen el poder de calmarnos, reconfortarnos y despertar recuerdos. Creamos fragancias que cuidan de ti, sin artificios.",
  },
  {
    Icon: Sparkles,
    title: "La naturaleza",
    text: "Cera de soja 100 % natural, vidrio reciclado y materiales respetuosos. La elegancia no debería costarle nada al planeta.",
  },
];

const steps = [
  { n: "01", title: "Selección de la fragancia", text: "Creamos cada aroma junto a perfumistas, buscando notas que evoquen calma, naturaleza y hogar." },
  { n: "02", title: "Elaboración a mano", text: "Fundimos, mezclamos y colamos cada vela en pequeños lotes, controlando cada detalle." },
  { n: "03", title: "Control de calidad", text: "Cada lote se prueba en quema para garantizar una combustión limpia y un aroma perfecto." },
  { n: "04", title: "Empaquetado con amor", text: "Envuelto con papel reciclado y cuidado, listo para tu casa o para regalar." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="El arte de crear hogares cálidos"
        description="Una marca nacida del deseo de transformar espacios en refugios, aroma a aroma."
        image={u("aboutCraft")}
        breadcrumbs={[{ label: "Nosotros" }]}
      />

      <section className="container-site grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <span className="eyebrow text-olive-600 dark:text-olive-300">Nuestra historia</span>
          <h2 className="mt-4 font-display text-balance text-3xl font-medium leading-tight text-ink-950 dark:text-foreground sm:text-4xl">
            De una mesa de cocina a miles de hogares
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-500 dark:text-ink-400">
            <p>
              JULEHOME empezó en 2019 con una cacerola, cera de soja y un sueño:
              crear la vela perfecta. La primera la encendimos en la cocina de
              casa, y al ver cómo cambiaba la luz, el aire y hasta la conversación,
              supimos que estábamos haciendo algo importante.
            </p>
            <p>
              Hoy seguimos elaborando a mano cada pieza en nuestro pequeño taller,
              con la misma paciencia de aquel primer día. No fabricamos velas en
              serie: creamos objetos para habitar, aromas para sentir y regalos
              para recordar.
            </p>
            <p>
              Nuestro nombre lo dice todo: <strong className="text-olive-700 dark:text-olive-300">JULE</strong>, del danés
              que significa «Navidad» y alegría, y <strong className="text-olive-700 dark:text-olive-300">HOME</strong>, porque
              para nosotros el hogar lo es todo.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="grid size-12 place-items-center rounded-full bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
              <Flame size={20} className="animate-flicker" strokeWidth={1.6} />
            </div>
            <p className="font-display text-lg text-ink-950 dark:text-foreground">
              El equipo JULEHOME
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <ImageWithFallback
              src={u("kitchenB")}
              alt="El taller artesanal de JULEHOME"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden max-w-xs rounded-2xl border border-line bg-surface p-5 shadow-lift sm:block">
            <p className="font-display text-xl font-medium text-olive-700 dark:text-olive-300">
              «El hogar no se construye solo con muebles, sino con sensaciones.»
            </p>
            <p className="mt-2 text-xs text-ink-500 dark:text-ink-400">
              — Fundadores de JULEHOME
            </p>
          </div>
        </Reveal>
      </section>

      <section className="bg-surface-muted py-20 md:py-28">
        <div className="container-site">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-olive-600 dark:text-olive-300">Qué nos mueve</span>
            <h2 className="mt-4 font-display text-balance text-3xl font-medium text-ink-950 dark:text-foreground sm:text-4xl">
              Tres pilares, una misma filosofía
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i * 0.08, 0.3)}>
                <div className="flex h-full flex-col gap-5 rounded-3xl border border-line bg-background p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft-lg">
                  <span className="grid size-12 place-items-center rounded-full bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
                    <p.Icon size={21} strokeWidth={1.6} />
                  </span>
                  <h3 className="font-display text-xl font-medium text-ink-950 dark:text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-olive-600 dark:text-olive-300">El proceso</span>
          <h2 className="mt-4 font-display text-balance text-3xl font-medium text-ink-950 dark:text-foreground sm:text-4xl">
            Cómo hacemos cada vela
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={Math.min(i * 0.08, 0.3)}>
              <div className="group relative">
                <p className="font-display text-5xl font-semibold text-olive-600/15 transition-colors duration-500 group-hover:text-olive-600/40 dark:text-olive-300/15">
                  {step.n}
                </p>
                <h3 className="mt-3 font-display text-lg font-medium text-ink-950 dark:text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                  {step.text}
                </p>
                {i < steps.length - 1 && (
                  <span className="absolute right-0 top-8 hidden h-px w-10 bg-line lg:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-site pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-olive-900 px-8 py-16 text-center sm:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-gold-500/10 blur-3xl"
            />
            <h2 className="font-display text-balance text-3xl font-medium text-white sm:text-4xl">
              Únete a la familia <em className="text-olive-300">JULEHOME</em>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-balance text-sm leading-relaxed text-white/75">
              Descubre las velas y difusores que ya iluminan miles de hogares.
              Tu próximo ritual te espera.
            </p>
            <div className="mt-8">
              <Button href="/tienda" size="lg" variant="light">
                Explorar la tienda
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
