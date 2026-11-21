import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { countByCategory, featuredOrder, getFeatured, portfolioStats, projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

// Varied spans keep the grid from feeling uniform.
const layout = [
  { span: "lg:col-span-7", media: "lg:aspect-[16/9.2]" },
  { span: "lg:col-span-5", media: "lg:aspect-[6/5]" },
  { span: "lg:col-span-4", media: "" },
  { span: "lg:col-span-4", media: "" },
  { span: "lg:col-span-4", media: "" },
  { span: "lg:col-span-5", media: "" },
];

export function FeaturedProjects() {
  const featured = getFeatured();
  const counts = countByCategory();
  return (
    <section aria-labelledby="featured-title" className="container-page py-16 lg:py-20">
      <Reveal>
        <SectionHeading
          id="featured-title"
          eyebrow="Selected work"
          title="Featured projects"
          description="A mix of SaaS platforms, business websites, SEO work and Android apps. Every card links to a live product and a case study."
          action={
            <ButtonLink href="/projects" variant="secondary" size="md">
              All {portfolioStats.entries} projects <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          }
        />
      </Reveal>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {featured.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 3) * 0.06} className={cn(layout[i]?.span, i === 0 && "sm:col-span-2 lg:col-span-7")}>
            <ProjectCard
              project={p}
              priority={i === 0}
              mediaClassName={layout[i]?.media}
              sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"}
            />
          </Reveal>
        ))}
        <Reveal as="li" delay={0.12} className="sm:col-span-2 lg:col-span-7">
          <div className="flex h-full flex-col justify-between gap-8 rounded-[var(--radius-card)] border border-dashed border-line-strong bg-white/60 p-7 sm:p-9">
            <div>
              <p className="eyebrow">Full archive</p>
              <p className="mt-3 font-display text-3xl font-bold leading-tight text-ink">
                {portfolioStats.entries} entries, filterable by category.
              </p>
              <p className="mt-2 max-w-md text-muted">
                Including internal CRM and workflow systems, shown only through their public sign-in screens to keep
                business data private.
              </p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-muted">Also in the archive</p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
                {projects
                  .filter((p) => !featuredOrder.includes(p.slug))
                  .map((p) => (
                    <li key={p.slug}>
                      <Link href={`/projects/${p.slug}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent">
                        {p.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(counts).map(([c, n]) => (
                <Link
                  key={c}
                  href={`/projects?category=${encodeURIComponent(c)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink"
                >
                  {c}
                  <span className="rounded-full bg-canvas px-1.5 text-xs tabular-nums text-muted">{n}</span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </ul>
    </section>
  );
}
