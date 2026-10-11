"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/birthday-content";

/**
 * Optional background music. Never autoplays. If the audio file is missing the button
 * stays friendly: tapping it explains that music can be added later.
 */
export default function MusicControl() {
  const cfg = content.music;
  const audioRef = useRef<HTMLAudioElement>(null);
  const noteTimer = useRef<number | undefined>(undefined);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!cfg.enabled) return;
    let cancelled = false;
    fetch(cfg.src, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") ?? "";
        if (!cancelled) setAvailable(res.ok && !type.includes("text/html"));
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [cfg.enabled, cfg.src]);

  useEffect(() => () => window.clearTimeout(noteTimer.current), []);

  if (!cfg.enabled) return null;

  const showNote = (text: string) => {
    setNote(text);
    window.clearTimeout(noteTimer.current);
    noteTimer.current = window.setTimeout(() => setNote(""), 3500);
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!available || !audio) {
      showNote(cfg.missingMessage);
      return;
    }
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        showNote("The music couldn't start. Try again?");
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className="fixed z-40 flex max-w-[16rem] flex-col items-end gap-2"
      style={{ top: "max(0.75rem, env(safe-area-inset-top))", right: "max(0.75rem, env(safe-area-inset-right))" }}
    >
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-disabled={!available}
        aria-label={playing ? cfg.pauseLabel : cfg.playLabel}
        className={`flex min-h-11 items-center gap-2 rounded-full bg-white/90 px-4 text-sm font-semibold text-berry shadow-md backdrop-blur ${
          available ? "" : "opacity-75"
        }`}
      >
        <span className={`flex h-4 items-end gap-0.5 ${playing ? "" : "eq-paused"}`} aria-hidden="true">
          <span className="eq-bar" />
          <span className="eq-bar" />
          <span className="eq-bar" />
        </span>
        {playing ? "Music on" : "Music"}
      </button>
      {note && (
        <p role="status" className="rounded-2xl bg-white px-3 py-2 text-sm text-ink shadow-md">
          {note}
        </p>
      )}
      <audio ref={audioRef} src={available ? cfg.src : undefined} loop preload="none" onEnded={() => setPlaying(false)} />
    </div>
  );
}
