import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  Layers,
  Lock,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";
import { getAdjacent, getProject, getRelated, projects } from "@/data/projects";
import { site } from "@/data/site";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { SeoResult } from "@/components/projects/SeoResult";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { projectJsonLd } from "@/lib/seo";
import { cn, hostname, jsonLd } from "@/lib/utils";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  const title = `${project.title} — Case Study`;
  return {
    title,
    description: `${project.summary} Role: ${project.contribution}`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${title} · ${site.name}`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      type: "article",
    },
  };
}

function Panel({
  title,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  icon: typeof Target;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("card p-6 sm:p-7", className)} aria-label={title}>
      <h2 className="flex items-center gap-2.5 font-display text-lg font-bold text-ink">
        <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent">
          <Icon className="size-4" aria-hidden />
        </span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelated(project);
  const { prev, next } = getAdjacent(project.slug);
  const sibling = project.productGroup ? related.find((r) => r.productGroup?.name === project.productGroup?.name) : undefined;

  return (
    <article className="pb-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(projectJsonLd(project)) }} />

      {/* Header */}
      <header className="container-page pt-8 sm:pt-12">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-ink">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/projects" className="hover:text-ink">Projects</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-medium text-ink">{project.title}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2">
              {project.categories.map((c) => (
                <Badge key={c} tone="accent">{c}</Badge>
              ))}
              <Badge>{project.platform}</Badge>
              {project.industry && <Badge>{project.industry}</Badge>}
            </div>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <ButtonLink href={project.url} external>
              {project.linkLabel} <ArrowUpRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              <ArrowLeft className="size-4" aria-hidden /> All projects
            </ButtonLink>
          </div>
        </div>

        {project.productGroup && sibling && (
          <div className="mt-8 flex flex-col gap-3 rounded-[var(--radius-card)] border border-[#d6e4ff] bg-accent-soft p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink">
              <Layers className="mr-2 inline size-4 text-accent" aria-hidden />
              <strong>{project.productGroup.name}:</strong> {project.productGroup.note}
            </p>
            <Link href={`/projects/${sibling.slug}`} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent-strong hover:underline">
              View {sibling.title} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        )}
      </header>

      {/* Hero media */}
      <Reveal className="container-page mt-10">
        <div className="card p-2 sm:p-3">
          <ProjectMedia
            project={project}
            pan={false}
            contain
            priority
            sizes="(min-width: 1240px) 1200px, 100vw"
            className={cn("rounded-[16px]", project.images.length ? "aspect-[16/9]" : "aspect-[16/7]")}
          />
        </div>
        <p className="mt-3 px-1 text-xs text-muted">
          {project.images.length
            ? project.images[0].caption
            : "No approved screenshot yet. This placeholder will be replaced once one is supplied."}
        </p>
      </Reveal>

      {/* Body */}
      <div className="container-page mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
        <Reveal className="lg:col-span-5">
          <Panel title="Role and contribution" icon={UserRound} className="h-full">
            <p className="text-[0.95rem] leading-relaxed text-ink">{project.contribution}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.roles.map((r) => (
                <li key={r} className="rounded-full border border-line bg-canvas px-3 py-1 text-xs font-medium text-ink">{r}</li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.05}>
          <Panel title="Business context" icon={Target} className="h-full">
            <p className="text-[0.95rem] leading-relaxed text-ink/90">{project.context}</p>
            {project.challenge && (
              <div className="mt-4 rounded-[var(--radius-inner)] bg-canvas p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">The challenge</p>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink">{project.challenge}</p>
              </div>
            )}
          </Panel>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <Panel title="Design and implementation approach" icon={Sparkles} className="h-full">
            <ol className="space-y-3">
              {project.approach.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink font-display text-[0.7rem] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[0.95rem] leading-relaxed text-ink/90">{step}</span>
                </li>
              ))}
            </ol>
          </Panel>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={0.05}>
          <Panel title="Product features" icon={Layers} className="h-full">
            {project.features ? (
              <>
                <ul className="space-y-2">
                  {project.features.items.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink/90">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                  Verified from: {project.features.source}
                </p>
              </>
            ) : (
              <p className="text-sm leading-relaxed text-muted">
                Feature details will be added once approved screenshots or a written feature list are supplied. Visit
                the live site at{" "}
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline underline-offset-2">
                  {hostname(project.url)}
                </a>
                .
              </p>
            )}
          </Panel>
        </Reveal>

        {project.stack.length > 0 && (
          <Reveal className="lg:col-span-12">
            <Panel title="Technical stack (confirmed)" icon={Layers}>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full bg-ink px-3 py-1.5 text-sm font-medium text-white">{s}</li>
                ))}
              </ul>
            </Panel>
          </Reveal>
        )}

        <Reveal className="lg:col-span-4">
          <Panel title="Testing and deployment" icon={ClipboardCheck} className="h-full">
            <p className="text-[0.95rem] leading-relaxed text-ink/90">{project.testing}</p>
            {project.privacyNote && (
              <p className="mt-4 flex gap-2 rounded-[var(--radius-inner)] bg-canvas p-3.5 text-sm text-muted">
                <Lock className="mt-0.5 size-4 shrink-0 text-ink" aria-hidden />
                {project.privacyNote}
              </p>
            )}
          </Panel>
        </Reveal>

        <Reveal className="lg:col-span-8" delay={0.05}>
          {project.seo ? (
            <SeoResult seo={project.seo} title="Evidence-based results" detailed />
          ) : (
            <section className="card flex h-full flex-col justify-center p-6 sm:p-7" aria-label="Results">
              <h2 className="font-display text-lg font-bold text-ink">Results</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                No outcome metrics are published for this project yet. Figures will only be added when they can be
                backed by a report or a client-approved source.
              </p>
            </section>
          )}
        </Reveal>
      </div>

      {/* Gallery */}
      {project.images.length > 1 && (
        <section aria-labelledby="gallery-title" className="container-page mt-16">
          <h2 id="gallery-title" className="font-display text-2xl font-bold text-ink">Screenshots</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {project.images.slice(1).map((img) => (
              <figure key={img.src} className="card p-2 sm:p-3 lg:col-span-2">
                {img.kind === "full-page" ? (
                  <div
                    tabIndex={0}
                    aria-label={`${img.alt}. Scrollable.`}
                    className="max-h-[70vh] overflow-y-auto rounded-[16px] border border-line [scrollbar-width:thin]"
                  >
                    <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1240px) 1200px, 100vw" className="h-auto w-full" />
                  </div>
                ) : (
                  <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1240px) 1200px, 100vw" className="h-auto w-full rounded-[16px]" />
                )}
                <figcaption className="px-1 pt-3 text-xs text-muted">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="container-page mt-16">
          <h2 id="related-title" className="font-display text-2xl font-bold text-ink">Related projects</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <ProjectCard project={r} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Prev / next */}
      <nav aria-label="More case studies" className="container-page mt-16 grid gap-4 sm:grid-cols-2">
        <Link href={`/projects/${prev.slug}`} className="card group flex items-center gap-4 p-5 hover:border-line-strong">
          <ArrowLeft className="size-5 text-muted transition-transform group-hover:-translate-x-0.5" aria-hidden />
          <span>
            <span className="block text-xs text-muted">Previous</span>
            <span className="font-display font-bold text-ink">{prev.title}</span>
          </span>
        </Link>
        <Link href={`/projects/${next.slug}`} className="card group flex items-center justify-end gap-4 p-5 text-right hover:border-line-strong">
          <span>
            <span className="block text-xs text-muted">Next</span>
            <span className="font-display font-bold text-ink">{next.title}</span>
          </span>
          <ArrowRight className="size-5 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </nav>
    </article>
  );
}
