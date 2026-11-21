import Link from "next/link";
import { BadgeCheck, CircleDashed, FileSearch, Sparkles } from "lucide-react";
import { capabilities, tools } from "@/data/skills";
import { getProject } from "@/data/projects";
import { BentoCard } from "@/components/bento/BentoCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pending } from "@/components/ui/Badge";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Expertise",
  description:
    "Jinal Dodiya's capabilities across SEO, performance marketing, WordPress, React, JavaScript, Claude AI, AI-assisted CRM and SaaS development, app UI design, testing and deployment.",
  path: "/expertise",
});

const groups = ["Marketing", "Build", "AI & delivery", "Creative"] as const;

const toolColumns = [
  {
    status: "confirmed",
    title: "Confirmed tools",
    note: "Confirmed by Jinal.",
    icon: BadgeCheck,
  },
  {
    status: "evidenced",
    title: "Shown by supplied material",
    note: "Backed by reports or files supplied for this portfolio.",
    icon: FileSearch,
  },
  {
    status: "awaiting-confirmation",
    title: "Awaiting confirmation",
    note: "Not claimed yet. These will move up once confirmed, or be removed.",
    icon: CircleDashed,
  },
] as const;

export default function ExpertisePage() {
  return (
    <div className="container-page pt-10 sm:pt-16">
      <SectionHeading
        as="h1"
        eyebrow="Expertise"
        title="Skills, shown through the work."
        description="Each capability links to projects that show it. Where there's no public evidence yet, it says so. There are no self-rated skill bars here."
      />

      {groups.map((g, gi) => {
        const items = capabilities.filter((c) => c.group === g);
        return (
          <section key={g} aria-labelledby={`group-${gi}`} className="mt-14">
            <h2 id={`group-${gi}`} className="eyebrow">{g}</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
              {items.map((c, i) => {
                const evidence = c.evidence.map((s) => getProject(s)).filter(Boolean);
                const span = items.length === 1 ? "lg:col-span-6" : items.length === 2 ? (i === 0 ? "lg:col-span-7" : "lg:col-span-5") : "lg:col-span-4";
                return (
                  <Reveal as="li" key={c.name} delay={(i % 3) * 0.05} className={span}>
                    <BentoCard className="flex h-full flex-col">
                      <h3 className="font-display text-xl font-bold text-ink">{c.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{c.description}</p>
                      <p className="mt-4 rounded-[var(--radius-inner)] bg-canvas p-3.5 text-sm leading-relaxed text-ink/85">
                        <span className="font-semibold text-ink">How I work: </span>
                        {c.howIWork}
                      </p>
                      <div className="mt-auto pt-5">
                        <p className="text-xs font-medium text-muted">Evidence</p>
                        {evidence.length ? (
                          <ul className="mt-2 flex flex-wrap gap-1.5">
                            {evidence.map((p) => (
                              <li key={p!.slug}>
                                <Link
                                  href={`/projects/${p!.slug}`}
                                  className="relative z-10 inline-flex rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                                >
                                  {p!.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2"><Pending>Public example to be added</Pending></p>
                        )}
                      </div>
                    </BentoCard>
                  </Reveal>
                );
              })}
            </ul>
          </section>
        );
      })}

      <section aria-labelledby="tools-title" className="mt-20">
        <Reveal>
          <SectionHeading
            id="tools-title"
            eyebrow="Tools"
            title="Confirmed vs. awaiting confirmation"
            description="Tools are kept in separate lists so nothing reads as a claim before it's been confirmed."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {toolColumns.map((col, i) => {
            const Icon = col.icon;
            const list = tools.filter((t) => t.status === col.status);
            const pending = col.status === "awaiting-confirmation";
            return (
              <Reveal key={col.status} delay={i * 0.05}>
                <section
                  aria-label={col.title}
                  className={cn(
                    "h-full rounded-[var(--radius-card)] p-6 sm:p-7",
                    pending ? "border border-dashed border-line-strong bg-white/50" : i === 0 ? "bg-ink text-white shadow-float" : "card",
                  )}
                >
                  <Icon className={cn("size-6", i === 0 ? "text-blue-300" : "text-accent")} aria-hidden />
                  <h3 className="mt-4 font-display text-xl font-bold">{col.title}</h3>
                  <p className={cn("mt-1 text-sm", i === 0 ? "text-slate-300" : "text-muted")}>{col.note}</p>
                  <ul className="mt-5 space-y-2">
                    {list.map((t) => (
                      <li
                        key={t.name}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm",
                          i === 0 ? "bg-white/5" : "bg-canvas",
                        )}
                      >
                        <span className={cn("shrink-0 font-medium", pending && "text-muted")}>{t.name}</span>
                        <span className={cn("text-right text-xs", i === 0 ? "text-slate-400" : "text-muted")}>{t.note}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Reveal className="mt-16">
        <section aria-labelledby="ai-title" className="grid gap-6 rounded-[var(--radius-card-lg)] border border-[#d6e4ff] bg-accent-soft p-7 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Sparkles className="size-7 text-accent" aria-hidden />
            <h2 id="ai-title" className="mt-4 font-display text-3xl font-bold leading-tight text-ink">How I use AI</h2>
          </div>
          <div className="space-y-4 text-ink/85 lg:col-span-7">
            <p>
              Most of my development work is AI-assisted, mainly with Claude. I use it to generate and refine code and
              content. I decide what gets built, review what the AI produces, test it, and deploy it.
            </p>
            <p>
              I don&apos;t present AI-generated work as hand-written, and I don&apos;t claim deep independent mastery of
              frameworks I use through AI. What I offer is the ability to take a real business need to a working, deployed
              product.
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
