import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    slug: "navidad",
    name: "Navidad",
    tagline: "Luz y espíritu festivo",
    description:
      "Velas navideñas de la temporada, con colores y detalles que evocan la Navidad. Creadas para dar calidez y luz a tu mesa y tu hogar durante diciembre.",
    image: "/images/navidad/velas-rojas-verdes.jpeg",
    imageAlt: "Velas navideñas rojas y verdes de JULEHOME",
    accent: "#8e3a2e",
    featured: true,
  },
  ];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
