import Link from "next/link";
import { ArrowUpRight, Briefcase, GraduationCap, MapPin, ShieldCheck } from "lucide-react";
import { site } from "@/data/site";
import { education, experience } from "@/data/experience";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { Pending } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaPair } from "@/components/sections/CtaPair";
import { pageMetadata } from "@/lib/seo";
import { monthYear } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "About",
  description:
    "About Jinal Dodiya: Digital Marketing Manager at Raybotix Digital since December 2022, working across SEO, performance marketing and AI-assisted builds of websites, CRM systems, SaaS platforms and Android apps.",
  path: "/about",
});

export default function AboutPage() {
  const job = experience[0];
  return (
    <>
      <div className="container-page pt-10 sm:pt-16">
        <SectionHeading
          as="h1"
          eyebrow="About"
          title="A marketer who also builds."
          description={site.positioning + ", based in " + site.location.city + ", " + site.location.country + "."}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <aside className="card p-3 lg:sticky lg:top-24" aria-label="Quick facts">
              <ProfileAvatar className="aspect-square w-full" />
              <dl className="space-y-3 p-3 pt-5 text-sm">
                <div className="flex gap-3">
                  <dt className="sr-only">Role</dt>
                  <Briefcase className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />
                  <dd>{job.title}, {job.organisation}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="sr-only">Location</dt>
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />
                  <dd>{site.location.city}, {site.location.region}, {site.location.country}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="sr-only">Education</dt>
                  <GraduationCap className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />
                  <dd>{education.qualification}</dd>
                </div>
              </dl>
            </aside>
          </Reveal>

          <div className="space-y-6 text-lg leading-relaxed text-ink/85 lg:col-span-8">
            <Reveal>
              <p>
                I&apos;m Jinal Dodiya, a {job.title} at{" "}
                <a href={job.organisationUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                  {job.organisation}
                </a>{" "}
                in {site.location.city}, where I&apos;ve worked since {monthYear(job.start)}. I have {site.experienceLabel} of
                relevant experience.
              </p>
            </Reveal>
            <Reveal>
              <p>
                My work covers both sides of a digital project. On the marketing side, I handle <strong className="text-ink">SEO</strong> and{" "}
                <strong className="text-ink">performance marketing</strong>. On the build side, I design and develop{" "}
                <strong className="text-ink">websites, CRM systems, SaaS platforms and Android apps</strong>, and I do basic video editing and
                graphic design when a campaign needs it.
              </p>
            </Reveal>
            <Reveal>
              <p>
                I build with AI, and I&apos;m open about it. I use Claude and other AI tools to write and refine code, but the
                responsibility stays with me: I design the product, direct the AI, review what it produces, test it, and
                deploy it. That&apos;s how one person can take a website, an internal system or an Android app from idea to
                a live release.
              </p>
            </Reveal>
            <Reveal>
              <p>
                Most of my projects start with a business problem. A clinic that wants to be found by people searching in
                its area. A company that wants sales, stock and billing in one place. An agency that wants to see where its
                team&apos;s hours go. I&apos;d rather solve the problem than just deliver pages.
              </p>
            </Reveal>
            <Reveal>
              <p>
                My {education.qualification} gives me the technical grounding for the build side. I&apos;m open to{" "}
                <strong className="text-ink">full-time roles</strong> where marketing and product work overlap, and to{" "}
                <strong className="text-ink">freelance projects</strong> for businesses that need one person who understands both.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Experience */}
        <section aria-labelledby="experience-title" className="mt-20">
          <Reveal>
            <SectionHeading id="experience-title" eyebrow="Experience" title="Professional experience" />
          </Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-12">
            {experience.map((e) => (
              <Reveal key={e.organisation} className="lg:col-span-8">
                <article className="card h-full p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-ink">{e.title}</h3>
                      <p className="mt-1 text-muted">
                        <a href={e.organisationUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:text-accent">
                          {e.organisation}
                          <ArrowUpRight className="ml-0.5 inline size-4" aria-hidden />
                        </a>{" "}
                        · {e.location}
                      </p>
                    </div>
                    <p className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent-strong">
                      <time dateTime={e.start}>{monthYear(e.start)}</time> – {e.end ? <time dateTime={e.end}>{monthYear(e.end)}</time> : "Present"}
                    </p>
                  </div>
                  <p className="mt-5 leading-relaxed text-ink/85">{e.summary}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {e.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-ink/85">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        {r}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
            <div className="grid gap-5 lg:col-span-4">
              <Reveal>
                <article className="card h-full p-6 sm:p-7">
                  <GraduationCap className="size-6 text-accent" aria-hidden />
                  <h3 className="mt-4 font-display text-xl font-bold text-ink">{education.qualification}</h3>
                  <p className="mt-2 flex flex-wrap gap-2 text-sm text-muted">
                    {education.institution ?? <Pending>Institution to be added</Pending>}
                    {education.year ?? <Pending>Year to be added</Pending>}
                  </p>
                </article>
              </Reveal>
              <Reveal delay={0.05}>
                <article className="card h-full p-6 sm:p-7">
                  <ShieldCheck className="size-6 text-accent" aria-hidden />
                  <h3 className="mt-4 font-display text-xl font-bold text-ink">How this portfolio is written</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Numbers come from a named report. Screenshots are real, or clearly labelled placeholders. No
                    testimonials or endorsements have been added. Internal systems are shown only through their public
                    sign-in screens.
                  </p>
                  <Link href="/projects" className="mt-4 inline-flex text-sm font-semibold text-accent hover:underline">
                    See the work
                  </Link>
                </article>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
      <CtaPair />
    </>
  );
}
