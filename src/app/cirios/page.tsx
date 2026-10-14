import type { Metadata } from "next";
import { Flame } from "lucide-react";
import { products } from "@/lib/data/products";
import { PageHero } from "@/components/shared/PageHero";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductQuickView } from "@/components/products/ProductQuickView";
import { EmptyState } from "@/components/ui/EmptyState";

/** Categoría de producto que alimenta esta sección. */
const CIRIOS_CATEGORY = "cirios";

export const metadata: Metadata = {
  title: "Cirios de Primera Comunión",
  description:
    "Cirios elaborados para acompañar momentos especiales, con diseños delicados y detalles que hacen de cada celebración un recuerdo inolvidable.",
  openGraph: {
    title: "Cirios de Primera Comunión · JULEHOME",
    description:
      "Cirios elaborados para acompañar momentos especiales, con diseños delicados y detalles que hacen de cada celebración un recuerdo inolvidable.",
  },
};

export default function CiriosPage() {
  const cirios = products.filter((p) => p.category === CIRIOS_CATEGORY);

  return (
    <>
      <PageHero
        eyebrow="Cirios"
        title="Cirios de Primera Comunión"
        description="Cirios elaborados para acompañar momentos especiales, con diseños delicados y detalles que hacen de cada celebración un recuerdo inolvidable."
        breadcrumbs={[{ label: "Cirios" }]}
      />

      <section className="container-site py-16 md:py-20">
        {cirios.length > 0 ? (
          <>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-ink-500 dark:text-ink-400">
                {cirios.length} {cirios.length === 1 ? "cirio" : "cirios"} disponibles
              </p>
            </div>
            <ProductGrid products={cirios} showDescription skeletonCount={4} />
          </>
        ) : (
          <EmptyState
            icon={<Flame size={26} />}
            title="Muy pronto, nuestros cirios"
            description="Estamos preparando las fotografías de los cirios de Primera Comunión. Vuelve pronto para descubrir toda la colección."
            className="rounded-3xl border border-line bg-surface shadow-soft"
          />
        )}
      </section>

      <ProductQuickView />
    </>
  );
}
