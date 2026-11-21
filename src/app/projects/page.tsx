import { projects, portfolioStats } from "@/data/projects";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description: `All ${projects.length} portfolio entries by Jinal Dodiya: business websites, CRM & ERP systems, SaaS platforms, Android apps and SEO case studies.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="container-page pb-8 pt-10 sm:pt-16">
      <SectionHeading
        as="h1"
        eyebrow="Projects"
        title="Everything I've built and ranked."
        description={`${portfolioStats.entries} entries: ${portfolioStats.websites} website projects, ${portfolioStats.internalSystems} internal business systems, SaaS platforms, ${portfolioStats.androidApps} Android apps and ${portfolioStats.seoCaseStudies} tracked SEO case studies. Each one links to the live product and a case study.`}
      />
      <div className="mt-10">
        <ProjectFilter projects={projects} />
      </div>
    </div>
  );
}
