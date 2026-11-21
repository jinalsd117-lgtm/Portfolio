import { ImageResponse } from "next/og";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  const title = p?.title ?? "Project";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#111827", padding: 64, fontFamily: "sans-serif", color: "#fff" }}>
        <div style={{ display: "flex", gap: 10 }}>
          {(p?.categories ?? []).map((c) => (
            <div key={c} style={{ display: "flex", background: "#EAF1FF", color: "#1D4ED8", padding: "8px 18px", borderRadius: 999, fontSize: 22, fontWeight: 700 }}>{c}</div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, color: "#93C5FD", fontWeight: 700, letterSpacing: 3 }}>CASE STUDY</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.03, marginTop: 12 }}>{title}</div>
          <div style={{ fontSize: 28, color: "#CBD5E1", marginTop: 18, maxWidth: 1000 }}>{p?.summary ?? ""}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#94A3B8" }}>{site.name} · {site.positioning}</div>
      </div>
    ),
    size,
  );
}
