import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { ProjectMedia } from "./ProjectMedia";
import { cn, hostname } from "@/lib/utils";

/**
 * Project card. The title is a stretched link to the case study; the live
 * link sits above it so both stay separately focusable (no nested links).
 */
export function ProjectCard({
  project,
  className,
  mediaClassName,
  headingLevel = "h3",
  sizes,
  priority,
  showSummary = true,
}: {
  project: Project;
  className?: string;
  mediaClassName?: string;
  headingLevel?: "h2" | "h3";
  sizes?: string;
  priority?: boolean;
  showSummary?: boolean;
}) {
  const H = headingLevel;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-card shadow-card",
        "transition-[box-shadow,border-color,translate] duration-300 ease-[var(--ease-out-soft)]",
        "hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover motion-reduce:hover:translate-y-0",
        "has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent",
        className,
      )}
    >
      <div className="p-2 pb-0">
        <ProjectMedia
          project={project}
          sizes={sizes}
          priority={priority}
          className={cn("aspect-[16/10] rounded-[16px]", mediaClassName)}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {project.categories.map((c) => (
            <span key={c} className="rounded-full bg-accent-soft px-2.5 py-1 text-[0.7rem] font-semibold text-accent-strong">
              {c}
            </span>
          ))}
          <span className="text-[0.72rem] text-muted">· {project.platform}</span>
        </div>
        <H className="font-display text-xl font-bold leading-snug text-ink">
          <Link
            href={`/projects/${project.slug}`}
            className="outline-none after:absolute after:inset-0 after:z-10 after:rounded-[var(--radius-card)] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </H>
        {showSummary && <p className="text-sm leading-relaxed text-muted">{project.summary}</p>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-accent">
            Case study
            <ArrowRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5" aria-hidden />
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 inline-flex max-w-[55%] items-center gap-1 truncate rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-ink hover:text-ink"
          >
            <span className="truncate">{project.platform === "Android app" ? "Google Play" : hostname(project.url)}</span>
            <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
            <span className="sr-only"> — open {project.title} live (new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
