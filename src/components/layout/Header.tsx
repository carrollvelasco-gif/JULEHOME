"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import { useScrollY } from "@/hooks/useScrollY";

function IconButton({
  label,
  onClick,
  overlay,
  badge,
  children,
}: {
  label: string;
  onClick: () => void;
  overlay: boolean;
  badge?: number;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "relative grid size-9 place-items-center rounded-full transition-colors duration-300 sm:size-10",
        overlay
          ? "text-white/90 hover:bg-white/10 hover:text-white"
          : "text-ink-700 hover:bg-surface-muted hover:text-olive-700 dark:text-ink-100 dark:hover:bg-foreground/10 dark:hover:text-olive-300",
      )}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute right-0 top-0 grid min-w-4 h-4 place-items-center rounded-full bg-olive-600 px-1 text-[0.6rem] font-bold text-white dark:bg-olive-400 dark:text-ink-950">
          {badge}
        </span>
      )}
    </button>
  );
}

function ThemeToggle({ overlay }: { overlay: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span className="size-9 sm:size-10" />;
  const dark = resolvedTheme === "dark";
  return (
    <button
      aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={cn(
        "grid size-9 place-items-center rounded-full transition-colors duration-300 sm:size-10",
        overlay
          ? "text-white/90 hover:bg-white/10 hover:text-white"
          : "text-ink-700 hover:bg-surface-muted hover:text-olive-700 dark:text-ink-100 dark:hover:bg-foreground/10 dark:hover:text-olive-300",
      )}
    >
      <motion.span
        key={dark ? "moon" : "sun"}
        initial={{ rotate: -60, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.span>
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrollY(24);
  const { openCart, itemCount } = useCart();
  const { items: wishlist } = useWishlist();
  const { openSearch, openMobileMenu } = useUI();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const isHome = pathname === "/";
  const overlay = isHome && !scrolled;

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-olive-600 dark:bg-olive-300"
        style={{ scaleX: progress }}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-10 z-50 transition-all duration-500",
          overlay
            ? "bg-transparent"
            : "border-b border-line bg-background/85 backdrop-blur-xl",
        )}
      >
        <div className="container-site relative flex h-16 items-center md:h-20">
          <div className="flex flex-1 items-center gap-1">
            <button
              onClick={openMobileMenu}
              aria-label="Abrir menú"
              className={cn(
                "grid size-10 place-items-center rounded-full transition-colors md:hidden",
                overlay
                  ? "text-white hover:bg-white/10"
                  : "text-ink-700 hover:bg-surface-muted dark:text-ink-100",
              )}
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:block">
              <Logo light={overlay} />
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
            <Logo light={overlay} />
          </div>

          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : link.href === "/colecciones"
                      ? pathname === "/colecciones"
                      : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-[0.82rem] font-medium tracking-wide transition-colors duration-300",
                        overlay
                          ? "text-white/80 hover:text-white"
                          : "text-ink-700 hover:text-olive-700 dark:text-ink-100 dark:hover:text-olive-300",
                        active &&
                          (overlay
                            ? "text-white"
                            : "text-olive-700 dark:text-olive-300"),
                      )}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className={cn(
                            "absolute inset-x-4 -bottom-0.5 h-px",
                            overlay ? "bg-white/70" : "bg-olive-600 dark:bg-olive-300",
                          )}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-0.5 sm:gap-1">
            <ThemeToggle overlay={overlay} />
            <IconButton label="Buscar" onClick={openSearch} overlay={overlay}>
              <Search size={18} />
            </IconButton>
            <Link
              href="/favoritos"
              aria-label="Favoritos"
              className={cn(
                "relative grid size-9 place-items-center rounded-full transition-colors duration-300 sm:size-10",
                overlay
                  ? "text-white/90 hover:bg-white/10 hover:text-white"
                  : "text-ink-700 hover:bg-surface-muted hover:text-olive-700 dark:text-ink-100 dark:hover:bg-foreground/10 dark:hover:text-olive-300",
              )}
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute right-0 top-0 grid min-w-4 h-4 place-items-center rounded-full bg-olive-600 px-1 text-[0.6rem] font-bold text-white dark:bg-olive-400 dark:text-ink-950">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <IconButton label="Abrir carrito" onClick={openCart} overlay={overlay} badge={itemCount}>
              <ShoppingBag size={18} />
            </IconButton>
          </div>
        </div>
      </header>
    </>
  );
}
