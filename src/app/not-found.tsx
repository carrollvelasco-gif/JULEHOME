import { ArrowLeft, Home, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[100svh] flex-col items-center justify-center gap-8 py-28 text-center">
      <span className="relative grid size-20 place-items-center rounded-full bg-olive-600/10 text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
        <Flame size={34} className="animate-flicker" strokeWidth={1.4} />
        <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-gold-500 text-xs font-bold text-white">
          404
        </span>
      </span>

      <div>
        <p className="eyebrow text-olive-600 dark:text-olive-300">Se apagó la vela</p>
        <h1 className="mt-4 font-display text-balance text-4xl font-medium text-ink-950 dark:text-foreground sm:text-5xl">
          Esta página no existe
        </h1>
        <p className="mx-auto mt-4 max-w-md text-balance text-sm leading-relaxed text-ink-500 dark:text-ink-400">
          La página que buscas se ha apagado o se ha movido a otro rincón de la
          casa. Déjanos guiarte de vuelta a la calidez.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button href="/" variant="primary">
          <Home size={16} />
          Volver al inicio
        </Button>
        <Button href="/tienda" variant="outline">
          <ArrowLeft size={16} />
          Explorar la tienda
        </Button>
      </div>
    </div>
  );
}
