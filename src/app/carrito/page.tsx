import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Revisa los artículos de tu carrito y finaliza tu compra en JULEHOME.",
};

export default function CartPage() {
  return <CartPageContent />;
}
