"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { content } from "@/lib/birthday-content";
import { BurstLayer, useBurst } from "./Burst";
import { fireConfetti } from "./ConfettiEffect";
import FlowerSticker from "./FlowerSticker";
import Reveal from "./Reveal";

const HOLD_MS = 800;
const CANDLE_XS = [92, 120, 148];
const AROUND = [
  { g: "★", cls: "left-[2%] top-[8%]", color: "#F0B429", d: 0 },
  { g: "♥", cls: "right-[4%] top-[14%]", color: "#E86C98", d: 0.08 },
  { g: "✦", cls: "left-[14%] top-[-2%]", color: "#9B82D4", d: 0.16 },
  { g: "♥", cls: "right-[18%] top-[-4%]", color: "#F3A6C0", d: 0.24 },
  { g: "★", cls: "left-[-2%] top-[44%]", color: "#F0B429", d: 0.32 },
  { g: "✦", cls: "right-[-2%] top-[46%]", color: "#9FC48F", d: 0.4 },
];

export default function BirthdayCake() {
  const C = content.cake;
  const [lit, setLit] = useState(true);
  const [holding, setHolding] = useState(false);
  const holdTimer = useRef<number | undefined>(undefined);
  const { pieces, fire } = useBurst(["★", "♥", "✦", "✿"], 10);

  useEffect(() => () => window.clearTimeout(holdTimer.current), []);

  const blowOut = () => {
    if (!lit) return;
    window.clearTimeout(holdTimer.current);
    setHolding(false);
    setLit(false);
    fire();
    void fireConfetti();
  };

  const startHold = () => {
    if (!lit) return;
    setHolding(true);
    window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(blowOut, HOLD_MS);
  };
  const cancelHold = () => {
    window.clearTimeout(holdTimer.current);
    setHolding(false);
  };
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      blowOut();
    }
  };

  const candles = CANDLE_XS.slice(0, C.candleCount);

  return (
    <section
      aria-labelledby="cake-heading"
      className="relative overflow-hidden bg-linear-to-b from-blush/60 to-lavender/60 px-5 pb-24 pt-20 text-center"
    >
      <Reveal>
        <h2 id="cake-heading" className="text-balance text-4xl text-berry sm:text-5xl">
          {C.heading}
        </h2>
      </Reveal>

      <div className="relative mx-auto mt-10 w-[min(76vw,19rem)]">
        <FlowerSticker kind="sunflower" size={64} rotate={-10} tappable className="absolute -bottom-3 -left-7 z-10" />
        <FlowerSticker kind="lily" size={62} rotate={12} delay={1} tappable className="absolute -bottom-3 -right-7 z-10" />
        <FlowerSticker kind="rose" size={46} rotate={-6} delay={2} hideOnMobile className="absolute -bottom-6 left-1/2 z-10 -translate-x-1/2" />

        {/* stars & hearts appear around the cake once the candles are out */}
        {!lit &&
          AROUND.map((a, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`pop-in absolute z-10 text-3xl ${a.cls}`}
              style={{ color: a.color, animationDelay: `${a.d}s` }}
            >
              {a.g}
            </span>
          ))}

        <button
          type="button"
          aria-label="Birthday cake. Press and hold to blow out the candles"
          onPointerDown={startHold}
          onPointerUp={cancelHold}
          onPointerLeave={cancelHold}
          onPointerCancel={cancelHold}
          onContextMenu={(e) => e.preventDefault()}
          onKeyDown={onKey}
          style={{ WebkitTouchCallout: "none", touchAction: "manipulation" }}
          className={`relative block w-full select-none rounded-3xl ${holding ? "holding" : ""}`}
        >
          <svg viewBox="0 0 240 230" className="h-auto w-full drop-shadow-xl" aria-hidden="true">
            {/* plate */}
            <ellipse cx="120" cy="208" rx="106" ry="14" fill="#E8DDF8" />
            <ellipse cx="120" cy="204" rx="96" ry="10" fill="#F7F0FF" />
            {/* bottom tier */}
            <rect x="34" y="128" width="172" height="76" rx="16" fill="#F3BFD4" />
            <path
              d="M34 144 Q34 128 50 128 H190 Q206 128 206 144 Q206 150 198 150 Q190 150 188 158 Q186 166 178 166 Q170 166 168 152 Q166 148 158 150 Q150 152 148 160 Q146 170 138 170 Q130 170 128 156 Q126 150 118 152 Q110 154 108 162 Q106 170 98 170 Q90 170 88 156 Q86 150 78 150 Q70 152 68 160 Q66 168 58 168 Q50 168 48 154 Q46 150 40 152 Q34 152 34 144Z"
              fill="#FFFFFF"
            />
            <circle cx="56" cy="188" r="3" fill="#FFF0B8" />
            <circle cx="84" cy="194" r="3" fill="#E8DDF8" />
            <circle cx="156" cy="190" r="3" fill="#DCE9D5" />
            <circle cx="184" cy="186" r="3" fill="#FFF0B8" />
            <path d="M120 198 s-12 -7.5 -12 -16 a6.5 6.5 0 0 1 12 -4 a6.5 6.5 0 0 1 12 4 c0 8.5 -12 16 -12 16z" fill="#E86C98" />
            {/* top tier */}
            <rect x="64" y="84" width="112" height="54" rx="14" fill="#FFF0B8" />
            <path
              d="M64 98 Q64 84 78 84 H162 Q176 84 176 98 Q176 104 170 104 Q162 104 160 112 Q158 120 150 120 Q142 120 140 108 Q138 104 130 106 Q122 108 120 116 Q118 124 110 124 Q102 124 100 110 Q98 104 90 106 Q82 108 80 114 Q78 120 72 120 Q64 120 64 98Z"
              fill="#FFFFFF"
            />
            <circle cx="84" cy="130" r="2.6" fill="#F3BFD4" />
            <circle cx="120" cy="134" r="2.6" fill="#E8DDF8" />
            <circle cx="156" cy="130" r="2.6" fill="#DCE9D5" />

            {/* candles + flames (or smoke) */}
            {candles.map((x) => (
              <g key={x}>
                <rect x={x - 4} y="56" width="8" height="30" rx="3" fill="#FFFFFF" stroke="#F3BFD4" strokeWidth="1.5" />
                <path d={`M${x - 4} 66 L${x + 4} 62 M${x - 4} 76 L${x + 4} 72`} stroke="#F3BFD4" strokeWidth="2" />
                {lit ? (
                  <g transform={`translate(${x} 54)`}>
                    <path className="flame" d="M0 0 C-7 -8 -5 -17 0 -24 C5 -17 7 -8 0 0Z" fill="#FFB347" />
                    <path className="flame" d="M0 -1 C-3 -5 -2 -10 0 -14 C2 -10 3 -5 0 -1Z" fill="#FFE9A0" />
                  </g>
                ) : (
                  <g transform={`translate(${x} 52)`}>
                    <circle className="smoke" r="3.5" fill="#CFC4CC" />
                  </g>
                )}
              </g>
            ))}
          </svg>
          <BurstLayer pieces={pieces} />
        </button>
      </div>

      <div className="relative z-10 mt-12 flex flex-col items-center gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          onClick={lit ? blowOut : () => setLit(true)}
          className="min-h-14 rounded-full bg-berry px-9 py-2 font-hand text-3xl text-white shadow-lg"
        >
          {lit ? C.button : C.relight}
        </motion.button>
        <p className="max-w-xs text-base text-ink/80">{C.holdHint}</p>
      </div>

      <div aria-live="polite" className="mx-auto mt-6 min-h-16 max-w-sm">
        {!lit && (
          <motion.p
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="font-hand text-[2rem] leading-9 text-berry"
          >
            {C.message}
          </motion.p>
        )}
      </div>
    </section>
  );
}
