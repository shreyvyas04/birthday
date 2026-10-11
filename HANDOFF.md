# HANDOFF: Anshika birthday site

Keep this file updated. Another AI should read it first, inspect the existing files, and **continue; never rebuild from scratch**.

## 1. Project and objective
"A little world made just for you": an interactive, mobile-first birthday website that makes Anshika feel someone built a tiny magical world for her. Public Vercel URL, no backend.

## 2. Recipient and date
Recipient: Anshika (girl best friend). Birthday: 2026-10-11 (`lib/birthday-content.ts → birthday.date`).
Countdown timezone strategy: the **visitor's local calendar date** vs the birthday date (no timezone assumed; whole-day maths via UTC midnights, DST/midnight safe). Cases handled: before / today / after.

## 3. Visual direction and palette
Kawaii + pastel scrapbook + fairytale stationery, flowers as the recurring motif (sunflower with a tiny kawaii face, white lily, white rose, daisy, bud, leaf, all inline SVG with a white "sticker" outline).
Palette (Tailwind tokens in `app/globals.css @theme`): blush `#F8DCE8`, pinky `#F3BFD4`, butter `#FFF0B8`, cream `#FFF9F0`, lavender `#E8DDF8`, sage `#DCE9D5`, ink `#604B51` (text), berry `#B8456F` (accent, chosen for contrast).
Fonts via `next/font/google`: Caveat (handwriting, `font-hand`), Nunito (body, `font-body`), Fraunces (headings, `font-display`).

## 4. Stack (package.json uses caret ranges; not yet installed/locked)
next ^15.5, react/react-dom ^19.1, typescript ^5.6, tailwindcss ^4.1 + @tailwindcss/postcss ^4.1 (CSS-first config, no tailwind.config), motion ^12.23 (import from `motion/react`), canvas-confetti ^1.9.3 (+ @types). npm. **No package-lock.json yet**; `npm install` will create it, commit it.

## 5. File tree
```
app/ layout.tsx page.tsx globals.css
components/
  BirthdayExperience.tsx  top-level: MotionConfig(reducedMotion="user"), section order, replay + "re-read letter" button, keyed remounts
  EnvelopeLetter.tsx      Sections A+B+C: sticky scroll scene (230svh), EnvelopeArt, tap-to-open, static reduced-motion scene, LetterPaper
  MemoryScrapbook.tsx     Section D: cards (polaroid/featured/taped/framed), PhotoFrame placeholder fallback, Lightbox, draggable sticker tray
  SurpriseNotes.tsx       Section E: Hearts, Notes, Gift (hidden message), Secrets; also exports FunnySurprise (Section G)
  BirthdayCake.tsx        Section F: SVG cake, press-and-hold + "Make a wish!" button, confetti, stars/hearts, relight
  Bouquet.tsx             Section H bouquet (FlowerSticker composition + SVG stems/bow)
  FlowerSticker.tsx       reusable flower (kind,size,rotate,sway,tappable,draggable,hideOnMobile)
  Burst.tsx               useBurst() + BurstLayer: tiny tap sparkle/heart bursts
  Reveal.tsx              scroll-triggered fade/slide wrapper (class "reveal" for noscript)
  FloatingDecor.tsx       CSS floating hearts/stars
  Countdown.tsx           small countdown chip (client-only)
  MusicControl.tsx        play/pause, HEAD-checks the mp3, friendly message if missing
  ConfettiEffect.tsx      lazy canvas-confetti, failure-safe (kept from an earlier session)
lib/ birthday-content.ts (ALL personal content) birthday-date.ts usePrefersReducedMotion.ts
public/images/README.md public/music/README.md
README.md HANDOFF.md CONTINUATION_PROMPT.md package.json tsconfig.json postcss.config.mjs next.config.mjs next-env.d.ts .gitignore
```

## 6. Implemented (all written; see status in section 15)
A opening scene (greeting, floating envelope, heart seal, flowers, scroll hint, "Tap to open", countdown) · B scroll-linked envelope (flap opens, letter slides out and rises, envelope fades, letter overlaps into the full letter; tap opens by smooth-scrolling through the animation) · C ruled-paper letter with corner flowers, tappable heart reveal, signature · D six scrapbook memories with scroll-in springs, tap-wiggle + burst, lightbox (Esc, close button, focus handling, scroll lock), automatic placeholders, draggable+tappable flower trays · E tappable hearts (counter + reward at 7), flip notes, gift hidden message, "One more little secret..." · F cake (hold 0.8s or tap button, flames out + smoke, confetti, message, stars/hearts, relight) · G funny surprise (cycles lines) · H bouquet finale + replay · music control · reduced-motion static opening · noscript fallback for reveals · safe-area insets.
Replay: scrolls to top, then remounts scrapbook/surprises/cake/funny after ~900 ms. "Re-read the letter" fixed button top-left.

## 7. Incomplete / missing
- Nothing known to be missing from the brief, but **nothing has been run** (see 9, 15).
- No ESLint config / lint script (kept minimal). Add `eslint-config-next` if lint is wanted.
- No real photos or music (intended; user adds later).
- Draggable stickers can be dragged ±90px/±40px only.

## 8. Decisions to preserve
- One content file; no backend/state libs; Motion + CSS + SVG only; scroll animation via `useScroll` on a sticky 230svh container with `-mt-[40svh]` letter overlap.
- Reduced motion handled two ways: `MotionConfig reducedMotion="user"` globally, plus the hydration-safe `usePrefersReducedMotion` hook to swap to `StaticOpening` (never use Motion's `useReducedMotion` for layout switches: hydration mismatch).
- `overflow-x: clip` on body (not `hidden`) so `position: sticky` keeps working.
- Envelope keyboard path = the real "Tap to open" button; the envelope art button is `tabIndex=-1 aria-hidden` (mouse/touch only). Avoid nesting buttons.
- Tappable stickers are real `<button>`s; decorative ones are `aria-hidden` spans.
- SVG numbers are rounded (`pt()` helper) to avoid server/client float mismatches.
- No invented personal memories or jokes; placeholders only.

## 9. Known bugs / limitations (honest)
- **Never built or executed in a browser.** The authoring sandbox blocked registry.npmjs.org (HTTP 403 policy), so `npm install`, `next build`, type-check and real browser tests were impossible.
- Tailwind v4 utility names, Motion v12 API usage (`useScroll`, `useTransform` with percent strings, `useMotionValueEvent`, `motion.g` origin props) and next/font were written from knowledge, not compiled. Expect small fixes on first build.
- Scroll timing values (offsets in `EnvelopeArt`, 230svh height, 40svh overlap) are untuned; check on a real phone.
- Fonts need internet at build time (Google Fonts via next/font).
- An earlier session left files in the folder; several were overwritten by this build and `Decor.tsx` (incompatible old API) was moved to `../anshika-birthday-leftovers/`.

## 10. Commands
```
npm install
npm run dev
npm run typecheck     # tsc --noEmit
npm run build
npm start
```

## 11. Photos and music
Photos: `public/images/photo-01.jpg ... photo-06.jpg` (paths set in `scrapbook.memories`; add `alt` text per photo). Music: `public/music/birthday-song.mp3`, licensed only; `music.enabled=false` hides the control.

## 12. Editing text
Everything in `lib/birthday-content.ts`; replace `[bracketed]` placeholders. Date: `birthday.date` (`YYYY-MM-DD`).

## 13. What was verified (the only things)
- All 18 TS/TSX files parse (TypeScript transpile, 0 syntax errors).
- All relative/`@/` imports point at files that exist.
- FlowerSticker, BirthdayCake and Bouquet were server-rendered with React 19 and screenshotted in Chromium (flower art and cake look right; layout classes were not applied there because Tailwind wasn't available).

## 14. Next steps (in order)
1. `npm install && npm run typecheck && npm run build`; fix any errors (most likely: Tailwind class names, Motion typings).
2. `npm run dev`; test on a ~375px phone viewport: envelope scroll scene, tap-to-open, letter not clipped, no horizontal scroll.
3. Test reduced motion (DevTools rendering emulation), keyboard navigation, lightbox Esc/focus.
4. Tune scroll thresholds if the letter feels early/late; tune sticker positions around the envelope and bouquet.
5. Add real photos/music/content; commit `package-lock.json`; deploy.

## 15. Completion status
- **Source complete (written): yes.**
- **Verified working: nothing at runtime.** Parsing + import check + partial server render only.
- **Untested:** install, type-check, build, envelope scroll animation, tap-to-open, replay, lightbox, confetti, music, mobile layout, reduced motion, Tailwind output.
