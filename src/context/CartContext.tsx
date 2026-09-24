"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product, CartItem } from "@/types";
import { getCartLineKey } from "@/lib/cart";

const STORAGE_KEY = "julehome:cart";

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, aroma?: string) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return parsed.map((item) => ({
      ...item,
      key: getCartLineKey(item.product.id, item.aroma),
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, quantity = 1, aroma?: string) => {
    setItems((prev) => {
      const key = getCartLineKey(product.id, aroma);
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key
            ? { ...i, quantity: Math.min(i.quantity + quantity, 99) }
            : i,
        );
      }
      return [...prev, { key, product, quantity, aroma: aroma || undefined }];
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) =>
            i.key === key
              ? { ...i, quantity: Math.min(quantity, 99) }
              : i,
          ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const { subtotal, itemCount } = useMemo(() => {
    return items.reduce(
      (acc, item) => ({
        subtotal: acc.subtotal + item.product.price * item.quantity,
        itemCount: acc.itemCount + item.quantity,
      }),
      { subtotal: 0, itemCount: 0 },
    );
  }, [items]);

  const shipping = 0;

  const total = subtotal;

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotal,
      shipping,
      total,
      itemCount,
      isOpen,
      openCart,
      closeCart,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotal,
      shipping,
      total,
      itemCount,
      isOpen,
      openCart,
      closeCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
