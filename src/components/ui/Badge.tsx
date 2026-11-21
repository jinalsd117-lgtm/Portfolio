import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "dark" | "warning" | "positive";
  className?: string;
}) {
  const tones = {
    neutral: "bg-canvas text-muted border-line",
    accent: "bg-accent-soft text-accent-strong border-transparent",
    dark: "bg-ink text-white border-transparent",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    positive: "bg-emerald-50 text-emerald-800 border-emerald-200",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Marks content that still needs to be supplied. Visible on purpose. */
export function Pending({ children = "To be added" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-line-strong px-2 py-0.5 text-[0.7rem] font-medium text-slate-600">
      {children}
    </span>
  );
}
