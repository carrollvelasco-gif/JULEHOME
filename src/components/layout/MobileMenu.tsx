"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Mail, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useUI } from "@/context/UIContext";
import { useLockBodyScroll } from "@/hooks/useScrollLock";
import { EASE } from "@/lib/motion";
import { Logo } from "@/components/layout/Logo";
import { categories } from "@/lib/data/categories";

export function MobileMenu() {
  const { mobileMenuOpen, closeMobileMenu } = useUI();
  useLockBodyScroll(mobileMenuOpen);

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-[75] flex flex-col bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="container-site flex h-16 items-center justify-between">
            <Logo />
            <button
              onClick={closeMobileMenu}
              aria-label="Cerrar menú"
              className="grid size-10 place-items-center rounded-full text-ink-700 hover:bg-surface-muted dark:text-ink-100"
            >
              <span className="relative block h-5 w-5">
                <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav className="container-site flex-1 overflow-y-auto pb-8 pt-6">
            <ul className="space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="group flex items-center justify-between border-b border-line py-4"
                  >
                    <span className="font-display text-2xl font-medium text-ink-950 dark:text-foreground">
                      {link.label}
                    </span>
                    <ArrowRight
                      size={18}
                      className="text-ink-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-olive-600 dark:text-ink-600"
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
              className="mt-8"
            >
              <p className="eyebrow text-olive-600 dark:text-olive-300">Categorías</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/tienda?categoria=${cat.slug}`}
                    onClick={closeMobileMenu}
                    className="rounded-full border border-line-strong px-4 py-2 text-xs font-medium text-ink-700 transition-colors hover:border-olive-600 hover:text-olive-700 dark:text-ink-100 dark:hover:text-olive-300"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: EASE }}
              className="mt-10 space-y-3 text-sm text-ink-500 dark:text-ink-400"
            >
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-olive-600 dark:text-olive-300" />
                {SITE.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-olive-600 dark:text-olive-300" />
                {SITE.email}
              </p>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-olive-700"
              >
                <InstagramIcon size={14} className="text-olive-600 dark:text-olive-300" />
                @julehome
              </a>
              <p className="flex items-center gap-2 pt-2 text-xs text-ink-400">
                <Leaf size={14} className="text-olive-600 dark:text-olive-300" />
                Hecho con cera natural y mucho amor
              </p>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
