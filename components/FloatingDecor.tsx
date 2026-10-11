const ITEMS = [
  { g: "♥", left: "8%", size: 20, dur: 13, delay: 0, color: "#E58FB0" },
  { g: "✦", left: "22%", size: 16, dur: 16, delay: 3, color: "#F0B429" },
  { g: "♡", left: "36%", size: 24, dur: 14, delay: 6, color: "#E58FB0" },
  { g: "✿", left: "52%", size: 18, dur: 17, delay: 1.5, color: "#B7A0E3" },
  { g: "♥", left: "66%", size: 18, dur: 12, delay: 8, color: "#F3A6C0" },
  { g: "✦", left: "80%", size: 20, dur: 15, delay: 4, color: "#F0B429" },
  { g: "♡", left: "90%", size: 22, dur: 18, delay: 9, color: "#E58FB0" },
  { g: "✧", left: "14%", size: 18, dur: 19, delay: 11, color: "#9FC48F" },
  { g: "♥", left: "58%", size: 16, dur: 16, delay: 12, color: "#F3A6C0" },
];

/** Gentle floating hearts and stars. Transform/opacity-only CSS animation, a handful of nodes. */
export default function FloatingDecor({ count = 9, className = "" }: { count?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {ITEMS.slice(0, count).map((it, i) => (
        <span
          key={i}
          className={`float-up ${i > 5 ? "hidden sm:block" : ""}`}
          style={{
            left: it.left,
            fontSize: it.size,
            color: it.color,
            animationDuration: `${it.dur}s`,
            animationDelay: `${it.delay}s`,
          }}
        >
          {it.g}
        </span>
      ))}
    </div>
  );
}
