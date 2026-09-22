"use client";

import { Check, RotateCcw } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { collections } from "@/lib/data/collections";
import { getAllAromas } from "@/lib/data/products";
import { formatPrice, cn } from "@/lib/utils";
import type { ShopFilters } from "@/types";

type ShopFiltersPanelProps = {
  filters: ShopFilters;
  setFilters: (updater: (prev: ShopFilters) => ShopFilters) => void;
  onReset: () => void;
  maxPrice: number;
};

function ToggleGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="border-b border-line py-6 first:pt-0 last:border-0">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {options.map((opt) => {
          const active = selected.includes(opt.value);
          return (
            <li key={opt.value}>
              <label className="group flex cursor-pointer items-center gap-3">
                <span
                  className={cn(
                    "grid size-4.5 shrink-0 place-items-center rounded-md border transition-all duration-200",
                    active
                      ? "border-olive-600 bg-olive-600 dark:border-olive-400 dark:bg-olive-400"
                      : "border-line-strong bg-surface group-hover:border-olive-400",
                  )}
                >
                  {active && <Check size={11} className="text-white" strokeWidth={3} />}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={active}
                  onChange={() => onToggle(opt.value)}
                />
                <span
                  className={cn(
                    "text-sm transition-colors",
                    active
                      ? "font-medium text-ink-950 dark:text-foreground"
                      : "text-ink-500 group-hover:text-ink-900 dark:text-ink-400 dark:group-hover:text-foreground",
                  )}
                >
                  {opt.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ShopFiltersPanel({
  filters,
  setFilters,
  onReset,
  maxPrice,
}: ShopFiltersPanelProps) {
  const activeCount =
    filters.categories.length + filters.collections.length + filters.aromas.length;

  return (
    <div className="flex flex-col gap-1">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-display text-lg font-medium text-ink-950 dark:text-foreground">
          Filtros
        </p>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-olive-700 hover:underline dark:text-olive-300"
          >
            <RotateCcw size={12} />
            Limpiar ({activeCount})
          </button>
        )}
      </div>

      <div className="flex flex-col px-0.5">
        <ToggleGroup
          title="Categoría"
          options={categories
            .filter((c) => c.slug !== "velas-aromaticas")
            .map((c) => ({ value: c.slug, label: c.name }))}
          selected={filters.categories}
          onToggle={(v) =>
            setFilters((prev) => ({
              ...prev,
              categories: prev.categories.includes(v)
                ? prev.categories.filter((c) => c !== v)
                : [...prev.categories, v],
            }))
          }
        />

        <ToggleGroup
          title="Colección"
          options={collections.map((c) => ({ value: c.slug, label: c.name }))}
          selected={filters.collections}
          onToggle={(v) =>
            setFilters((prev) => ({
              ...prev,
              collections: prev.collections.includes(v)
                ? prev.collections.filter((c) => c !== v)
                : [...prev.collections, v],
            }))
          }
        />

        <ToggleGroup
          title="Aroma"
          options={getAllAromas().map((a) => ({ value: a, label: a }))}
          selected={filters.aromas}
          onToggle={(v) =>
            setFilters((prev) => ({
              ...prev,
              aromas: prev.aromas.includes(v)
                ? prev.aromas.filter((c) => c !== v)
                : [...prev.aromas, v],
            }))
          }
        />

        <div className="border-b border-line py-6 last:border-0">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
              Precio máximo
            </h3>
            <span className="text-sm font-medium text-olive-700 dark:text-olive-300">
              {formatPrice(filters.maxPrice)}
            </span>
          </div>
          <input
            type="range"
            min={100000}
            max={maxPrice}
            step={5000}
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
            }
            className="mt-5 w-full accent-olive-600 dark:accent-olive-300"
            aria-label="Precio máximo"
          />
          <div className="mt-1 flex justify-between text-[0.65rem] text-ink-400">
            <span>{formatPrice(100000)}</span>
            <span>{formatPrice(maxPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
