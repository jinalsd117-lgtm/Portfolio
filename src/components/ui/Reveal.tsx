"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Fades content up once as it scrolls into view.
 * With prefers-reduced-motion, <MotionProvider reducedMotion="user"> drops the
 * movement and keeps only a short fade. The same element renders on server and
 * client, so hydration never leaves content stuck at opacity 0.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
