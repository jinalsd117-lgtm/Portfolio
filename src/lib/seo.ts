import type { Metadata } from "next";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { capabilities } from "@/data/skills";
import type { Project } from "@/lib/types";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  const desc = description ?? site.description;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: title ? `${title} · ${site.name}` : `${site.name} · ${site.positioning}`,
      description: desc,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} · ${site.name}` : site.name,
      description: desc,
    },
  };
}

/** Person + WebSite structured data, used once in the root layout. */
export function personJsonLd() {
  const job = experience[0];
  const sameAs = [site.contact.linkedin, site.contact.github].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        url: site.url,
        jobTitle: job.title,
        description: site.description,
        worksFor: { "@type": "Organization", name: job.organisation, url: job.organisationUrl },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressRegion: site.location.region,
          addressCountry: site.location.countryCode,
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "diploma",
          name: site.education,
        },
        knowsAbout: capabilities.map((c) => c.name),
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: `${site.name} — Portfolio`,
        inLanguage: "en-IN",
        publisher: { "@id": `${site.url}/#person` },
      },
    ],
  };
}

export function projectJsonLd(project: Project) {
  const pageUrl = `${site.url}/projects/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#work`,
        name: project.title,
        headline: `${project.title} — case study`,
        description: project.summary,
        url: pageUrl,
        about: project.url,
        genre: project.categories.join(", "),
        creator: { "@id": `${site.url}/#person` },
        ...(project.images[0] ? { image: `${site.url}${project.images[0].src}` } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${site.url}/projects` },
          { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
        ],
      },
    ],
  };
}
