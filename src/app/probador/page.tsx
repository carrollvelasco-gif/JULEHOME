import type { Metadata } from "next";
import { getProduct, products } from "@/lib/data/products";
import { ProbadorContent } from "@/components/probador/ProbadorContent";

export const metadata: Metadata = {
  title: "Probador",
  description:
    "Prueba cómo se vería cada pieza JULEHOME en tu espacio. Selecciona tu producto favorito y visualízalo en tu hogar.",
};

type Props = { searchParams: Promise<{ producto?: string }> };

export default async function ProbadorPage({ searchParams }: Props) {
  const { producto } = await searchParams;
  const product = getProduct(producto ?? "") ?? products[0];

  return <ProbadorContent initialProduct={product} />;
}
