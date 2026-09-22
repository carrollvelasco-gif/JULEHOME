import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, getCollection } from "@/lib/data/collections";
import { products } from "@/lib/data/products";
import { getChristmasProducts } from "@/lib/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: `Colección ${collection.name}`,
    description: collection.description,
    openGraph: {
      title: `Colección ${collection.name} · JULEHOME`,
      description: collection.description,
      images: [{ url: collection.image }],
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const collectionProducts =
    slug === "navidad" || slug === "edicion-limitada"
      ? getChristmasProducts()
      : products.filter((p) => p.collection === slug);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={collection.image}
            alt={collection.imageAlt}
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-ink-950/55" />
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: `radial-gradient(circle at 30% 20%, ${collection.accent}, transparent 60%)` }}
          />
        </div>

        <div className="container-site relative flex min-h-[60vh] flex-col justify-end pb-16 pt-40">
          <Breadcrumbs
            className="mb-8"
            items={[{ label: "Colecciones", href: "/colecciones" }, { label: collection.name }]}
          />
          <Reveal>
            <p className="eyebrow text-gold-300">{collection.tagline}</p>
            <h1 className="mt-3 font-display text-balance text-4xl font-medium text-white sm:text-5xl lg:text-6xl">
              Colección {collection.name}
            </h1>
            <p className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/80 sm:text-lg">
              {collection.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-site py-16 md:py-20">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-ink-500 dark:text-ink-400">
            {collectionProducts.length}{" "}
            {collectionProducts.length === 1 ? "pieza" : "piezas"} en esta colección
          </p>
        </div>
        <ProductGrid products={collectionProducts} skeletonCount={4} />
      </section>
    </>
  );
}
