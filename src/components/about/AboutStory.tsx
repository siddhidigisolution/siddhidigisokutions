"use client";

import { STORY_STAGES, type StoryStageId } from "./aboutContent";

export default function AboutStory({
  activeStage,
  onSelect,
}: {
  activeStage: StoryStageId | null;
  onSelect: (id: StoryStageId | null) => void;
}) {
  return (
    <div className="mt-14">
      <span className="text-[11px] font-medium tracking-[0.16em] text-ink-faint">
        WHO WE ARE
      </span>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {STORY_STAGES.map((stage) => {
          const active = activeStage === stage.id;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onSelect(active ? null : stage.id)}
              className={[
                "group relative rounded-2xl border p-5 text-left transition-all duration-400",
                "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                active
                  ? "-translate-y-1 border-accent-tint-border bg-surface shadow-[0_20px_40px_-18px_rgba(76,58,140,0.4)]"
                  : "border-border-soft bg-surface/60 hover:-translate-y-0.5 hover:border-accent-tint-border/70 hover:bg-surface",
              ].join(" ")}
            >
              <span
                className={[
                  "text-[12px] font-semibold tabular-nums transition-colors duration-300",
                  active ? "text-accent-solid" : "text-ink-faint",
                ].join(" ")}
              >
                {stage.index}
              </span>
              <p className="mt-2 text-[16px] font-bold text-ink">{stage.title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                {stage.lede}
              </p>

              <p
                className={[
                  "overflow-hidden text-[12.5px] leading-relaxed text-ink-muted transition-all duration-400",
                  active ? "mt-2 max-h-24 opacity-100" : "max-h-0 opacity-0",
                ].join(" ")}
              >
                {stage.copy}
              </p>

              <span
                className={[
                  "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400",
                  active ? "opacity-100" : "group-hover:opacity-60",
                ].join(" ")}
                style={{
                  background:
                    "radial-gradient(120% 100% at 0% 0%, rgba(139,124,246,0.08), transparent 60%)",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
