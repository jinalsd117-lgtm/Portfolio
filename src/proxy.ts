import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/data/projects";

const slugs = new Set(projects.map((p) => p.slug));

/**
 * Return a real 404 status for unknown case-study slugs. With Cache
 * Components the page shell streams first (status 200), so the check has to
 * happen here, before rendering starts.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !slugs.has(slug)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
}

export const config = {
  // /projects/<slug> only — not its opengraph-image or other assets.
  matcher: "/projects/:slug",
};
