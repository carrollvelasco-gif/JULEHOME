import { getFeaturedProducts } from "@/lib/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Selección de la casa"
            title={
              <>
                Los más <em className="text-olive-600 dark:text-olive-300">queridos</em>
              </>
            }
            description="Nuestras piezas más deseadas, elegidas por quienes ya han llenado su hogar de luz y aroma."
          />
          <Button href="/tienda" variant="outline" className="shrink-0">
            Ver toda la tienda
            <ArrowRight size={16} />
          </Button>
        </div>

        <div className="mt-12">
          <ProductGrid products={products} skeletonCount={8} />
        </div>
      </div>
    </section>
  );
}
