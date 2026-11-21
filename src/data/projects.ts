import type { Project, ProjectCategory } from "@/lib/types";
import { PROJECT_CATEGORIES } from "@/lib/types";
import { growSeo, parekhSeo } from "./seo";

/**
 * PROJECT DATABASE — 13 portfolio entries.
 *
 * Rules (from the brief):
 *  - No invented screenshots, metrics, stacks, integrations or testimonials.
 *  - `features` only lists what a supplied source shows; `source` says which.
 *  - `stack` stays empty until a technology is confirmed for that project.
 *  - Internal systems show only their public sign-in screen — never private data.
 *  - EventVexa Web + EventVexa Android are one product with two deliverables.
 */

const SCREENSHOT_SOURCE = "Screenshot of the live site supplied in November 2026";

const standardApproach = [
  "Planned the page structure and user journeys around what the business needs visitors to do.",
  "Designed the interface, then built it with AI assistance (Claude and other AI tools), reviewing and adjusting the output at each step.",
  "Tested the build before launch.",
  "Handled deployment and put the site live.",
];

const productApproach = [
  "Mapped the main user flows and screens for the product.",
  "Designed the interface and built it with AI assistance (Claude and other AI tools), reviewing and refining the output.",
  "Tested the product before release.",
  "Handled deployment of the release.",
];

export const projects: Project[] = [
  {
    slug: "raybotix-digital",
    title: "Raybotix Digital",
    url: "https://raybotixdigital.com/",
    linkLabel: "Visit website",
    categories: ["Websites"],
    industry: "Digital Marketing",
    platform: "Website",
    summary: "Website design and SEO for a digital marketing agency.",
    contribution: "Website design, SEO, AI-assisted implementation, testing and deployment.",
    roles: ["Website design", "SEO", "AI-assisted implementation", "Testing", "Deployment"],
    context:
      "Raybotix Digital is the Ahmedabad digital marketing agency where Jinal works. Its website is the agency's main place to explain its services and turn visitors into enquiries.",
    challenge:
      "Present a wide range of marketing and technology services on one site without overwhelming visitors, while keeping the pages search-friendly.",
    approach: [
      "Organised the services into clear sections with direct calls to action.",
      "Designed the layout and built it with AI assistance, reviewing and refining the output.",
      "Applied on-page SEO as part of the build.",
      "Tested the site and handled deployment.",
    ],
    features: {
      source: SCREENSHOT_SOURCE,
      items: [
        "Hero with two calls to action (growth audit and strategy call)",
        "Goal-based entry points (more leads, better rankings, more sales, a new website, an app, automation)",
        "Overview of seven services, from SEO and social media to custom app development and AI automation",
        "Client logo section, a four-step process (Audit, Plan, Ship, Scale) and a location section",
        "FAQ section and a closing contact section with phone and WhatsApp options",
      ],
    },
    stack: [],
    images: [
      {
        src: "/projects/raybotix-digital/cover.webp",
        alt: "Raybotix Digital homepage hero with the headline 'Digital Marketing Company in Ahmedabad'",
        width: 1079,
        height: 674,
        kind: "cover",
        caption: "Homepage, top of page.",
      },
      {
        src: "/projects/raybotix-digital/full-page.webp",
        alt: "Full-length capture of the Raybotix Digital homepage",
        width: 1000,
        height: 7414,
        kind: "full-page",
        caption: "Full homepage. Scroll inside the frame.",
      },
    ],
    testing: "Tested and deployed by Jinal as part of the build.",
    relatedSlugs: ["raybotix-task-workflow", "parekh-eye-clinic"],
    featured: false,
    tone: "ink",
  },
  {
    slug: "megatronix-vision",
    title: "Megatronix Vision",
    url: "https://www.megatronixvision.com/",
    linkLabel: "Visit website",
    categories: ["Websites"],
    industry: "Drone Technology",
    platform: "Website",
    summary: "Business website for drone surveying, mapping, equipment and related services.",
    contribution: "Website development, AI-assisted implementation, testing and deployment.",
    roles: ["Website development", "AI-assisted implementation", "Testing", "Deployment"],
    context:
      "Megatronix Vision offers drone surveying and mapping services alongside survey equipment. The website needed to cover both services and products for a technical audience.",
    challenge:
      "Explain technical services (mapping, LiDAR, inspections) and an equipment catalogue in a way buyers can scan quickly.",
    approach: standardApproach,
    features: {
      source: SCREENSHOT_SOURCE,
      items: [
        "Service navigator covering drone survey and mapping, GIS, LiDAR, construction monitoring, inspections, surveillance, training and equipment",
        "Applications gallery (mining, corridor, agriculture, construction, solar site and land surveys)",
        "Product section for survey drones and GNSS receivers",
        "Technology and capabilities overview, plus a five-step project process",
        "Compliance section, FAQ and a consultation/quote call to action",
      ],
    },
    stack: [],
    images: [
      {
        src: "/projects/megatronix-vision/cover.webp",
        alt: "Megatronix Vision homepage hero: 'See more. Measure better. Decide smarter.'",
        width: 1529,
        height: 955,
        kind: "cover",
        caption: "Homepage, top of page.",
      },
      {
        src: "/projects/megatronix-vision/full-page.webp",
        alt: "Full-length capture of the Megatronix Vision homepage",
        width: 1000,
        height: 5232,
        kind: "full-page",
        caption: "Full homepage. Scroll inside the frame.",
      },
    ],
    testing: "Tested and deployed by Jinal as part of the build.",
    relatedSlugs: ["megatronix-robusto-crm", "robusto-cases"],
    featured: true,
    tone: "ink",
  },
  {
    slug: "grow-children-hospital",
    title: "GROW Children Hospital",
    url: "https://growchildrenhospital.com/",
    linkLabel: "Visit website",
    categories: ["Websites", "SEO"],
    industry: "Healthcare",
    platform: "Website",
    summary: "Pediatric healthcare website with services, doctor information and SEO tracking.",
    contribution: "AI-assisted website design, development, testing and deployment.",
    roles: ["AI-assisted design", "Development", "Testing", "Deployment"],
    context:
      "GROW Children Hospital is a pediatric hospital in Ahmedabad. Parents need to find the right service, the right doctor and a way to book quickly.",
    challenge:
      "Organise a large set of pediatric services and doctor information so worried parents can find what they need fast.",
    approach: standardApproach,
    features: {
      source: SCREENSHOT_SOURCE,
      items: [
        "Appointment and call buttons from the first screen",
        "Quick care finder for common concerns",
        "Doctor profiles with qualifications",
        "Age-stage guide from newborn to adolescent",
        "Pediatric services grid, vaccination journey and a symptom-based guide",
        "Two clinic locations with maps, a parenting blog and an FAQ",
      ],
    },
    stack: [],
    images: [
      {
        src: "/projects/grow-children-hospital/cover.webp",
        alt: "GROW Children Hospital homepage hero: 'Helping Little Ones GROW Healthy & Happy'",
        width: 898,
        height: 561,
        kind: "cover",
        caption: "Homepage, top of page.",
      },
      {
        src: "/projects/grow-children-hospital/full-page.webp",
        alt: "Full-length capture of the GROW Children Hospital homepage",
        width: 898,
        height: 8000,
        kind: "full-page",
        caption: "Full homepage. Scroll inside the frame.",
      },
    ],
    testing: "Tested and deployed by Jinal as part of the build.",
    seo: growSeo,
    relatedSlugs: ["parekh-eye-clinic", "robusto-cases"],
    featured: false,
    tone: "sky",
  },
  {
    slug: "robusto-cases",
    title: "Robusto Cases",
    url: "https://robustocases.com/",
    linkLabel: "Visit website",
    categories: ["Websites"],
    industry: "Protective Equipment",
    platform: "Website",
    summary: "Product-oriented business website for hard cases and protective foam solutions.",
    contribution: "AI-assisted design, development, testing and deployment.",
    roles: ["AI-assisted design", "Development", "Testing", "Deployment"],
    context:
      "Robusto Cases sells hard cases and protective foam solutions. The website is built around presenting the product range.",
    challenge: null,
    approach: standardApproach,
    features: null,
    stack: [],
    images: [],
    testing: "Tested and deployed by Jinal as part of the build.",
    relatedSlugs: ["megatronix-robusto-crm", "megatronix-vision"],
    featured: false,
    tone: "slate",
  },
  {
    slug: "parekh-eye-clinic",
    title: "Parekh Eye Clinic",
    url: "https://parekheyeclinic.com/",
    linkLabel: "Visit website",
    categories: ["Websites", "SEO"],
    industry: "Healthcare",
    platform: "Website",
    summary: "Ophthalmology website with service pages and location-focused SEO content.",
    contribution: "Website design, AI-assisted development, testing, deployment and SEO work.",
    roles: ["Website design", "AI-assisted development", "Testing", "Deployment", "SEO"],
    context:
      "Parekh Eye Clinic is an ophthalmology practice. Patients usually search by treatment and by area, so the site needed service pages and content that match local searches.",
    challenge:
      "Help the clinic appear for local eye-care searches in its area, not just for its own name.",
    approach: [
      "Designed the site around individual service pages.",
      "Built it with AI assistance, reviewing and refining the output.",
      "Wrote and structured location-focused SEO content.",
      "Tested and deployed the site; keyword rankings were then tracked in Ubersuggest.",
    ],
    features: {
      source: "Project brief",
      items: ["Dedicated service pages", "Location-focused SEO content"],
    },
    stack: [],
    images: [],
    testing: "Tested and deployed by Jinal as part of the build.",
    seo: parekhSeo,
    relatedSlugs: ["grow-children-hospital", "raybotix-digital"],
    featured: true,
    tone: "sky",
  },
  {
    slug: "eventvexa-web",
    title: "EventVexa Web Platform",
    url: "https://eventvexa.com/",
    linkLabel: "Visit platform",
    categories: ["Websites", "SaaS"],
    industry: "Event Technology",
    platform: "Web platform",
    summary: "Event discovery, booking and management platform.",
    contribution: "AI-assisted design, development, testing and deployment.",
    roles: ["AI-assisted design", "Development", "Testing", "Deployment"],
    context:
      "EventVexa serves two groups: people looking for events to attend, and organisers who create and sell tickets. The web platform is one of two EventVexa deliverables; the other is the Android app.",
    challenge:
      "Serve attendees and organisers in one product without either journey getting in the other's way.",
    approach: productApproach,
    features: {
      source: "Screenshot of the live site's hero section supplied on 21 November 2026",
      items: [
        "AI-assisted event discovery for attendees",
        "Booking with QR tickets (M-Tickets)",
        "Organiser tools to create and sell events, with an AI copilot",
        "AI analytics, secure KYC and gate check-in, as listed on the site",
        "Link to the EventVexa Android app on Google Play",
      ],
    },
    stack: [],
    images: [
      {
        src: "/projects/eventvexa/hero.webp",
        alt: "EventVexa web platform hero: 'Discover events you'll actually love' with explore and organiser buttons",
        width: 1917,
        height: 888,
        kind: "cover",
        caption: "Web platform hero section.",
      },
    ],
    testing: "Tested and deployed by Jinal as part of the build.",
    productGroup: {
      name: "EventVexa",
      note: "One product, two deliverables: this web platform and the EventVexa Android app.",
    },
    relatedSlugs: ["eventvexa-android", "raycollab", "rayspur"],
    featured: true,
    tone: "ink",
  },
  {
    slug: "raycollab",
    title: "RayCollab",
    url: "https://raycollab.com/",
    linkLabel: "Visit website",
    categories: ["SaaS"],
    industry: "Creator Economy",
    platform: "Web app",
    summary: "Creator and brand collaboration web application.",
    contribution: "AI-assisted product design, development, testing and deployment.",
    roles: ["AI-assisted product design", "Development", "Testing", "Deployment"],
    context:
      "RayCollab connects brands with content creators for collaborations. The public site explains the product to both sides.",
    challenge:
      "Explain a two-sided product to brands and creators at the same time, on the same page.",
    approach: productApproach,
    features: {
      source:
        "Sections visible in a supplied screenshot of the public site (November 2026). Product capabilities described there are the product's own; they are listed here as page content, not independently tested.",
      items: [
        "Dark-theme landing page presenting creator–brand matching",
        "Five-step collaboration walkthrough",
        "Tabbed section explaining the matching tools",
        "Niche explorer and creator discovery cards",
        "Collaboration types overview, FAQ and app download section",
      ],
    },
    stack: [],
    images: [
      {
        src: "/projects/raycollab/cover.webp",
        alt: "RayCollab homepage hero: 'Get found by brands that fit your niche'",
        width: 966,
        height: 603,
        kind: "cover",
        caption: "Public site, top of page.",
      },
      {
        src: "/projects/raycollab/full-page.webp",
        alt: "Full-length capture of the RayCollab public website",
        width: 966,
        height: 8000,
        kind: "full-page",
        caption: "Full public site. Scroll inside the frame.",
      },
    ],
    testing: "Tested and deployed by Jinal as part of the build.",
    relatedSlugs: ["rayspur", "eventvexa-web"],
    featured: true,
    tone: "ink",
  },
  {
    slug: "raybotix-task-workflow",
    title: "Raybotix Digital Task Workflow",
    url: "https://raybotixdigital.online/",
    linkLabel: "View sign-in page",
    categories: ["CRM & ERP"],
    industry: "Internal Business Software",
    platform: "Internal system",
    summary: "Internal work and task workflow system.",
    contribution: "AI-assisted design, development, testing and deployment.",
    roles: ["AI-assisted design", "Development", "Testing", "Deployment"],
    context:
      "An internal tool for Raybotix Digital to manage work as it moves through the team. Only the public sign-in screen is shown here.",
    challenge: null,
    approach: productApproach,
    features: {
      source: "Text on the public sign-in screen (supplied screenshot, November 2026)",
      items: [
        "Assign work to team members",
        "Track work as it moves between writers, designers, editors and managers",
        "See what each hour of work costs the agency",
      ],
    },
    stack: [],
    images: [
      {
        src: "/projects/raybotix-crm/login-panel.webp",
        alt: "Raybotix Digital Workflow Platform sign-in panel: 'Every task, every second, accounted for.'",
        width: 878,
        height: 905,
        kind: "panel",
        caption: "Public sign-in panel only. The form side is cropped out.",
      },
    ],
    testing: "Tested and deployed by Jinal as part of the build.",
    privacyNote:
      "Internal system. No dashboards, client data or user accounts are shown in this portfolio.",
    relatedSlugs: ["megatronix-robusto-crm", "raybotix-digital"],
    featured: false,
    tone: "slate",
  },
  {
    slug: "megatronix-robusto-crm",
    title: "Megatronix Vision & Robusto CRM",
    url: "https://mega.raybotixdigital.online/",
    linkLabel: "View sign-in page",
    categories: ["CRM & ERP"],
    industry: "Business Operations",
    platform: "Internal system",
    summary: "Business ERP/CRM system supporting structured operational workflows.",
    contribution: "AI-assisted design, development, testing and deployment.",
    roles: ["AI-assisted design", "Development", "Testing", "Deployment"],
    context:
      "A shared business system for Megatronix Vision and Robusto Cases. Only the public sign-in screen is shown here.",
    challenge: null,
    approach: productApproach,
    features: {
      source: "Text on the public sign-in screen (supplied screenshot, November 2026)",
      items: [
        "Sales, stock and billing in one workspace",
        "Follow-up reminders (today, overdue and upcoming)",
        "Barcode stock-in and stock-out with low-stock alerts",
        "Lead funnel and team performance in admin analytics",
        "Separate sign-ins for admin, sales, telecaller and accounts roles",
      ],
    },
    stack: [],
    images: [
      {
        src: "/projects/mega-crm/login-panel.webp",
        alt: "Megatronix Vision business workspace sign-in panel: 'Run sales, stock and billing from one calm workspace.'",
        width: 870,
        height: 905,
        kind: "panel",
        caption: "Public sign-in panel only. The form and account list are cropped out.",
      },
    ],
    testing: "Tested and deployed by Jinal as part of the build.",
    privacyNote:
      "Internal system. No dashboards, customer records, stock data or user accounts are shown in this portfolio.",
    relatedSlugs: ["megatronix-vision", "robusto-cases", "raybotix-task-workflow"],
    featured: false,
    tone: "slate",
  },
  {
    slug: "rayspur",
    title: "Rayspur",
    url: "https://rayspur.com/",
    linkLabel: "Visit website",
    categories: ["SaaS"],
    industry: "WhatsApp Automation",
    platform: "Web app",
    summary: "WhatsApp-focused marketing and automation SaaS platform.",
    contribution: "AI-assisted product design, development, testing and deployment.",
    roles: ["AI-assisted product design", "Development", "Testing", "Deployment"],
    context:
      "Rayspur is a SaaS platform for running marketing and automation on WhatsApp. The public site explains how campaigns are planned and run.",
    challenge:
      "Explain a multi-step campaign product simply enough that a small business owner can follow it.",
    approach: productApproach,
    features: {
      source:
        "Sections visible in a supplied screenshot of the public site (November 2026). Third-party integrations are not listed here.",
      items: [
        "Interactive campaign planner demo (business type, goal and tone)",
        "Six-stage campaign walkthrough: plan, write, segment, send, converse, learn",
        "Filterable feature catalogue across marketing, automation, sales and support",
        "Self-serve and managed-campaign options",
      ],
    },
    stack: [],
    images: [
      {
        src: "/projects/rayspur/cover.webp",
        alt: "Rayspur homepage hero: 'Tell it the goal. AI plans, writes and runs your WhatsApp campaigns.'",
        width: 1600,
        height: 1000,
        kind: "cover",
        caption: "Public site, top of page. One line of unfinished placeholder copy on the live page has been covered.",
      },
      {
        src: "/projects/rayspur/full-page.webp",
        alt: "Rayspur public site: hero and six-stage campaign section",
        width: 1000,
        height: 1208,
        kind: "full-page",
        caption: "Hero and campaign-stages section.",
      },
    ],
    testing: "Tested and deployed by Jinal as part of the build.",
    relatedSlugs: ["raycollab", "eventvexa-web"],
    featured: true,
    tone: "blue",
  },
  {
    slug: "eventvexa-android",
    title: "EventVexa Android App",
    url: "https://play.google.com/store/apps/details?id=com.emergent.tickerphoneapp.a3laqn",
    linkLabel: "View on Google Play",
    categories: ["Mobile Apps"],
    industry: "Event Technology",
    platform: "Android app",
    summary: "Event discovery, booking and ticketing application.",
    contribution: "AI-assisted app design, development, testing and deployment.",
    roles: ["AI-assisted app design", "Development", "Testing", "Deployment"],
    context:
      "The Android app is the mobile deliverable of EventVexa, giving attendees event discovery, booking and tickets on their phones. It sits alongside the EventVexa web platform.",
    challenge: null,
    approach: productApproach,
    features: {
      source: "Project brief",
      items: ["Event discovery", "Booking", "Ticketing"],
    },
    stack: [],
    images: [],
    testing: "Tested and deployed by Jinal, including release on Google Play.",
    productGroup: {
      name: "EventVexa",
      note: "One product, two deliverables: this Android app and the EventVexa web platform.",
    },
    relatedSlugs: ["eventvexa-web", "sage-voice-ai-assistant", "rayfuel"],
    featured: false,
    tone: "ink",
  },
  {
    slug: "sage-voice-ai-assistant",
    title: "Sage: Voice AI Assistant",
    url: "https://play.google.com/store/apps/details?id=com.emergent.sageaiplatform.ama1if",
    linkLabel: "View on Google Play",
    categories: ["Mobile Apps"],
    industry: null,
    platform: "Android app",
    summary:
      "Voice-first assistant for captures, tasks, notes, Google synchronization and document extraction.",
    contribution: "AI-assisted app design, development, testing and deployment.",
    roles: ["AI-assisted app design", "Development", "Testing", "Deployment"],
    context:
      "Sage lets people capture thoughts, tasks and notes by speaking instead of typing.",
    challenge: null,
    approach: productApproach,
    features: {
      source: "Project brief",
      items: [
        "Voice captures",
        "Tasks and notes",
        "Google synchronization",
        "Document extraction",
      ],
    },
    stack: [],
    images: [],
    testing: "Tested and deployed by Jinal, including release on Google Play.",
    relatedSlugs: ["rayfuel", "eventvexa-android"],
    featured: true,
    tone: "blue",
  },
  {
    slug: "rayfuel",
    title: "RayFuel",
    url: "https://play.google.com/store/apps/details?id=com.rayfuel.app",
    linkLabel: "View on Google Play",
    categories: ["Mobile Apps"],
    industry: null,
    platform: "Android app",
    summary: "Fuel, mileage and fleet-related tracking application.",
    contribution: "AI-assisted app design, development, testing and deployment.",
    roles: ["AI-assisted app design", "Development", "Testing", "Deployment"],
    context: "RayFuel helps users keep track of fuel use, mileage and fleet-related records.",
    challenge: null,
    approach: productApproach,
    features: {
      source: "Project brief",
      items: ["Fuel tracking", "Mileage tracking", "Fleet-related records"],
    },
    stack: [],
    images: [],
    testing: "Tested and deployed by Jinal, including release on Google Play.",
    relatedSlugs: ["sage-voice-ai-assistant", "eventvexa-android"],
    featured: false,
    tone: "sky",
  },
];

/* ---------- helpers ---------- */

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelated(project: Project): Project[] {
  return project.relatedSlugs
    .map((s) => getProject(s))
    .filter((p): p is Project => Boolean(p));
}

/** Order used by the featured section on the home page. */
export const featuredOrder = [
  "eventvexa-web",
  "raycollab",
  "rayspur",
  "megatronix-vision",
  "parekh-eye-clinic",
  "sage-voice-ai-assistant",
];

export function getFeatured(): Project[] {
  return featuredOrder.map((s) => getProject(s)!).filter(Boolean);
}

export function countByCategory(): Record<ProjectCategory, number> {
  const out = Object.fromEntries(PROJECT_CATEGORIES.map((c) => [c, 0])) as Record<
    ProjectCategory,
    number
  >;
  for (const p of projects) for (const c of p.categories) out[c] += 1;
  return out;
}

export function getAdjacent(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}

/** Facts derived from the data (used by counters — never hard-code numbers). */
export const portfolioStats = {
  entries: projects.length,
  androidApps: projects.filter((p) => p.platform === "Android app").length,
  websites: projects.filter((p) => p.categories.includes("Websites")).length,
  internalSystems: projects.filter((p) => p.platform === "Internal system").length,
  seoCaseStudies: projects.filter((p) => p.seo).length,
  categories: PROJECT_CATEGORIES.length,
};
