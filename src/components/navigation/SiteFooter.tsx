import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { PROJECT_CATEGORIES } from "@/lib/types";
import { ContactChannels } from "@/components/contact/ContactChannels";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="no-print mt-12 border-t border-line bg-white">
      <div className="container-page grid gap-12 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-2xl font-bold tracking-tight text-ink">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{site.positioning}.</p>
          <p className="mt-1 text-sm text-muted">
            {site.location.city}, {site.location.region}, {site.location.country}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/contact?type=job"
              className="inline-flex items-center gap-1 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-black"
            >
              Job opportunities <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/contact?type=project"
              className="inline-flex items-center gap-1 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-line-strong"
            >
              Start a project <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Pages</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[{ href: "/", label: "Home" }, ...site.nav, { href: "/contact", label: "Contact" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink/80 hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Work</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PROJECT_CATEGORIES.map((c) => (
                <li key={c}>
                  <Link href={`/projects?category=${encodeURIComponent(c)}`} className="text-ink/80 hover:text-accent">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Contact</p>
          <ContactChannels keys={["email", "phone", "linkedin", "github"]} className="mt-3 -ml-2" />
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. All project names belong to their respective owners.
          </p>
          <p>Designed and built with AI assistance.</p>
        </div>
      </div>
    </footer>
  );
}
