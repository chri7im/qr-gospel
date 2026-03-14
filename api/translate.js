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

// Valid ISO 639-1 language codes (prevents fake codes from burning API credits)
const VALID_ISO = new Set([
  'aa','ab','af','ak','am','an','as','av','ay','az','ba','be','bg','bh','bi','bm','bn','bo',
  'br','bs','ca','ce','ch','co','cr','cs','cu','cv','cy','da','dv','dz','ee','el','eo','et',
  'eu','ff','fi','fj','fo','fy','ga','gd','gl','gn','gu','gv','ha','he','ho','hr','ht','hu',
  'hy','hz','ia','id','ie','ig','ii','ik','io','is','iu','jv','ka','kg','ki','kj','kk','kl',
  'km','kn','kr','ks','ku','kv','kw','ky','la','lb','lg','li','ln','lo','lt','lu','lv','mg',
  'mh','mi','mk','ml','mn','mr','ms','mt','my','na','nb','nd','ne','ng','nl','nn','no','nr',
  'nv','ny','oc','oj','om','or','os','pa','pi','pl','ps','qu','rm','rn','ro','rw','sa','sc',
  'sd','se','sg','si','sk','sl','sm','sn','so','sq','sr','ss','st','su','sv','ta','te','tg',
  'th','ti','tk','tl','tn','to','tr','ts','tt','tw','ty','ug','uk','ur','uz','ve','vi','vo',
  'wa','wo','xh','yi','yo','za','zu'
]);

// Languages we already have built-in (no need to translate)
const BUILTIN = new Set(['ar','en','fa','fr','de','hi','it','ja','ko','zh','pt','ru','es','sw']);

const REPO = 'chri7im/qr-gospel';
const BRANCH = 'master';

// In-flight translations — prevents stampede (multiple concurrent requests for same lang)
const inFlight = new Map();

async function commitToGitHub(path, content, message) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return;

  const apiBase = `https://api.github.com/repos/${REPO}/contents/${path}`;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json'
  };

  let sha;
  try {
    const existing = await fetch(`${apiBase}?ref=${BRANCH}`, { headers });
    if (existing.ok) {
      const data = await existing.json();
      sha = data.sha;
    }
  } catch (e) {}

  const body = { message, content: Buffer.from(content).toString('base64'), branch: BRANCH };
  if (sha) body.sha = sha;

  await fetch(apiBase, { method: 'PUT', headers, body: JSON.stringify(body) });
}

async function translateLang(lang) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      max_tokens: 2000,
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: `Translate this JSON into the language with code "${lang}":\n\n${JSON.stringify(TEMPLATE)}` }
      ]
    })
  });

  if (!response.ok) throw new Error('OpenAI API error: ' + response.status);

  const data = await response.json();
  const translated = JSON.parse(data.choices[0].message.content.trim());

  if (!translated.iss || !Array.isArray(translated.iss) || translated.iss.length !== 14) {
    throw new Error('Invalid translation structure');
  }

  return translated;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { lang } = req.body;

  // Validate: must be a real ISO 639-1 code and not already built-in
  if (!lang || typeof lang !== 'string' || !/^[a-z]{2,3}$/.test(lang)) {
    return res.status(400).json({ error: 'Invalid language code' });
  }
  if (!VALID_ISO.has(lang)) {
    return res.status(400).json({ error: 'Unknown language code' });
  }
  if (BUILTIN.has(lang)) {
    return res.status(400).json({ error: 'Language already built-in' });
  }

  // 1. Check if already committed to GitHub (static cache)
  try {
    const staticCheck = await fetch(
      `https://raw.githubusercontent.com/${REPO}/${BRANCH}/texts/${lang}/ui.json`
    );
    if (staticCheck.ok) {
      return res.status(200).json(await staticCheck.json());
    }
  } catch (e) {}

  // 2. Deduplicate: if a translation for this lang is already in progress, wait for it
  if (inFlight.has(lang)) {
    try {
      const result = await inFlight.get(lang);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: 'Translation failed' });
    }
  }

  // 3. Translate (single API call, shared across concurrent requests)
  const promise = translateLang(lang);
  inFlight.set(lang, promise);

  try {
    const translated = await promise;
    res.status(200).json(translated);

    // Commit to GitHub in the background
    const jsonContent = JSON.stringify(translated, null, 2);
    commitToGitHub(
      `texts/${lang}/ui.json`,
      jsonContent,
      `Add auto-translated UI strings for language: ${lang}`
    ).catch(() => {});

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    // Clean up after a delay (keep the result cached for 60s for any stragglers)
    setTimeout(() => inFlight.delete(lang), 60000);
  }
}
