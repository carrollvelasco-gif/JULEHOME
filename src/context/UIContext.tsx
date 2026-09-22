"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "@/types";

type UIContextValue = {
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  mobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const value = useMemo<UIContextValue>(
    () => ({
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      quickViewProduct,
      openQuickView: (p) => setQuickViewProduct(p),
      closeQuickView: () => setQuickViewProduct(null),
      mobileMenuOpen,
      openMobileMenu: () => setMobileMenuOpen(true),
      closeMobileMenu: () => setMobileMenuOpen(false),
    }),
    [searchOpen, quickViewProduct, mobileMenuOpen],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI debe usarse dentro de <UIProvider>");
  return ctx;
}
