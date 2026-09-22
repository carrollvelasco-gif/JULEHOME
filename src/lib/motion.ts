import type { Variants, Transition } from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp = (delay = 0, y = 28): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  },
});

export const fade = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, delay, ease: EASE } },
});

export const stagger = (staggerChildren = 0.08, delayChildren = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

export const scaleIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: EASE },
  },
});

export const slideFrom = (dir: "left" | "right", delay = 0): Variants => ({
  hidden: { opacity: 0, x: dir === "left" ? -48 : 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: EASE },
  },
});

export const pageTransition: Transition = {
  duration: 0.5,
  ease: EASE,
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
