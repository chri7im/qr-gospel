export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const country = req.headers['x-vercel-ip-country'] || '';
  res.status(200).json({ country });
}
