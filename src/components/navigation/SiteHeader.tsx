"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-2.5" aria-label={`${site.name}, home`}>
      <span className="relative grid size-9 place-items-center rounded-[11px] bg-ink font-display text-[0.8rem] font-bold tracking-tight text-white">
        {site.initials}
        <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-canvas bg-accent" aria-hidden />
      </span>
      <span className="font-display text-[0.95rem] font-bold tracking-tight text-ink">{site.name}</span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change (render-time sync, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Escape closes, focus moves into the panel and is trapped while open.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a, button") ?? []).filter((el) => !el.hasAttribute("disabled"));
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const items = focusables();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "no-print sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled || open
          ? "border-b border-line/80 bg-canvas/85 backdrop-blur-xl supports-[backdrop-filter]:bg-canvas/70"
          : "border-b border-transparent bg-canvas",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Logo onClick={() => setOpen(false)} />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-white/70 p-1 shadow-card">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive(item.href) ? "bg-ink text-white" : "text-muted hover:bg-canvas hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            aria-current={isActive("/contact") ? "page" : undefined}
            className="hidden h-10 items-center gap-1.5 rounded-full bg-accent px-4 font-display text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgb(37_99_235/0.6)] transition-colors hover:bg-accent-strong sm:inline-flex"
          >
            Let&apos;s connect <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line bg-white text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="container-page h-[calc(100dvh-4rem)] overflow-y-auto pb-10 pt-4 md:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-2">
              {[{ href: "/", label: "Home" }, ...site.nav, { href: "/contact", label: "Contact" }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-2xl border px-5 py-4 font-display text-xl font-semibold",
                      pathname === item.href ? "border-ink bg-ink text-white" : "border-line bg-white text-ink",
                    )}
                  >
                    {item.label}
                    <ArrowUpRight className="size-5 opacity-60" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-6 text-sm text-muted">
            {site.location.city}, {site.location.region} · Open to roles and freelance projects
          </p>
        </div>
      )}
    </header>
  );
}
