"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent, type KeyboardEvent } from "react";
import { Briefcase, CircleAlert, Loader2, Rocket, Send, Check, PlugZap, Mail } from "lucide-react";
import {
  emptyPayload,
  PROJECT_TYPES,
  validate,
  type FieldErrors,
  type InquiryPayload,
  type InquiryType,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const TABS: { id: InquiryType; label: string; sub: string; icon: typeof Briefcase }[] = [
  { id: "job", label: "Job Opportunities", sub: "For recruiters and hiring managers", icon: Briefcase },
  { id: "project", label: "Start a Project", sub: "For businesses and founders", icon: Rocket },
];

type Status = "idle" | "submitting" | "success" | "error" | "handed-off";

function buildMailto(to: string, p: InquiryPayload): string {
  const subject = p.type === "job" ? `Job opportunity: ${p.role || p.company}` : `Project inquiry: ${p.projectType}`;
  const details = [
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    p.company && `${p.type === "job" ? "Company" : "Business"}: ${p.company}`,
    p.role && `Role: ${p.role}`,
    p.link && `Job post: ${p.link}`,
    p.projectType && `Need: ${p.projectType}`,
    p.budget && `Budget: ${p.budget}`,
    p.timeline && `Timeline: ${p.timeline}`,
  ].filter(Boolean) as string[];
  const lines = [...details, "", p.message];
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

function subscribe(cb: () => void) {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
}
const readUrlType = () => new URLSearchParams(window.location.search).get("type");

/**
 * Two-pathway contact form. Modes:
 *  - webhook configured (CONTACT_WEBHOOK_URL) → sends through /api/contact
 *  - no webhook but an email is set           → opens the visitor's email app with the message filled in
 *  - neither                                  → visibly disabled, never pretends to send
 */
export function ContactForm({ enabled, email }: { enabled: boolean; email: string | null }) {
  const mailMode = !enabled && Boolean(email);
  const usable = enabled || mailMode;
  // ?type=job|project preselects a pathway; a tab click overrides it.
  const urlType = useSyncExternalStore(subscribe, readUrlType, () => null);
  const [picked, setPicked] = useState<InquiryType | null>(null);
  const type: InquiryType = picked ?? (urlType === "project" ? "project" : "job");
  const [values, setValues] = useState<InquiryPayload>(emptyPayload("job"));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  useEffect(() => {
    if (status === "success" || status === "error" || status === "handed-off") resultRef.current?.focus();
  }, [status]);

  const switchTab = (t: InquiryType) => {
    setPicked(t);
    setErrors({});
    const url = new URL(window.location.href);
    url.searchParams.set("type", t);
    window.history.replaceState(null, "", url);
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    switchTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  const set = (k: keyof InquiryPayload) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!usable) return;
    const trimmed = Object.fromEntries(
      Object.entries({ ...values, type }).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v]),
    ) as unknown as InquiryPayload;
    const errs = validate(trimmed);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    if (mailMode) {
      window.location.href = buildMailto(email!, trimmed);
      setStatus("handed-off");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trimmed),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: FieldErrors };
      if (res.ok && data.ok) {
        setStatus("success");
        setValues(emptyPayload(type));
      } else {
        if (data.errors) setErrors(data.errors);
        setServerMsg(data.error ?? "Something went wrong while sending.");
        setStatus("error");
      }
    } catch {
      setServerMsg("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  const field = (k: keyof InquiryPayload, label: string, opts: { required?: boolean; type?: string; autoComplete?: string; placeholder?: string; hint?: string } = {}) => {
    const id = `${uid}-${k}`;
    const err = errors[k];
    return (
      <div>
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label} {opts.required ? <span className="text-accent" aria-hidden>*</span> : <span className="font-normal text-muted">(optional)</span>}
        </label>
        <input
          id={id}
          name={k}
          type={opts.type ?? "text"}
          autoComplete={opts.autoComplete}
          placeholder={opts.placeholder}
          required={opts.required}
          aria-invalid={Boolean(err)}
          aria-describedby={err ? `${id}-err` : undefined}
          value={values[k] as string}
          onChange={set(k)}
          className={cn(
            "mt-1.5 h-12 w-full rounded-xl border bg-white px-4 text-[0.95rem] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted/70",
            "focus:border-accent focus:ring-4 focus:ring-accent/15 disabled:cursor-not-allowed disabled:bg-canvas",
            err ? "border-negative" : "border-line",
          )}
        />
        {err && (
          <p id={`${id}-err`} className="mt-1.5 text-sm text-negative">
            {err}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="card overflow-hidden">
      <div role="tablist" aria-label="Choose an inquiry type" className="grid grid-cols-2 border-b border-line bg-canvas p-1.5">
        {TABS.map((t, i) => {
          const on = type === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${uid}-tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => switchTab(t.id)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={cn(
                "flex items-center gap-3 rounded-[16px] p-3 text-left transition-colors sm:p-4",
                on ? "bg-white shadow-card" : "text-muted hover:text-ink",
              )}
            >
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", on ? (t.id === "job" ? "bg-ink text-white" : "bg-accent text-white") : "bg-white text-muted")}>
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className={cn("block font-display text-sm font-bold sm:text-base", on && "text-ink")}>{t.label}</span>
                <span className="hidden text-xs text-muted sm:block">{t.sub}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${type}`} className="p-5 sm:p-8">
        {mailMode && status !== "handed-off" && (
          <div role="note" className="mb-6 flex gap-3 rounded-[var(--radius-inner)] border border-[#d6e4ff] bg-accent-soft p-4 text-sm text-ink">
            <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            <p>
              This form opens your email app with your message filled in, ready to send to{" "}
              <a href={`mailto:${email}`} className="font-semibold text-accent-strong underline underline-offset-2">
                {email}
              </a>
              .
            </p>
          </div>
        )}

        {!usable && (
          <div role="note" className="mb-6 flex gap-3 rounded-[var(--radius-inner)] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <PlugZap className="mt-0.5 size-4 shrink-0" aria-hidden />
            <p>
              <strong>This form isn&apos;t connected yet,</strong> so it can&apos;t send messages. Please use one of the
              contact channels on this page once they&apos;re published.
            </p>
          </div>
        )}

        {status === "handed-off" ? (
          <div ref={resultRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-4 py-6 outline-none">
            <span className="grid size-12 place-items-center rounded-full bg-accent-soft text-accent">
              <Mail className="size-6" aria-hidden />
            </span>
            <h2 className="font-display text-2xl font-bold text-ink">Your email app should now be open.</h2>
            <p className="max-w-md text-muted">
              Press send there to deliver the message. If nothing opened, email me directly at{" "}
              <a href={`mailto:${email}`} className="font-semibold text-ink underline underline-offset-2">
                {email}
              </a>
              .
            </p>
            <button type="button" onClick={() => setStatus("idle")} className="text-sm font-semibold text-accent hover:underline">
              Back to the form
            </button>
          </div>
        ) : status === "success" ? (
          <div ref={resultRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-4 py-6 outline-none">
            <span className="grid size-12 place-items-center rounded-full bg-emerald-50 text-positive">
              <Check className="size-6" aria-hidden />
            </span>
            <h2 className="font-display text-2xl font-bold text-ink">Message sent. Thank you.</h2>
            <p className="max-w-md text-muted">I&apos;ll reply to the email address you gave.</p>
            <button type="button" onClick={() => setStatus("idle")} className="text-sm font-semibold text-accent hover:underline">
              Send another message
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit}>
            <fieldset disabled={!usable || status === "submitting"} className="grid gap-5 sm:grid-cols-2">
              <legend className="sr-only">{type === "job" ? "Job opportunity details" : "Project details"}</legend>
              {field("name", "Your name", { required: true, autoComplete: "name" })}
              {field("email", "Email", { required: true, type: "email", autoComplete: "email" })}

              {type === "job" ? (
                <>
                  {field("company", "Company", { required: true, autoComplete: "organization" })}
                  {field("role", "Role title", { placeholder: "e.g. Digital Marketing Manager" })}
                  <div className="sm:col-span-2">{field("link", "Job post link", { type: "url", placeholder: "https://" })}</div>
                </>
              ) : (
                <>
                  {field("company", "Business name", { autoComplete: "organization" })}
                  <div>
                    <label htmlFor={`${uid}-projectType`} className="text-sm font-semibold text-ink">
                      What do you need? <span className="text-accent" aria-hidden>*</span>
                    </label>
                    <select
                      id={`${uid}-projectType`}
                      name="projectType"
                      required
                      value={values.projectType}
                      onChange={set("projectType")}
                      aria-invalid={Boolean(errors.projectType)}
                      aria-describedby={errors.projectType ? `${uid}-projectType-err` : undefined}
                      className={cn(
                        "mt-1.5 h-12 w-full rounded-xl border bg-white px-3.5 text-[0.95rem] text-ink outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 disabled:bg-canvas",
                        errors.projectType ? "border-negative" : "border-line",
                      )}
                    >
                      <option value="">Choose one…</option>
                      {PROJECT_TYPES.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p id={`${uid}-projectType-err`} className="mt-1.5 text-sm text-negative">
                        {errors.projectType}
                      </p>
                    )}
                  </div>
                  {field("budget", "Budget range")}
                  {field("timeline", "Timeline", { placeholder: "e.g. within 6 weeks" })}
                </>
              )}

              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-message`} className="text-sm font-semibold text-ink">
                  {type === "job" ? "About the role" : "About the project"} <span className="text-accent" aria-hidden>*</span>
                </label>
                <textarea
                  id={`${uid}-message`}
                  name="message"
                  rows={6}
                  required
                  value={values.message}
                  onChange={set("message")}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={`${uid}-message-help${errors.message ? ` ${uid}-message-err` : ""}`}
                  className={cn(
                    "mt-1.5 w-full resize-y rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-ink outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 disabled:cursor-not-allowed disabled:bg-canvas",
                    errors.message ? "border-negative" : "border-line",
                  )}
                />
                <p id={`${uid}-message-help`} className="mt-1.5 text-xs text-muted">
                  {type === "job"
                    ? "Responsibilities, location or remote, and anything else useful."
                    : "What the business does, what you want to achieve, and any links."}
                </p>
                {errors.message && (
                  <p id={`${uid}-message-err`} className="mt-1 text-sm text-negative">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot — hidden from people and assistive tech */}
              <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label>
                  Website
                  <input tabIndex={-1} autoComplete="off" name="website" value={values.website} onChange={set("website")} />
                </label>
              </div>
            </fieldset>

            {status === "error" && (
              <div ref={resultRef} tabIndex={-1} role="alert" className="mt-6 flex gap-3 rounded-[var(--radius-inner)] border border-red-200 bg-red-50 p-4 text-sm text-red-900 outline-none">
                <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
                <p>{serverMsg} Your message hasn&apos;t been lost: it&apos;s still in the form.</p>
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-muted">
                {mailMode
                  ? "Nothing is sent or stored by this website. Your message goes from your own email app."
                  : "Your details are only used to reply to this message. They aren't stored on this website."}
              </p>
              <button
                type="submit"
                disabled={!usable || status === "submitting"}
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 font-display text-[0.95rem] font-semibold text-white shadow-[0_8px_20px_-8px_rgb(37_99_235/0.6)] transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:bg-line-strong disabled:text-white disabled:shadow-none"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
                  </>
                ) : enabled ? (
                  <>
                    <Send className="size-4" aria-hidden /> Send message
                  </>
                ) : mailMode ? (
                  <>
                    <Mail className="size-4" aria-hidden /> Open in email app
                  </>
                ) : (
                  "Form not connected yet"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
