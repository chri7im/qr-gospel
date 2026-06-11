import { clientIp, makeRateLimiter, makeGlobalLimiter } from './_security.js';

// Cap runtime: this function calls OpenAI and commits to GitHub
export const config = { maxDuration: 30 };

const SYSTEM = `You are a professional translator. You will receive a JSON object containing UI strings for a gospel presentation website. Translate ALL values into the requested language. Return ONLY valid JSON — no markdown, no explanation, no wrapping.

Rules:
- Translate naturally and fluently, not word-for-word
- Address the visitor with the warm informal singular "you" (tu/du-style) where the language distinguishes formality; use the respectful/polite form instead only in languages where informal address would be impolite to an adult stranger (e.g. Hindi, Japanese, Korean)
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
  consentLabel: 'I agree to be contacted by QR Gospel about faith-related topics. I can unsubscribe at any time.',
  consentError: 'Please check the box above before submitting.',
  privacyLink: 'Privacy Policy',
  formErr: 'Please enter your name or email.',
  emailErr: 'Please check your email address.',
  share: 'Share with a friend',
  aBack: 'Go back', aNext: 'Continue',
  bibleBtn: 'Read the Bible for free',
  printedBtn: 'Order a free printed Bible',
  supportLink: 'Support this project',
  tyT: 'Thank you!', tyS: "We'll be in touch soon.", tySkip: 'May you find peace.',
  pn: 'Paul', dir: 'ltr'
};

// Valid ISO 639-1 language codes (prevents fake codes from burning API credits).
// Includes the built-in codes — those are rejected separately with a clearer error.
const VALID_ISO = new Set([
  'aa','ab','af','ak','am','an','ar','as','av','ay','az','ba','be','bg','bh','bi','bm','bn',
  'bo','br','bs','ca','ce','ch','co','cr','cs','cu','cv','cy','da','de','dv','dz','ee','el',
  'en','eo','es','et','eu','fa','ff','fi','fj','fo','fr','fy','ga','gd','gl','gn','gu','gv',
  'ha','he','hi','ho','hr','ht','hu','hy','hz','ia','id','ie','ig','ii','ik','io','is','it',
  'iu','ja','jv','ka','kg','ki','kj','kk','kl','km','kn','ko','kr','ks','ku','kv','kw','ky',
  'la','lb','lg','li','ln','lo','lt','lu','lv','mg','mh','mi','mk','ml','mn','mr','ms','mt',
  'my','na','nb','nd','ne','ng','nl','nn','no','nr','nv','ny','oc','oj','om','or','os','pa',
  'pi','pl','ps','pt','qu','rm','rn','ro','ru','rw','sa','sc','sd','se','sg','si','sk','sl',
  'sm','sn','so','sq','sr','ss','st','su','sv','sw','ta','te','tg','th','ti','tk','tl','tn',
  'to','tr','ts','tt','tw','ty','ug','uk','ur','uz','ve','vi','vo','wa','wo','xh','yi','yo',
  'za','zh','zu'
]);

// Languages we already have built-in (no need to translate)
const BUILTIN = new Set(['ar','en','fa','fr','de','hi','it','ja','ko','zh','pt','ru','es','sw']);

// Languages we will auto-translate on demand. Deliberately a curated allowlist of
// languages real phones are actually set to — NOT all ~180 ISO codes. Each new
// language is an OpenAI call + a GitHub commit + a production deploy, so allowing
// the obscure long tail (Church Slavonic, Cree, Ndonga…) just hands an attacker a
// way to spam commits and trigger deploy storms. A visitor whose language isn't
// here cleanly falls back to the English UI (the pre-existing behaviour for any
// untranslated language).
const SUPPORTED_DYNAMIC = new Set([
  'nl','pl','tr','uk','ro','el','cs','hu','sv','da','fi','no','nb','nn','he','th','vi','id',
  'ms','tl','bn','ur','pa','ta','te','mr','gu','kn','ml','si','ne','my','km','lo','ps','ku',
  'bg','hr','sr','bs','sk','sl','lt','lv','et','sq','mk','is','ga','cy','eu','gl','ca','af',
  'am','ha','yo','ig','zu','xh','st','sn','so','rw','lg','ka','hy','az','kk','uz','ky','tg',
  'tk','tt','ba','mn','bo','dv','or','as'
]);

const REPO = 'chri7im/qr-gospel';
const BRANCH = 'master';

// In-flight translations — prevents stampede (multiple concurrent requests for same lang)
const inFlight = new Map();

// Per-IP limit (6 per 10 min) plus a per-instance global runaway breaker. A new
// language is only ever translated ONCE (then served as a static, CDN-cached
// ui.json), so even a global launch produces few distinct new-language events per
// instance per window — 15/10min is comfortable headroom that only trips on an
// attacker iterating many codes. The allowlist already blocks the obscure long tail.
const allowIp = makeRateLimiter({ windowMs: 10 * 60 * 1000, max: 6 });
const allowGlobal = makeGlobalLimiter({ windowMs: 10 * 60 * 1000, max: 15 });

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
    const existing = await fetch(`${apiBase}?ref=${BRANCH}`, { headers, signal: AbortSignal.timeout(8000) });
    if (existing.ok) {
      const data = await existing.json();
      sha = data.sha;
    }
  } catch (e) {}

  const body = { message, content: Buffer.from(content).toString('base64'), branch: BRANCH };
  if (sha) body.sha = sha;

  const put = await fetch(apiBase, {
    method: 'PUT', headers, body: JSON.stringify(body),
    signal: AbortSignal.timeout(10000)
  });
  if (!put.ok) {
    console.error('GitHub commit failed:', put.status, await put.text().catch(() => ''));
  }
}

async function translateLang(lang) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    signal: AbortSignal.timeout(25000),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      max_tokens: 2000,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: `Translate this JSON into the language with code "${lang}":\n\n${JSON.stringify(TEMPLATE)}` }
      ]
    })
  });

  if (!response.ok) throw new Error('OpenAI API error: ' + response.status);

  const data = await response.json();
  // Defensive: tolerate empty/filtered completions and strip markdown code fences
  const content = (data.choices?.[0]?.message?.content || '').trim().replace(/^```(?:json)?\s*|\s*```$/g, '');
  if (!content) throw new Error('Empty translation response');
  const translated = JSON.parse(content);

  if (!translated.iss || !Array.isArray(translated.iss) || translated.iss.length !== 14) {
    throw new Error('Invalid translation structure');
  }

  return translated;
}

export default async function handler(req, res) {
  // Same-origin API — intentionally no CORS headers
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { lang } = req.body || {};

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
  // Only auto-translate curated, real-world languages — see SUPPORTED_DYNAMIC
  if (!SUPPORTED_DYNAMIC.has(lang)) {
    return res.status(400).json({ error: 'Language not supported' });
  }

  // Rate-limit AFTER validation so cheap rejects (bad/obscure codes) don't consume
  // the budget that protects the expensive OpenAI + GitHub path
  if (!allowIp(clientIp(req)) || !allowGlobal()) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  // 1. Check if already committed to GitHub (static cache)
  try {
    const staticCheck = await fetch(
      `https://raw.githubusercontent.com/${REPO}/${BRANCH}/texts/${lang}/ui.json`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (staticCheck.ok) {
      return res.status(200).json(await staticCheck.json());
    }
  } catch (e) {}

  // 2. Deduplicate: if a translation for this lang is already in progress (or done
  //    on this warm instance), reuse it
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

  let translated;
  try {
    translated = await promise;
  } catch (err) {
    // Evict failed promises right away so the next visitor can retry
    inFlight.delete(lang);
    console.error('Translate error:', err);
    return res.status(500).json({ error: 'Translation failed' });
  }

  // Commit BEFORE responding: serverless instances freeze once the response is
  // sent, so background work would be lost — and losing the commit means every
  // future visitor with this language pays for a fresh OpenAI call.
  await commitToGitHub(
    `texts/${lang}/ui.json`,
    JSON.stringify(translated, null, 2),
    `Add auto-translated UI strings for language: ${lang}`
  ).catch((err) => console.error('Commit error:', err));

  // Successful results stay in the map as a warm per-instance cache
  return res.status(200).json(translated);
}
