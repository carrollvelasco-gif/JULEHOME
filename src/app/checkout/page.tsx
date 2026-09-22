import type { Metadata } from "next";
import { CheckoutPageContent } from "@/components/checkout/CheckoutPageContent";

export const metadata: Metadata = {
  title: "Finalizar pedido",
  description:
    "Completa tus datos de entrega y confirma tu pedido. Te redirigimos a WhatsApp para coordinar la entrega y el pago.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
