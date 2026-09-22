"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUI } from "@/context/UIContext";
import { useLockBodyScroll, useEscapeKey } from "@/hooks/useScrollLock";
import { useDebounce } from "@/hooks/useDebounce";
import { products } from "@/lib/data/products";
import { EASE } from "@/lib/motion";
import { formatPrice } from "@/lib/utils";

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 150);
  const inputRef = useRef<HTMLInputElement>(null);

  useLockBodyScroll(searchOpen);
  useEscapeKey(closeSearch, searchOpen);

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (q.length < 2) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.aroma.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.includes(q),
      )
      .slice(0, 6);
  }, [debounced]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <div className="fixed inset-0 z-[75]" role="dialog" aria-modal="true">
          <motion.button
            aria-label="Cerrar búsqueda"
            className="absolute inset-0 h-full w-full bg-ink-950/50 backdrop-blur-md dark:bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeSearch}
          />
          <motion.div
            className="absolute inset-x-0 top-0 bg-background shadow-lift"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="container-site py-10 md:py-12">
              <form
                role="search"
                className="flex items-center gap-4 border-b-2 border-ink-950 pb-4 focus-within:border-olive-600 dark:border-foreground dark:focus-within:border-olive-300"
                onSubmit={(e) => e.preventDefault()}
              >
                <Search size={22} className="text-ink-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Busca velas, aromas, difusores…"
                  className="w-full bg-transparent font-display text-xl font-medium text-ink-950 placeholder:text-ink-300 focus:outline-none dark:text-foreground dark:placeholder:text-ink-500 sm:text-2xl"
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label="Cerrar"
                  className="grid size-9 shrink-0 place-items-center rounded-full text-ink-400 hover:bg-surface-muted hover:text-ink-900 dark:hover:text-foreground"
                >
                  <span className="text-sm font-medium">Esc</span>
                </button>
              </form>

              <div className="mt-6 min-h-32">
                {query.trim().length < 2 ? (
                  <p className="text-sm text-ink-400">
                    Sugerencias: «ambar», «lavanda», «navidad», «difusor»…
                  </p>
                ) : results.length === 0 ? (
                  <p className="text-sm text-ink-400">
                    No encontramos nada para «{query}». Prueba con otro aroma o categoría.
                  </p>
                ) : (
                  <ul className="divide-y divide-line">
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/producto/${p.slug}`}
                          onClick={closeSearch}
                          className="group flex items-center gap-4 py-3"
                        >
                          <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-surface-muted">
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              sizes="56px"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-ink-950 dark:text-foreground">
                              {p.name}
                            </p>
                            <p className="text-xs text-ink-400">{p.aroma}</p>
                          </div>
                          <span className="text-sm font-medium text-ink-900 dark:text-foreground">
                            {formatPrice(p.price)}
                          </span>
                          <ArrowRight
                            size={16}
                            className="text-ink-300 transition-all group-hover:translate-x-1 group-hover:text-olive-600"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
