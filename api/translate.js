const SYSTEM = `You are a professional translator. You will receive a JSON object containing UI strings for a gospel presentation website. Translate ALL values into the requested language. Return ONLY valid JSON — no markdown, no explanation, no wrapping.

Rules:
- Translate naturally and fluently, not word-for-word
- Keep the same JSON keys (do not translate keys)
- The "iss" array must have exactly 14 items in the same order
- Keep arrow symbols (→ or ←) as-is, matching text direction
- For RTL languages (Arabic, Hebrew, Urdu, Pashto, etc.) use ← instead of →
- The "dir" field must be "rtl" for RTL languages, "ltr" otherwise
- The "pn" field should be a common local male name (not Paul unless it's the local form)
- Return ONLY the JSON object`;

const TEMPLATE = {
  hdr: 'Please select your language',
  ey: 'About us', ti: 'About us',
  body: 'Our only mission in this world is to spread the greatest news this world has ever heard! Love, Hope, Purpose — all are up for grabs — for you!',
  cta: 'Get it now for free →',
  qEy: 'Questionnaire', qTi: 'What bothers you most in life?',
  iss: ['Addiction','Anxiety','Depression','Fear','Guilt','Loneliness','Panic attacks','Lack of Purpose','Shame','Anger','Grief','Envy','Bitterness','Emptiness'],
  otl: 'Something else...',
  t4: 'What weighs on your heart?', s4: 'Please describe in your own words what troubles you most.', ph4: 'Write here...', b4: 'Continue →',
  tag: 'A message for you', ldg: 'Preparing your message…', lmr: "I'd like to learn more →",
  t6: 'Would you like to learn more?', s6: "Leave your details and we'll be in touch.",
  ln: 'Name', le: 'Email', lp: 'Phone (optional)',
  sb: 'Submit', sk: "No thanks, I'm good",
  tyT: 'Thank you!', tyS: "We'll be in touch soon.", tySkip: 'May you find peace.',
  pn: 'Paul', dir: 'ltr'
};

const REPO = 'chri7im/qr-gospel';
const BRANCH = 'master';

// Commit a file to GitHub via the API
async function commitToGitHub(path, content, message) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return; // silently skip if no token configured

  const apiBase = `https://api.github.com/repos/${REPO}/contents/${path}`;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json'
  };

  // Check if file already exists (get its SHA if so)
  let sha;
  try {
    const existing = await fetch(`${apiBase}?ref=${BRANCH}`, { headers });
    if (existing.ok) {
      const data = await existing.json();
      sha = data.sha;
    }
  } catch (e) {}

  // Create or update the file
  const body = {
    message,
    content: Buffer.from(content).toString('base64'),
    branch: BRANCH
  };
  if (sha) body.sha = sha;

  await fetch(apiBase, { method: 'PUT', headers, body: JSON.stringify(body) });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { lang } = req.body;
  if (!lang || typeof lang !== 'string' || !/^[a-z]{2,5}$/.test(lang)) {
    return res.status(400).json({ error: 'Invalid language code' });
  }

  // Check if this language was already translated and committed
  // by trying to fetch the static ui.json file first
  try {
    const staticCheck = await fetch(
      `https://raw.githubusercontent.com/${REPO}/${BRANCH}/texts/${lang}/ui.json`
    );
    if (staticCheck.ok) {
      const cached = await staticCheck.json();
      return res.status(200).json(cached);
    }
  } catch (e) {}

  // Not cached — translate via Anthropic
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: SYSTEM,
        messages: [{
          role: 'user',
          content: `Translate this JSON into the language with code "${lang}":\n\n${JSON.stringify(TEMPLATE)}`
        }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    const text = data.content[0].text.trim();
    const translated = JSON.parse(text);

    // Validate structure
    if (!translated.iss || !Array.isArray(translated.iss) || translated.iss.length !== 14) {
      return res.status(500).json({ error: 'Invalid translation structure' });
    }

    // Return to user immediately
    res.status(200).json(translated);

    // Commit to GitHub in the background (don't block the response)
    const jsonContent = JSON.stringify(translated, null, 2);
    commitToGitHub(
      `texts/${lang}/ui.json`,
      jsonContent,
      `Add auto-translated UI strings for language: ${lang}`
    ).catch(() => {}); // fire-and-forget

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
