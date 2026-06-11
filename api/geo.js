export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  // Per-visitor data — must never be cached by the CDN or shared caches
  res.setHeader('Cache-Control', 'private, no-store');
  const country = req.headers['x-vercel-ip-country'] || '';
  res.status(200).json({ country });
}
