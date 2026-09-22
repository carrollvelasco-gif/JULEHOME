import type { Collection } from "@/types";

export const collections: Collection[] = [
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
