import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

const values = [
  { value: "2024", label: "Año de nacimiento" },
  { value: "Aromas", label: "Que inspiran bienestar" },
  { value: "Detalles", label: "Que transforman espacios" },
];

export function AboutPreview() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <ImageWithFallback
              src="/images/historia/hogar.jpeg"
              alt="Espacio cálido decorado con velas y piezas JULEHOME"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-line bg-surface px-6 py-5 shadow-lift sm:block">
            <p className="font-display text-3xl font-semibold text-olive-700 dark:text-olive-300">
              Hecho con amor
            </p>
            <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">
              Cada vela, un pequeño ritual
            </p>
          </div>
          <span className="absolute -left-3 -top-3 grid size-12 place-items-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-300">
            <Sparkles size={18} />
          </span>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow text-olive-600 dark:text-olive-300">
              Nuestra historia
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-balance text-3xl font-medium leading-tight text-ink-950 dark:text-foreground sm:text-4xl lg:text-5xl">
              Un hogar que se siente,
              <em className="text-olive-600 dark:text-olive-300"> aroma a aroma</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-500 dark:text-ink-400">
              <p>
                JULEHOME nació en 2024 con el deseo de transformar los espacios
                cotidianos en lugares llenos de calidez, armonía y bienestar.
                Creemos que los pequeños detalles tienen el poder de crear
                grandes sensaciones y que cada aroma puede convertirse en parte
                de un recuerdo especial.
              </p>
              <p>
                Por eso, creamos velas aromáticas y piezas decorativas pensadas
                para acompañar tus momentos favoritos, darle personalidad a cada
                rincón y hacer de tu hogar ese lugar al que siempre quieres
                volver.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-6">
              {values.map((v) => (
                <div key={v.label}>
                  <p className="font-display text-2xl font-semibold text-olive-700 dark:text-olive-300 sm:text-3xl">
                    {v.value}
                  </p>
                  <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">{v.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button href="/nosotros" variant="primary">
                Conocer JULEHOME
                <ArrowRight size={16} />
              </Button>
              <Link
                href="/tienda"
                className="text-sm font-medium text-ink-700 underline-offset-4 hover:text-olive-700 hover:underline dark:text-ink-100 dark:hover:text-olive-300"
              >
                Ver la tienda
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
