import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRelatedProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product } from "@/types";

export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product, 4);
  if (related.length === 0) return null;

  return (
    <section className="mt-24 border-t border-line pt-16">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Puede que también te guste"
            title={
              <>
                Combínalo <em className="text-olive-600 dark:text-olive-300">con</em>
              </>
            }
          />
          <Link
            href="/tienda"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink-900 underline-offset-4 hover:text-olive-700 hover:underline dark:text-foreground dark:hover:text-olive-300"
          >
            Ver toda la tienda
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
