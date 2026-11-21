import Image from "next/image";
import type { Project } from "@/lib/types";
import { ScreenshotPlaceholder } from "@/components/ui/Placeholder";
import { cn } from "@/lib/utils";

/**
 * Card/hero media for a project.
 *  - full-page capture → pans top-to-bottom on hover (preview transition)
 *  - cover / panel     → static, top-aligned
 *  - nothing supplied  → labelled placeholder (never stock imagery)
 */
export function ProjectMedia({
  project,
  className,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
  pan = true,
  contain = false,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
  pan?: boolean;
  /** Show the whole image (used for sign-in panels in case-study heroes). */
  contain?: boolean;
}) {
  const full = project.images.find((i) => i.kind === "full-page");
  const cover = project.images.find((i) => i.kind === "cover") ?? project.images.find((i) => i.kind === "panel");

  return (
    <div className={cn("relative overflow-hidden", contain && cover?.kind === "panel" ? "bg-ink" : "bg-canvas", className)}>
      {pan && full ? (
        <Image
          src={full.src}
          alt={full.alt}
          width={full.width}
          height={full.height}
          sizes={sizes}
          priority={priority}
          className="pan-shot"
        />
      ) : cover ? (
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            contain && cover.kind === "panel"
              ? "object-contain"
              : cn(
                  "object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] motion-safe:group-hover:scale-[1.03]",
                  cover.kind === "panel" ? "object-[center_30%]" : "object-left-top",
                ),
          )}
        />
      ) : (
        <ScreenshotPlaceholder title={project.title} platform={project.platform} compact dark={project.tone === "ink"} />
      )}
      {(full || cover) && (
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/5" aria-hidden />
      )}
    </div>
  );
}
