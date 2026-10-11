"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

export interface BurstPiece {
  id: number;
  glyph: string;
  dx: number;
  dy: number;
  rot: number;
}

const DEFAULT_GLYPHS = ["♥", "✦", "♡", "✿"];

/**
 * Tiny tap-burst: call `fire()` and a handful of glyphs fly out of the
 * `<BurstLayer pieces={pieces} />` placed inside a `relative` parent.
 * A few DOM nodes, pure CSS animation, removed again after ~1s.
 */
export function useBurst(glyphs: string[] = DEFAULT_GLYPHS, count = 7) {
  const [pieces, setPieces] = useState<BurstPiece[]>([]);
  const idRef = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  const fire = useCallback(() => {
    const batch: BurstPiece[] = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
      const radius = 34 + Math.random() * 30;
      idRef.current += 1;
      return {
        id: idRef.current,
        glyph: glyphs[i % glyphs.length],
        dx: Math.round(Math.cos(angle) * radius),
        dy: Math.round(Math.sin(angle) * radius - 14),
        rot: Math.round(Math.random() * 60 - 30),
      };
    });
    setPieces((p) => [...p, ...batch]);
    const ids = new Set(batch.map((b) => b.id));
    timers.current.push(window.setTimeout(() => setPieces((p) => p.filter((x) => !ids.has(x.id))), 950));
  }, [count, glyphs]);

  return { pieces, fire };
}

export function BurstLayer({ pieces }: { pieces: BurstPiece[] }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="burst-piece"
          style={{ "--dx": `${p.dx}px`, "--dy": `${p.dy}px`, "--rot": `${p.rot}deg` } as CSSProperties}
        >
          {p.glyph}
        </span>
      ))}
    </span>
  );
}
