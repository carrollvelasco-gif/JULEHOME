import type { Collection } from "@/types";
import { u } from "@/lib/images";

export const collections: Collection[] = [
  {
    slug: "minimal",
    name: "Minimal",
    tagline: "Menos, pero mejor",
    description:
      "Líneas puras, cera blanca y aromas limpios de algodón y lino. La elegancia de lo esencial, sin estridencias.",
    image: u("candleWhite"),
    imageAlt: "Vela blanca minimalista sobre superficie clara",
    accent: "#889579",
    featured: true,
  },
  {
    slug: "home",
    name: "Home",
    tagline: "El hogar que te abraza",
    description:
      "Notas cálidas de vainilla, madera y especias que recuerdan a los momentos que hacen de una casa un hogar.",
    image: u("cozyHome"),
    imageAlt: "Sala acogedora con luz cálida y mantas",
    accent: "#a68a6a",
    featured: true,
  },
  {
    slug: "navidad",
    name: "Navidad",
    tagline: "Luz, aroma y magia",
    description:
      "Pino, canela, chocolate caliente y galletas de jengibre. Una colección para llenar las fiestas de nostalgia, calidez y luz.",
    image: "/images/navidad/velas-rojas-verdes.jpeg",
    imageAlt: "Velas navideñas rojas y verdes de JULEHOME",
    accent: "#8e3a2e",
    featured: true,
  },
  {
    slug: "edicion-limitada",
    name: "Edición Limitada",
    tagline: "Piezas que no vuelven",
    description:
      "Series numeradas que nacen y se despiden. Para quienes buscan algo realmente exclusivo, elaborado en pequeños lotes.",
    image: "/images/navidad/velas-degragado.jpeg",
    imageAlt: "Velas navideñas de la colección Edición Limitada",
    accent: "#6f5b41",
    featured: false,
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
