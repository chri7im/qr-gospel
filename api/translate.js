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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { lang } = req.body;
  if (!lang || typeof lang !== 'string' || lang.length > 10) {
    return res.status(400).json({ error: 'Invalid language code' });
  }

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

    // Parse the JSON response
    const translated = JSON.parse(text);

    // Validate structure
    if (!translated.iss || !Array.isArray(translated.iss) || translated.iss.length !== 14) {
      return res.status(500).json({ error: 'Invalid translation structure' });
    }

    return res.status(200).json(translated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
