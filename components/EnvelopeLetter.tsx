"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { content } from "@/lib/birthday-content";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { BurstLayer, useBurst } from "./Burst";
import Countdown from "./Countdown";
import FloatingDecor from "./FloatingDecor";
import FlowerSticker from "./FlowerSticker";
import Reveal from "./Reveal";

/* ------------------------------------------------------------------ */
/*  Envelope illustration (layered CSS + inline SVG), driven by `p`     */
/*  p = progress 0..1:                                                  */
/*   0.00-0.07 heart seal pops away                                     */
/*   0.00-0.20 flap rotates open                                        */
/*   0.14-0.46 letter slides out of the pocket                          */
/*   0.46-0.86 letter rises higher and grows slightly                   */
/*   0.50-0.82 envelope fades                                           */
/*   0.90-1.00 mini letter fades while the full letter takes over       */
/* ------------------------------------------------------------------ */
function EnvelopeArt({ p }: { p: MotionValue<number> }) {
  const flapRotate = useTransform(p, [0, 0.2], [0, -180]);
  const letterY = useTransform(p, [0.14, 0.46, 0.86], ["0%", "-64%", "-88%"]);
  const letterScale = useTransform(p, [0.46, 0.86], [1, 1.05]);
  const letterOpacity = useTransform(p, [0.9, 1], [1, 0]);
  const bodyOpacity = useTransform(p, [0.5, 0.82], [1, 0]);
  const sealScale = useTransform(p, [0, 0.07], [1, 0]);
  const sealOpacity = useTransform(p, [0, 0.07], [1, 0]);
  const [flapBehind, setFlapBehind] = useState(() => p.get() > 0.1);
  useMotionValueEvent(p, "change", (v) => setFlapBehind(v > 0.1));

  return (
    <div className="relative aspect-[3/2] w-full" style={{ perspective: 900 }}>
      {/* rear body */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-[#E7A3BF] shadow-[0_18px_30px_-10px_rgba(96,75,81,0.35)]"
        style={{ opacity: bodyOpacity, zIndex: 0 }}
      />

      {/* the letter, tucked inside */}
      <motion.div
        className="absolute left-[6%] top-[8%] h-[96%] w-[88%]"
        style={{ y: letterY, scale: letterScale, opacity: letterOpacity, zIndex: 10, transformOrigin: "50% 100%" }}
      >
        <div className="relative h-full w-full rounded-md bg-[#FFFDF8] px-4 pt-3 shadow-[0_2px_6px_rgba(96,75,81,0.25)]">
          <p className="font-hand text-2xl leading-7 text-ink">For {content.recipient} ♥</p>
          <div className="mt-2 space-y-2.5" aria-hidden="true">
            <div className="h-1 w-full rounded bg-pinky/60" />
            <div className="h-1 w-5/6 rounded bg-pinky/60" />
            <div className="h-1 w-full rounded bg-pinky/60" />
            <div className="h-1 w-2/3 rounded bg-pinky/60" />
          </div>
        </div>
      </motion.div>

      {/* front pocket */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-2xl"
        style={{ opacity: bodyOpacity, zIndex: 20 }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 300 200" preserveAspectRatio="none" className="h-full w-full">
          <path d="M0 0 L150 105 L0 200 Z" fill="#F6C6D8" />
          <path d="M300 0 L150 105 L300 200 Z" fill="#F6C6D8" />
          <path d="M0 200 L150 100 L300 200 Z" fill="#FADCE7" />
          <path d="M0 0 L150 105 L300 0" fill="none" stroke="#E9A9C2" strokeWidth="1" />
          <path d="M0 200 L150 100 L300 200" fill="none" stroke="#E9A9C2" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* flap */}
      <motion.div
        className="absolute left-0 top-0 h-[52.5%] w-full"
        style={{
          rotateX: flapRotate,
          transformOrigin: "50% 0%",
          opacity: bodyOpacity,
          zIndex: flapBehind ? 5 : 30,
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 300 105" preserveAspectRatio="none" className="h-full w-full">
          <path d="M0 0 H300 L150 105 Z" fill="#F3BFD4" stroke="#E9A9C2" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* heart seal */}
      <motion.div
        className="absolute left-1/2 top-[52.5%] h-11 w-11 -translate-x-1/2 -translate-y-1/2"
        style={{ scale: sealScale, opacity: sealOpacity, zIndex: 40 }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-md">
          <path
            d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.8-8 11-8 11z"
            fill="#D9577F"
            stroke="#B8456F"
            strokeWidth="0.8"
          />
          <path d="M7.2 9.2a2.4 2.4 0 0 1 3-1.6" stroke="#F7A8C2" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}

/** Floral stickers around the envelope. They fade with the envelope. */
function EnvelopeStickers({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.5, 0.82], [1, 0]);
  const [gone, setGone] = useState(() => p.get() > 0.8);
  useMotionValueEvent(p, "change", (v) => setGone(v > 0.8));

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 ${gone ? "invisible" : ""}`}
      style={{ opacity, zIndex: 50 }}
    >
      <FlowerSticker kind="sunflower" size={76} rotate={-8} tappable className="pointer-events-auto absolute -bottom-7 -left-5" />
      <FlowerSticker kind="rose" size={58} rotate={10} delay={1} className="absolute -right-4 -top-5" />
      <FlowerSticker kind="lily" size={60} rotate={-14} delay={2} hideOnMobile className="absolute -bottom-6 -right-4" />
      <FlowerSticker kind="daisy" size={40} rotate={8} delay={0.5} hideOnMobile className="absolute -left-3 -top-4" />
    </motion.div>
  );
}

/** The envelope + its stickers. When `onOpen` is given, the envelope is one real button. */
function Stage({ p, onOpen }: { p: MotionValue<number>; onOpen?: () => void }) {
  const hintOpacity = useTransform(p, [0, 0.08], [1, 0]);
  const [opened, setOpened] = useState(() => p.get() > 0.12);
  useMotionValueEvent(p, "change", (v) => setOpened(v > 0.12));

  return (
    <div className="mx-auto w-[min(86vw,23rem)]">
      <div className="relative">
        {onOpen ? (
          // Mouse/touch target only; keyboard and screen-reader users use the "Tap to open" button below.
          <motion.button
            type="button"
            onClick={onOpen}
            disabled={opened}
            tabIndex={-1}
            aria-hidden="true"
            whileTap={{ scale: 0.97 }}
            className="block w-full rounded-2xl"
          >
            <span className="bob block">
              <EnvelopeArt p={p} />
            </span>
          </motion.button>
        ) : (
          <EnvelopeArt p={p} />
        )}
        <EnvelopeStickers p={p} />
      </div>
      {onOpen && (
        <motion.div style={{ opacity: hintOpacity }} className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={onOpen}
            disabled={opened}
            className="min-h-12 rounded-full bg-white px-6 font-hand text-2xl text-berry shadow-md disabled:invisible"
          >
            {content.intro.tapLabel}
          </button>
        </motion.div>
      )}
    </div>
  );
}

/** Scroll-linked opening: a short sticky scene (230svh tall, ~1.3 screens of scrolling). */
function ScrollOpening() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const greetOpacity = useTransform(p, [0, 0.14], [1, 0]);
  const greetY = useTransform(p, [0, 0.14], [0, -24]);
  const scrollHintOpacity = useTransform(p, [0, 0.08], [1, 0]);

  const open = () => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    // Smooth-scroll through the whole animation and land just inside the letter.
    window.scrollTo({ top: top + distance + window.innerHeight * 0.45, behavior: "smooth" });
  };

  return (
    <div ref={ref} className="relative h-[230svh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-6 overflow-hidden bg-linear-to-b from-blush via-cream to-butter/60 px-4 pb-10 pt-6">
        <FloatingDecor />

        <motion.div style={{ opacity: greetOpacity, y: greetY }} className="relative z-10 max-w-md text-center">
          <h1 className="text-balance text-3xl text-ink sm:text-4xl">{content.intro.greeting}</h1>
          <Countdown />
        </motion.div>

        <Stage p={p} onOpen={open} />

        <motion.p
          style={{
            opacity: scrollHintOpacity,
            bottom: "max(1.25rem, env(safe-area-inset-bottom))",
          }}
          className="bounce-hint absolute left-0 right-0 text-center font-hand text-2xl text-ink"
        >
          {content.intro.scrollHint}
        </motion.p>
      </div>
    </div>
  );
}

/** Reduced-motion version: a calm, already-open envelope in normal flow. No scroll-jacking at all. */
function StaticOpening() {
  const p = useMotionValue(0.5);
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden bg-linear-to-b from-blush via-cream to-butter/60 px-4 py-14">
      <FloatingDecor />
      <div className="relative z-10 max-w-md text-center">
        <h1 className="text-balance text-3xl text-ink sm:text-4xl">{content.intro.greeting}</h1>
        <Countdown />
      </div>
      <Stage p={p} />
      <a href="#letter" className="relative z-10 mt-4 font-hand text-2xl text-berry underline underline-offset-4">
        {content.intro.reducedMotionHint}
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  The full letter                                                     */
/* ------------------------------------------------------------------ */
function LetterPaper({ overlap }: { overlap: boolean }) {
  const L = content.letter;
  const [open, setOpen] = useState(false);
  const { pieces, fire } = useBurst(["♥", "♡", "✦"], 8);

  return (
    <section
      id="letter"
      aria-labelledby="letter-heading"
      className={`relative z-10 mx-auto max-w-xl px-4 pb-20 ${overlap ? "-mt-[40svh]" : "mt-4"}`}
    >
      <div className="relative">
        <FlowerSticker kind="sunflower" size={84} rotate={-12} tappable className="absolute -left-3 -top-8 z-20 sm:-left-8" />
        <FlowerSticker kind="daisy" size={44} rotate={10} delay={1} className="absolute -right-2 -top-5 z-20" />
        <FlowerSticker kind="lily" size={76} rotate={14} delay={2} tappable className="absolute -bottom-9 -right-3 z-20 sm:-right-8" />
        <FlowerSticker kind="bud" size={52} rotate={-10} delay={1.5} hideOnMobile className="absolute -bottom-6 -left-6 z-20" />

        <article className="paper relative -rotate-[0.6deg] rounded-[6px_14px_5px_16px/10px_5px_14px_6px] px-6 pb-10 pt-14 sm:px-10">
          <Reveal>
            <h2 id="letter-heading" className="text-balance text-3xl text-berry sm:text-4xl">
              {L.heading}
            </h2>
          </Reveal>

          <div className="mt-5 font-hand text-[1.65rem] leading-8 text-ink">
            {L.paragraphs.map((text, i) => (
              <Reveal key={i} delay={0.08 * (i + 1)} className="mb-8">
                <p>{text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="relative mt-2 flex flex-col items-start gap-1">
              <button
                type="button"
                onClick={() => {
                  fire();
                  setOpen((o) => !o);
                }}
                aria-expanded={open}
                className="relative inline-flex min-h-12 items-center gap-2 rounded-full bg-blush px-4 py-1 font-hand text-2xl text-berry shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.8-8 11-8 11z" fill="#D9577F" />
                </svg>
                {L.heartHint}
                <BurstLayer pieces={pieces} />
              </button>
              {open && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pl-2 font-hand text-[1.65rem] leading-8 text-berry"
                >
                  {L.heartMessage}
                </motion.p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <p className="font-hand text-2xl leading-8">{L.closing}</p>
            <p className="font-hand text-4xl leading-10 text-berry">{L.signature}</p>
          </Reveal>
        </article>

        <p className="mt-16 text-center font-hand text-2xl text-ink/80">{L.nextHint}</p>
      </div>
    </section>
  );
}

export default function EnvelopeLetter() {
  const reduce = usePrefersReducedMotion();
  return (
    <>
      {reduce ? <StaticOpening /> : <ScrollOpening />}
      <LetterPaper overlap={!reduce} />
    </>
  );
}
