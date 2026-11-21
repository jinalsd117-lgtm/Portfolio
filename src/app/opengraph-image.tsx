import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { portfolioStats } from "@/data/projects";

export const alt = `${site.name}: ${site.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F8FAFC", padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "#111827", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700 }}>JD</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#111827" }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#2563EB", fontWeight: 700 }}>MARKETING × TECHNOLOGY × AI</div>
          <div style={{ fontSize: 66, lineHeight: 1.05, fontWeight: 800, color: "#111827", marginTop: 16, maxWidth: 980 }}>
            I Build Digital Products That Solve Real Business Problems.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748B", fontSize: 24 }}>
          <div style={{ display: "flex" }}>{site.role} · {site.location.city}, {site.location.country}</div>
          <div style={{ display: "flex", background: "#EAF1FF", color: "#1D4ED8", padding: "10px 20px", borderRadius: 999, fontWeight: 700 }}>
            {portfolioStats.entries} portfolio entries
          </div>
        </div>
      </div>
    ),
    size,
  );
}
