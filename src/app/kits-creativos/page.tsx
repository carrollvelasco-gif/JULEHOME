import type { Metadata } from "next";
import { Paintbrush } from "lucide-react";
import { products } from "@/lib/data/products";
import { PageHero } from "@/components/shared/PageHero";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductQuickView } from "@/components/products/ProductQuickView";
import { EmptyState } from "@/components/ui/EmptyState";

/** Categoría de producto que alimenta esta sección. */
const KITS_CATEGORY = "kits-creativos";

const DESCRIPTION =
  "Divertidos kits para pintar y crear. Cada uno incluye una figura de yeso, pinturas, pincel e imagen de referencia para que los niños puedan disfrutar de una experiencia creativa en momentos especiales.";

export const metadata: Metadata = {
  title: "Kits para Pintar",
  description: DESCRIPTION,
  openGraph: {
    title: "Kits para Pintar · JULEHOME",
    description: DESCRIPTION,
  },
};

export default function KitsCreativosPage() {
  const kits = products.filter((p) => p.category === KITS_CATEGORY);

  return (
    <>
      <PageHero
        eyebrow="Kits Creativos"
        title="Kits para Pintar"
        description={DESCRIPTION}
        image="/images/kits-creativos/banner.jpeg"
        imageAlt="Kits de figuras de yeso para pintar de JULEHOME"
        breadcrumbs={[{ label: "Kits para Pintar" }]}
      />

      <section className="container-site py-16 md:py-20">
        {kits.length > 0 ? (
          <>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-ink-500 dark:text-ink-400">
                {kits.length} {kits.length === 1 ? "kit" : "kits"} disponibles
              </p>
            </div>
            <ProductGrid products={kits} showDescription skeletonCount={4} />
          </>
        ) : (
          <EmptyState
            icon={<Paintbrush size={26} />}
            title="Muy pronto, nuestros kits para pintar"
            description="Estamos preparando las fotografías de los kits. Vuelve pronto para descubrir toda la colección."
            className="rounded-3xl border border-line bg-surface shadow-soft"
          />
        )}
      </section>

      <ProductQuickView />
    </>
  );
}
