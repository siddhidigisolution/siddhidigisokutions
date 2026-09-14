"use client";

import { FORM_STEPS } from "./contactContent";

export default function FormProgress({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {FORM_STEPS.map((step, i) => {
        const reached = i <= activeIndex;
        return (
          <div key={step.key} className="flex items-center gap-2">
            <span
              className={[
                "text-[11.5px] font-semibold tabular-nums transition-colors duration-300",
                reached ? "text-accent-solid" : "text-ink-faint",
              ].join(" ")}
            >
              {String(i + 1).padStart(2, "0")} {step.label}
            </span>
            {i < FORM_STEPS.length - 1 && (
              <span aria-hidden className={reached ? "text-accent-solid" : "text-accent-tint-border"}>
                →
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
