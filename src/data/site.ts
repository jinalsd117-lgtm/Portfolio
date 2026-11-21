/**
 * Site-wide settings and personal details.
 *
 * ▸ Contact channels set to `null` are hidden on the site until you fill them in. Do NOT use Raybotix Digital company
 *   contact details here — these must be Jinal's personal channels.
 */

export const site = {
  name: "Jinal Dodiya",
  initials: "JD",
  role: "Digital Marketing Manager",
  positioning: "Digital Marketing Manager & AI-Assisted Digital Solutions Builder",
  location: {
    city: "Ahmedabad",
    region: "Gujarat",
    country: "India",
    countryCode: "IN",
    timezone: "IST (UTC+5:30)",
  },
  employer: {
    name: "Raybotix Digital",
    url: "https://raybotixdigital.com/",
  },
  education: "Diploma in Computer Engineering",
  /** Self-reported. Employment dates are kept separately in experience.ts. */
  experienceLabel: "4+ years",

  /** Set NEXT_PUBLIC_SITE_URL in production (e.g. https://jinaldodiya.com). */
  // On Vercel this falls back to the project's production domain automatically.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
  ).replace(/\/$/, ""),
  urlConfigured: Boolean(process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL),

  /** Used in sitemap lastModified. Update when content changes. */
  contentUpdated: "2026-11-21",

  description:
    "Jinal Dodiya is a Digital Marketing Manager and AI-assisted digital solutions builder in Ahmedabad, India, working across websites, CRM systems, SaaS platforms, mobile apps, SEO and performance marketing.",

  hero: {
    eyebrow: "Marketing × Technology × AI",
    title: "I Build Digital Products That Solve Real Business Problems.",
    description:
      "I'm Jinal Dodiya, a Digital Marketing Manager and AI-assisted digital solutions builder based in Ahmedabad, India. I work across websites, CRM systems, SaaS platforms, mobile applications, SEO and performance marketing.",
  },

  /** Personal contact channels — EDIT THESE. `null` renders as a "To be added" placeholder. */
  contact: {
    email: "jinalsd117@gmail.com" as string | null,
    phone: "+91 99981 24401" as string | null,
    whatsapp: null as string | null, // digits only with country code, e.g. "919998124401" — add if this number is on WhatsApp
    linkedin: "https://www.linkedin.com/in/jinal-dodiya-bb40aa145" as string | null,
    github: null as string | null, // full URL
  },

  /** Drop the files at these paths and the UI picks them up automatically. */
  assets: {
    photo: "/profile/jinal-photo.webp",
    resumePdf: "/resume/jinal-dodiya-resume.pdf",
  },

  nav: [
    { href: "/projects", label: "Projects" },
    { href: "/expertise", label: "Expertise" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
  ],
} as const;

export type ContactKey = keyof typeof site.contact;

export const contactLabels: Record<ContactKey, string> = {
  email: "Email",
  phone: "Phone",
  whatsapp: "WhatsApp",
  linkedin: "LinkedIn",
  github: "GitHub",
};

export function contactHref(key: ContactKey, value: string): string {
  switch (key) {
    case "email":
      return `mailto:${value}`;
    case "phone":
      return `tel:${value.replace(/\s+/g, "")}`;
    case "whatsapp":
      return `https://wa.me/${value.replace(/\D/g, "")}`;
    default:
      return value;
  }
}
