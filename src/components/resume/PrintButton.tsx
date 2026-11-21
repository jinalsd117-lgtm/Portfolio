"use client";

import { Printer } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className={buttonClasses("primary", "md")}>
      <Printer className="size-4" aria-hidden /> Print / Save as PDF
    </button>
  );
}
