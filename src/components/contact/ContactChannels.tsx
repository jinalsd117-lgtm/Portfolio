import { AtSign, Briefcase, Code2, MessageCircle, Phone } from "lucide-react";
import { contactHref, contactLabels, site, type ContactKey } from "@/data/site";
import { cn } from "@/lib/utils";

const icons: Record<ContactKey, typeof AtSign> = {
  email: AtSign,
  phone: Phone,
  whatsapp: MessageCircle,
  linkedin: Briefcase,
  github: Code2,
};

const NEW_TAB: ContactKey[] = ["linkedin", "github", "whatsapp"];

/**
 * Personal contact channels from src/data/site.ts.
 * Channels left as `null` there are not shown.
 */
export function ContactChannels({
  keys = ["email", "phone", "whatsapp", "linkedin", "github"],
  dark = false,
  className,
}: {
  keys?: ContactKey[];
  dark?: boolean;
  className?: string;
}) {
  const filled = keys.filter((k) => site.contact[k]);
  if (!filled.length) return null;
  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      {filled.map((key) => {
        const value = site.contact[key]!;
        const Icon = icons[key];
        const label = key === "linkedin" ? "Jinal Dodiya" : value.replace(/^https?:\/\/(www\.)?/, "");
        return (
          <li key={key}>
            <a
              href={contactHref(key, value)}
              {...(NEW_TAB.includes(key) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={cn(
                "flex items-center gap-3 rounded-2xl p-2 pr-3 transition-colors",
                dark ? "hover:bg-white/5" : "hover:bg-canvas",
              )}
            >
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-xl border",
                  dark ? "border-white/10 bg-white/5" : "border-line bg-canvas",
                )}
              >
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block text-xs", dark ? "text-slate-400" : "text-muted")}>{contactLabels[key]}</span>
                <span className="block truncate text-sm font-medium">{label}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
