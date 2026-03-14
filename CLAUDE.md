# qr-gospel.com — Project Brief

## What this is
A mobile-first, multi-language gospel presentation website. People scan a QR code on a sticker in public, land on this page, pick their language, pick their biggest life problem, and receive a pre-written gospel presentation (Tim Keller style). They can optionally leave contact details and receive a localized welcome email.

## Tech stack
- Pure HTML/CSS/JS single-page app (`index.html`) — no framework, no build step
- Vercel serverless functions (`api/`) for OpenAI API fallback, translation, contact form, and geo detection
- Fonts: Lora (serif, for body/gospel text) + DM Sans (sans, for UI chrome)
- Colour scheme: white background, navy blue accent (`#1e3a5f`)
- Deployed to: qr-gospel.com via Vercel (auto-deploys from GitHub)
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
├── index.html              ← entire frontend (all 6 pages, CSS, JS)
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
│   ├── favicon.svg          ← Navy blue circle with white cross
│   ├── og.png               ← Open Graph image for social sharing (1200×630)
│   ├── og.svg               ← OG image source
│   └── qr-code.svg          ← Branded QR code for stickers
├── vercel.json              ← Routing config
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
- **Rate limiting** — 10 requests/minute per IP on gospel API
- **Input validation** — issue capped at 200 chars, language codes validated against ISO 639-1
- Built-in languages are rejected by translate API (no wasted calls)

## Contact form emails
- **Owner notification**: HTML table with name, email, phone, language, issue
- **Visitor welcome email**: Warm, personal, localized in all 14 languages. Stored in `api/contact.js` (not AI-generated). Navy blue header, serif body, RTL support for Arabic/Farsi.

## Keyboard navigation
- `↑`/`↓`/`←`/`→` — scroll language picker (page 1)
- `Enter`/`Space` — proceed on any page
- `Backspace`/`Escape` — go back
- `1`-`9`, `0` — quick-pick issue by number (page 3)
- `Enter` — submit custom issue (page 4) or contact form (page 6)

## Languages supported (14 built-in, in display order)
Arabic, English, Farsi, French, German, Hindi, Italian, Japanese, Korean, Mandarin, Portuguese, Russian, Spanish, Swahili

## Issues supported (14, in display order)
Addiction, Anxiety, Depression, Fear, Guilt, Loneliness, Panic attacks, Lack of Purpose, Shame, Anger, Grief, Envy, Bitterness, Emptiness

## Important design notes
- **Mobile first** — max-width ~420px, everything optimised for thumb reach
- **RTL support** — Arabic and Farsi get `dir="rtl"` on the html element
- **No frameworks** — vanilla JS only, no build step
- **Informal tone** — all languages use informal "you" (du, tu, ты, etc.)
- **Titles** — all 24px Lora serif in `#1e3a5f` (matching button color)
- **Contact page** — consent-focused intro ("share only if comfortable")

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
