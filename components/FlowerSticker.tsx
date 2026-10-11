"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { content, type FlowerKind } from "@/lib/birthday-content";
import { BurstLayer, useBurst } from "./Burst";

/** Rounded polar helper so server and client render identical SVG numbers. */
const pt = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: +(50 + r * Math.cos(a)).toFixed(2), y: +(50 + r * Math.sin(a)).toFixed(2) };
};

const SVG_PROPS = { viewBox: "0 0 100 100", className: "h-full w-full", "aria-hidden": true } as const;

function Sunflower() {
  const angles = Array.from({ length: 14 }, (_, i) => +(i * (360 / 14)).toFixed(2));
  return (
    <svg {...SVG_PROPS}>
      {angles.map((a) => (
        <ellipse key={`b${a}`} cx="50" cy="17" rx="6.5" ry="15" fill="#F5C13A" transform={`rotate(${a} 50 50)`} />
      ))}
      {angles.map((a) => (
        <ellipse key={`f${a}`} cx="50" cy="19" rx="5.5" ry="13" fill="#FFD84F" transform={`rotate(${+(a + 12.86).toFixed(2)} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="17" fill="#7B4A2C" stroke="#5E3720" strokeWidth="2" />
      <circle cx="42" cy="40" r="1.2" fill="#9A6340" />
      <circle cx="58" cy="41" r="1.2" fill="#9A6340" />
      <circle cx="50" cy="37" r="1.2" fill="#9A6340" />
      {/* little kawaii face */}
      <circle cx="44.5" cy="48" r="1.9" fill="#FFF4E0" />
      <circle cx="55.5" cy="48" r="1.9" fill="#FFF4E0" />
      <path d="M45.5 53.5 Q50 58 54.5 53.5" stroke="#FFF4E0" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <ellipse cx="40" cy="54" rx="3" ry="2" fill="#F3A6B8" opacity="0.75" />
      <ellipse cx="60" cy="54" rx="3" ry="2" fill="#F3A6B8" opacity="0.75" />
    </svg>
  );
}

function Lily() {
  const petal = "M50 52 C37 36 41 13 50 3 C59 13 63 36 50 52 Z";
  return (
    <svg {...SVG_PROPS}>
      {[60, 180, 300].map((a) => (
        <path key={a} d={petal} fill="#F7EEF2" stroke="#E6CFD8" strokeWidth="1.2" transform={`rotate(${a} 50 50)`} />
      ))}
      {[0, 120, 240].map((a) => (
        <g key={a} transform={`rotate(${a} 50 50)`}>
          <path d={petal} fill="#FFFFFF" stroke="#E6CFD8" strokeWidth="1.2" />
          <path d="M50 46 C49 34 49 22 50 12" stroke="#F4B6CB" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      ))}
      {[-100, -60, -20, 20, 60].map((deg) => {
        const e = pt(17, deg - 90);
        return (
          <g key={deg}>
            <line x1="50" y1="50" x2={e.x} y2={e.y} stroke="#D9A441" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx={e.x} cy={e.y} r="2.4" fill="#F2B53A" />
          </g>
        );
      })}
      <circle cx="50" cy="50" r="4" fill="#F6E27A" />
    </svg>
  );
}

function Rose() {
  const outer = [0, 60, 120, 180, 240, 300].map((a) => pt(25, a - 90));
  const mid = [30, 102, 174, 246, 318].map((a) => pt(14, a - 90));
  return (
    <svg {...SVG_PROPS}>
      <ellipse cx="24" cy="76" rx="14" ry="6.5" fill="#A8C99A" transform="rotate(-28 24 76)" />
      <ellipse cx="76" cy="76" rx="14" ry="6.5" fill="#A8C99A" transform="rotate(28 76 76)" />
      {outer.map((c, i) => (
        <circle key={`o${i}`} cx={c.x} cy={c.y} r="16" fill="#FFFFFF" stroke="#E7D3D9" strokeWidth="1.3" />
      ))}
      {mid.map((c, i) => (
        <circle key={`m${i}`} cx={c.x} cy={c.y} r="11" fill="#FFFDFB" stroke="#E7D3D9" strokeWidth="1.3" />
      ))}
      <circle cx="50" cy="50" r="11" fill="#FFF8F6" stroke="#E7D3D9" strokeWidth="1.3" />
      <path
        d="M50 50 m-3 0 a3 3 0 1 1 6 0 a6 6 0 1 1 -12 0 a9 9 0 1 1 18 0"
        stroke="#E2C6CF"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Daisy() {
  const angles = Array.from({ length: 10 }, (_, i) => i * 36);
  return (
    <svg {...SVG_PROPS}>
      {angles.map((a) => (
        <ellipse key={a} cx="50" cy="23" rx="5.5" ry="14" fill="#FFFFFF" stroke="#EADCE0" strokeWidth="1.2" transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="10" fill="#FFD54A" stroke="#F0B429" strokeWidth="1.5" />
      <circle cx="47" cy="47" r="2" fill="#FFE98A" />
    </svg>
  );
}

function Bud() {
  return (
    <svg {...SVG_PROPS}>
      <path d="M50 96 C50 82 50 68 50 54" stroke="#8FB683" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <ellipse cx="37" cy="80" rx="12" ry="5.5" fill="#A8C99A" transform="rotate(-35 37 80)" />
      <ellipse cx="63" cy="72" rx="12" ry="5.5" fill="#A8C99A" transform="rotate(35 63 72)" />
      <path d="M50 8 C36 22 36 44 50 56 C64 44 64 22 50 8 Z" fill="#FBD4E1" stroke="#EDB2C7" strokeWidth="1.3" />
      <path d="M50 12 C44 26 44 42 50 54" stroke="#F3B6CC" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M50 12 C56 26 56 42 50 54" stroke="#F3B6CC" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Leaf() {
  return (
    <svg {...SVG_PROPS}>
      <path d="M50 94 C18 72 18 30 50 6 C82 30 82 72 50 94 Z" fill="#A8C99A" stroke="#8FB683" strokeWidth="1.4" />
      <path d="M50 92 L50 16" stroke="#8FB683" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const ART: Record<FlowerKind, () => React.JSX.Element> = {
  sunflower: Sunflower,
  lily: Lily,
  rose: Rose,
  daisy: Daisy,
  bud: Bud,
  leaf: Leaf,
};

const NAMES: Record<FlowerKind, string> = {
  sunflower: "sunflower",
  lily: "white lily",
  rose: "white rose",
  daisy: "daisy",
  bud: "flower bud",
  leaf: "leaf",
};

interface Props {
  kind: FlowerKind;
  /** Pixel size (width = height). */
  size?: number;
  rotate?: number;
  sway?: boolean;
  /** Seconds, offsets the sway so neighbouring flowers don't move in lockstep. */
  delay?: number;
  /** Renders a real button: tap for sparkles and a short message. */
  tappable?: boolean;
  /** Lets the visitor drag the sticker a little (implies a button). */
  draggable?: boolean;
  /** Hide on small screens to keep mobile uncluttered. */
  hideOnMobile?: boolean;
  /** Positioning classes, e.g. "absolute -left-4 top-2". */
  className?: string;
}

/**
 * Reusable illustrated flower sticker (inline SVG). Decorative by default (aria-hidden,
 * not focusable); becomes a button when `tappable` or `draggable`.
 */
export default function FlowerSticker({
  kind,
  size = 72,
  rotate = 0,
  sway = true,
  delay = 0,
  tappable = false,
  draggable = false,
  hideOnMobile = false,
  className = "",
}: Props) {
  const Art = ART[kind];
  const { pieces, fire } = useBurst(["✦", "✿", "♥", "✧"], 6);
  const [message, setMessage] = useState<string | null>(null);
  const index = useRef(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onTap = () => {
    fire();
    const list = content.flowerMessages;
    setMessage(list[index.current % list.length]);
    index.current += 1;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(null), 2200);
  };

  const hide = hideOnMobile ? "hidden sm:block " : "";

  const art = (
    <span
      className="sticker relative block"
      style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}
    >
      <span
        className={sway ? "sway block h-full w-full" : "block h-full w-full"}
        style={sway ? { animationDelay: `${delay}s`, animationDuration: `${4 + (delay % 3)}s` } : undefined}
      >
        <Art />
      </span>
    </span>
  );

  if (!tappable && !draggable) {
    return (
      <span aria-hidden="true" className={`${hide}pointer-events-none select-none ${className}`}>
        {art}
      </span>
    );
  }

  return (
    <motion.button
      type="button"
      aria-label={`Tap the ${NAMES[kind]} for a little surprise`}
      onClick={onTap}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.08 }}
      drag={draggable}
      dragMomentum={false}
      dragElastic={0.25}
      dragConstraints={draggable ? { left: -90, right: 90, top: -40, bottom: 40 } : undefined}
      style={draggable ? { touchAction: "none" } : undefined}
      className={`${hide}relative block select-none ${className}`}
    >
      {art}
      <BurstLayer pieces={pieces} />
      {message && (
        <span
          role="status"
          className="absolute bottom-full left-1/2 z-50 mb-1 w-max max-w-[9.5rem] -translate-x-1/2 rounded-2xl bg-white px-3 py-1 text-center font-hand text-xl leading-tight text-ink shadow-md"
        >
          {message}
        </span>
      )}
    </motion.button>
  );
}
