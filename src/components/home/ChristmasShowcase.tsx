import { Sparkles } from "lucide-react";
import { getChristmasProducts } from "@/lib/data/products";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";

export function ChristmasShowcase() {
  const products = getChristmasProducts().slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-embers-700 via-olive-900 to-olive-950 py-20 text-cream-100 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: "url(/images/navidad/velas-rojas-verdes.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/70 via-ink-950/40 to-ink-950/70" />

      <span
        aria-hidden
        className="pointer-events-none absolute -left-10 top-10 select-none font-display text-[16vw] font-semibold leading-none text-white/5"
      >
        Navidad
      </span>

      <div className="container-site relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/10 px-4 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-gold-300 backdrop-blur">
            <Sparkles size={12} />
            Edición festiva · Temporada 2026
          </div>
          <h2 className="font-display text-balance text-4xl font-medium leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Colección <em className="text-gold-300">Navidad</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-cream-100/80 sm:text-lg">
            Llena tu hogar de luz, aroma y magia. Pino, canela, chocolate
            caliente y galletas de jengibre: las fragancias que convierten
            diciembre en un recuerdo.
          </p>
          <div className="mt-8">
            <Button href="/colecciones/navidad" size="lg" variant="gold">
              Comprar colección
            </Button>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="animate-float [&:nth-child(2)]:[animation-delay:0.6s] [&:nth-child(3)]:[animation-delay:1.2s] [&:nth-child(4)]:[animation-delay:1.8s]"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-cream-100/50">
          Navidad · Hasta agotar existencias
        </p>
      </div>
    </section>
  );
}
