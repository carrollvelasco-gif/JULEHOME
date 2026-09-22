import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";
import { PageHero } from "@/components/shared/PageHero";
import { u } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "¿Hablamos? Escríbenos, llámanos o escríbenos por WhatsApp. Estamos encantados de ayudarte a crear un hogar más cálido.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Contacto"
        title="Hablemos de tu hogar"
        description="¿Dudas, pedidos especiales o colaboraciones? Estamos aquí para escucharte."
        image={u("roomCurtains")}
        breadcrumbs={[{ label: "Contacto" }]}
      />
      <ContactSection />
    </>
  );
}
