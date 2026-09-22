import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "eyebrow",
            light ? "text-olive-300" : "text-olive-600 dark:text-olive-300",
          )}
        >
          {eyebrow}
        </span>
      )}
      <Tag
        className={cn(
          "font-display text-balance text-3xl font-medium sm:text-4xl lg:text-5xl",
          light ? "text-white" : "text-ink-950 dark:text-foreground",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-balance text-base leading-relaxed",
            light ? "text-white/80" : "text-ink-500 dark:text-ink-400",
          )}
        >
          {description}
        </p>
      )}
      <span
        aria-hidden
        className={cn(
          "mt-1 h-px w-16 bg-olive-600/50 dark:bg-olive-300/50",
          align === "center" && "mx-auto",
        )}
      />
    </Reveal>
  );
}
