import Link from "next/link";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  light?: boolean;
  href?: string;
};

export function Logo({ className, light = false, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="JULEHOME — Inicio"
      className={cn(
        "group inline-flex shrink-0 items-center gap-[clamp(0.25rem,1.5vw,0.625rem)]",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-[clamp(1.375rem,6vw,2.25rem)] shrink-0 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-12",
          light
            ? "border-white/30 bg-white/10 text-cream-100"
            : "border-olive-600/25 bg-olive-600/10 text-olive-700 dark:border-olive-300/25 dark:bg-olive-400/10 dark:text-olive-300",
        )}
      >
        <Flame
          className="size-[clamp(0.9375rem,3.8vw,1.0625rem)] animate-flicker"
          strokeWidth={1.8}
        />
      </span>
      <span
        className={cn(
          "whitespace-nowrap font-display text-[length:clamp(0.7rem,4.2vw,1.25rem)] font-semibold tracking-[0.12em]",
          light ? "text-white" : "text-ink-950 dark:text-foreground",
        )}
      >
        JULE<span className={light ? "text-olive-300" : "text-olive-600 dark:text-olive-300"}>HOME</span>
      </span>
    </Link>
  );
}
