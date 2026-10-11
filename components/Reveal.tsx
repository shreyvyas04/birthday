"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Fast scroll-triggered fade/slide-in. Reduced-motion is handled globally by
 * <MotionConfig reducedMotion="user"> in BirthdayExperience (transforms are skipped,
 * content is still shown). The `reveal` class lets the <noscript> rule in layout.tsx
 * keep content visible when JavaScript is off.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
