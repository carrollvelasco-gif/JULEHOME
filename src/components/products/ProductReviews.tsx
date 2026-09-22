import { BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";
import { RatingStars } from "@/components/ui/RatingStars";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const reviewTemplates = [
  {
    title: "Aroma envolvente y duradero",
    text: "La fragancia llena la habitación sin resultar invasiva. Se nota la calidad de la cera y la elección de las notas.",
  },
  {
    title: "Packaging de otro nivel",
    text: "Llegó en una caja preciosa, con un acabado que parece de joyería. Lo compré como regalo y fue un acierto total.",
  },
  {
    title: "Mi nuevo ritual diario",
    text: "Lo enciendo cada noche y mi salón se transforma. Dura muchísimo y la quema es perfecta, sin humo ni hollín.",
  },
];

function seededReviews(product: Product) {
  const seed = product.id.charCodeAt(1) || 1;
  return reviewTemplates.map((t, i) => {
    const name = ["María V.", "Javier R.", "Lucía T."][(seed + i) % 3];
    const days = 5 + ((seed * 7 + i * 11) % 60);
    return {
      ...t,
      name,
      rating: i === 0 ? Math.min(5, Math.round(product.rating + 0.2)) : 5,
      date: `Hace ${days} días`,
      verified: (seed + i) % 3 !== 0,
    };
  });
}

export function ProductReviews({ product }: { product: Product }) {
  const reviews = seededReviews(product);

  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr]">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <div className="rounded-3xl border border-line bg-surface p-8 text-center">
          <p className="font-display text-5xl font-semibold text-ink-950 dark:text-foreground">
            {product.rating.toFixed(1)}
          </p>
          <div className="mt-3 flex justify-center">
            <RatingStars rating={product.rating} size={18} />
          </div>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            Basado en {product.reviews} opiniones verificadas
          </p>
          <div className="mt-6 space-y-2 text-left text-xs text-ink-500 dark:text-ink-400">
            {[5, 4, 3, 2, 1].map((star) => {
              const pct =
                star === 5 ? 82 : star === 4 ? 14 : star === 3 ? 3 : star === 2 ? 1 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="w-3">{star}★</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-gold-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ul className="space-y-6">
        {reviews.map((r, i) => (
          <li
            key={i}
            className={cn(
              "rounded-3xl border border-line bg-surface p-7",
              i === 0 && "ring-1 ring-olive-600/10",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-olive-600/10 font-display text-sm font-semibold text-olive-700 dark:bg-olive-400/15 dark:text-olive-300">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-950 dark:text-foreground">
                    {r.name}
                    {r.verified && (
                      <BadgeCheck size={14} className="text-olive-600 dark:text-olive-300" />
                    )}
                  </p>
                  <p className="text-xs text-ink-400">{r.date}</p>
                </div>
              </div>
              <RatingStars rating={r.rating} size={13} />
            </div>
            <h4 className="mt-4 font-display text-lg font-medium text-ink-900 dark:text-foreground">
              {r.title}
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              {r.text}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-[0.68rem] text-ink-400">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-olive-600 dark:text-olive-300" />
                Compra verificada
              </span>
              <span className="flex items-center gap-1">
                <Sparkles size={12} className="text-gold-500" />
                Recomienda este producto
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
