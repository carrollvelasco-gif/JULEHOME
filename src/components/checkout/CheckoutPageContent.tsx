"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Check,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CIUDADES_COLOMBIA } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
  generateOrderNumber,
  type CheckoutCustomer,
} from "@/lib/checkout";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Input, Select } from "@/components/ui/Form";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const checkoutSchema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre completo"),
  telefono: z.string().min(7, "Ingresa tu teléfono de contacto"),
  correo: z.string().email("Ingresa un correo válido"),
  direccion: z.string().min(5, "Ingresa tu dirección de entrega"),
  ciudad: z.string().min(2, "Selecciona tu ciudad"),
  notas: z.string().optional(),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

export function CheckoutPageContent() {
  const { items, subtotal, shipping, total, itemCount, clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({ resolver: zodResolver(checkoutSchema) });

  if (items.length === 0) {
    if (orderNumber) {
      return (
        <div className="container-site flex min-h-[70vh] flex-col items-center justify-center pb-24 pt-10 text-center">
          <span className="grid size-20 place-items-center rounded-full bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
            <PackageCheck size={34} strokeWidth={1.4} />
          </span>
          <h1 className="mt-6 font-display text-3xl font-medium text-ink-950 dark:text-foreground sm:text-4xl">
            ¡Gracias por tu pedido!
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-500 dark:text-ink-400">
            Te hemos abierto WhatsApp para confirmar tu compra. Menciona tu número
            de pedido <strong className="text-olive-700 dark:text-olive-300">{orderNumber}</strong> y
            responderemos lo antes posible.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" size="lg">
              Volver al inicio
            </Button>
            <Button href="/tienda" variant="outline" size="lg">
              Seguir comprando
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="container-site flex min-h-[60vh] flex-col items-center justify-center pb-24 pt-10">
        <EmptyState
          icon={<ShoppingBag size={28} />}
          title="Tu carrito está vacío"
          description="Añade velas y difusores a tu carrito para poder tramitar tu pedido."
          action={<Button href="/tienda" size="lg">Explorar la tienda</Button>}
        />
      </div>
    );
  }

  const onSubmit = (values: CheckoutValues) => {
    const number = generateOrderNumber();
    const customer: CheckoutCustomer = {
      nombre: values.nombre,
      telefono: values.telefono,
      correo: values.correo,
      direccion: values.direccion,
      ciudad: values.ciudad,
      notas: values.notas,
    };
    const message = buildWhatsAppOrderMessage({
      orderNumber: number,
      items,
      customer,
      subtotal,
      shipping,
      total,
    });
    const url = buildWhatsAppOrderUrl(message);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    clearCart();
    setOrderNumber(number);
  };

  return (
    <div className="container-site pb-24 pt-8 md:pt-12">
      <Link
        href="/carrito"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-900 underline-offset-4 hover:text-olive-700 hover:underline dark:text-foreground dark:hover:text-olive-300"
      >
        <ArrowLeft size={15} />
        Volver al carrito
      </Link>

      <div className="mt-6">
        <SectionHeading
          align="left"
          eyebrow="Finalizar pedido"
          title="Datos de entrega"
          description="Completa tus datos y confirma tu pedido. Te redirigiremos a WhatsApp para que solo envíes el mensaje."
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="rounded-3xl border border-line bg-surface p-7 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
                  <User size={17} strokeWidth={1.6} />
                </span>
                <h2 className="font-display text-xl font-medium text-ink-950 dark:text-foreground">
                  Tus datos
                </h2>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Nombre completo" htmlFor="nombre" error={errors.nombre?.message}>
                  <Input id="nombre" placeholder="María Fernanda López" {...register("nombre")} />
                </Field>
                <Field label="Teléfono" htmlFor="telefono" error={errors.telefono?.message}>
                  <Input id="telefono" type="tel" placeholder="317 620 2258" {...register("telefono")} />
                </Field>
                <Field label="Correo electrónico" htmlFor="correo" error={errors.correo?.message} className="sm:col-span-2">
                  <Input id="correo" type="email" placeholder="tucorreo@email.com" {...register("correo")} />
                </Field>
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-7 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
                  <MapPin size={17} strokeWidth={1.6} />
                </span>
                <h2 className="font-display text-xl font-medium text-ink-950 dark:text-foreground">
                  Dirección de entrega
                </h2>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Dirección" htmlFor="direccion" error={errors.direccion?.message} className="sm:col-span-2">
                  <Input
                    id="direccion"
                    placeholder="Calle 45 # 26-24, Cabecera del Llano"
                    {...register("direccion")}
                  />
                </Field>
                <Field label="Ciudad" htmlFor="ciudad" error={errors.ciudad?.message}>
                  <Select id="ciudad" defaultValue="" {...register("ciudad")}>
                    <option value="" disabled>
                      Selecciona tu ciudad
                    </option>
                    {CIUDADES_COLOMBIA.map((ciudad) => (
                      <option key={ciudad} value={ciudad}>
                        {ciudad}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Notas (opcional)" htmlFor="notas" error={errors.notas?.message}>
                  <Input id="notas" placeholder="Instrucciones de entrega, regalo, etc." {...register("notas")} />
                </Field>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              <MessageCircle size={18} />
              Confirmar pedido por WhatsApp
            </Button>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-400">
              <ShieldCheck size={14} className="mt-0.5 shrink-0 text-olive-600 dark:text-olive-300" />
              Al confirmar se abrirá WhatsApp con el resumen de tu pedido. Solo tendrás que pulsar enviar.
            </p>
          </form>
        </Reveal>

        <Reveal delay={0.12}>
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-3xl border border-line bg-surface p-7 shadow-soft">
              <h2 className="font-display text-xl font-medium text-ink-950 dark:text-foreground">
                Resumen del pedido
              </h2>
              <p className="mt-1 text-xs text-ink-400">
                {itemCount} {itemCount === 1 ? "artículo" : "artículos"}
              </p>

              <ul className="mt-5 flex max-h-72 flex-col gap-4 overflow-y-auto pr-1">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex items-start gap-3">
                    <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-olive-600/10 text-xs font-bold text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
                      ×{quantity}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink-950 dark:text-foreground">
                        {product.name}
                      </p>
                      <p className="truncate text-xs text-ink-400">{product.aroma}</p>
                      <p className="mt-0.5 text-xs font-semibold text-olive-700 dark:text-olive-300">
                        {formatPrice(product.price * quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-ink-500 dark:text-ink-400">Subtotal</span>
                  <span className="font-medium text-ink-950 dark:text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-500 dark:text-ink-400">
                    <Truck size={14} />
                    Envío
                  </span>
                  <span className="font-medium text-ink-950 dark:text-foreground">
                    {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-3 text-base">
                  <span className="font-medium text-ink-950 dark:text-foreground">Total</span>
                  <span className="font-display text-2xl font-semibold text-ink-950 dark:text-foreground">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2 rounded-2xl bg-surface-muted p-4 text-xs leading-relaxed text-ink-500 dark:text-ink-400">
                <Check size={14} className="mt-0.5 shrink-0 text-olive-600 dark:text-olive-300" />
                Tramitaremos tu pedido en cuanto confirmes por WhatsApp. Te contactaremos para coordinar el pago y la entrega.
              </div>
            </div>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
