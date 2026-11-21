import Link from "next/link";
import { ArrowUpRight, Briefcase, Rocket } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function CtaPair() {
  return (
    <section aria-label="Get in touch" className="container-page py-16 lg:py-20">
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        <Reveal>
          <Link
            href="/contact?type=job"
            className="group relative flex h-full min-h-[18rem] flex-col justify-between overflow-hidden rounded-[var(--radius-card-lg)] bg-ink p-8 text-white shadow-float transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 sm:p-10"
          >
            <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(circle,rgb(37_99_235/0.45),transparent_65%)]" />
            <span className="relative grid size-12 place-items-center rounded-2xl bg-white/10">
              <Briefcase className="size-5" aria-hidden />
            </span>
            <div className="relative">
              <p className="text-sm font-medium text-blue-300">For recruiters & hiring managers</p>
              <p className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">Hiring for a role?</p>
              <p className="mt-3 max-w-md text-slate-300">
                Digital marketing, SEO or a hybrid role that also needs someone who can build.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-display text-sm font-semibold text-ink">
                Job opportunities
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </Link>
        </Reveal>
        <Reveal delay={0.08}>
          <Link
            href="/contact?type=project"
            className="group relative flex h-full min-h-[18rem] flex-col justify-between overflow-hidden rounded-[var(--radius-card-lg)] border border-[#d6e4ff] bg-accent-soft p-8 text-ink transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 sm:p-10"
          >
            <div aria-hidden className="absolute inset-0 dot-grid opacity-60 [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
            <span className="relative grid size-12 place-items-center rounded-2xl bg-white text-accent shadow-card">
              <Rocket className="size-5" aria-hidden />
            </span>
            <div className="relative">
              <p className="text-sm font-medium text-accent-strong">For businesses & founders</p>
              <p className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">Need something built or ranked?</p>
              <p className="mt-3 max-w-md text-muted">Websites, SEO, internal tools, SaaS products and Android apps.</p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-display text-sm font-semibold text-white">
                Start a project
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
