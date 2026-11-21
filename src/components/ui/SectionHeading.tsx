import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  id,
  className,
  as: H = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  id?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <H
          id={id}
          className={cn(
            "font-display font-bold text-ink",
            H === "h1" ? "text-4xl sm:text-5xl md:text-6xl leading-[1.02]" : "text-3xl sm:text-4xl leading-[1.08]",
          )}
        >
          {title}
        </H>
        {description && <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
