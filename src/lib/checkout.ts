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
}: {
  orderNumber: string;
  items: CartItem[];
  customer: CheckoutCustomer;
  subtotal: number;
}): string {
  const lines: string[] = [
    "¡Hola! 👋 Bienvenido(a) a JULEHOME.",
    "",
    "Gracias por escribirnos. Nos encanta ayudarte a encontrar velas y detalles de decoración que llenen tu hogar de calidez y armonía. ✨",
    "",
    "Acabo de realizar un pedido desde la página web y me gustaría confirmar mi compra.",
    "",
    `🧾 Pedido #: ${orderNumber}`,
    "",
    "🛍️ Productos",
  ];

  items.forEach(({ product, quantity, aroma }) => {
    lines.push(
      "",
      `• ${product.name}`,
      `• Aroma: ${aroma ?? product.aroma}`,
      `• Cantidad: ${quantity}`,
      `• Precio unitario: ${formatPrice(product.price)}`,
      `• Subtotal: ${formatPrice(product.price * quantity)}`,
    );
  });

  lines.push(
    "",
    "👤 Datos del cliente",
    `• Nombre: ${customer.nombre}`,
    `• Teléfono: ${customer.telefono}`,
    `• Correo: ${customer.correo}`,
    "",
    "📍 Dirección de entrega",
    `• Dirección: ${customer.direccion}`,
    `• Ciudad/Municipio: ${customer.ciudad}`,
    "",
    "💰 Resumen del pedido",
    `• Subtotal: ${formatPrice(subtotal)}`,
    "• Envío: Por calcular",
    `• Total: ${formatPrice(subtotal)} + valor del envío`,
    "",
    "📦 Importante: El valor del envío se calcula de acuerdo con la ciudad o municipio donde se realizará la entrega y será confirmado por WhatsApp antes de finalizar el pedido.",
    "",
    "Quedo atenta a la confirmación de mi pedido y al valor del envío.",
    "",
    "¡Muchas gracias! 💚",
  );

  return lines.join("\n");
}

/** URL de WhatsApp con el mensaje correctamente codificado. */
export function buildWhatsAppOrderUrl(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
