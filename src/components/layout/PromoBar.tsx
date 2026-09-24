"use client";

import { Leaf } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";

const messages = [
  "Envío calculado según la ciudad de entrega",
  "−20 % en la colección Navidad hasta agotar existencias",
  "Velas de cera natural · Elaboradas a mano",
  "Envuelto para regalo en todos nuestros sets",
  "Nuevo: colección Edición Limitada, solo 500 unidades",
];

export function PromoBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-10 overflow-hidden bg-olive-700 text-cream-100 dark:bg-olive-900">
      <Marquee className="h-full">
        {messages.map((msg, i) => (
          <span
            key={i}
            className="flex h-10 items-center gap-3 whitespace-nowrap px-6 text-[0.72rem] font-medium uppercase tracking-[0.22em]"
          >
            <Leaf size={12} className="text-olive-200" />
            {msg}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
