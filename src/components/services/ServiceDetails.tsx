"use client";

import type { ServiceContent } from "./serviceContent";

export default function ServiceDetails({
  service,
  expanded,
  onToggle,
}: {
  service: ServiceContent;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="mt-7 w-full max-w-[560px]">
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[11.5px] font-medium text-ink-soft backdrop-blur-sm dark:border-white/10 dark:bg-surface-raised/60"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 text-[14px] font-semibold text-accent-to transition-colors duration-300 hover:text-accent-solid"
        >
          {service.ctaLabel}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-muted transition-colors duration-300 hover:text-ink"
        >
          {expanded ? "Show less" : "More details"}
          <span
            className={`inline-block transition-transform duration-300 ${expanded ? "rotate-180" : "rotate-0"}`}
          >
            ⌄
          </span>
        </button>
      </div>

      <div
        className={[
          "overflow-hidden transition-all duration-500",
          "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          expanded ? "mt-6 max-h-[900px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="space-y-3">
          {service.paragraphs.map((p, i) => (
            <p key={i} className="text-[14px] leading-relaxed text-ink-muted">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-6">
          <span className="text-[11px] font-medium tracking-[0.16em] text-ink-faint">
            WHAT WE PROVIDE
          </span>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {service.capabilities.map((c) => (
              <span
                key={c.label}
                className="group flex items-center gap-2 rounded-xl border border-border-soft bg-surface px-3.5 py-2 text-[12.5px] font-medium text-ink-soft shadow-[0_4px_14px_-10px_rgba(30,20,70,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-tint-border hover:bg-accent-tint"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent-from transition-transform duration-300 group-hover:scale-125" />
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
