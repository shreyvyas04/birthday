import FlowerSticker from "./FlowerSticker";

/**
 * Small illustrated bouquet: sunflower, white lilies and white roses, tied with a ribbon.
 * Built from the same FlowerSticker art plus a few SVG stems. The flowers are tappable.
 */
export default function Bouquet() {
  return (
    <div className="relative mx-auto h-[290px] w-[260px]">
      {/* stems + ribbon (behind / in front of the flowers) */}
      <svg viewBox="0 0 260 290" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g stroke="#8FB683" strokeWidth="5" fill="none" strokeLinecap="round">
          <path d="M130 250 C130 200 130 160 130 100" />
          <path d="M130 250 C112 205 80 175 52 140" />
          <path d="M130 250 C150 205 182 175 208 140" />
          <path d="M130 250 C108 215 84 205 62 192" />
          <path d="M130 250 C152 215 176 205 198 192" />
        </g>
        <ellipse cx="96" cy="232" rx="30" ry="11" fill="#A8C99A" transform="rotate(-32 96 232)" />
        <ellipse cx="164" cy="232" rx="30" ry="11" fill="#A8C99A" transform="rotate(32 164 232)" />
        <path d="M130 250 L96 284 M130 250 L164 284" stroke="#F3BFD4" strokeWidth="14" strokeLinecap="round" />
      </svg>

      <FlowerSticker kind="lily" size={86} rotate={-24} tappable delay={0.4} className="absolute left-[2px] top-[70px]" />
      <FlowerSticker kind="lily" size={86} rotate={24} tappable delay={1.4} className="absolute right-[2px] top-[70px]" />
      <FlowerSticker kind="sunflower" size={118} rotate={0} tappable delay={0.9} className="absolute left-[71px] bottom-[100px]" />
      <FlowerSticker kind="rose" size={80} rotate={-8} tappable delay={1.8} className="absolute left-[140px] bottom-[180px]" />
      <FlowerSticker kind="rose" size={80} rotate={8} tappable delay={0.2} className="absolute left-[160px] bottom-[220px]" />
      <FlowerSticker kind="daisy" size={44} rotate={10} delay={2.2} className="absolute left-[108px] top-[150px]" />

      {/* bow */}
      <svg viewBox="0 0 80 50" className="absolute left-[90px] top-[226px] h-[50px] w-[80px]" aria-hidden="true">
        <path d="M40 25 C26 6 6 8 8 24 C10 40 28 38 40 25 Z" fill="#F3A6C0" stroke="#E58FB0" strokeWidth="1.5" />
        <path d="M40 25 C54 6 74 8 72 24 C70 40 52 38 40 25 Z" fill="#F3A6C0" stroke="#E58FB0" strokeWidth="1.5" />
        <circle cx="40" cy="25" r="6" fill="#E58FB0" />
      </svg>
    </div>
  );
}
