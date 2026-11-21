/**
 * Shared validation for the contact form (client) and /api/contact (server).
 */

export type InquiryType = "job" | "project";

export const PROJECT_TYPES = [
  "Business website",
  "SEO",
  "Performance marketing",
  "CRM / internal tool",
  "SaaS / web app",
  "Android app",
  "Something else",
] as const;

export interface InquiryPayload {
  type: InquiryType;
  name: string;
  email: string;
  company: string;
  role: string; // job: role title
  link: string; // job: job post URL (optional)
  projectType: string; // project
  budget: string; // project (optional)
  timeline: string; // project (optional)
  message: string;
  website: string; // honeypot — must stay empty
}

export type FieldErrors = Partial<Record<keyof InquiryPayload, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS: Partial<Record<keyof InquiryPayload, number>> = {
  name: 100,
  email: 200,
  company: 150,
  role: 150,
  link: 500,
  projectType: 60,
  budget: 100,
  timeline: 100,
  message: 4000,
};

export function emptyPayload(type: InquiryType): InquiryPayload {
  return { type, name: "", email: "", company: "", role: "", link: "", projectType: "", budget: "", timeline: "", message: "", website: "" };
}

/** Trims every field and drops unknown keys. */
export function normalise(input: unknown): InquiryPayload | null {
  if (!input || typeof input !== "object") return null;
  const o = input as Record<string, unknown>;
  const type = o.type === "job" || o.type === "project" ? o.type : null;
  if (!type) return null;
  const base = emptyPayload(type);
  for (const key of Object.keys(base) as (keyof InquiryPayload)[]) {
    if (key === "type") continue;
    const v = o[key];
    (base[key] as string) = typeof v === "string" ? v.trim() : "";
  }
  return base;
}

export function validate(p: InquiryPayload): FieldErrors {
  const e: FieldErrors = {};
  if (p.name.length < 2) e.name = "Please enter your name.";
  if (!EMAIL.test(p.email)) e.email = "Please enter a valid email address.";
  if (p.type === "job" && p.company.length < 2) e.company = "Please enter the company name.";
  if (p.type === "project" && !p.projectType) e.projectType = "Please choose what you need.";
  if (p.link) {
    try {
      const u = new URL(p.link);
      if (!/^https?:$/.test(u.protocol)) throw new Error();
    } catch {
      e.link = "Please enter a full link starting with https://";
    }
  }
  if (p.message.length < 20) e.message = "Please write at least 20 characters so I can reply properly.";
  for (const [k, max] of Object.entries(LIMITS) as [keyof InquiryPayload, number][]) {
    if ((p[k] as string).length > max && !e[k]) e[k] = `Please keep this under ${max} characters.`;
  }
  return e;
}
