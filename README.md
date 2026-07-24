# Portfolio

A data-analytics portfolio site built with Next.js, TypeScript, and Tailwind CSS.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Make it yours

Everything you need to personalize lives in a few places:

| What | Where |
|---|---|
| Name, title, hero copy | `components/Hero.tsx` |
| Bio and skills list | `components/About.tsx` |
| Projects (title, description, tools, links) | `data/projects.ts` |
| Email, LinkedIn, GitHub | `components/Contact.tsx` |
| Site title / meta description | `app/layout.tsx` |
| Wordmark in the nav bar (currently "YN/DATA") | `components/Navbar.tsx` |
| Footer name/year text | `components/Footer.tsx` |

Search the project for `Your Name`, `your.email@example.com`, `yourname`, and `yourusername` — every placeholder uses one of these so they're easy to find and replace.

### Colors, fonts, spacing

Design tokens (colors + font families) are defined once in `app/globals.css` under `@theme`. Change a value there and it updates everywhere:

```css
@theme {
  --color-paper: #eff1ed;   /* background */
  --color-ink: #1b2a2e;     /* primary text */
  --color-accent: #9c3f35;  /* highlight color */
  ...
}
```

Fonts (Newsreader, IBM Plex Sans, IBM Plex Mono) load from Google Fonts via `<link>` tags in `app/layout.tsx` — swap the `href` there if you'd rather use different families.

### Adding a real photo

The About section is currently text-only by design. If you want a photo, drop an image into `public/` (e.g. `public/photo.jpg`) and reference it with Next's `<Image />` component in `components/About.tsx`.

## Deploy to Vercel

**Option A — Vercel CLI**
```bash
npm install -g vercel
vercel
```
Follow the prompts; it'll give you a live URL in under a minute.

**Option B — GitHub + Vercel dashboard (recommended for ongoing edits)**
1. Push this project to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no configuration needed. Click **Deploy**.
4. Every future push to `main` deploys automatically.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4
- TypeScript
