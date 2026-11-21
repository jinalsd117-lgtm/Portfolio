import { Hero } from "@/components/sections/Hero";
import { CareerOverview } from "@/components/sections/CareerOverview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { SeoHighlights } from "@/components/sections/SeoHighlights";
import { ExpertiseStrip } from "@/components/sections/ExpertiseStrip";
import { CareerTimeline } from "@/components/sections/CareerTimeline";
import { Services } from "@/components/sections/Services";
import { CtaPair } from "@/components/sections/CtaPair";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timeline } from "@/data/experience";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CareerOverview />
      <FeaturedProjects />
      <SeoHighlights />
      <ExpertiseStrip />
      <section aria-labelledby="timeline-title" className="container-page py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              id="timeline-title"
              eyebrow="Career timeline"
              title="How I got here"
              description="Only dated facts get a date. Open an entry for detail."
            />
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.06}>
            <CareerTimeline entries={timeline} />
          </Reveal>
        </div>
      </section>
      <Services />
      <CtaPair />
    </>
  );
}
