import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "dark" | "ghost" | "soft";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out-soft)] focus-visible:outline-offset-4 active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_8px_20px_-8px_rgb(37_99_235/0.6)] hover:bg-accent-strong hover:shadow-[0_10px_24px_-8px_rgb(37_99_235/0.7)]",
  secondary: "bg-white text-ink border border-line hover:border-line-strong hover:bg-white shadow-card",
  dark: "bg-ink text-white hover:bg-black",
  soft: "bg-accent-soft text-accent-strong hover:bg-[#dce8ff]",
  ghost: "text-ink hover:text-accent px-0!",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "lg", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

/** Internal links use next/link; external links open in a new tab safely. */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "href">) {
  const cls = buttonClasses(variant, size, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
