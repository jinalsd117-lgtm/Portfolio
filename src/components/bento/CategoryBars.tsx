"use client";

import Link from "next/link";
import { useState } from "react";
import type { ProjectCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Category counts derived from the project data. Each bar links to the filtered list. */
export function CategoryBars({ counts, total }: { counts: Record<ProjectCategory, number>; total: number }) {
  const [hover, setHover] = useState<ProjectCategory | null>(null);
  const max = Math.max(...Object.values(counts));
  return (
    <ul className="mt-5 space-y-2" onPointerLeave={() => setHover(null)}>
      {(Object.keys(counts) as ProjectCategory[]).map((c) => {
        const dim = hover !== null && hover !== c;
        return (
          <li key={c}>
            <Link
              href={`/projects?category=${encodeURIComponent(c)}`}
              onPointerEnter={() => setHover(c)}
              onFocus={() => setHover(c)}
              onBlur={() => setHover(null)}
              className={cn(
                "group/bar relative z-10 flex items-center gap-3 rounded-lg py-1 text-sm transition-opacity",
                dim && "opacity-45",
              )}
              aria-label={`${c}: ${counts[c]} of ${total} projects. View ${c} projects`}
            >
              <span className="w-24 shrink-0 text-ink">{c}</span>
              <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-canvas ring-1 ring-inset ring-line">
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-500 ease-[var(--ease-out-soft)]"
                  style={{ width: `${(counts[c] / max) * 100}%` }}
                />
              </span>
              <span className="w-5 text-right font-display font-bold tabular-nums text-ink">{counts[c]}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
