import type { Product } from "@/types";

/** Devuelve la clave única de una línea de carrito (producto + aroma opcional). */
export function getCartLineKey(productId: string, aroma?: string): string {
  if (aroma) return `${productId}::${aroma}`;
  return productId;
}

/** True si el producto ofrece selección de aromas y exige elegir uno. */
export function requiresAromaSelection(product: Product): boolean {
  return (product.aromas?.length ?? 0) > 0;
}