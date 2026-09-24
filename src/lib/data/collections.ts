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
  ];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
