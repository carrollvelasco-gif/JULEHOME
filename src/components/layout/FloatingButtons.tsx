"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

export function FloatingButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hola JULEHOME, me gustaría recibir más información.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-all duration-300 hover:-translate-y-1 hover:bg-[#1ebe5b]"
      >
        <MessageCircle size={22} />
      </a>
      <AnimatePresence>
        {visible && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Volver arriba"
            className="fixed bottom-24 right-5 z-40 grid size-12 place-items-center rounded-full border border-line-strong bg-surface text-ink-700 shadow-lift transition-colors hover:border-olive-600 hover:text-olive-700 dark:text-ink-100 dark:hover:text-olive-300"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
