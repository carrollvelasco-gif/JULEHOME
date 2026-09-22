import type { Metadata } from "next";
import { ShopContent, type ShopQuery } from "@/components/shop/ShopContent";
import { PageHero } from "@/components/shared/PageHero";
import { ProductQuickView } from "@/components/products/ProductQuickView";
import { u } from "@/lib/images";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Descubre todas nuestras velas aromáticas, difusores, portavelas y decoración. Filtra por aroma, categoría y colección.",
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

  const initial: ShopQuery = {
    categoria: str(params.categoria),
    coleccion: str(params.coleccion),
    aroma: str(params.aroma),
    buscar: str(params.buscar),
    orden: str(params.orden),
  };

  return (
    <>
      <PageHero
        compact
        eyebrow="Tienda"
        title="Toda nuestra colección"
        description="Velas, aromas y decoración para cada rincón de tu hogar."
        image={u("livingBeige")}
        breadcrumbs={[{ label: "Tienda" }]}
      />
      <ShopContent initial={initial} />
      <ProductQuickView />
    </>
  );
}
