import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Clearly labelled stand-in for a screenshot that hasn't been supplied or
 * approved yet. Never replace this with stock imagery.
 */
export function ScreenshotPlaceholder({
  title,
  platform,
  className,
  compact = false,
  dark = false,
}: {
  title: string;
  platform?: string;
  className?: string;
  compact?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`Screenshot placeholder for ${title}. An approved screenshot has not been added yet.`}
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden text-center",
        dark ? "bg-[#1a2233] text-slate-300" : "bg-canvas text-muted",
        className,
      )}
    >
      <div className={cn("absolute inset-0 dot-grid", dark ? "opacity-30" : "opacity-70")} aria-hidden />
      <div className="relative flex flex-col items-center gap-2 px-6">
        <span
          className={cn(
            "grid place-items-center rounded-xl border",
            dark ? "border-white/15 bg-white/5" : "border-line bg-white",
            compact ? "size-9" : "size-11",
          )}
        >
          <ImageOff className={compact ? "size-4" : "size-5"} aria-hidden />
        </span>
        <p className={cn("font-display font-semibold", dark ? "text-white" : "text-ink", compact ? "text-sm" : "text-base")}>
          {title}
        </p>
        <p className="text-xs leading-snug">
          Screenshot placeholder{platform ? ` · ${platform}` : ""}
          <br />
          Awaiting an approved screenshot
        </p>
      </div>
    </div>
  );
}
