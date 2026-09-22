"use client";

import Image from "next/image";
import { useState } from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

/** Next/Image with an elegant fallback so the site never shows broken images. */
export function ImageWithFallback({
  src,
  alt,
  className,
  fill = false,
  width = 1200,
  height = 1400,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "grid place-items-center bg-gradient-to-br from-olive-100 via-cream-100 to-beige-300/40 dark:from-olive-900/40 dark:via-surface-muted dark:to-olive-950",
          fill ? "absolute inset-0" : "relative",
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <div className="flex flex-col items-center gap-2 text-olive-600/70 dark:text-olive-300/60">
          <Flame size={32} strokeWidth={1.25} />
          <span className="text-[0.62rem] uppercase tracking-[0.25em]">JULEHOME</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      quality={82}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
