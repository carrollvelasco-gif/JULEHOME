import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { products } from "@/lib/data/products";
import { collections } from "@/lib/data/collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/nosotros",
    "/tienda",
    "/colecciones",
    "/contacto",
    "/preguntas-frecuentes",
    "/politicas",
    "/carrito",
    "/favoritos",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/producto/${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${base}/colecciones/${c.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
