import type { CartItem } from "@/types";
import { SITE } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export type CheckoutCustomer = {
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
  ciudad: string;
  notas?: string;
};

/** Genera un número de pedido con formato JH-AAAAMMDD-XXXX. */
export function generateOrderNumber(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const date = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `JH-${date}-${rand}`;
}

export function buildWhatsAppOrderMessage({
  orderNumber,
  items,
  customer,
  subtotal,
  shipping,
  total,
}: {
  orderNumber: string;
  items: CartItem[];
  customer: CheckoutCustomer;
  subtotal: number;
  shipping: number;
  total: number;
}): string {
  const lines: string[] = [
    "¡Hola! Bienvenido(a) a JULEHOME. ✨",
    "Gracias por escribirnos. Nos encanta ayudarte a encontrar velas aromáticas y detalles de decoración que llenen tu hogar de calidez y armonía.",
    "Cuéntanos, ¿en qué podemos ayudarte hoy?",
    "",
    "Acabo de realizar un pedido desde la página web y me gustaría confirmar mi compra.",
    "",
    `🛍️ Pedido #: ${orderNumber}`,
    "",
    "Productos:",
  ];

  items.forEach(({ product, quantity }) => {
    lines.push(
      "",
      `• ${product.name}`,
      `• Aroma: ${product.aroma}`,
      `• Cantidad: ${quantity}`,
      `• Precio unitario: ${formatPrice(product.price)}`,
      `• Subtotal: ${formatPrice(product.price * quantity)}`,
    );
  });

  lines.push(
    "",
    "👤 Cliente",
    `• Nombre: ${customer.nombre}`,
    `• Teléfono: ${customer.telefono}`,
    `• Correo: ${customer.correo}`,
    "",
    "📍 Dirección de entrega",
    `• Dirección: ${customer.direccion}`,
    `• Ciudad: ${customer.ciudad}`,
    "",
    "💰 Resumen",
    `• Subtotal: ${formatPrice(subtotal)}`,
    `• Envío: ${shipping === 0 ? "Gratis" : formatPrice(shipping)}`,
    `• Total: ${formatPrice(total)}`,
    "",
    "Quedo atento(a) a la confirmación de mi pedido.",
    "",
    "¡Muchas gracias! 🕯️✨",
  );

  return lines.join("\n");
}

/** URL de WhatsApp con el mensaje correctamente codificado. */
export function buildWhatsAppOrderUrl(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
