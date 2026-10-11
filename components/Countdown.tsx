"use client";

import { useEffect, useState } from "react";
import { content } from "@/lib/birthday-content";
import { getBirthdayStatus } from "@/lib/birthday-date";

function label(): string {
  const s = getBirthdayStatus(content.birthday.date);
  if (s.kind === "before") return `${s.days} ${s.days === 1 ? "day" : "days"} until your birthday`;
  if (s.kind === "today") return "Today is your day!";
  return "Hope your birthday was magical!";
}

/** Small, optional countdown chip. Computed on the client only (no hydration mismatch). */
export default function Countdown() {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(label());
    // Re-check every minute so it flips correctly at the visitor's local midnight.
    const id = window.setInterval(() => setText(label()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p aria-live="polite" className="min-h-8 font-hand text-2xl leading-8 text-berry">
      {text}
    </p>
  );
}
