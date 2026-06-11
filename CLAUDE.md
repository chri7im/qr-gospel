# qr-gospel.com — Project Brief

## What this is
A mobile-first, multi-language gospel presentation website. People scan a QR code on a sticker in public, land on this page, pick their language, pick their biggest life problem, and receive a pre-written gospel presentation (Tim Keller style). They can optionally leave contact details and receive a localized welcome email.

## Tech stack
- Pure HTML/CSS/JS single-page app — no framework, no build step. Markup in `index.html`, all CSS/JS externalized to `public/` (strict CSP forbids inline styles/scripts)
- Vercel serverless functions (`api/`) for OpenAI API fallback, translation, contact form, and geo detection
- Fonts: Lora (serif, for body/gospel text) + DM Sans (sans, for UI chrome) — **self-hosted** in `public/fonts/` (variable woff2, OFL), no Google Fonts requests (GDPR + speed)
- Colour scheme: white background, navy blue accent (`#1e3a5f`)
- Deployed to: www.qr-gospel.com (canonical) via Vercel (auto-deploys from GitHub)
- Repo: github.com/chri7im/qr-gospel

## Flow (6 pages, all in one HTML file, JS-driven transitions)
1. **page1** — Language selector (scroll snap, 14 built-in languages, auto-detects phone language)
2. **page2** — About us (mission statement, body text splits at `!` for line break)
3. **page3** — Issue selector ("What bothers you most in life?" — 14 preset issues)
4. **page4** — Free-text input (only if user picks "Something else...")
5. **page5** — Gospel presentation (static texts primary, OpenAI API fallback)
6. **page6** — Contact form (name / email / phone) → welcome email to visitor + notification to owner

## Content architecture
- **196 static gospel texts** in `texts/{lang}/{issue}.htm` (14 languages × 14 issues)
- Static texts are the PRIMARY source — served instantly, no API cost
- OpenAI API is FALLBACK only — used for custom "Something else..." issues and unsupported languages
- All texts open with: "There is a story so ancient, it is part of our DNA. That story explains the root cause of your [issue]."
- German variant: "Es gibt eine Geschichte, die ist so alt, dass sie Teil unserer DNA ist."

## File structure
```
qr-gospel/
├── index.html              ← markup for all 6 pages (no inline CSS/JS — strict CSP)
├── privacy.html            ← /privacy shell, content injected by public/privacy.js
├── api/
│   ├── gospel.js           ← OpenAI API fallback for custom issues (rate-limited, hardened)
│   ├── translate.js         ← Auto-translates UI for new languages, commits to GitHub
│   ├── contact.js           ← Contact form → Resend emails (owner notification + visitor welcome)
│   └── geo.js               ← Returns visitor's country code from Vercel headers
├── texts/
│   ├── {ar,de,en,es,fa,fr,hi,it,ja,ko,pt,ru,sw,zh}/
│   │   ├── addiction.htm    ← Static gospel text (HTML with <p>, <em>, <strong>)
│   │   ├── anxiety.htm
│   │   ├── ... (14 issues per language)
│   │   └── emptiness.htm
│   └── {dynamic}/
│       └── ui.json          ← Auto-committed UI translations for new languages
├── public/
│   ├── app.js               ← all frontend logic + LANGS i18n table (14 languages)
│   ├── styles.css           ← all app styling (incl. a11y: focus, reduced-motion, RTL)
│   ├── privacy.js           ← privacy policy content in 14 languages
│   ├── privacy.css          ← privacy page styling
│   ├── fonts.css            ← @font-face for self-hosted fonts (unicode-range subsets)
│   ├── fonts/               ← Lora + DM Sans variable woff2 (16 files) + LICENSE.txt
│   ├── favicon.svg          ← Navy blue circle with white cross
│   ├── apple-touch-icon.png ← 180×180 iOS home-screen icon
│   ├── og.png               ← Open Graph image for social sharing (1200×630)
│   ├── og.svg               ← OG image source
│   └── qr-code.svg          ← Branded QR code for stickers
├── robots.txt               ← allows all, hides /api/ and /texts/, points to sitemap
├── sitemap.xml              ← / and /privacy
├── vercel.json              ← Routing + security headers (CSP, HSTS, COOP…) + font caching
├── package.json             ← type: module
├── .gitignore
└── CLAUDE.md                ← this file
```

## Environment variables (set in Vercel dashboard)
- `OPENAI_API_KEY` — OpenAI API key (for custom issues + dynamic language translation)
- `GITHUB_TOKEN` — GitHub personal access token with repo:contents write (for auto-committing translations)
- `RESEND_API_KEY` — Resend.com API key (for contact form emails)
- `CONTACT_EMAIL` — Email address where contact submissions are sent

## Dynamic language support
When a visitor's phone language isn't one of the 14 built-in:
1. Frontend checks `navigator.languages` → no match
2. Tries `/texts/{code}/ui.json` (static file from a previous auto-translation)
3. If not found, calls `/api/translate` → OpenAI translates all UI strings
4. API commits `texts/{code}/ui.json` to GitHub → Vercel auto-deploys
5. Next visitor with that language gets static file instantly (zero API cost)
- Language codes validated against ISO 639-1 (rejects fake codes)
- In-memory deduplication prevents stampede (concurrent requests share one API call)

## API security
- **No client-side prompts** — frontend sends only `{ lang, issue }`, prompt is built server-side
- **System prompt** constrains output to gospel content only (no recipes, code, jokes, etc.)
- **Trustworthy client IP** — `clientIp()` in `api/_security.js` keys rate limits on Vercel's `x-real-ip` (non-spoofable), never the client-controllable leftmost `x-forwarded-for`. Do NOT revert to reading XFF's first hop — that lets one machine rotate a header and bypass every limit.
- **Two-layer rate limiting** (`api/_security.js`, per warm instance):
  - per-IP: gospel 10/min, translate 6/10min, contact 5/10min
  - per-instance global circuit breaker (caps total work across all IPs, so a botnet can't multiply cost): gospel 60/min, translate 8/10min, contact 40/10min
  - These are in-memory/per-instance. For a hard global guarantee use a shared store (Vercel KV); the global breaker bounds per-instance worst case in the meantime.
- **Dynamic-translation allowlist** — `SUPPORTED_DYNAMIC` in `api/translate.js` is a curated set of real-world languages. We do NOT auto-translate all ~180 ISO codes: each new language is an OpenAI call + a GitHub commit + a production deploy, so the obscure long tail is an abuse vector (commit spam / deploy storms). **To enable a new language, add its ISO code to `SUPPORTED_DYNAMIC`.** Unsupported codes get a clean 400 and the visitor falls back to the English UI.
- **Input validation** — issue capped at 200 chars; language codes must match `^[a-z]{2,3}$` and pass ISO + allowlist checks
- **No CORS headers** — APIs are same-origin only; other origins can't read responses from a browser
- **Consent** — contact API requires a consent signal; the **server's** receipt time is recorded as the authoritative `consentedAt` (the client clock is untrusted; a sane client value is kept, otherwise replaced with server time)
- **Honeypot** — hidden `hp_field` input; filled = silent drop, no email sent
- **Email anti-abuse** — welcome email max once per address per 24h; owner notification deduped on identical payload within 5 min
- Upstream fetches (OpenAI, GitHub, Resend) have abort timeouts (≤25s) that keep functions well under their `maxDuration`
- **Out of code's reach — set these in the dashboards:** an OpenAI usage/spend limit, Vercel Spend Management, and (if abuse appears) Vercel WAF / Attack Challenge Mode. Per-instance limits can't cap a large botnet on their own.

## i18n string sync (IMPORTANT)
Adding a UI string = update **three places together** or dynamic languages break:
1. Every entry in `LANGS` (public/app.js, 14 entries)
2. `TEMPLATE` in api/translate.js (so new dynamic languages get it translated)
3. `buildLangEntry()` in public/app.js (with an English fallback for older cached ui.json)

## Analytics (Vercel Web Analytics — anonymous, cookie-free)
- Dashboard: Vercel project → Analytics tab. No consent banner needed; already disclosed in the privacy policy ("anonymous and cookie-free visit statistics").
- **Visitors/pageviews**: tracked since the script was added.
- **Funnel, languages, issues**: every step pushes a virtual path via the History API; the analytics script counts these as pageviews → visible in the "Pages" panel:
  - `/s/{lang}/about` → `/s/{lang}/issues` → `/s/{lang}/write` (custom input) → `/s/{lang}/gospel/{issueKey|custom}` → `/s/{lang}/contact` → `/s/{lang}/thanks` or `/s/{lang}/skipped`
  - Filter by `/s/de/` for one language, by `gospel/` for issue distribution, by step name for the funnel.
- **Custom events** (`language_selected`, `issue_selected`, `learn_more`, `contact_submitted`, `contact_skipped`, `shared`) are also fired via `va('event', …)` — they appear only on Vercel plans with custom-events support (Pro+); on Hobby they are silently dropped. Funnel events fire once per session per step (revisits don't inflate).
- **PRIVACY RULE**: never track free text, names, emails or phone numbers. Custom issues are tracked as `custom`, never the typed text.
- Side effect: the browser back button / swipe gesture navigates the flow (popstate handler) instead of leaving the site. Step URLs normalise back to `/` on reload; `/s/` is disallowed in robots.txt.

## Bible offers (thank-you screen, both submitted and skipped paths)
- **Lead button**: "Read the Bible for free" → https://www.bible.com/ (YouVersion — free, ~2,000 languages, localizes itself). Always shown.
- **Extra link**: "Order a free printed Bible" — shown only when `PRINTED_BIBLE_OFFERS[country]` (public/app.js) has a vetted partner for the visitor's country (detected via `/api/geo`, memoized). Currently: `DE` → Christlicher Plakatdienst e.V. (c-plakat.de — ministry, free + free shipping, materials in ~10 languages).
- Extending: add one line to `PRINTED_BIBLE_OFFERS`. Keep the list personally vetted; check the URLs occasionally (deep links rot).
- Both links open in a new tab (`rel="noopener"`), fire `bible_link_clicked` analytics events (`kind: online|printed`), and use the `bibleBtn`/`printedBtn` i18n keys (synced across LANGS/TEMPLATE/buildLangEntry as usual).

## Support page (/support — optional donations via Ko-fi)
- Quiet, optional ask shown only AFTER value is delivered: a small localized "Support this project" link on the thank-you screen (both submitted and skipped), the lowest-priority action below the Bible + share buttons. Never on the gospel page, never a gate.
- Links to **`/support?lang=xx`** — our own warm, localized page (`support.html` + `public/support.js`, mirrors the privacy page, reuses privacy.css). It explains the running costs and links out to **Ko-fi**.
- **►► To activate: paste the Ko-fi page URL into `SUPPORT_URL` in `public/support.js` (one line).** Until set, the page shows its message but no Give button (nothing breaks). That constant is the only donation config.
- Framing is deliberately **"support / help keep it free," NOT tax-deductible "donation"** — the project runs as a lean individual setup (Barcelona), not a registered charity. If it ever becomes a registered *asociación*, the wording can change and deductible receipts become possible.
- `support_clicked` analytics event fires on the thank-you link (per language); the /support page is also a normal Vercel Analytics pageview. The Ko-fi page link uses `rel="noopener"`, new tab. No backend, no secrets, CSP untouched (plain outbound navigation).
- The thank-you-screen label is the `supportLink` i18n key (synced LANGS + TEMPLATE + buildLangEntry). The /support page copy lives in `support.js`'s SUPPORT object (14 languages; dynamic languages fall back to English, like the privacy page).

## Contact form emails
- **Owner notification**: HTML table (plus plain-text part) with name, email, phone, language, issue, consent timestamp. If this send fails the API returns 502 and logs — it's the only persistence of the submission.
- **Visitor welcome email**: Warm, personal, localized in all 14 languages. Stored in `api/contact.js` (not AI-generated). Navy blue header, serif body, RTL support for Arabic/Farsi, unsubscribe line, privacy link, plain-text alternative.

## Keyboard navigation
- `↑`/`↓`/`←`/`→` — scroll language picker (page 1)
- `Enter`/`Space` — proceed on any page
- `Backspace`/`Escape` — go back
- `1`-`9`, `0` — quick-pick issue by number (page 3)
- `Enter` — submit custom issue (page 4) or contact form (page 6)

## Languages supported (14 built-in, in display order)
Arabic, English, Farsi, French, German, Hindi, Italian, Japanese, Korean, Mandarin, Portuguese (European), Russian, Spanish, Swahili

## Issues supported (14, in display order)
Addiction, Anxiety, Depression, Fear, Guilt, Loneliness, Panic attacks, Lack of Purpose, Shame, Anger, Grief, Envy, Bitterness, Emptiness

## Important design notes
- **Mobile first** — max-width ~420px, everything optimised for thumb reach
- **RTL support** — Arabic and Farsi get `dir="rtl"` on the html element
- **No frameworks** — vanilla JS only, no build step
- **Informal tone** — languages with a T-V distinction use the informal singular "you" (du, tu, ты, تو, 你); Portuguese is European (tu register, ADN, contacto, equipa)
- **Register exceptions** — Hindi deliberately uses the respectful आप (informal तुम reads condescending to adult strangers); Japanese/Korean use the standard polite forms (です/ます, 해요/합니다). Scripture quotes keep their Bible-translation register (plural vous/вы/شما/أنتم, Hindi तू for God) even where narration is informal — that's correct, not an inconsistency.
- **Titles** — all 24px Lora serif in `#1e3a5f` (matching button color)
- **Contact page** — consent-focused intro ("share only if comfortable")
- **Strict CSP** — no inline `style=""`/`onclick=""` allowed anywhere; use classes + addEventListener
- **Accessibility** — inactive pages are `visibility: hidden`; focus moves to the new page's heading on transition; aria-labels localized via `aBack`/`aNext` keys; `prefers-reduced-motion` honoured
- **Privacy/GDPR** — privacy policy at /privacy in 14 languages discloses processors (Vercel, Resend) and the issue+language collection; consent checkbox unticked by default and enforced server-side

## How to run locally
```bash
# Recommended — runs API functions too
vercel dev

# Static preview only (APIs won't work)
npx serve .
```

## Deployment
Auto-deploys from GitHub on every push to master. Manual deploy:
```bash
vercel --prod
```
