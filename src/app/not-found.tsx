import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getFeatured } from "@/data/projects";
import { buttonClasses } from "@/components/ui/Button";

export default function NotFound() {
  const suggestions = getFeatured().slice(0, 3);
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-20">
      <div className="max-w-xl text-center">
        <p className="font-display text-[7rem] font-extrabold leading-none tracking-tighter text-accent">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink">This page doesn&apos;t exist.</h1>
        <p className="mt-3 text-muted">The link may be old or mistyped. These might be what you were after:</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {suggestions.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className={buttonClasses("dark", "lg", "mt-8")}>
          <ArrowLeft className="size-4" aria-hidden /> Back to home
        </Link>
      </div>
    </div>
  );
}
