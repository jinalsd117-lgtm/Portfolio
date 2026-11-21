# Jinal Dodiya — Portfolio

A light-theme, interactive bento portfolio for **Jinal Dodiya**, Digital Marketing Manager & AI-assisted digital solutions builder (Ahmedabad, India).

- **Stack:** Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, Motion for React, lucide-react
- **Pages:** `/` · `/about` · `/projects` · `/projects/[slug]` (13 case studies) · `/expertise` · `/resume` · `/contact`
- **Content-driven:** every project, skill, timeline entry and contact detail lives in `src/data/`. See **[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)**.

---

## 1. Run locally

Requirements: **Node.js 20.9 or newer**, npm.

```bash
npm install
cp .env.example .env.local     # optional for local dev
npm run dev                    # http://localhost:3000
```

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Development server with hot reload    |
| `npm run build` | Production build (static prerender)   |
| `npm start`     | Serve the production build            |
| `npm run lint`  | ESLint (Next.js + React rules)        |

## 2. Environment variables

| Variable                 | Required          | Purpose |
| ------------------------ | ----------------- | ------- |
| `NEXT_PUBLIC_SITE_URL`   | When you use a custom domain | Your live domain, e.g. `https://jinaldodiya.com`. Used for canonical URLs, Open Graph, `sitemap.xml`, `robots.txt` and JSON-LD. On Vercel it falls back to the project's production domain automatically; elsewhere to `http://localhost:3000`. |
| `CONTACT_WEBHOOK_URL`    | No                | Where contact-form submissions are sent (JSON POST). While empty, the form opens the visitor's own email app with the message filled in, addressed to the email in `site.ts`. It never claims to have sent anything itself. |
| `CONTACT_WEBHOOK_SECRET` | No                | Sent as the `X-Webhook-Secret` header so your endpoint can reject forged requests. |

> Pages are prerendered at build time, so **rebuild/redeploy after changing any variable**.

### Connecting the contact form

`/api/contact` validates the submission (server-side), applies a honeypot, a same-origin check and a basic rate limit, then forwards JSON to `CONTACT_WEBHOOK_URL`. Nothing is stored on the site and personal data is never logged.

Any endpoint that accepts a JSON POST works, for example:

- **Formspree:** create a form, use `https://formspree.io/f/<id>` as the URL (emails you each submission)
- **Make / Zapier / n8n:** "Custom webhook" trigger → send email, add to Google Sheets, post to Slack, etc.
- **Slack workflow webhook** or your own API

Payload shape:

```json
{
  "subject": "Project inquiry from Asha",
  "type": "project",
  "name": "…", "email": "…", "company": "…",
  "role": "", "link": "",
  "projectType": "SEO", "budget": "", "timeline": "",
  "message": "…",
  "submittedAt": "2026-11-21T06:01:09.819Z"
}
```

The rate limit is per server instance (best effort). For strict limits on serverless, swap the in-memory `Map` in `src/app/api/contact/route.ts` for Upstash Redis or similar.

## 3. Deploy

### Vercel (recommended)

The project is ready for Vercel as-is: no `vercel.json` and no build settings needed.

**Option A: GitHub + Vercel dashboard (easiest to keep updated)**

1. Unzip, open a terminal in the `jinal-portfolio` folder and push it to a new GitHub repo:
   ```bash
   git init && git add . && git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<you>/jinal-portfolio.git
   git push -u origin main
   ```
2. Go to **vercel.com → Add New → Project → Import** that repo. Vercel detects Next.js automatically. Click **Deploy**.
3. Every later `git push` redeploys automatically.

**Option B: Vercel CLI (no GitHub needed)**

```bash
cd jinal-portfolio
npm install
npx vercel          # log in, accept the defaults → preview URL
npx vercel --prod   # production URL
```

**After the first deploy**

- The site URL for SEO tags, sitemap and robots is picked up automatically from Vercel's production domain. When you add your own domain (**Settings → Domains**), also set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` under **Settings → Environment Variables** and redeploy.
- To switch on the contact form, add `CONTACT_WEBHOOK_URL` (and optionally `CONTACT_WEBHOOK_SECRET`) there and redeploy.
- Submit `https://your-domain/sitemap.xml` in Google Search Console.

### Any Node host (VPS, Render, Railway, Hostinger Node, etc.)

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm start   # serves on PORT (default 3000)
```

Run it behind a reverse proxy (Nginx/Caddy) with HTTPS, and keep it alive with a process manager such as `pm2`.
The site needs the Node runtime (contact API route and the not-found proxy), so a plain static file host is not enough.

## 4. Project structure

```
public/
  profile/          jinal-photo.webp goes here (auto-detected)
  projects/<name>/  project screenshots (webp)
  resume/           jinal-dodiya-resume.pdf goes here (auto-detected)
src/
  app/              routes, metadata, sitemap, robots, OG images, API route
  components/
    bento/          BentoCard (pointer spotlight), CategoryBars, ApproachLoop
    projects/       ProjectCard, ProjectMedia, ProjectFilter, SeoResult
    navigation/     SiteHeader, SiteFooter
    sections/       home-page sections
    contact/        ContactForm, ContactChannels
    resume/         PrintButton
    ui/             Button, Badge, Reveal, Counter, Placeholder, SectionHeading…
  data/             ← all editable content (site, projects, seo, experience, skills)
  lib/              types, SEO/JSON-LD helpers, contact validation, utils
  styles/           globals.css — design tokens (colours, radii, shadows, fonts)
  fonts/            self-hosted Plus Jakarta Sans + Inter (variable woff2)
  proxy.ts          returns a real 404 status for unknown /projects/<slug>
```

## 5. Design system

Tokens live in `src/styles/globals.css` under `@theme`:

| Token | Value | Tailwind class |
| --- | --- | --- |
| Background | `#F8FAFC` | `bg-canvas` |
| Cards | `#FFFFFF` | `bg-card` |
| Text | `#111827` | `text-ink` |
| Secondary | `#64748B` | `text-muted` |
| Accent | `#2563EB` | `bg-accent` / `text-accent` |
| Light accent | `#EAF1FF` | `bg-accent-soft` |
| Borders | `#E2E8F0` | `border-line` |
| Card radius | 22px / 24px | `rounded-[var(--radius-card)]` |

Typography: Plus Jakarta Sans (display, `font-display`) + Inter (body, `font-sans`), self-hosted with `next/font/local`, so no build-time calls to Google Fonts.

## 6. Interaction & accessibility

- Scroll reveals, counters, filter and timeline animations use Motion. `MotionConfig reducedMotion="user"` removes movement for visitors with *reduce motion* switched on.
- Bento cards: CSS-variable pointer spotlight plus a small lift on linked cards.
- Project cards: full-page screenshots pan top-to-bottom on hover/focus (disabled with reduced motion).
- Filters: `aria-pressed` buttons, arrow-key navigation, live result count, shareable `?category=` URLs.
- Contact: ARIA tabs (arrow keys), inline validation tied to fields with `aria-describedby`, focus moves to success/error messages.
- Mobile menu: focus trap, Escape to close, focus returns to the toggle.
- Skip link, landmarks, one `h1` per page, visible focus rings.
- Checked with axe-core (WCAG 2 A/AA + best practice): no violations on any page at handover.

## 7. SEO

- Per-page metadata and canonical URLs (`src/lib/seo.ts`)
- Generated Open Graph images: site-wide and one per case study
- `sitemap.xml`, `robots.txt`, web manifest, SVG icon
- JSON-LD: `Person` + `WebSite` (all pages), `CreativeWork` + `BreadcrumbList` (case studies)
- Real `404` status for unknown project slugs (`src/proxy.ts`)

## 8. Missing assets & information (flagged, not invented)

| Item | Where it goes | Current state |
| --- | --- | --- |
| Profile photo | `public/profile/jinal-photo.webp` (square-ish, ≥800px) | Labelled "JD" placeholder |
| WhatsApp number, GitHub | `src/data/site.ts → contact` | Hidden until added (email, phone and LinkedIn are set) |
| Resume PDF | `public/resume/jinal-dodiya-resume.pdf` | Download button hidden until the file exists; printable `/resume` page works now |
| Screenshots: Robusto Cases, Parekh Eye Clinic, EventVexa Android, Sage, RayFuel | `public/projects/<name>/` + `images` in `projects.ts` | Labelled placeholders |
| Confirmed tech stack per project | `stack: []` in `projects.ts` | Section hidden until filled |
| Diploma institution / year | `src/data/experience.ts → education` | "To be added" |
| Tools awaiting confirmation (Google Ads, Meta Ads Manager, GSC, GA, Figma, Canva, video editor, Emergent, Play Console) | `src/data/skills.ts → tools` | Shown separately as "Awaiting confirmation" |
| GROW Children Hospital SEO responsibility | `src/data/seo.ts → growSeo.seoRoleConfirmed` | `false`: the figures are shown as monitoring data, not attributed |
| Performance-marketing case study | `projects.ts` | None published; capability says so |
| Custom domain | `NEXT_PUBLIC_SITE_URL` | Not set (Vercel domain used automatically) |

## 9. Content decisions worth knowing

- **Screenshots** are the ones supplied in November 2026. The two CRM/workflow images are cropped to the public marketing half of the sign-in page: the demo accounts and credentials visible on the live pages are **not** included. One line of unfinished placeholder copy ("[TRIAL LENGTH]") on the live Rayspur page is covered in its cover image, and the capture stops before the pricing section, which also contains placeholders. The EventVexa capture has the Windows taskbar cropped off.
- **Features** listed on case studies come only from what a supplied source shows. Each list names its source.
- **SEO figures** are copied from the Ubersuggest reports, labelled as tracked rankings (not traffic, enquiries or ROI), with declines and limitations shown.
- **Experience:** Raybotix Digital start date is **December 2022** (`src/data/experience.ts`). "4+ years" (`experienceLabel` in `site.ts`) is the self-reported total relevant experience; tenure at Raybotix alone is just under 4 years as of Nov 2026.
- **EventVexa** web and Android are cross-linked as one product with two deliverables.
