"use client";

import { MotionConfig, motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { content } from "@/lib/birthday-content";
import BirthdayCake from "./BirthdayCake";
import Bouquet from "./Bouquet";
import EnvelopeLetter from "./EnvelopeLetter";
import FloatingDecor from "./FloatingDecor";
import FlowerSticker from "./FlowerSticker";
import MemoryScrapbook from "./MemoryScrapbook";
import MusicControl from "./MusicControl";
import Reveal from "./Reveal";
import SurpriseNotes, { FunnySurprise } from "./SurpriseNotes";

function Finale({ onReplay }: { onReplay: () => void }) {
  const F = content.finale;
  return (
    <section
      aria-labelledby="finale-heading"
      className="relative overflow-hidden bg-linear-to-b from-lavender/60 via-blush to-butter/70 px-5 pb-28 pt-24 text-center"
    >
      <FloatingDecor />
      <FlowerSticker kind="daisy" size={50} rotate={-10} className="absolute left-3 top-8" />
      <FlowerSticker kind="bud" size={58} rotate={14} delay={1} hideOnMobile className="absolute right-6 top-10" />

      <div className="relative z-10 mx-auto max-w-xl">
        <Reveal>
          <h2 id="finale-heading" className="text-balance font-hand text-5xl leading-tight text-berry sm:text-6xl">
            {F.wish}
          </h2>
        </Reveal>

        <Reveal className="mt-10">
          <Bouquet />
          <p className="mt-2 text-base text-ink/80">{F.bouquetHint}</p>
        </Reveal>

        <Reveal className="mt-10">
          <p className="font-hand text-[1.9rem] leading-9 text-ink">{F.message}</p>
          <p className="mt-4 font-hand text-4xl text-berry">{F.signature}</p>
        </Reveal>

        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={onReplay}
          className="mt-12 min-h-14 rounded-full bg-berry px-9 py-2 font-hand text-3xl text-white shadow-lg"
        >
          {F.replay}
        </motion.button>
      </div>
    </section>
  );
}

export default function BirthdayExperience() {
  // Bumping this remounts the interactive sections below the letter so they start fresh.
  const [replayKey, setReplayKey] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const scrollTo = (top: number) => {
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  };

  const replay = () => {
    scrollTo(0);
    // The scroll-linked envelope resets by itself as we scroll back up; the rest is remounted.
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setReplayKey((k) => k + 1), 900);
  };

  const rereadLetter = () => {
    const el = document.getElementById("letter");
    if (el) scrollTo(el.getBoundingClientRect().top + window.scrollY - 24);
  };

  return (
    <MotionConfig reducedMotion="user">
      <MusicControl />
      <button
        type="button"
        onClick={rereadLetter}
        className="fixed z-40 flex min-h-11 items-center gap-2 rounded-full bg-white/90 px-4 text-sm font-semibold text-berry shadow-md backdrop-blur"
        style={{ top: "max(0.75rem, env(safe-area-inset-top))", left: "max(0.75rem, env(safe-area-inset-left))" }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.8-8 11-8 11z" fill="#D9577F" />
        </svg>
        {content.nav.letterButton}
      </button>

      <main>
        <EnvelopeLetter />
        <MemoryScrapbook key={`scrap-${replayKey}`} />
        <SurpriseNotes key={`surprise-${replayKey}`} />
        <BirthdayCake key={`cake-${replayKey}`} />
        <FunnySurprise key={`funny-${replayKey}`} />
        <Finale onReplay={replay} />
      </main>
    </MotionConfig>
  );
}
