import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "light" | "dark" | "gold";
type Size = "sm" | "md" | "lg" | "icon";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 select-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-olive-600 text-white shadow-glow hover:-translate-y-0.5 hover:bg-olive-700 hover:shadow-lift active:translate-y-0 dark:bg-olive-500 dark:hover:bg-olive-400",
  outline:
    "border border-ink-900/20 text-ink-900 hover:-translate-y-0.5 hover:border-olive-600 hover:text-olive-700 dark:border-foreground/25 dark:text-foreground dark:hover:border-olive-300 dark:hover:text-olive-300",
  ghost:
    "text-ink-900 hover:text-olive-700 dark:text-foreground dark:hover:text-olive-300",
  light:
    "bg-white text-ink-900 shadow-soft hover:-translate-y-0.5 hover:bg-cream-100 hover:shadow-soft-lg",
  dark: "bg-ink-950 text-white hover:-translate-y-0.5 hover:bg-olive-900 dark:bg-foreground dark:text-background",
  gold: "bg-gold-500 text-white shadow-glow hover:-translate-y-0.5 hover:bg-gold-600 hover:shadow-lift",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-5 text-xs",
  md: "h-11 px-7 text-sm",
  lg: "h-12 px-9 text-sm sm:h-13 sm:px-10",
  icon: "size-10",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;

  if (props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link
        href={href}
        className={cn(base, variants[variant], sizes[size], className)}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const rest = props as ButtonAsButton;
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
