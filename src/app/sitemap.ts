import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.contentUpdated);
  const pages = ["", "/projects", "/expertise", "/about", "/resume", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const caseStudies = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.7 : 0.6,
  }));
  return [...pages, ...caseStudies];
}
