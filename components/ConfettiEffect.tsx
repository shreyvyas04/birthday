/**
 * Confetti helper. canvas-confetti is loaded on demand, only when a visitor
 * triggers a celebration, so it never slows the first screen.
 * If it fails to load, this resolves to `false` and the caller simply
 * shows its message anyway. Nothing breaks.
 * Reduced-motion visitors get no confetti (disableForReducedMotion).
 */
export async function fireConfetti(origin: { x: number; y: number } = { x: 0.5, y: 0.6 }): Promise<boolean> {
  try {
    const mod = await import("canvas-confetti");
    const confetti = mod.default;
    const colors = ["#F3BFD4", "#FFF0B8", "#E8DDF8", "#DCE9D5", "#FFFFFF", "#E98BB0"];
    confetti({
      particleCount: 80,
      spread: 75,
      startVelocity: 38,
      origin,
      colors,
      ticks: 190,
      disableForReducedMotion: true,
    });
    window.setTimeout(() => {
      confetti({
        particleCount: 45,
        spread: 110,
        scalar: 0.8,
        origin,
        colors,
        ticks: 170,
        disableForReducedMotion: true,
      });
    }, 200);
    return true;
  } catch {
    return false;
  }
}
