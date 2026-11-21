import { Download } from "lucide-react";
import { site, type ContactKey } from "@/data/site";
import { education, experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { capabilities, tools } from "@/data/skills";
import { PROJECT_CATEGORIES } from "@/lib/types";
import { publicAssetExists } from "@/lib/assets";
import { PrintButton } from "@/components/resume/PrintButton";
import { pageMetadata } from "@/lib/seo";
import { hostname, monthYear } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Resume",
  description: "Printable, ATS-friendly resume for Jinal Dodiya, Digital Marketing Manager at Raybotix Digital.",
  path: "/resume",
});

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-ink pb-1 font-display text-sm font-bold uppercase tracking-[0.12em] text-ink">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const hasPdf = publicAssetExists(site.assets.resumePdf);
  const contacts = (Object.keys(site.contact) as ContactKey[])
    .map((k) => [k, site.contact[k]] as const)
    .filter(([, v]) => Boolean(v));
  const confirmedTools = tools.filter((t) => t.status !== "awaiting-confirmation").map((t) => t.name);

  return (
    <div className="container-page pt-10 sm:pt-14">
      {/* Toolbar — hidden when printing */}
      <div className="no-print mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Resume</p>
          <p className="mt-1 text-sm text-muted">One column and plain text, so it reads well in applicant tracking systems.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <PrintButton />
          {hasPdf && (
            <a
              href={site.assets.resumePdf}
              download
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 font-display text-sm font-semibold text-ink hover:border-line-strong"
            >
              <Download className="size-4" aria-hidden /> Download PDF
            </a>
          )}
        </div>
      </div>

      <article className="print-plain mx-auto max-w-[52rem] rounded-[var(--radius-card)] border border-line bg-white p-6 text-[0.95rem] leading-relaxed text-ink shadow-card sm:p-12">
        <header>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{site.name}</h1>
          <p className="mt-1 text-base font-semibold">{site.positioning}</p>
          <p className="mt-2 text-sm text-ink/80">
            {site.location.city}, {site.location.region}, {site.location.country}
            {contacts.map(([k, v]) => (
              <span key={k}> · {k === "linkedin" || k === "github" ? hostname(v!) + new URL(v!).pathname.replace(/\/$/, "") : v}</span>
            ))}
            {site.urlConfigured && <span> · {hostname(site.url)}</span>}
          </p>
        </header>

        <section className="mt-7 print-break-avoid">
          <H>Summary</H>
          <p className="mt-3">
            {experience[0].title} at {experience[0].organisation} since {monthYear(experience[0].start)}, with{" "}
            {site.experienceLabel} of relevant experience. I work across SEO and performance marketing, and I design,
            build (with AI assistance, mainly Claude), test and deploy websites, CRM systems, SaaS platforms and Android
            apps.
          </p>
        </section>

        <section className="mt-7">
          <H>Experience</H>
          {experience.map((e) => (
            <div key={e.organisation} className="mt-3 print-break-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-sans text-base font-bold tracking-normal">
                  {e.title}, {e.organisation}
                </h3>
                <p className="text-sm">
                  {monthYear(e.start)} – {e.end ? monthYear(e.end) : "Present"}
                </p>
              </div>
              <p className="text-sm text-ink/80">{e.location}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {e.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-7">
          <H>Selected projects</H>
          {PROJECT_CATEGORIES.filter((c) => c !== "SEO").map((cat) => {
            const list = projects.filter((p) => p.categories[0] === cat); // grouped by primary category
            if (!list.length) return null;
            return (
              <div key={cat} className="mt-3 print-break-avoid">
                <h3 className="font-sans text-sm font-bold tracking-normal">{cat}</h3>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {list.map((p) => (
                    <li key={p.slug}>
                      <strong>{p.title}</strong>: {p.summary} <span className="text-ink/70">({p.platform === "Android app" ? "Google Play" : hostname(p.url)})</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="mt-3 print-break-avoid">
            <h3 className="font-sans text-sm font-bold tracking-normal">SEO (tracked rankings, Ubersuggest, India desktop)</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {projects
                .filter((p) => p.seo?.seoRoleConfirmed)
                .map((p) => (
                  <li key={p.slug}>
                    <strong>{p.title}</strong>: average tracked position {p.seo!.averagePosition.from} → {p.seo!.averagePosition.to.toFixed(2)} across{" "}
                    {p.seo!.trackedKeywords} keywords ({p.seo!.period}); {p.seo!.movedUp} up, {p.seo!.movedDown} down, {p.seo!.top3} in top 3.
                  </li>
                ))}
            </ul>
          </div>
        </section>

        <section className="mt-7 print-break-avoid">
          <H>Skills</H>
          <p className="mt-3">
            <strong>Capabilities:</strong> {capabilities.map((c) => c.name).join(", ")}.
          </p>
          <p className="mt-1">
            <strong>Tools:</strong> {confirmedTools.join(", ")}.
          </p>
        </section>

        <section className="mt-7 print-break-avoid">
          <H>Education</H>
          <p className="mt-3">
            {education.qualification}
            {education.institution ? `, ${education.institution}` : ""}
            {education.year ? ` (${education.year})` : ""}
          </p>
        </section>
      </article>
    </div>
  );
}
