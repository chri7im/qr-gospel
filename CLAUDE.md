# qr-gospel.com — Project Brief for Claude Code

## What this is
A mobile-first, multi-language gospel presentation website. People scan a QR code on a sticker in public, land on this page, pick their language, pick their biggest life problem, and receive a personalised gospel presentation powered by the Anthropic API (Tim Keller style). Then they can optionally leave contact details.

## Tech stack
- Pure HTML/CSS/JS single-page app (`index.html`) — no framework, no build step
- Vercel serverless function (`api/gospel.js`) for the Anthropic API call
- Fonts: Lora (serif, for body/gospel text) + DM Sans (sans, for UI chrome)
- Deployed to: qr-gospel.com via Vercel

## Flow (6 pages, all in one HTML file, JS-driven transitions)
1. **page1** — Language selector (scroll snap, 14 languages)
2. **page2** — About us
3. **page3** — Issue selector ("What bothers you most in life?")
4. **page4** — Free-text input (only if user picks "Something else...")
5. **page5** — Gospel presentation (AI-generated via `/api/gospel`)
6. **page6** — Contact form (name / email / phone)

## Known bugs to fix
1. **Language scroll offset** — The highlighted band on page1 does not align with the visually centred item. English (index 1) is supposed to be pre-selected on load but appears outside the band. The scroll position calculation in `initLangScroll()` needs fixing. The pad height and scroll target must be recalculated so that item at index N is perfectly centred in the band when `scrollTop = padHeight + N * ITEM_H`.

## Desired changes (do these first)
1. **White/light theme** — Invert the colour scheme. Currently dark (`#080c16` backgrounds). Change to:
   - App background: `#ffffff`
   - Page 1 (language selector): white background, dark text, gold accent (`#b8860b` or similar warm gold)
   - Page 5 (gospel): keep this one dark (`#0f172a`) as it feels more reverent — or make it a very warm cream (`#fdf8f0`)
   - All other pages: white/cream background, dark text
   - Primary button colour: warm gold `#c9923a` (keep)
   - The overall feel should be clean, warm, and trustworthy — like a well-designed Bible app

2. **Language scroll fix** (see Known bugs above)

## File structure
```
qr-gospel/
├── index.html          ← entire frontend (all 6 pages)
├── api/
│   └── gospel.js       ← Vercel serverless function (Anthropic API call)
├── vercel.json         ← routing config
└── CLAUDE.md           ← this file
```

## Environment variables (set in Vercel dashboard)
- `ANTHROPIC_API_KEY` — Anthropic API key (never put this in code)

## Deployment
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy (first time — will prompt for project setup)
vercel

# Deploy to production
vercel --prod
```

## The gospel generation prompt (in api/gospel.js + frontend)
For **preset issues** (picked from list):
> "Please present the full gospel to someone suffering from severe [issue]. Present it BIBLICALLY, just like Tim Keller would, and explain how the gospel is the ONLY REAL FULL CURE for their [issue]. The response MUST begin with exactly: 'There is a story so ancient, it is part of our DNA. That story explains the root cause of your [issue].' Write 5–6 paragraphs entirely in [language]. Do not mention any personal names."

For **custom issues** (user typed their own):
> "My friend [local name for Paul] is suffering from severe [custom issue]. Please explain the FULL gospel to him BIBLICALLY, just like Tim Keller would, and explain how the gospel is the ONLY REAL FULL CURE for his [issue]. The response should begin with 'There is a story so ancient, it is part of our DNA. That story explains the root cause of your [issue].' and then continue from there. Do not mention [name]'s name anywhere in the text. Write entirely in [language]."

## Languages supported (in order as displayed)
Arabic, English, Farsi, French, German, Hindi, Italian, Japanese, Korean, Mandarin, Portuguese, Russian, Spanish, Swahili

## Next features (backlog)
- [ ] Wire up contact form to actually send an email (use Resend.com free tier + a second serverless function `api/contact.js`)
- [ ] Add a `public/og.png` open graph image so when shared on WhatsApp it shows a preview
- [ ] Consider adding a "Share this with a friend" button on page 6 (Web Share API)
- [ ] Analytics: add a simple Vercel Analytics snippet to see which languages and issues are most selected
- [ ] Consider caching gospel responses (same language + same issue = same text) to reduce API costs

## Important design notes
- **Mobile first** — max-width ~420px, everything optimised for thumb reach
- **RTL support** — Arabic and Farsi need `dir="rtl"` on the html element and right-aligned text
- **No frameworks** — keep it simple, fast, and easy to deploy. Vanilla JS only.
- **Fonts load from Google Fonts** — if offline testing, fallback fonts apply

## How to run locally
```bash
# Option 1: Vercel dev (recommended — runs the API function too)
npm i -g vercel
vercel dev

# Option 2: Simple static preview (gospel AI won't work without the API)
npx serve .
# or just open index.html in a browser
```
