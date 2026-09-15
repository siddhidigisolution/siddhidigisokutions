"use client";

import { useState } from "react";
import { PHILOSOPHY_CARDS } from "./aboutContent";
import RobotCompanion2D from "../shared/RobotCompanion2D";

const PHILOSOPHY_ICON: Record<string, React.ReactElement> = {
  simple: (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  purposeful: (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  ),
  human: (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 20c1.2-4 4-5.6 7-5.6S17.8 16 19 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
};

export default function Philosophy() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const hovered = PHILOSOPHY_CARDS.find((c) => c.key === hoveredKey);

  return (
    <section className="relative mx-auto w-full max-w-[1400px] px-6 py-20 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-xl text-center">
        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-solid" />
          OUR PHILOSOPHY
        </span>
        <h3 className="mt-4 text-[1.9rem] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[2.2rem]">
          Technology should feel human.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-relaxed text-ink-muted">
          We believe technology is most powerful when it becomes simple, useful and
          enjoyable for the people using it.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-4xl">
        <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 opacity-90">
          <RobotCompanion2D expression={hovered?.expression ?? "idle"} />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {PHILOSOPHY_CARDS.map((card) => (
            <div
              key={card.key}
              onMouseEnter={() => setHoveredKey(card.key)}
              onMouseLeave={() => setHoveredKey(null)}
              className="group relative cursor-default overflow-hidden rounded-2xl border border-border-soft bg-surface p-6 shadow-[0_8px_24px_-16px_rgba(30,20,70,0.25)] transition-all duration-400 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-accent-tint-border hover:shadow-[0_24px_44px_-18px_rgba(76,58,140,0.4)]"
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{ background: "radial-gradient(90% 80% at 20% 0%, rgba(139,124,246,0.1), transparent 65%)" }}
              />
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent-tint text-accent-solid transition-transform duration-400 group-hover:scale-110 group-hover:rotate-6">
                {PHILOSOPHY_ICON[card.key]}
              </span>
              <p className="relative mt-4 text-[16px] font-bold text-ink">{card.title}</p>
              <p className="relative mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">
                {card.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
