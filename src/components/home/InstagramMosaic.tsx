import { InstagramIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { u } from "@/lib/images";
import { SITE } from "@/lib/constants";

const photos = [
  { image: u("instaLiving"), alt: "Salón de inspiración JULEHOME" },
  { image: u("candleAmber"), alt: "Vela Ambra Cálida" },
  { image: u("lavender"), alt: "Rama de lavanda junto a una vela" },
  { image: u("diffuserGold"), alt: "Difusor de la colección Luxury" },
  { image: "/images/navidad/velas-blanco-dorado.jpeg", alt: "Vela blanca y dorada de la colección Navidad" },
  { image: u("bedroomWarm"), alt: "Dormitorio acogedor con luz cálida" },
];

export function InstagramMosaic() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Instagram"
            title={
              <>
                Inspírate con <em className="text-olive-600 dark:text-olive-300">nuestra comunidad</em>
              </>
            }
            description="Comparte cómo iluminas tu hogar con JULEHOME usando el hashtag #JULEHOME."
          />
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink-900 underline-offset-4 hover:text-olive-700 hover:underline dark:text-foreground dark:hover:text-olive-300"
          >
            <InstagramIcon size={17} />
            @julehome
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {photos.map((photo, i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.25)}>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver publicación en Instagram"
                className="group relative block aspect-square overflow-hidden rounded-xl"
              >
                <ImageWithFallback
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 16vw"
                  className="img-zoom"
                />
                <span className="absolute inset-0 grid place-items-center bg-ink-950/0 text-white opacity-0 backdrop-blur-0 transition-all duration-400 group-hover:bg-ink-950/40 group-hover:opacity-100">
                  <InstagramIcon size={24} className="transition-transform duration-400 group-hover:scale-110" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
