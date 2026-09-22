import type { Metadata } from "next";
import { FaqSection } from "@/components/contact/FaqSection";
import { PageHero } from "@/components/shared/PageHero";
import { u } from "@/lib/images";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Resolvemos tus dudas sobre envíos, cuidado de velas y pagos en JULEHOME.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Ayuda"
        title="Preguntas frecuentes"
        description="Todo lo que necesitas saber sobre tus velas y envíos."
        image={u("spaBath")}
        breadcrumbs={[{ label: "Preguntas frecuentes" }]}
      />
      <FaqSection />
    </>
  );
}
