"use client";

import Link from "next/link";
import { useCallback, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  label?: string;
  dark?: boolean;
  as?: "div" | "article" | "li";
};

/**
 * Bento card with a soft pointer-following spotlight and a gentle lift.
 * The spotlight is CSS-only (custom properties), so it costs nothing when idle.
 * If `href` is given the whole card is a link with a visible focus ring.
 */
export function BentoCard({ children, className, href, external, label, dark, as = "div" }: Props) {
  const onPointerMove = useCallback((e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  const cls = cn(
    "spotlight group relative overflow-hidden rounded-[var(--radius-card)] border p-6 sm:p-7",
    "transition-[box-shadow,border-color,translate] duration-300 ease-[var(--ease-out-soft)]",
    dark
      ? "spotlight-dark border-white/10 bg-ink text-white shadow-float"
      : "border-line bg-card shadow-card",
    href &&
      "hover:-translate-y-0.5 hover:shadow-card-hover hover:border-line-strong focus-visible:-translate-y-0.5 motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0",
    className,
  );

  if (href) {
    const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <Link href={href} aria-label={label} className={cls} onPointerMove={onPointerMove} {...linkProps}>
        {children}
      </Link>
    );
  }
  const Comp = as;
  return (
    <Comp className={cls} onPointerMove={onPointerMove}>
      {children}
    </Comp>
  );
}
