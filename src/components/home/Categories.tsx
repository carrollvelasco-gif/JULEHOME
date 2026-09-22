import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

export function Categories() {
  return (
    <section id="categorias" className="relative scroll-mt-32 py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Explora por categoría"
          title={
            <>
              Encuentra tu <em className="text-olive-600 dark:text-olive-300">ritual</em>
            </>
          }
          description="Desde velas aromáticas hasta piezas decorativas únicas, cada categoría está pensada para transformar tu espacio."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories
            .filter((cat) => cat.slug !== "velas-aromaticas")
            .map((cat, i) => (
            <Reveal key={cat.slug} delay={Math.min(i * 0.05, 0.3)}>
              <Link
                href={`/tienda?categoria=${cat.slug}`}
                className="group relative block overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.imageAlt}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="img-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent transition-opacity duration-500 group-hover:from-ink-950/85" />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-5">
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-olive-200">
                      {cat.tagline}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-medium text-white sm:text-xl">
                      {cat.name}
                    </h3>
                  </div>
                  <span className="grid size-9 shrink-0 translate-y-2 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
