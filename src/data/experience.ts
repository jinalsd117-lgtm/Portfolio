import type { ExperienceEntry, TimelineEntry } from "@/lib/types";
import { parekhSeo } from "./seo";

/**
 * Employment history. Keep dates exact.
 * Responsibilities mirror the areas Jinal has confirmed — edit freely, but
 * don't add team sizes, leadership claims or figures that can't be backed up.
 */
export const experience: ExperienceEntry[] = [
  {
    organisation: "Raybotix Digital",
    organisationUrl: "https://raybotixdigital.com/",
    title: "Digital Marketing Manager",
    location: "Ahmedabad, Gujarat, India",
    start: "2022-12-01", // December 2022 (day not specified; only month + year are shown)
    end: null,
    summary:
      "Working across digital marketing and digital product delivery: SEO, performance marketing, websites, internal business systems, SaaS products and Android apps.",
    responsibilities: [
      "SEO work for client websites, including location-focused content and keyword rank tracking.",
      "Performance marketing.",
      "Website design and development, including WordPress and AI-assisted builds.",
      "Designing and building CRM and internal workflow systems with AI assistance.",
      "Designing and building SaaS products and Android apps with AI assistance.",
      "Testing and deploying the products and sites I build.",
      "Basic video editing and graphic design.",
    ],
  },
];

export const education = {
  qualification: "Diploma in Computer Engineering",
  institution: null as string | null, // add if you want it shown
  year: null as string | null, // add if you want it shown
};

/** Home-page career timeline. Only dated facts get a date. */
export const timeline: TimelineEntry[] = [
  {
    id: "education",
    date: "",
    dateLabel: "Education",
    title: "Diploma in Computer Engineering",
    body: "The technical foundation behind the build side of my work.",
    detail: ["Institution and year can be added in src/data/experience.ts."],
    pending: true,
  },
  {
    id: "raybotix",
    date: "2022-12-01",
    dateLabel: "Dec 2022",
    title: "Joined Raybotix Digital",
    body: "Started at the Ahmedabad agency where I now work as Digital Marketing Manager.",
    detail: [
      "Current areas: SEO, performance marketing, websites, CRM systems, SaaS products and Android apps.",
      "Product work is designed, built, tested and deployed by me with AI assistance.",
    ],
    href: "/about",
    hrefLabel: "Read about my work",
  },
  {
    id: "seo-tracking",
    date: "2026-10-31",
    dateLabel: "Aug – Oct 2026",
    title: "Parekh Eye Clinic rankings tracked",
    body: `Average tracked keyword position went from ${parekhSeo.averagePosition.from} to ${parekhSeo.averagePosition.to.toFixed(2)} across ${parekhSeo.trackedKeywords} keywords (Ubersuggest, India desktop).`,
    detail: [
      `${parekhSeo.movedUp} keywords moved up, ${parekhSeo.movedDown} moved down, ${parekhSeo.top3} reached the top 3.`,
      "These are tracked rankings, not traffic or enquiries.",
    ],
    href: "/projects/parekh-eye-clinic",
    hrefLabel: "View case study",
  },
  {
    id: "today",
    date: "2026-11-21",
    dateLabel: "Present",
    title: "13 deliverables across five categories",
    body: "Websites, CRM & ERP systems, SaaS platforms, Android apps and SEO, designed, built, tested and deployed with AI assistance.",
    detail: ["Open to full-time roles and freelance projects."],
    href: "/projects",
    hrefLabel: "Browse all projects",
  },
];
