import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/data/collections";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

export const metadata: Metadata = {
  title: "Colecciones",
  description:
    "Explora las colecciones JULEHOME: Minimal, Home, Navidad y Edición Limitada.",
};

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Colecciones"
        title="Historias que se encienden con una llama"
        description="Colecciones inspiradas en las emociones del hogar. Elige la atmósfera que quieres crear."
        image="/images/banners/Florero.jpeg"
        breadcrumbs={[{ label: "Colecciones" }]}
      />

      <section className="container-site py-20 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((col, i) => (
            <Reveal
              key={col.slug}
              delay={Math.min(i * 0.06, 0.3)}
              className={i === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
            >
              <Link
                href={`/colecciones/${col.slug}`}
                className="group relative block h-full min-h-80 overflow-hidden rounded-3xl"
                style={{ backgroundColor: col.accent }}
              >
                <ImageWithFallback
                  src={col.image}
                  alt={col.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="img-zoom opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />

                <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                  {col.tagline}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
                    {col.name}
                  </h2>
                  <p className="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-white/75">
                    {col.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-white/90 transition-colors group-hover:text-gold-300">
                    Explorar la colección
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
