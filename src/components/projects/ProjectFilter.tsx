"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/lib/types";
import { PROJECT_CATEGORIES } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;
const FILTERS: Filter[] = ["All", ...PROJECT_CATEGORIES];

function isFilter(v: string | null): v is Filter {
  return !!v && (FILTERS as string[]).includes(v);
}

/**
 * Animated, keyboard-accessible project filter.
 * The active filter is mirrored in ?category= so filtered views are shareable.
 */
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("All");
  const statusId = useId();

  // Read the initial filter from the URL after mount (keeps the page static).
  useEffect(() => {
    const read = () => {
      const v = new URLSearchParams(window.location.search).get("category");
      setActive(isFilter(v) ? v : "All");
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const select = (f: Filter) => {
    setActive(f);
    const url = new URL(window.location.href);
    if (f === "All") url.searchParams.delete("category");
    else url.searchParams.set("category", f);
    window.history.replaceState(null, "", url);
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length };
    for (const p of projects) for (const cat of p.categories) c[cat] = (c[cat] ?? 0) + 1;
    return c;
  }, [projects]);

  const visible = active === "All" ? projects : projects.filter((p) => p.categories.includes(active));

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        aria-describedby={statusId}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
        onKeyDown={(e) => {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
          const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
          if (i < 0) return;
          e.preventDefault();
          const next = buttons[(i + (e.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length];
          next.focus();
        }}
      >
        {FILTERS.map((f) => {
          const on = active === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => select(f)}
              className={cn(
                "relative inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                on ? "border-ink text-white" : "border-line bg-white text-ink hover:border-line-strong",
              )}
            >
              {on && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  aria-hidden
                />
              )}
              <span className="relative">{f}</span>
              <span
                className={cn(
                  "relative rounded-full px-1.5 py-0.5 text-[0.7rem] tabular-nums",
                  on ? "bg-white/15 text-white" : "bg-canvas text-muted",
                )}
              >
                {counts[f] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <p id={statusId} role="status" aria-live="polite" className="mt-4 text-sm text-muted">
        Showing {visible.length} of {projects.length} projects{active !== "All" ? ` in ${active}` : ""}.
      </p>

      <motion.ul layout className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} headingLevel="h2" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
