"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { TimelineEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Expandable career timeline. Each entry is a disclosure button
 * (aria-expanded) so it works with keyboard and screen readers.
 */
export function CareerTimeline({ entries }: { entries: TimelineEntry[] }) {
  const [open, setOpen] = useState<string | null>(entries[1]?.id ?? entries[0]?.id ?? null);
  const activeIndex = Math.max(0, entries.findIndex((e) => e.id === open));

  return (
    <div className="relative">
      {/* rail */}
      <div aria-hidden className="absolute bottom-4 left-[1.0625rem] top-4 w-px bg-line sm:left-[9.5rem]" />
      <ol className="space-y-3">
        {entries.map((e, i) => {
          const isOpen = open === e.id;
          const panelId = `tl-${e.id}`;
          return (
            <li key={e.id} className="relative grid grid-cols-[2.25rem_1fr] gap-4 sm:grid-cols-[8rem_2.25rem_1fr]">
              <p className={cn("hidden pt-4 text-right text-sm font-semibold sm:block", isOpen ? "text-ink" : "text-muted")}>
                {e.dateLabel}
              </p>
              <span className="relative z-10 flex justify-center pt-4">
                <span
                  className={cn(
                    "grid size-[1.1rem] place-items-center rounded-full border-2 bg-canvas transition-colors",
                    i <= activeIndex ? "border-accent" : "border-line-strong",
                  )}
                >
                  <span className={cn("size-1.5 rounded-full transition-colors", isOpen ? "bg-accent" : "bg-transparent")} />
                </span>
              </span>
              <div
                className={cn(
                  "rounded-[var(--radius-card)] border bg-card transition-[border-color,box-shadow]",
                  isOpen ? "border-line-strong shadow-card-hover" : "border-line shadow-card",
                )}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : e.id)}
                    className="flex w-full items-start justify-between gap-4 rounded-[var(--radius-card)] p-5 text-left font-sans tracking-normal [text-wrap:wrap]"
                  >
                    <span>
                      <span className="mb-1 block text-xs font-semibold text-accent sm:hidden">{e.dateLabel}</span>
                      <span className="block font-display text-lg font-bold tracking-tight text-ink">{e.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">{e.body}</span>
                    </span>
                    <ChevronDown
                      className={cn("mt-1 size-5 shrink-0 text-muted transition-transform duration-300", isOpen && "rotate-180")}
                      aria-hidden
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-line px-5 pb-5 pt-4">
                        <ul className="space-y-1.5 text-sm text-ink/80">
                          {e.detail.map((d) => (
                            <li key={d} className="flex gap-2">
                              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                              {d}
                            </li>
                          ))}
                        </ul>
                        {e.href && (
                          <Link href={e.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
                            {e.hrefLabel} <ArrowRight className="size-4" aria-hidden />
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
