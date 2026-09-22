import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/data/collections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

export function CollectionsShowcase() {
  return (
    <section className="relative overflow-hidden bg-surface-muted py-20 md:py-28">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Colecciones"
            title={
              <>
                Historias en <em className="text-olive-600 dark:text-olive-300">cada aroma</em>
              </>
            }
            description="Siete colecciones, siete maneras de habitar el hogar. Elige la tuya."
          />
          <Button href="/colecciones" variant="outline" className="shrink-0">
            Ver todas las colecciones
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:px-8 lg:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
        {collections.map((col, i) => (
          <Link
            key={col.slug}
            href={`/colecciones/${col.slug}`}
            className="group relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[44vw] lg:w-[30vw] xl:w-[24vw]"
            style={{ backgroundColor: col.accent }}
          >
            <ImageWithFallback
              src={col.image}
              alt={col.imageAlt}
              fill
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 24vw"
              className="img-zoom opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/15 to-transparent" />

            <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.25em] text-gold-300">
                {col.tagline}
              </p>
              <h3 className="mt-1 font-display text-2xl font-medium text-white">
                {col.name}
              </h3>
              <div className="mt-3 flex items-center gap-2 text-sm font-medium text-white/85 transition-colors group-hover:text-olive-200">
                Explorar
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
