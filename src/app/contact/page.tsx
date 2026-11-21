import { Clock, MapPin, ShieldCheck } from "lucide-react";
import { site } from "@/data/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Jinal Dodiya about job opportunities or a freelance project: websites, SEO, CRM systems, SaaS platforms and Android apps.",
  path: "/contact",
});

export default function ContactPage() {
  // The form only goes live when a delivery endpoint is configured (see README).
  const formEnabled = Boolean(process.env.CONTACT_WEBHOOK_URL);

  return (
    <div className="container-page pt-10 sm:pt-16">
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title="Let's talk."
        description="Two ways in: one for recruiters and hiring managers, one for businesses with a project. Pick the one that fits."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ContactForm enabled={formEnabled} email={site.contact.email} />
        </div>
        <aside className="space-y-5 lg:col-span-4" aria-label="Other ways to reach me">
          <div className="card p-5 sm:p-6">
            <h2 className="font-display text-lg font-bold text-ink">Direct channels</h2>
            <p className="mt-1 text-sm text-muted">The quickest way to reach me.</p>
            <ContactChannels className="mt-4 -mx-2" />
          </div>
          <div className="card space-y-4 p-5 text-sm sm:p-6">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <span>
                {site.location.city}, {site.location.region}, {site.location.country}
              </span>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <span>{site.location.timezone}</span>
            </p>
            <p className="flex gap-3 text-muted">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <span>Messages go straight to me. Nothing is stored on this site or shared with anyone else.</span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
