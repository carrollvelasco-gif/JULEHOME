import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { u } from "@/lib/images";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Políticas",
  description:
    "Política de privacidad, cookies, términos y condiciones y envíos de JULEHOME.",
};

const sections = [
  {
    id: "privacidad",
    title: "Política de privacidad",
    paragraphs: [
      `En ${SITE.legalName} nos tomamos muy en serio la protección de tus datos. Esta política explica qué información recopilamos, cómo la usamos y qué derechos tienes.`,
      "Recopilamos únicamente los datos necesarios para gestionar tu pedido: nombre, email, dirección de envío y datos de pago. Estos se procesan de forma segura y cifrada.",
      "Nunca vendemos ni cedemos tus datos a terceros con fines comerciales. Puedes solicitar el acceso, rectificación o eliminación de tus datos escribiéndonos a través del formulario de contacto de la página.",
    ],
  },
  {
    id: "cookies",
    title: "Política de cookies",
    paragraphs: [
      "Utilizamos cookies técnicas imprescindibles para el funcionamiento de la tienda (por ejemplo, el carrito) y cookies analíticas anónimas para mejorar tu experiencia.",
      "Puedes gestionar o eliminar las cookies desde la configuración de tu navegador. Si las desactivas, la tienda seguirá funcionando, aunque algunas funciones podrían verse afectadas.",
    ],
  },
  {
    id: "terminos",
    title: "Términos y condiciones",
    paragraphs: [
      "Los precios mostrados incluyen IVA. Nos reservamos el derecho de modificar precios y promociones en cualquier momento, sin afectar a pedidos ya confirmados.",
      "El uso de esta web implica la aceptación de estos términos. El contenido, imágenes y textos son propiedad de " + SITE.legalName + " y no pueden reproducirse sin autorización.",
    ],
  },
  {
    id: "envios",
    title: "Envíos",
    paragraphs: [
      "Preparamos tu pedido en 24–48 horas laborables y lo entregamos en 2–4 días. El valor del envío se calcula según la ciudad o municipio de entrega y se confirma por WhatsApp antes de finalizar el pedido.",
      "En caso de daños durante el transporte, contáctanos en un plazo de 48 horas con fotos del paquete y te lo solucionamos de inmediato.",
    ],
  },
];

export default function PoliticasPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Legal"
        title="Políticas de JULEHOME"
        description="Transparencia total: cómo cuidamos tus datos, tu pedido y tu confianza."
        image={u("interiorModern")}
        breadcrumbs={[{ label: "Políticas" }]}
      />

      <section className="container-site grid gap-10 py-16 md:py-20 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
        <nav aria-label="Secciones de políticas" className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow text-olive-600 dark:text-olive-300">En esta página</p>
          <ul className="mt-5 space-y-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-surface-muted hover:text-olive-700 dark:text-ink-100 dark:hover:text-olive-300"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-12">
          {sections.map((s) => (
            <article key={s.id} id={s.id} className="scroll-mt-32">
              <h2 className="font-display text-2xl font-medium text-ink-950 dark:text-foreground sm:text-3xl">
                {s.title}
              </h2>
              <div className="mt-4 space-y-4">
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}
          <p className="text-xs text-ink-400">
            Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long" })}.
          </p>
        </div>
      </section>
    </>
  );
}
