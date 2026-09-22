import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/data/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductReviews } from "@/components/products/ProductReviews";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductQuickView } from "@/components/products/ProductQuickView";
import { SITE } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} · JULEHOME`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: `JH-${product.id.toUpperCase()}`,
    brand: { "@type": "Brand", name: SITE.legalName },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: SITE.currency,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE.url}/producto/${product.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="container-site pb-24 pt-28 md:pt-36">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Tienda", href: "/tienda" },
            { label: product.category === "velas-navidenas" ? "Navidad" : "Colecciones", href: "/colecciones" },
            { label: product.name },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>

        <section className="mt-24">
          <div className="mb-10">
            <h2 className="font-display text-center text-3xl font-medium text-ink-950 dark:text-foreground sm:text-4xl">
              Opiniones de nuestros clientes
            </h2>
          </div>
          <ProductReviews product={product} />
        </section>

        <RelatedProducts product={product} />
      </div>
      <ProductQuickView />
    </>
  );
}
