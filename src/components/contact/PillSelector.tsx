"use client";

import type { PillOption } from "./contactContent";

export default function PillSelector({
  options,
  selected,
  onToggle,
}: {
  options: PillOption[];
  selected: string[];
  onToggle: (key: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const active = selected.includes(option.key);
        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(option.key)}
            className={[
              "inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300",
              "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
              active
                ? "scale-[1.03] border-transparent bg-gradient-to-r from-accent-from to-accent-cta-to text-white shadow-[0_10px_22px_-10px_rgba(91,63,224,0.55)]"
                : "border-black/10 bg-surface text-ink-soft hover:border-accent-tint-border hover:bg-accent-tint dark:border-white/10",
            ].join(" ")}
          >
            {active && (
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/25">
                <svg viewBox="0 0 12 12" width="8" height="8" fill="none">
                  <path d="M2 6l2.5 2.5L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
