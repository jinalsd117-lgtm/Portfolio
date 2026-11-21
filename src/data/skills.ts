import type { Capability, Service, Tool } from "@/lib/types";

/**
 * Capabilities — what Jinal does, how, and which projects show it.
 * No skill bars or percentages: evidence is the linked work.
 */
export const capabilities: Capability[] = [
  {
    name: "SEO",
    group: "Marketing",
    description: "Service pages, location-focused content and keyword rank tracking.",
    howIWork: "Hands-on SEO work on client sites, with results tracked in Ubersuggest and reported as rankings only.",
    evidence: ["parekh-eye-clinic", "raybotix-digital"],
  },
  {
    name: "Performance Marketing",
    group: "Marketing",
    description: "Paid campaigns as part of my Digital Marketing Manager role.",
    howIWork: "Part of my day-to-day role at Raybotix Digital. Campaign case studies will be added once results are cleared for sharing.",
    evidence: [],
  },
  {
    name: "WordPress",
    group: "Build",
    description: "Business websites and content-managed pages.",
    howIWork: "One of the tools I use to build websites.",
    evidence: [],
  },
  {
    name: "React",
    group: "Build",
    description: "Interactive interfaces for web products.",
    howIWork: "Used in AI-assisted builds: I direct the work, review the output and test it.",
    evidence: [],
  },
  {
    name: "JavaScript",
    group: "Build",
    description: "The language behind most of the web work.",
    howIWork: "Used across web builds, alongside AI tools.",
    evidence: [],
  },
  {
    name: "Claude AI",
    group: "AI & delivery",
    description: "My main AI tool for design and development work.",
    howIWork: "I use Claude to generate and refine code and content, then review, test and deploy the result myself.",
    evidence: ["rayspur", "raycollab", "eventvexa-web"],
  },
  {
    name: "AI-assisted CRM Development",
    group: "Build",
    description: "Internal systems for tasks, sales, stock and billing.",
    howIWork: "Designed and built with AI assistance, then tested and deployed by me.",
    evidence: ["megatronix-robusto-crm", "raybotix-task-workflow"],
  },
  {
    name: "SaaS Development",
    group: "Build",
    description: "Multi-user web products for marketing, events and creator collaborations.",
    howIWork: "AI-assisted product design and development, with testing and deployment handled by me.",
    evidence: ["rayspur", "raycollab", "eventvexa-web"],
  },
  {
    name: "App UI Design",
    group: "Build",
    description: "Screens and flows for Android apps.",
    howIWork: "Designed with AI assistance, then built, tested and released on Google Play.",
    evidence: ["eventvexa-android", "sage-voice-ai-assistant", "rayfuel"],
  },
  {
    name: "Testing and Deployment",
    group: "AI & delivery",
    description: "Checking that builds work, then putting them live.",
    howIWork: "I test and deploy every project in this portfolio myself.",
    evidence: ["megatronix-vision", "grow-children-hospital", "eventvexa-android"],
  },
  {
    name: "Basic Creative Production",
    group: "Creative",
    description: "Basic video editing and graphic design.",
    howIWork: "Supporting marketing work with simple edits and graphics.",
    evidence: [],
  },
];

/**
 * Tools.
 *  confirmed              – confirmed by Jinal
 *  evidenced              – shown by supplied material
 *  awaiting-confirmation  – likely but NOT confirmed; hidden from the resume
 */
export const tools: Tool[] = [
  { name: "WordPress", status: "confirmed", note: "Confirmed tool" },
  { name: "React", status: "confirmed", note: "Confirmed tool" },
  { name: "JavaScript", status: "confirmed", note: "Confirmed tool" },
  { name: "Claude AI", status: "confirmed", note: "Main AI tool for design and development" },
  { name: "Ubersuggest", status: "evidenced", note: "Source of the supplied ranking reports" },
  { name: "Google Play Console", status: "awaiting-confirmation", note: "Three apps are live on Google Play — confirm the publishing tool" },
  { name: "Google Search Console", status: "awaiting-confirmation", note: "Not yet confirmed" },
  { name: "Google Analytics", status: "awaiting-confirmation", note: "Not yet confirmed" },
  { name: "Google Ads", status: "awaiting-confirmation", note: "Not yet confirmed" },
  { name: "Meta Ads Manager", status: "awaiting-confirmation", note: "Not yet confirmed" },
  { name: "Figma", status: "awaiting-confirmation", note: "Not yet confirmed" },
  { name: "Canva", status: "awaiting-confirmation", note: "Not yet confirmed" },
  { name: "Video editing software", status: "awaiting-confirmation", note: "Name the tool to confirm" },
  { name: "Emergent", status: "awaiting-confirmation", note: "Suggested by the apps' package IDs — confirm" },
];

/** Freelance services — each linked to evidence in the portfolio. */
export const services: Service[] = [
  {
    title: "Business websites",
    description: "Designed, built, tested and launched for you, from the first page plan to going live.",
    deliverables: ["Page structure and design", "AI-assisted build (WordPress or React)", "Testing and deployment"],
    evidence: ["megatronix-vision", "grow-children-hospital"],
    icon: "globe",
  },
  {
    title: "Local SEO",
    description: "Service pages and location-focused content, with keyword rankings tracked and reported honestly.",
    deliverables: ["Service and location pages", "On-page SEO", "Rank-tracking reports"],
    evidence: ["parekh-eye-clinic"],
    icon: "search",
  },
  {
    title: "Performance marketing",
    description: "Paid campaigns run alongside SEO and the website, so all three point at the same goal.",
    deliverables: ["Campaign planning", "Landing page alignment", "Reporting"],
    evidence: [],
    icon: "megaphone",
  },
  {
    title: "CRM & internal tools",
    description: "Simple internal systems for tasks, leads, stock or billing, built around how your team already works.",
    deliverables: ["Workflow mapping", "AI-assisted build", "Testing and rollout"],
    evidence: ["megatronix-robusto-crm", "raybotix-task-workflow"],
    icon: "workflow",
  },
  {
    title: "SaaS & app builds",
    description: "Web platforms and Android apps taken from idea to a published release.",
    deliverables: ["Product and UI design", "AI-assisted development", "Play Store / web deployment"],
    evidence: ["rayspur", "eventvexa-android"],
    icon: "smartphone",
  },
  {
    title: "Basic creative",
    description: "Simple graphics and video edits to support campaigns and launches.",
    deliverables: ["Social graphics", "Basic video edits"],
    evidence: [],
    icon: "palette",
  },
];
