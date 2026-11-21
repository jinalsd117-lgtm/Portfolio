import Link from "next/link";
import { ArrowRight, ArrowUpRight, GraduationCap, MapPin, Smartphone } from "lucide-react";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { countByCategory, portfolioStats, projects } from "@/data/projects";
import { parekhSeo } from "@/data/seo";
import { BentoCard } from "@/components/bento/BentoCard";
import { CategoryBars } from "@/components/bento/CategoryBars";
import { ApproachLoop } from "@/components/bento/ApproachLoop";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { monthYear } from "@/lib/utils";

export function CareerOverview() {
  const job = experience[0];
  const apps = projects.filter((p) => p.platform === "Android app");

  return (
    <section aria-labelledby="overview-title" className="container-page py-16 lg:py-20">
      <Reveal>
        <SectionHeading
          id="overview-title"
          eyebrow="At a glance"
          title="Marketing know-how, with the ability to build."
          description="I sit between marketing and product: I can rank a page, and I can also design, build, test and ship the thing the page points to."
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12 lg:gap-5">
        {/* Role */}
        <Reveal className="md:col-span-6 lg:col-span-7">
          <BentoCard dark className="flex h-full flex-col justify-between gap-10 p-7 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">Current role</p>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300">
                {monthYear(job.start)} – Present
              </span>
            </div>
            <div>
              <h3 className="font-display text-3xl font-bold leading-tight sm:text-[2.6rem]">{job.title}</h3>
              <p className="mt-2 text-slate-300">
                at{" "}
                <a href={job.organisationUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                  {job.organisation}
                </a>
                , {site.location.city}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div>
                <p className="font-display text-3xl font-bold">{site.experienceLabel}</p>
                <p className="mt-1 text-xs text-slate-400">Relevant experience</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold">{job.start.slice(0, 4)}</p>
                <p className="mt-1 text-xs text-slate-400">Joined Raybotix Digital</p>
              </div>
              <Link href="/about" className="col-span-2 inline-flex items-center gap-1.5 self-end text-sm font-semibold text-white hover:text-blue-300 sm:col-span-1 sm:justify-self-end">
                About me <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </BentoCard>
        </Reveal>

        {/* Portfolio counts */}
        <Reveal className="md:col-span-6 lg:col-span-5" delay={0.05}>
          <BentoCard className="h-full">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium text-muted">Portfolio entries</p>
              <Link href="/projects" className="text-xs font-semibold text-accent hover:underline">
                See all
              </Link>
            </div>
            <p className="mt-2 font-display text-6xl font-extrabold tracking-tight text-ink">
              <Counter value={portfolioStats.entries} />
            </p>
            <p className="text-sm text-muted">across {portfolioStats.categories} categories. Pick one to filter:</p>
            <CategoryBars counts={countByCategory()} total={portfolioStats.entries} />
          </BentoCard>
        </Reveal>

        {/* SEO snapshot */}
        <Reveal className="md:col-span-3 lg:col-span-4" delay={0.05}>
          <BentoCard href="/projects/parekh-eye-clinic" label="Parekh Eye Clinic SEO case study" className="flex h-full flex-col">
            <p className="text-sm font-medium text-muted">Parekh Eye Clinic · tracked SEO</p>
            <p className="mt-4 font-display text-4xl font-extrabold tabular-nums tracking-tight text-ink">
              {parekhSeo.averagePosition.from}
              <span className="mx-2 text-accent">→</span>
              {parekhSeo.averagePosition.to.toFixed(2)}
            </p>
            <p className="mt-1 text-sm text-muted">Average tracked keyword position</p>
            <p className="mt-4 text-sm text-ink">
              <strong>{parekhSeo.movedUp}</strong> up · <strong>{parekhSeo.movedDown}</strong> down ·{" "}
              <strong>{parekhSeo.top3}</strong> in top 3
            </p>
            <p className="mt-auto pt-5 text-xs text-muted">
              {parekhSeo.trackedKeywords} keywords · {parekhSeo.period} · India desktop · Ubersuggest
            </p>
          </BentoCard>
        </Reveal>

        {/* Apps */}
        <Reveal className="md:col-span-3 lg:col-span-4" delay={0.1}>
          <BentoCard className="flex h-full flex-col">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted">Live on Google Play</p>
              <Smartphone className="size-5 text-accent" aria-hidden />
            </div>
            <p className="mt-4 font-display text-4xl font-extrabold text-ink">
              <Counter value={portfolioStats.androidApps} /> apps
            </p>
            <ul className="mt-4 space-y-1.5">
              {apps.map((a) => (
                <li key={a.slug}>
                  <Link href={`/projects/${a.slug}`} className="relative z-10 flex items-center justify-between rounded-lg py-1 text-sm text-ink hover:text-accent">
                    {a.title}
                    <ArrowUpRight className="size-4 opacity-50" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </BentoCard>
        </Reveal>

        {/* Disciplines */}
        <Reveal className="md:col-span-6 lg:col-span-4" delay={0.15}>
          <BentoCard className="flex h-full flex-col">
            <p className="text-sm font-medium text-muted">Where I work</p>
            <ul className="mt-4 flex flex-1 flex-col justify-between gap-3">
              {[
                ["Marketing", "SEO and performance marketing"],
                ["Technology", "Websites, CRM systems, SaaS and Android apps"],
                ["AI", "Claude-assisted design and development"],
              ].map(([k, v], i) => (
                <li key={k} className="flex items-start gap-3">
                  <span className="mt-0.5 font-display text-xs font-bold text-accent tabular-nums">×{i + 1}</span>
                  <span>
                    <span className="block font-display font-bold text-ink">{k}</span>
                    <span className="block text-sm text-muted">{v}</span>
                  </span>
                </li>
              ))}
            </ul>
          </BentoCard>
        </Reveal>

        {/* Approach */}
        <Reveal className="md:col-span-6 lg:col-span-8" delay={0.1}>
          <BentoCard className="h-full">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-bold text-ink">How a project gets done</h3>
              <p className="text-xs text-muted">I handle every stage myself, with AI as a tool.</p>
            </div>
            <ApproachLoop />
          </BentoCard>
        </Reveal>
        {/* Education + location */}
        <Reveal className="md:col-span-6 lg:col-span-4" delay={0.15}>
          <BentoCard className="flex h-full flex-col justify-center gap-8 bg-accent-soft! border-transparent!">
            <div className="flex items-start gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-white text-accent shadow-card">
                <GraduationCap className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-medium text-accent-strong/80">Education</p>
                <p className="font-display font-bold text-ink">{site.education}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-white text-accent shadow-card">
                <MapPin className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-medium text-accent-strong/80">Based in</p>
                <p className="font-display font-bold text-ink">
                  {site.location.city}, {site.location.region}
                </p>
                <p className="text-xs text-muted">{site.location.timezone}</p>
              </div>
            </div>
          </BentoCard>
        </Reveal>

      </div>
    </section>
  );
}
