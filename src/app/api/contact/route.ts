import { normalise, validate } from "@/lib/contact";

/**
 * POST /api/contact
 *
 * Forwards a validated inquiry to CONTACT_WEBHOOK_URL (Formspree, Make,
 * Zapier, Slack workflow, n8n, your own endpoint…). Nothing is stored here.
 * Returns 503 until the webhook is configured, so the site never claims to
 * have sent a message it couldn't deliver.
 */

const MAX_BODY_BYTES = 16_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Best-effort, per-instance rate limit. Use a shared store (e.g. Upstash) for strict limits.
const hits = new Map<string, number[]>();

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return json({ ok: false, error: "The contact form isn't connected yet." }, 503);
  }

  // Same-origin check (basic CSRF protection).
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json({ ok: false, error: "Invalid origin." }, 403);
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ ok: false, error: "Message is too large." }, 413);

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    return json({ ok: false, error: "Too many messages. Please try again a little later." }, 429);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const payload = normalise(raw);
  if (!payload) return json({ ok: false, error: "Invalid request." }, 400);

  // Honeypot filled → pretend success, drop silently.
  if (payload.website) return json({ ok: true });

  const errors = validate(payload);
  if (Object.keys(errors).length) {
    return json({ ok: false, error: "Please check the highlighted fields.", errors }, 422);
  }

  recent.push(now);
  hits.set(ip, recent);

  const { website: _honeypot, ...fields } = payload;
  void _honeypot;

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.CONTACT_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({
        subject: fields.type === "job" ? `Job opportunity from ${fields.name}` : `Project inquiry from ${fields.name}`,
        ...fields,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch {
    // Don't log the payload: it contains personal data.
    console.error("[contact] delivery failed");
    return json({ ok: false, error: "The message couldn't be delivered right now. Please try again shortly." }, 502);
  }

  return json({ ok: true });
}
