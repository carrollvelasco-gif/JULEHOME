import type { Category } from "@/types";
import { u } from "@/lib/images";

export const categories: Category[] = [
  {
    slug: "velas-aromaticas",
    name: "Velas Aromáticas",
    tagline: "Fragancias que abrazan",
    image: u("candleAmber"),
    imageAlt: "Vela aromática de cera natural encendida en un ambiente cálido",
  },
  {
    slug: "velas-decorativas",
    name: "Set velas decorativo",
    tagline: "Formas y texturas que decoran",
    image: "/images/set-velas-decorativo/set-luna.jpeg",
    imageAlt: "Set de velas decorativas Set Luna de JULEHOME",
  },
  {
    slug: "velas-navidenas",
    name: "Velas Navideñas",
    tagline: "Magia para las fiestas",
    image: "/images/navidad/velas-arcoiris.jpeg",
    imageAlt: "Velas de colores de la colección Navidad de JULEHOME",
  },
  {
    slug: "decoracion",
    name: "Decoración",
    tagline: "Detalles que transforman",
    image: "/images/decoracion/bandeja-aura.jpeg",
    imageAlt: "Bandeja Aura de JULEHOME, decoración elegante para el hogar",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
