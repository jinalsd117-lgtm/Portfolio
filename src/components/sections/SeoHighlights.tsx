import { getProject } from "@/data/projects";
import { SeoResult } from "@/components/projects/SeoResult";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SeoHighlights() {
  const parekh = getProject("parekh-eye-clinic")!;
  const grow = getProject("grow-children-hospital")!;
  return (
    <section aria-labelledby="seo-title" className="container-page py-16 lg:py-20">
      <Reveal>
        <SectionHeading
          id="seo-title"
          eyebrow="SEO results"
          title="Rankings, reported straight."
          description="Two rank-tracking snapshots from Ubersuggest, with the declines shown alongside the gains. These are keyword positions, not traffic, enquiries or revenue."
        />
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <SeoResult seo={parekh.seo!} title={parekh.title} href={`/projects/${parekh.slug}`} />
        </Reveal>
        <Reveal delay={0.08}>
          <SeoResult seo={grow.seo!} title={grow.title} href={`/projects/${grow.slug}`} />
        </Reveal>
      </div>
    </section>
  );
}
