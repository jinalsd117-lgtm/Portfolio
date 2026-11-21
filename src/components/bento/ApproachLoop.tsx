"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { ClipboardCheck, PenTool, Rocket, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    key: "Design",
    icon: PenTool,
    text: "I plan the structure and design the screens around what the business needs people to do.",
  },
  {
    key: "AI-assisted build",
    icon: Sparkles,
    text: "I build with Claude and other AI tools, directing the work and reviewing what comes out rather than accepting it as-is.",
  },
  {
    key: "Testing",
    icon: ClipboardCheck,
    text: "I test the build myself before anything goes live.",
  },
  {
    key: "Deployment",
    icon: Rocket,
    text: "I handle deployment, whether that's a website going live or an app released on Google Play.",
  },
];

/** Interactive working-approach strip. Hover, focus or click a step to read it. */
export function ApproachLoop() {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const Step = steps[active];
  return (
    <div>
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const on = i === active;
          return (
            <li key={s.key} className="relative">
              <button
                type="button"
                aria-pressed={on}
                aria-controls={panelId}
                onClick={() => setActive(i)}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "relative z-10 flex w-full flex-col items-start gap-3 rounded-[var(--radius-inner)] border p-3.5 text-left transition-colors",
                  on ? "border-accent bg-accent-soft" : "border-line bg-white hover:border-line-strong",
                )}
              >
                <span className="flex w-full items-center justify-between">
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-lg",
                      on ? "bg-accent text-white" : "bg-canvas text-ink",
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="font-display text-xs font-bold tabular-nums text-muted">0{i + 1}</span>
                </span>
                <span className="text-sm font-semibold text-ink">{s.key}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div id={panelId} aria-live="polite" className="mt-4 min-h-[3.5rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={Step.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-[0.95rem] leading-relaxed text-muted"
          >
            <span className="font-semibold text-ink">{Step.key}: </span>
            {Step.text}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
