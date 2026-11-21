import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUp, Info, Minus } from "lucide-react";
import type { SeoCaseStudy } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Counter } from "@/components/ui/Counter";
import { cn, longDate } from "@/lib/utils";

/**
 * Position track: lower is better, so 1 sits on the left.
 * Scale is fixed per study so the bar can't exaggerate the movement.
 */
function PositionTrack({ from, to, max }: { from: number; to: number; max: number }) {
  const pct = (v: number) => `${Math.min(100, (Math.max(1, v) - 1) / (max - 1) * 100)}%`;
  const improved = to < from;
  return (
    <figure className="mt-5">
      <div className="relative h-14" aria-hidden>
        <div className="absolute inset-x-0 top-6 h-2 rounded-full bg-canvas ring-1 ring-inset ring-line" />
        <div
          className={cn("absolute top-6 h-2 rounded-full", improved ? "bg-accent" : "bg-negative")}
          style={{ left: pct(Math.min(from, to)), width: `calc(${pct(Math.max(from, to))} - ${pct(Math.min(from, to))})` }}
        />
        <div className="absolute top-3.5 -translate-x-1/2" style={{ left: pct(from) }}>
          <span className="block size-5 rounded-full border-2 border-white bg-line-strong shadow" />
        </div>
        <div className="absolute top-3.5 -translate-x-1/2" style={{ left: pct(to) }}>
          <span className="block size-5 rounded-full border-2 border-white bg-accent shadow ring-4 ring-accent/15" />
        </div>
      </div>
      <div className="flex justify-between text-[0.7rem] text-muted" aria-hidden>
        <span>Position 1 (best)</span>
        <span>{max}</span>
      </div>
      <figcaption className="sr-only">
        Average tracked position moved from {from} to {to}. Lower is better.
      </figcaption>
    </figure>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: "up" | "down" | "flat" }) {
  const Icon = tone === "up" ? ArrowUp : tone === "down" ? ArrowDown : Minus;
  return (
    <div className="rounded-[var(--radius-inner)] border border-line bg-white p-3.5">
      <dt className="flex items-center gap-1.5 text-xs text-muted">
        {tone && (
          <Icon
            className={cn("size-3.5", tone === "up" && "text-positive", tone === "down" && "text-negative")}
            aria-hidden
          />
        )}
        {label}
      </dt>
      <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-ink">
        <Counter value={value} />
      </dd>
    </div>
  );
}

export function SeoResult({
  seo,
  title,
  href,
  detailed = false,
}: {
  seo: SeoCaseStudy;
  title: string;
  href?: string;
  detailed?: boolean;
}) {
  const max = Math.max(10, Math.ceil(Math.max(seo.averagePosition.from, seo.averagePosition.to) / 10) * 10 + 10);
  return (
    <article className="card flex h-full flex-col p-6 sm:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">Tracked keyword rankings</Badge>
        {seo.seoRoleConfirmed ? (
          <Badge tone="positive">SEO work by Jinal</Badge>
        ) : (
          <Badge tone="warning">SEO role not yet confirmed</Badge>
        )}
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted">
        {seo.period} · {seo.market} · {seo.trackedKeywords} tracked keywords
      </p>

      <div className="mt-6 flex items-end gap-3">
        <div>
          <p className="text-xs font-medium text-muted">Average tracked position</p>
          <p className="mt-1 flex items-center gap-2 font-display text-4xl font-bold tabular-nums tracking-tight text-ink">
            <span className="text-muted/60">{seo.averagePosition.from.toFixed(2)}</span>
            <ArrowRight className="size-6 text-accent" aria-label="to" />
            <span>{seo.averagePosition.to.toFixed(2)}</span>
          </p>
        </div>
      </div>
      <PositionTrack from={seo.averagePosition.from} to={seo.averagePosition.to} max={max} />

      <dl className={cn("mt-5 grid gap-2", seo.notRanked !== undefined ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3")}>
        <Stat label="Moved up" value={seo.movedUp} tone="up" />
        <Stat label="Moved down" value={seo.movedDown} tone={seo.movedDown > 0 ? "down" : "flat"} />
        <Stat label="In top 3" value={seo.top3} />
        {seo.notRanked !== undefined && <Stat label="Not ranked" value={seo.notRanked} tone="flat" />}
      </dl>

      <div className="mt-5">
        <p className="text-xs font-medium text-muted">Example tracked keywords</p>
        <ul className="mt-2 space-y-1.5">
          {seo.examples.map((k) => (
            <li key={k.keyword} className="flex items-center justify-between gap-3 rounded-xl bg-canvas px-3 py-2 text-sm">
              <span className="text-ink">{k.keyword}</span>
              <span className="shrink-0 rounded-full bg-ink px-2 py-0.5 font-display text-xs font-bold text-white tabular-nums">
                #{k.position}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {detailed && (
        <div className="mt-5 rounded-[var(--radius-inner)] border border-line bg-canvas p-4">
          <p className="text-sm font-semibold text-ink">Limitations</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
            {seo.limitations.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 flex gap-2.5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
        <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
        <p>
          {seo.attribution} Source: {seo.tool} report, {longDate(seo.reportDate)}. Rankings only, not traffic,
          enquiries, sales or ROI.
        </p>
      </div>

      {href && (
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-ink hover:text-accent"
        >
          View case study <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </article>
  );
}
