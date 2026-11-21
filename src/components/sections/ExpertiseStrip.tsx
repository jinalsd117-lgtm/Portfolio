import Link from "next/link";
import { ArrowRight, BadgeCheck, CircleDashed } from "lucide-react";
import { capabilities, tools } from "@/data/skills";
import { BentoCard } from "@/components/bento/BentoCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const groups = ["Marketing", "Build", "AI & delivery", "Creative"] as const;

export function ExpertiseStrip() {
  const confirmed = tools.filter((t) => t.status !== "awaiting-confirmation");
  return (
    <section aria-labelledby="expertise-title" className="container-page py-16 lg:py-20">
      <Reveal>
        <SectionHeading
          id="expertise-title"
          eyebrow="Technology & expertise"
          title="What I work with"
          description="Confirmed tools are listed separately from capabilities. Nothing here is a self-rated skill bar."
          action={
            <Link href="/expertise" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent">
              Full breakdown <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />
      </Reveal>
      <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-5">
        <Reveal className="lg:col-span-4">
          <BentoCard dark className="h-full">
            <p className="text-sm font-medium text-slate-300">Tools</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {confirmed.map((t) => (
                <li key={t.name} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm">
                  <BadgeCheck className="size-4 text-blue-300" aria-hidden />
                  {t.name}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-slate-400">
              <CircleDashed className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              Ubersuggest is evidenced by the supplied reports. Other tools are still awaiting confirmation and are listed
              on the expertise page.
            </p>
          </BentoCard>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={0.06}>
          <BentoCard className="h-full">
            <div className="grid gap-6 sm:grid-cols-2">
              {groups.map((g) => (
                <div key={g}>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{g}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {capabilities
                      .filter((c) => c.group === g)
                      .map((c) => (
                        <li key={c.name} className="rounded-full border border-line bg-canvas px-3 py-1.5 text-sm font-medium text-ink">
                          {c.name}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </BentoCard>
        </Reveal>
      </div>
    </section>
  );
}
