# Content guide

All content is plain TypeScript in `src/data/`. Edit a file, save, and the site updates (in `npm run dev`) or on the next deploy. You never need to touch components to change wording, add a project or fill in a placeholder.

**House rule:** only publish what can be backed up. No invented metrics, testimonials, stacks, integrations or screenshots.

---

## Personal details — `src/data/site.ts`

```ts
contact: {
  email: "you@example.com",          // personal, not Raybotix company details
  phone: "+91 90000 00000",
  whatsapp: "919000000000",          // digits only, with country code
  linkedin: "https://www.linkedin.com/in/…",
  github: "https://github.com/…",
},
```

`null` shows a visible "To be added" chip. Filled values become links across the footer, contact page and resume. LinkedIn and GitHub are also added to the Person structured data (`sameAs`).

Also editable here: hero eyebrow, title and description, `experienceLabel` ("4+ years"), location, nav items.

### Photo and resume PDF

Drop the files in. Nothing else to change:

- `public/profile/jinal-photo.webp` → replaces the "JD" placeholder in the hero and on About
- `public/resume/jinal-dodiya-resume.pdf` → "Download Resume" appears in the hero and on `/resume`

Tip: the `/resume` page's **Print / Save as PDF** button produces a clean one-column PDF you can use as that file.

---

## Projects — `src/data/projects.ts`

Each entry has this shape (see `src/lib/types.ts` for the full type):

```ts
{
  slug: "new-project",                 // URL: /projects/new-project (lowercase, hyphens)
  title: "New Project",
  url: "https://…",                    // live site or Play Store link
  linkLabel: "Visit website",
  categories: ["Websites", "SEO"],     // any of: Websites, CRM & ERP, SaaS, Mobile Apps, SEO
  industry: "Healthcare",              // or null
  platform: "Website",                 // Website | Web platform | Web app | Internal system | Android app
  summary: "One sentence.",
  contribution: "Exactly what you did.",
  roles: ["Design", "Development"],    // chips
  context: "Who the client is and why the project existed.",
  challenge: "The core problem." ,     // or null to hide
  approach: ["Step one", "Step two"],
  features: { source: "Where this was verified", items: ["…"] },  // or null
  stack: [],                           // ONLY confirmed technologies; section hidden when empty
  images: [],                          // see below; empty = labelled placeholder
  testing: "Tested and deployed by Jinal as part of the build.",
  relatedSlugs: ["other-slug"],
  featured: false,
  tone: "blue",                        // placeholder colour: blue | ink | slate | sky
}
```

Adding an entry automatically creates the case-study page, adds it to the filters, counters, sitemap, resume and Open Graph images.

**Featured order** on the home page is the `featuredOrder` array at the bottom of the file. The home grid is designed for six.

### Adding screenshots

1. Export as **WebP** (or PNG/JPG). Recommended:
   - `cover.webp`: top of the page, about 1600×1000
   - `full-page.webp`: whole page at 1000px wide (any height). Cards pan through it on hover, and the case study shows it in a scrollable frame.
2. Put files in `public/projects/<folder>/`.
3. Add to the project's `images`:

```ts
images: [
  { src: "/projects/robusto-cases/cover.webp", alt: "Robusto Cases homepage hero", width: 1600, height: 1000, kind: "cover", caption: "Homepage, top of page." },
  { src: "/projects/robusto-cases/full-page.webp", alt: "Full Robusto Cases homepage", width: 1000, height: 6200, kind: "full-page", caption: "Full homepage." },
],
```

`width`/`height` must match the real file dimensions. Never use stock images in place of real screenshots.

**Internal systems:** only use the public sign-in/marketing side. Crop out login forms, demo accounts, emails and any dashboard data (`kind: "panel"`).

### Confirming a tech stack

When a project's technology is confirmed, list it: `stack: ["WordPress", "Elementor"]`. The "Technical stack (confirmed)" section appears automatically.

---

## SEO case studies — `src/data/seo.ts`

Copy figures exactly from the report. Keep `limitations` honest, including declines. When Jinal's SEO responsibility for GROW Children Hospital is confirmed, set:

```ts
seoRoleConfirmed: true,
attribution: "Jinal worked on this site's SEO during the tracked period. …",
```

The badge then changes from "SEO role not yet confirmed" to "SEO work by Jinal", and the result is added to the resume's SEO line.

These numbers are **tracked keyword rankings**, never traffic, enquiries, sales or ROI.

---

## Experience & timeline — `src/data/experience.ts`

- `experience`: job entries. Keep dates exact (`start: "2020-12-11"`, `end: null` = Present). Edit `responsibilities` freely, but don't add team sizes or leadership claims you can't back up.
- `education`: add `institution` and `year` to show them on About and the resume.
- `timeline`: home-page entries. Only dated facts get a date; undated items use a label like "Education".

## Skills, tools & services — `src/data/skills.ts`

- `capabilities`: each has `evidence` (project slugs). An empty list shows "Public example to be added".
- `tools`: `status` is `confirmed`, `evidenced` (backed by supplied material) or `awaiting-confirmation`. Move a tool to `confirmed` once Jinal confirms it. Unconfirmed tools never appear on the resume.
- `services`: freelance offerings on the home page, each linked to evidence projects.

---

## Before publishing: checklist

- [ ] `NEXT_PUBLIC_SITE_URL` set to the real domain
- [ ] Personal contact details filled in `site.ts`
- [ ] Profile photo added
- [ ] Resume PDF added (or rely on the printable page)
- [ ] Contact form webhook configured, or form left visibly disabled
- [ ] Remaining screenshots added and approved by each client
- [ ] GROW SEO responsibility confirmed or left unattributed
- [ ] Client permission to show each project and its screenshots
