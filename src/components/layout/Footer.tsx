import Link from "next/link";
import { Leaf, MapPin, Phone, ShieldCheck, Truck } from "lucide-react";
import { FOOTER_LINKS, SITE } from "@/lib/constants";
import { Logo } from "@/components/layout/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";

const socials = [
  { label: "Instagram", href: SITE.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: SITE.facebook, Icon: FacebookIcon },
  { label: "YouTube", href: "https://youtube.com", Icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-olive-950 text-cream-100">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-olive-600/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 size-[24rem] rounded-full bg-gold-500/5 blur-3xl"
      />

      <div className="container-site relative">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
          <div className="max-w-sm">
            <Logo light />
            <p className="mt-5 text-sm leading-relaxed text-cream-100/70">
              Velas aromáticas, difusores y decoración elegante. Creamos hogares
              cálidos mediante aromas que abrazan y detalles que transforman
              cualquier espacio en un refugio.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-cream-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-olive-300 hover:bg-olive-600/20 hover:text-olive-200"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {(
            [
              ["Tienda", FOOTER_LINKS.tienda],
              ["Compañía", FOOTER_LINKS.empresa],
              ["Legal", FOOTER_LINKS.legal],
            ] as const
          ).map(([title, links]) => (
            <div key={title}>
              <h3 className="eyebrow text-olive-300">{title}</h3>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.label + link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream-100/70 transition-colors hover:text-olive-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-8 border-t border-white/10 py-10 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <Truck size={18} className="mt-0.5 shrink-0 text-olive-300" />
            <div>
              <p className="text-sm font-medium">Envío por calcular</p>
              <p className="text-xs text-cream-100/60">Confirmado por WhatsApp según tu destino</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Leaf size={18} className="mt-0.5 shrink-0 text-olive-300" />
            <div>
              <p className="text-sm font-medium">Cera natural y sostenible</p>
              <p className="text-xs text-cream-100/60">Envasada en vidrio reciclado</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-olive-300" />
            <div>
              <p className="text-sm font-medium">Pago 100 % seguro</p>
              <p className="text-xs text-cream-100/60">Tarjeta, PayPal y Bizum</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 border-t border-white/10 py-10 md:grid-cols-3 md:items-center">
          <div className="space-y-2 text-sm text-cream-100/70">
            <p className="flex items-center gap-2">
              <MapPin size={14} className="text-olive-300" />
              {SITE.address}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-olive-300" />
              {SITE.phone}
            </p>
          </div>
          <p className="text-xs leading-relaxed text-cream-100/50 md:text-center">
            {SITE.hours} · Atención personalizada con un toque humano.
          </p>
          <div className="flex items-center gap-2 md:justify-end">
            {["VISA", "MC", "PayPal", "Bizum"].map((p) => (
              <span
                key={p}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[0.6rem] font-semibold tracking-widest text-cream-100/70"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-cream-100/50 md:flex-row">
          <p>© {new Date().getFullYear()} JULEHOME. Todos los derechos reservados.</p>
          <p>Diseñado con calma, hecho con amor.</p>
        </div>
      </div>
    </footer>
  );
}
