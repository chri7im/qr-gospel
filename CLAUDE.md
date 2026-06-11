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
- **Rate limiting** — gospel: 10/min/IP; translate: 6/10min/IP; contact: 5/10min/IP (in-memory, per instance)
- **Input validation** — issue capped at 200 chars, language codes validated against ISO 639-1
- Built-in languages are rejected by translate API (no wasted calls)
- **No CORS headers** — APIs are same-origin only; other origins can't read responses from a browser
- **Consent enforced server-side** — contact API rejects submissions without a valid `consentedAt` timestamp (GDPR)
- **Honeypot** — hidden `hp_field` input; filled = silent drop, no email sent
- **Welcome-email dedupe** — max one welcome email per address per 24h (anti email-bombing)
- Upstream fetches (OpenAI, GitHub, Resend) all have abort timeouts

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
