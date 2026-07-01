// Best-effort in-memory rate limiter for the AI consultation endpoint.
//
// Limitation: this Map only persists for the lifetime of a single warm
// serverless/edge function instance. On Vercel, concurrent/cold instances
// each get their own Map, so a determined abuser can exceed these limits by
// hitting different instances. This still meaningfully cuts down casual
// abuse and accidental loops (e.g. a buggy retry) without adding a paid
// external dependency. For a hard guarantee, back this with Upstash Redis or
// Vercel KV (swap `checkRateLimit`'s implementation, same call signature).
type Bucket = { count: number; windowStart: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5000; // safety cap so the Map can't grow unbounded

export function checkRateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number },
): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart > windowMs) {
    if (buckets.size >= MAX_BUCKETS) pruneOldest();
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (bucket.count >= max) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((windowMs - (now - bucket.windowStart)) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true };
}

function pruneOldest() {
  // Drop the ~10% oldest entries when the map hits its cap.
  const entries = [...buckets.entries()].sort((a, b) => a[1].windowStart - b[1].windowStart);
  const toRemove = Math.ceil(entries.length * 0.1);
  for (let i = 0; i < toRemove; i++) buckets.delete(entries[i][0]);
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}
