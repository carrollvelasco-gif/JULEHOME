"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { collections } from "@/lib/data/collections";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ShopFiltersPanel } from "@/components/shop/ShopFiltersPanel";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import type { ShopFilters, SortOption } from "@/types";

export type ShopQuery = {
  categoria?: string;
  coleccion?: string;
  aroma?: string;
  buscar?: string;
  orden?: string;
};

const MAX_PRICE = 500000;

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Destacados" },
  { value: "best", label: "Más vendidos" },
  { value: "newest", label: "Más recientes" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "name", label: "Nombre A-Z" },
];

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 rounded-full border border-olive-600/30 bg-olive-600/5 px-3 py-1.5 text-xs font-medium text-olive-700 transition-colors hover:bg-olive-600/10 dark:border-olive-300/30 dark:bg-olive-300/5 dark:text-olive-300"
    >
      {label}
      <X size={12} />
    </button>
  );
}

export function ShopContent({ initial }: { initial: ShopQuery }) {
  const [query, setQuery] = useState(initial.buscar ?? "");
  const [sort, setSort] = useState<SortOption>((initial.orden as SortOption) ?? "featured");
  const [filters, setFilters] = useState<ShopFilters>({
    categories: initial.categoria ? [initial.categoria] : [],
    collections: initial.coleccion ? [initial.coleccion] : [],
    aromas: initial.aroma ? [initial.aroma] : [],
    maxPrice: MAX_PRICE,
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const setFilter = (updater: (prev: ShopFilters) => ShopFilters) =>
    setFilters(updater);

  const resetAll = () => {
    setFilters({ categories: [], collections: [], aromas: [], maxPrice: MAX_PRICE });
    setQuery("");
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      if (q && !`${p.name} ${p.aroma} ${p.subtitle}`.toLowerCase().includes(q)) return false;
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.collections.length && !filters.collections.includes(p.collection)) return false;
      if (filters.aromas.length && !filters.aromas.includes(p.aroma)) return false;
      if (p.price > filters.maxPrice) return false;
      return true;
    });

    switch (sort) {
      case "best":
        return [...list].sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller) || b.rating - a.rating);
      case "newest":
        return [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name, "es"));
      default:
        return [...list].sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
    }
  }, [query, sort, filters]);

  const activeChips = useMemo(() => {
    const chips: { id: string; label: string; onRemove: () => void }[] = [];
    filters.categories.forEach((slug) => {
      const cat = categories.find((c) => c.slug === slug);
      if (cat)
        chips.push({
          id: `cat-${slug}`,
          label: cat.name,
          onRemove: () => setFilter((p) => ({ ...p, categories: p.categories.filter((c) => c !== slug) })),
        });
    });
    filters.collections.forEach((slug) => {
      const col = collections.find((c) => c.slug === slug);
      if (col)
        chips.push({
          id: `col-${slug}`,
          label: col.name,
          onRemove: () => setFilter((p) => ({ ...p, collections: p.collections.filter((c) => c !== slug) })),
        });
    });
    filters.aromas.forEach((aroma) =>
      chips.push({
        id: `aroma-${aroma}`,
        label: aroma,
        onRemove: () => setFilter((p) => ({ ...p, aromas: p.aromas.filter((c) => c !== aroma) })),
      }),
    );
    return chips;
  }, [filters]);

  return (
    <div className="container-site pb-24 pt-10 md:pt-14">
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto overscroll-contain pr-1.5">
            <ShopFiltersPanel filters={filters} setFilters={setFilter} onReset={resetAll} maxPrice={MAX_PRICE} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-ink-900 lg:hidden dark:text-foreground"
            >
              <SlidersHorizontal size={16} />
              Filtros
            </button>

            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nombre o aroma…"
                aria-label="Buscar productos"
                className="h-11 w-full rounded-full border border-line-strong bg-surface pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-400 transition-all focus:border-olive-500 focus:outline-none focus:ring-4 focus:ring-olive-500/10 dark:bg-surface dark:text-foreground"
              />
            </div>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                aria-label="Ordenar productos"
                className="h-11 w-full appearance-none rounded-full border border-line-strong bg-surface pl-5 pr-10 text-sm font-medium text-ink-900 transition-all focus:border-olive-500 focus:outline-none focus:ring-4 focus:ring-olive-500/10 sm:w-52 dark:bg-surface dark:text-foreground"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon />
            </div>
          </div>

          {(activeChips.length > 0 || query) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {query && (
                <Chip label={`«${query}»`} onRemove={() => setQuery("")} />
              )}
              {activeChips.map((chip) => (
                <Chip key={chip.id} label={chip.label} onRemove={chip.onRemove} />
              ))}
            </div>
          )}

          <p className="mt-4 text-xs text-ink-400">
            {results.length} {results.length === 1 ? "producto" : "productos"}
            {sort !== "featured" && " · ordenado"}
          </p>

          <div className="mt-8">
            {results.length === 0 ? (
              <EmptyState
                icon={<Filter size={26} />}
                title="Sin resultados"
                description="Prueba a quitar algunos filtros o busca otro aroma."
                action={
                  <button
                    onClick={resetAll}
                    className="text-sm font-medium text-olive-700 underline-offset-4 hover:underline dark:text-olive-300"
                  >
                    Limpiar filtros
                  </button>
                }
              />
            ) : filters.aromas.length > 0 ? (
              <div className="rounded-3xl border border-line bg-surface shadow-soft">
                <div className="border-b border-line px-6 py-5">
                  <h2 className="font-display text-xl font-medium text-ink-950 dark:text-foreground">
                    Aromas disponibles
                  </h2>
                  <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
                    Estas son las fragancias que tenemos en la colección. Toca un
                    nombre para ver el producto.
                  </p>
                </div>
                <ul className="divide-y divide-line">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/producto/${p.slug}`}
                        className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-olive-600/5"
                      >
                        <span className="font-display text-base font-medium text-ink-950 hover:text-olive-700 dark:text-foreground dark:hover:text-olive-300">
                          {p.name}
                        </span>
                        <span className="shrink-0 text-sm text-ink-500 dark:text-ink-400">
                          {p.aroma}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <ProductGrid products={results} skeletonCount={8} />
            )}
          </div>
        </div>
      </div>

      <Drawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Filtros"
        subtitle="Refina tu búsqueda"
        className="max-w-sm"
      >
        <div className="p-5">
          <ShopFiltersPanel filters={filters} setFilters={setFilter} onReset={resetAll} maxPrice={MAX_PRICE} />
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className={cn("mt-6 w-full rounded-full bg-olive-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-olive-700")}
          >
            Ver {results.length} {results.length === 1 ? "producto" : "productos"}
          </button>
        </div>
      </Drawer>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="pointer-events-none absolute right-4 top-1/2 size-3.5 -translate-y-1/2 text-ink-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}
