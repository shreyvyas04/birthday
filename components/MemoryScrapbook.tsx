"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { content, type Memory } from "@/lib/birthday-content";
import { BurstLayer, useBurst } from "./Burst";
import FlowerSticker from "./FlowerSticker";
import Reveal from "./Reveal";
import Image from "next/image";

/** Shows the real photo when it loads, otherwise a styled placeholder (never a broken image). */
function PhotoFrame({ memory }: { memory: Memory }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // An image can fail before React hydrates; catch that case too.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (!memory.image || failed) {
    return (
      <div
        role="img"
        aria-label={`Photo placeholder: ${memory.caption}`}
        className="flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-br from-lavender via-blush to-butter/70 p-4 text-center"
      >
        <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden="true">
          <path d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.8-8 11-8 11z" fill="#F3A6C0" />
        </svg>
        <span className="font-hand text-2xl leading-6 text-ink">{content.scrapbook.placeholderText}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <Image
      ref={ref}
      src={memory.image}
      alt={memory.alt ?? memory.caption}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

const FRAME: Record<Memory["layout"], string> = {
  polaroid: "rounded-sm bg-white p-3 pb-4 shadow-[0_10px_24px_-6px_rgba(96,75,81,0.3)]",
  featured: "rounded-md bg-white p-3 pb-5 shadow-[0_14px_30px_-8px_rgba(96,75,81,0.3)]",
  taped: "rounded-sm bg-white/85 p-2 shadow-[0_8px_20px_-6px_rgba(96,75,81,0.28)]",
  framed: "rounded-[2rem] border-4 border-dashed border-lavender bg-white p-2 shadow-[0_10px_24px_-6px_rgba(96,75,81,0.25)]",
};
const ASPECT: Record<Memory["layout"], string> = {
  polaroid: "aspect-[4/5]",
  featured: "aspect-[4/3]",
  taped: "aspect-[5/4]",
  framed: "aspect-square rounded-[1.5rem]",
};

function MemoryCard({ memory, index, onOpen }: { memory: Memory; index: number; onOpen: (m: Memory) => void }) {
  const { pieces, fire } = useBurst(["♥", "✦"], 6);
  const wide = memory.layout === "featured";

  return (
    <motion.figure
      className={`relative mx-auto w-full max-w-sm ${wide ? "sm:col-span-2 sm:max-w-xl" : ""} ${index % 2 ? "sm:mt-10" : ""}`}
      initial={{ opacity: 0, y: 50, rotate: memory.rotate * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: memory.rotate }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ type: "spring", stiffness: 90, damping: 16 }}
    >
      {memory.layout === "taped" && (
        <>
          <span aria-hidden="true" className="tape absolute -left-3 -top-2 z-10 h-6 w-20 -rotate-[28deg]" />
          <span aria-hidden="true" className="tape absolute -right-3 -top-2 z-10 h-6 w-20 rotate-[28deg]" />
        </>
      )}
      {(memory.layout === "polaroid" || memory.layout === "featured") && (
        <span aria-hidden="true" className="tape absolute left-1/2 -top-3 z-10 h-6 w-24 -translate-x-1/2 rotate-2" />
      )}

      <motion.button
        type="button"
        onClick={() => {
          fire();
          onOpen(memory);
        }}
        whileTap={{ scale: 0.96, rotate: -memory.rotate }}
        whileHover={{ scale: 1.02 }}
        aria-label={`Open photo bigger: ${memory.caption}`}
        className={`relative block w-full text-left ${FRAME[memory.layout]}`}
      >
        <span className={`relative block overflow-hidden ${ASPECT[memory.layout]}`}>
          <PhotoFrame memory={memory} />
        </span>
        <motion.span
          className="reveal mt-3 block px-1"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <span className="block font-hand text-[1.7rem] leading-7 text-ink">{memory.caption}</span>
          {memory.date ? <span className="block text-sm text-ink/80">{memory.date}</span> : null}
          {memory.description ? <span className="mt-1 block text-base text-ink/85">{memory.description}</span> : null}
        </motion.span>
        <BurstLayer pieces={pieces} />
      </motion.button>

      {memory.sticker && (
        <FlowerSticker
          kind={memory.sticker}
          size={wide ? 80 : 60}
          rotate={index % 2 ? -14 : 14}
          delay={index * 0.7}
          hideOnMobile={index % 3 === 2}
          className={`absolute z-10 ${index % 2 ? "-bottom-5 -left-4" : "-bottom-5 -right-4"}`}
        />
      )}
    </motion.figure>
  );
}

function Lightbox({ memory, onClose }: { memory: Memory; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        // The close button is the only control, so keep focus on it.
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={memory.caption}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[92svh] w-full max-w-lg overflow-auto rounded-2xl bg-cream p-4 pt-16 shadow-2xl"
        initial={{ scale: 0.94, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 font-semibold text-berry shadow"
        >
          <span aria-hidden="true">✕</span> Close
        </button>
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-white">
          <PhotoFrame memory={memory} />
        </div>
        <p className="mt-3 font-hand text-3xl leading-8 text-ink">{memory.caption}</p>
        {memory.date ? <p className="text-sm text-ink/80">{memory.date}</p> : null}
        {memory.description ? <p className="mt-1">{memory.description}</p> : null}
      </motion.div>
    </motion.div>
  );
}

export default function MemoryScrapbook() {
  const S = content.scrapbook;
  const [active, setActive] = useState<Memory | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section
      aria-labelledby="scrapbook-heading"
      className="relative border-t-4 border-dashed border-pinky/60 bg-blush/50 px-5 pb-28 pt-20"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <h2 id="scrapbook-heading" className="text-balance text-4xl text-berry sm:text-5xl">
            {S.title}
          </h2>
          <p className="mt-2 font-hand text-2xl text-ink">{S.subtitle}</p>
          <p className="mt-1 text-base text-ink/80">{S.tapHint}</p>
        </Reveal>

        {/* sticker tray: drag & tap */}
        <div className="relative mx-auto mt-6 flex h-24 max-w-xs items-center justify-center gap-3">
          <FlowerSticker kind="sunflower" size={60} rotate={-8} tappable draggable />
          <FlowerSticker kind="lily" size={60} rotate={6} delay={1} tappable draggable />
          <FlowerSticker kind="rose" size={56} rotate={-4} delay={2} tappable draggable />
        </div>
        <p className="mb-12 text-center font-hand text-2xl text-ink/90">{S.stickerHint}</p>

        <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2">
          {S.memories.map((m, i) => (
            <MemoryCard key={m.id} memory={m} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>{active && <Lightbox key={active.id} memory={active} onClose={close} />}</AnimatePresence>
    </section>
  );
}
