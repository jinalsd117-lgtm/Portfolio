"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-20">
      <div role="alert" className="max-w-lg text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink">This page didn&apos;t load properly.</h1>
        <p className="mt-3 text-muted">It&apos;s probably temporary. Try again, or head back to the home page.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className={buttonClasses("primary", "lg")}>
            <RotateCcw className="size-4" aria-hidden /> Try again
          </button>
          <Link href="/" className={buttonClasses("secondary", "lg")}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
