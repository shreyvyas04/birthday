"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { content } from "@/lib/birthday-content";
import { BurstLayer, useBurst } from "./Burst";
import FlowerSticker from "./FlowerSticker";
import Reveal from "./Reveal";

const S = content.surprises;

const HEART_PATH = "M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.8-8 11-8 11z";

/* ---------- 1. tappable hearts ---------- */
function HeartButton({ onPop, delay }: { onPop: () => void; delay: number }) {
  const { pieces, fire } = useBurst(["♥", "✦", "♡"], 7);
  return (
    <motion.button
      type="button"
      aria-label="Pop this heart"
      whileTap={{ scale: 0.75 }}
      onClick={() => {
        fire();
        onPop();
      }}
      className="relative grid h-14 w-14 place-items-center"
    >
      <svg viewBox="0 0 24 24" className="sway h-11 w-11 drop-shadow" style={{ animationDelay: `${delay}s` }} aria-hidden="true">
        <path d={HEART_PATH} fill="#E86C98" stroke="#B8456F" strokeWidth="0.7" />
        <path d="M7.2 9.2a2.4 2.4 0 0 1 3-1.6" stroke="#FBC1D4" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </svg>
      <BurstLayer pieces={pieces} />
    </motion.button>
  );
}

function Hearts() {
  const [count, setCount] = useState(0);
  return (
    <div className="text-center">
      <h3 className="text-3xl text-berry">{S.heartsTitle}</h3>
      <p className="text-base text-ink/80">{S.heartsHint}</p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-1">
        {[0, 0.6, 1.2, 1.8, 2.4].map((d) => (
          <HeartButton key={d} delay={d} onPop={() => setCount((c) => c + 1)} />
        ))}
      </div>
      <p aria-live="polite" className="font-hand text-2xl text-ink">
        {S.heartsCount(count)}
      </p>
      {count >= S.heartsGoal && (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto mt-2 max-w-sm rounded-2xl bg-white px-4 py-2 font-hand text-[1.65rem] leading-8 text-berry shadow"
        >
          {S.heartsReward}
        </motion.p>
      )}
    </div>
  );
}

/* ---------- 2. compliment notes ---------- */
const NOTE_COLORS = ["bg-butter", "bg-lavender", "bg-sage", "bg-blush", "bg-white", "bg-pinky/70"];
const NOTE_ROTATIONS = [-3, 2, -1.5, 3, -2.5, 1.5];

function Note({ front, back, index }: { front: string; back: string; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={() => setFlipped((f) => !f)}
      className={`flex min-h-32 items-center justify-center rounded-md p-4 text-center shadow-[0_8px_16px_-6px_rgba(96,75,81,0.3)] ${NOTE_COLORS[index % NOTE_COLORS.length]}`}
      style={{ rotate: `${NOTE_ROTATIONS[index % NOTE_ROTATIONS.length]}deg` }}
    >
      <motion.span
        key={String(flipped)}
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="block font-hand text-[1.6rem] leading-7 text-ink"
      >
        {flipped ? back : front}
      </motion.span>
    </button>
  );
}

function Notes() {
  return (
    <div className="text-center">
      <h3 className="text-3xl text-berry">{S.notesTitle}</h3>
      <p className="mb-5 text-base text-ink/80">{S.notesHint}</p>
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
        {S.notes.map((n, i) => (
          <Note key={i} front={n.front} back={n.back} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ---------- 3. hidden message behind a decorative gift ---------- */
function Gift() {
  const [open, setOpen] = useState(false);
  const { pieces, fire } = useBurst(["✦", "✿", "♥"], 8);
  return (
    <div className="text-center">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Open the little gift"
        onClick={() => {
          if (!open) fire();
          setOpen((o) => !o);
        }}
        className="relative mx-auto block h-28 w-28"
      >
        <svg viewBox="0 0 100 100" className="bob h-full w-full drop-shadow-md" aria-hidden="true">
          <rect x="16" y="46" width="68" height="44" rx="6" fill="#F3BFD4" />
          <rect x="45" y="46" width="10" height="44" fill="#FFF0B8" />
          <motion.g initial={false} animate={{ y: open ? -14 : 0, rotate: open ? -10 : 0 }} style={{ originX: 0, originY: 1 }}>
            <rect x="12" y="32" width="76" height="16" rx="6" fill="#E8DDF8" />
            <rect x="45" y="32" width="10" height="16" fill="#FFF0B8" />
            <path d="M50 32 C38 14 24 22 34 32 Z" fill="#FFF0B8" stroke="#F0B429" strokeWidth="1.2" />
            <path d="M50 32 C62 14 76 22 66 32 Z" fill="#FFF0B8" stroke="#F0B429" strokeWidth="1.2" />
          </motion.g>
        </svg>
        <BurstLayer pieces={pieces} />
      </button>
      <p className="font-hand text-2xl text-ink">{S.giftHint}</p>
      <div aria-live="polite">
        {open && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-2 max-w-sm rounded-2xl bg-white px-4 py-3 font-hand text-[1.65rem] leading-8 text-berry shadow"
          >
            {S.giftMessage}
          </motion.p>
        )}
      </div>
    </div>
  );
}

/* ---------- 4. "One more little secret..." ---------- */
function Secrets() {
  const [shown, setShown] = useState(0);
  const done = shown >= S.secrets.length;
  return (
    <div className="text-center">
      <button
        type="button"
        disabled={done}
        onClick={() => setShown((n) => Math.min(n + 1, S.secrets.length))}
        className="min-h-12 rounded-full bg-berry px-7 py-2 font-hand text-2xl text-white shadow-md disabled:bg-ink/60"
      >
        {done ? S.secretsDone : S.secretButton}
      </button>
      <ul className="mx-auto mt-4 flex max-w-md flex-col gap-3" aria-live="polite">
        {S.secrets.slice(0, shown).map((s, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 14, rotate: i % 2 ? 2 : -2 }}
            animate={{ opacity: 1, y: 0, rotate: i % 2 ? 1 : -1 }}
            className="rounded-md bg-butter px-4 py-3 font-hand text-[1.6rem] leading-7 text-ink shadow"
          >
            {s}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default function SurpriseNotes() {
  return (
    <section aria-labelledby="surprises-heading" className="relative overflow-hidden bg-lavender/50 px-5 pb-24 pt-20">
      <FlowerSticker kind="daisy" size={52} rotate={-10} className="absolute left-2 top-6" />
      <FlowerSticker kind="bud" size={60} rotate={12} delay={1} hideOnMobile className="absolute right-6 top-8" />
      <FlowerSticker kind="leaf" size={50} rotate={30} delay={2} hideOnMobile className="absolute bottom-6 left-8" />

      <div className="relative mx-auto flex max-w-2xl flex-col gap-16">
        <Reveal className="text-center">
          <h2 id="surprises-heading" className="text-4xl text-berry sm:text-5xl">
            {S.title}
          </h2>
        </Reveal>
        <Reveal>
          <Hearts />
        </Reveal>
        <Reveal>
          <Notes />
        </Reveal>
        <Reveal>
          <Gift />
        </Reveal>
        <Reveal>
          <Secrets />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Section G: the funny surprise ---------- */
export function FunnySurprise() {
  const F = content.funny;
  const [shown, setShown] = useState(0);
  const { pieces, fire } = useBurst(["✦", "♥", "✿"], 8);
  const current = shown > 0 ? F.lines[(shown - 1) % F.lines.length] : null;

  return (
    <section aria-labelledby="funny-heading" className="relative overflow-hidden bg-butter/60 px-5 py-20 text-center">
      <FlowerSticker kind="sunflower" size={70} rotate={-12} delay={0.5} hideOnMobile className="absolute left-4 top-6" />
      <FlowerSticker kind="daisy" size={50} rotate={12} delay={1.5} className="absolute right-3 bottom-6" />
      <Reveal>
        <h2 id="funny-heading" className="mx-auto max-w-md text-balance text-4xl text-berry sm:text-5xl">
          {F.heading}
        </h2>
      </Reveal>
      <div className="relative mx-auto mt-8 w-max">
        <button
          type="button"
          onClick={() => {
            fire();
            setShown((n) => n + 1);
          }}
          className="relative min-h-14 rounded-full bg-white px-8 py-2 font-hand text-3xl text-berry shadow-lg"
        >
          {shown === 0 ? F.button : F.nextButton}
          <BurstLayer pieces={pieces} />
        </button>
      </div>
      <div aria-live="polite" className="mx-auto mt-6 min-h-24 max-w-md">
        {current && (
          <motion.p
            key={shown}
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="rounded-2xl bg-white px-5 py-4 font-hand text-[1.7rem] leading-8 text-ink shadow"
          >
            {current}
          </motion.p>
        )}
      </div>
    </section>
  );
}
