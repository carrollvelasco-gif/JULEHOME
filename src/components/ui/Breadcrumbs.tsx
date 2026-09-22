import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${"https://julehome.com"}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Ruta de navegación" className={cn("flex", className)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-500 dark:text-ink-400">
        <li>
          <Link href="/" className="transition-colors hover:text-olive-700 dark:hover:text-olive-300">
            Inicio
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight size={12} className="text-ink-300 dark:text-ink-600" />
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-olive-700 dark:hover:text-olive-300"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-ink-900 dark:text-foreground" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
