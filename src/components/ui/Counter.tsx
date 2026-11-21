"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Counts up to a REAL value once, when visible. The final value is rendered
 * on the server, so crawlers and no-JS visitors always see the true number.
 */
export function Counter({
  value,
  decimals = 0,
  className,
}: {
  value: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const done = useRef(false);

  useEffect(() => {
    if (!inView || reduce || done.current || !ref.current) return;
    done.current = true;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, decimals]);

  return (
    <span ref={ref} className={className}>
      {value.toFixed(decimals)}
    </span>
  );
}
