/**
 * Content types for the portfolio.
 * Every project, skill and timeline entry is typed so new content can be
 * added without touching components. See CONTENT_GUIDE.md.
 */

export const PROJECT_CATEGORIES = [
  "Websites",
  "CRM & ERP",
  "SaaS",
  "Mobile Apps",
  "SEO",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Platform = "Website" | "Web platform" | "Web app" | "Internal system" | "Android app";

export interface ProjectImage {
  /** Path inside /public, e.g. "/projects/rayspur/cover.webp" */
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * cover     – top-of-page capture used on cards
   * full-page – tall capture shown in a scrollable frame
   * panel     – partial capture (e.g. the public half of a sign-in screen)
   */
  kind: "cover" | "full-page" | "panel";
  caption: string;
}

export interface SeoKeywordExample {
  keyword: string;
  position: number;
}

export interface SeoCaseStudy {
  tool: string;
  reportDate: string; // ISO date the report was generated
  period: string;
  market: string;
  trackedKeywords: number;
  averagePosition: { from: number; to: number };
  movedUp: number;
  movedDown: number;
  top3: number;
  notRanked?: number;
  examples: SeoKeywordExample[];
  /** How the figures relate to Jinal's work. Shown next to the numbers. */
  attribution: string;
  /** Whether Jinal's direct SEO responsibility for this site is confirmed. */
  seoRoleConfirmed: boolean;
  limitations: string[];
}

export interface FeatureList {
  items: string[];
  /** Where these features were verified, e.g. "Supplied screenshot of the live site (21 Nov 2026)". */
  source: string;
}

export interface Project {
  slug: string;
  title: string;
  url: string;
  linkLabel: string;
  categories: ProjectCategory[];
  industry: string | null;
  platform: Platform;
  summary: string;
  /** Exactly as confirmed by Jinal. */
  contribution: string;
  /** Short bullet list derived from the contribution line. */
  roles: string[];
  context: string;
  challenge: string | null;
  approach: string[];
  features: FeatureList | null;
  /** Only confirmed technologies. Leave empty until confirmed — the section is hidden when empty. */
  stack: string[];
  images: ProjectImage[];
  testing: string;
  seo?: SeoCaseStudy;
  relatedSlugs: string[];
  featured: boolean;
  /** Optional product grouping (e.g. EventVexa web + Android). */
  productGroup?: { name: string; note: string };
  /** Shown on internal systems to explain what is (and isn't) shown. */
  privacyNote?: string;
  /** Accent used for placeholders and small UI touches. */
  tone: "blue" | "ink" | "slate" | "sky";
}

export interface ExperienceEntry {
  organisation: string;
  organisationUrl: string;
  title: string;
  location: string;
  start: string; // ISO
  end: string | null; // null = present
  summary: string;
  responsibilities: string[];
}

export interface TimelineEntry {
  id: string;
  date: string;
  dateLabel: string;
  title: string;
  body: string;
  detail: string[];
  href?: string;
  hrefLabel?: string;
  pending?: boolean;
}

export interface Capability {
  name: string;
  group: "Marketing" | "Build" | "AI & delivery" | "Creative";
  description: string;
  /** How the work is actually done — keeps claims honest about AI assistance. */
  howIWork: string;
  evidence: string[]; // project slugs
}

export interface Tool {
  name: string;
  status: "confirmed" | "evidenced" | "awaiting-confirmation";
  note: string;
}

export interface Service {
  title: string;
  description: string;
  deliverables: string[];
  evidence: string[];
  icon: "globe" | "search" | "megaphone" | "workflow" | "smartphone" | "palette";
}
