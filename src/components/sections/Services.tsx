import Link from "next/link";
import { ArrowRight, Globe, Megaphone, Palette, Search, Smartphone, Workflow } from "lucide-react";
import { services } from "@/data/skills";
import { getProject } from "@/data/projects";
import { BentoCard } from "@/components/bento/BentoCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const icons = { globe: Globe, search: Search, megaphone: Megaphone, workflow: Workflow, smartphone: Smartphone, palette: Palette };
const spans = ["lg:col-span-5", "lg:col-span-4", "lg:col-span-3", "lg:col-span-3", "lg:col-span-4", "lg:col-span-5"];

export function Services() {
  return (
    <section aria-labelledby="services-title" className="container-page py-16 lg:py-20">
      <Reveal>
        <SectionHeading
          id="services-title"
          eyebrow="Freelance services"
          title="What I can do for your business"
          description="For clients who need one person who understands both the marketing and the build."
          action={
            <Link href="/contact?type=project" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent">
              Start a project <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />
      </Reveal>
      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          const evidence = s.evidence.map((e) => getProject(e)).filter(Boolean);
          return (
            <Reveal as="li" key={s.title} delay={(i % 3) * 0.05} className={cn(spans[i])}>
              <BentoCard className="flex h-full flex-col">
                <span className={cn("grid size-11 place-items-center rounded-xl", i === 0 ? "bg-accent text-white" : "bg-accent-soft text-accent")}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
                <ul className="mt-4 space-y-1 text-sm text-ink/80">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
                {evidence.length > 0 && (
                  <p className="mt-auto pt-5 text-xs text-muted">
                    See:{" "}
                    {evidence.map((p, j) => (
                      <span key={p!.slug}>
                        <Link href={`/projects/${p!.slug}`} className="relative z-10 font-medium text-ink underline decoration-line-strong underline-offset-2 hover:text-accent">
                          {p!.title}
                        </Link>
                        {j < evidence.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                )}
              </BentoCard>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
