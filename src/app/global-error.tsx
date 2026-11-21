"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#F8FAFC", color: "#111827", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0 }}>
        <div role="alert" style={{ textAlign: "center", padding: 24 }}>
          <h1 style={{ fontSize: 28 }}>Something went wrong.</h1>
          <p style={{ color: "#64748B" }}>Please try again.</p>
          <button onClick={reset} style={{ marginTop: 16, padding: "12px 20px", borderRadius: 999, border: 0, background: "#2563EB", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
