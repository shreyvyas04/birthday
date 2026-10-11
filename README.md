# A little world made just for you 🌻

A mobile-first, scroll-driven birthday website: a floating envelope that opens as you scroll, a handwritten letter,
a photo scrapbook, tappable hearts and flowers, a birthday cake with a wish, a funny surprise and a bouquet ending.

Built with Next.js (App Router), React, TypeScript, Tailwind CSS v4 and Motion. No backend, no API keys.

> **Status:** all source is written, but it has **not yet been built or run** (the environment it was written in
> could not reach the npm registry). Please run the three commands below once and check it in your browser
> before sharing. See `HANDOFF.md` for the full honest status.

## 1. Run it

You need Node.js 20 or newer.

```bash
npm install
npm run dev        # open http://localhost:3000
npm run typecheck  # optional: TypeScript check
npm run build      # production build (do this once before deploying)
```

## 2. Make it personal (one file!)

Open **`lib/birthday-content.ts`** and replace everything in `[square brackets]`:

- the birthday message, favourite memory, signature (`letter`)
- photo captions, dates and notes (`scrapbook.memories`)
- compliments, the hidden gift message, the little secrets (`surprises`)
- the funny lines (`funny`) and the final message (`finale`)
- the birthday date (`birthday.date`, format `YYYY-MM-DD`)

## 3. Add photos

Copy your photos into `public/images/` as `photo-01.jpg` ... `photo-06.jpg` (or change the paths in
`lib/birthday-content.ts`). Missing photos automatically show a cute "Our photo goes here" placeholder.
More detail: `public/images/README.md`.

## 4. Add music (optional)

Put a **properly licensed** file at `public/music/birthday-song.mp3`. It never autoplays; there is a play/pause
button in the top-right corner. Without the file, the button just says music can be added later.
Set `music.enabled` to `false` to remove it. More detail: `public/music/README.md`.

## 5. Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New → Project**, import the repository, keep the defaults, click **Deploy**.
3. Share the URL it gives you. (Vercel detects Next.js automatically; no environment variables are needed.)

## Good to know

- The countdown uses the **visitor's local date**, so it flips to "Today is your day!" at their own midnight.
- Fonts (Caveat, Nunito, Fraunces) come from Google Fonts through `next/font`, fetched at build time, with system fallbacks.
- With "reduce motion" turned on in the device settings, the envelope scene is a calm static version and all content stays readable.
