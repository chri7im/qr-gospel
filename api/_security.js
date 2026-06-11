// Shared serverless security helpers.
// The leading underscore keeps Vercel from exposing this file as an API route;
// the harmless default export below is a belt-and-suspenders 404 in case that
// ever changes.

// Trustworthy client IP.
// On Vercel, `x-real-ip` is set by the platform to the actual connecting IP and
// cannot be spoofed by the client. `x-forwarded-for`, in contrast, can be
// PREFIXED with attacker-controlled values — its leftmost entry is whatever the
// client claims. We therefore never trust XFF's first hop; if we must fall back
// to it (e.g. local `vercel dev`) we take the LAST hop, added by the trusted
// edge. Keying rate limits on the leftmost XFF entry would let one machine rotate
// a header and bypass every limit.
export function clientIp(req) {
  const real = req.headers['x-real-ip'];
  if (typeof real === 'string' && real.trim()) return real.trim();
  const hops = String(req.headers['x-forwarded-for'] || '')
    .split(',').map(s => s.trim()).filter(Boolean);
  if (hops.length) return hops[hops.length - 1];
  return 'unknown';
}

// Fixed-window per-key limiter (per warm instance). Blocked hits do not extend
// the window. Self-prunes so the map can't grow without bound.
export function makeRateLimiter({ windowMs, max }) {
  const map = new Map();
  return function allow(key) {
    const now = Date.now();
    const recent = (map.get(key) || []).filter(t => now - t < windowMs);
    map.set(key, recent);
    if (recent.length >= max) return false;
    recent.push(now);
    if (map.size > 10000) {
      for (const [k, v] of map) {
        if (v.every(t => now - t > windowMs)) map.delete(k);
      }
    }
    return true;
  };
}

// Per-instance global circuit breaker — caps total work across ALL source IPs in
// a window, so a botnet or IP-rotating attacker can't multiply cost without
// bound. Set well above legitimate traffic; it only trips under abuse.
export function makeGlobalLimiter({ windowMs, max }) {
  let hits = [];
  return function allow() {
    const now = Date.now();
    hits = hits.filter(t => now - t < windowMs);
    if (hits.length >= max) return false;
    hits.push(now);
    return true;
  };
}

// Not an endpoint — see header note.
export default function handler(req, res) {
  res.status(404).json({ error: 'Not found' });
}
