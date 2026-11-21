import { ArrowRight, Download, FileText, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { publicAssetExists } from "@/lib/assets";
import { ButtonLink } from "@/components/ui/Button";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  const hasPdf = publicAssetExists(site.assets.resumePdf);
  const [lead, accent] = splitTitle(site.hero.title);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-[radial-gradient(circle,rgb(37_99_235/0.14),transparent_65%)]"
      />
      <div className="container-page relative grid gap-10 pb-16 pt-10 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-20">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 shadow-card">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              <span className="eyebrow !text-[0.68rem]">{site.hero.eyebrow}</span>
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              id="hero-title"
              className="mt-6 font-display text-[2.6rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-ink sm:text-6xl lg:text-[5.4rem]"
            >
              {lead} <span className="text-accent">{accent}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{site.hero.description}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/projects">
                Explore Projects <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden />
              </ButtonLink>
              {hasPdf ? (
                <a href={site.assets.resumePdf} download className="group/btn inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white px-6 font-display text-[0.95rem] font-semibold text-ink shadow-card hover:border-line-strong">
                  <Download className="size-4" aria-hidden /> Download Resume
                </a>
              ) : (
                <ButtonLink href="/resume" variant="secondary">
                  <FileText className="size-4" aria-hidden /> View Resume
                </ButtonLink>
              )}
              <ButtonLink href="/contact" variant="ghost" className="ml-1">
                Let&apos;s Connect <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-4 lg:pt-4">
          <aside aria-label="Profile summary" className="card mx-auto max-w-sm p-3 lg:ml-auto">
            <ProfileAvatar priority className="aspect-[4/3] w-full sm:aspect-[4/4.2]" />
            <div className="px-3 pb-3 pt-4">
              <p className="font-display text-lg font-bold text-ink">{site.name}</p>
              <p className="text-sm text-muted">{site.role} at {site.employer.name}</p>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <span className="inline-flex items-center gap-2 text-ink">
                  <MapPin className="size-4 text-muted" aria-hidden />
                  {site.location.city}, {site.location.country}
                </span>
                <span className="inline-flex items-center gap-2 text-ink">
                  <span className="relative grid size-4 place-items-center" aria-hidden>
                    <span className="absolute size-2.5 rounded-full bg-emerald-500/30 motion-safe:animate-ping" />
                    <span className="size-2 rounded-full bg-emerald-500" />
                  </span>
                  Open to roles &amp; freelance projects
                </span>
              </div>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

/** Highlights the last three words of the title in the accent colour. */
function splitTitle(title: string): [string, string] {
  const words = title.split(" ");
  return [words.slice(0, -3).join(" "), words.slice(-3).join(" ")];
}
