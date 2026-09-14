"use client";

import { forwardRef } from "react";
import type { ServiceContent } from "./serviceContent";

interface Props {
  service: ServiceContent;
  active: boolean;
  hovered: boolean;
  onSelect: () => void;
  onEnter: () => void;
  onLeave: () => void;
}

const ServiceItem = forwardRef<HTMLButtonElement, Props>(function ServiceItem(
  { service, active, hovered, onSelect, onEnter, onLeave },
  ref
) {
  const emphasized = active || hovered;

  return (
    <button
      ref={ref}
      type="button"
      data-service-row
      onClick={onSelect}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className={[
        "group flex w-full items-start gap-4 border-b border-border-soft py-5 text-left transition-[background-color,transform] duration-300",
        "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        emphasized ? "translate-x-1.5 bg-accent-tint/70" : "translate-x-0 bg-transparent",
      ].join(" ")}
    >
      <span
        className={[
          "mt-1 text-[13px] font-semibold tabular-nums transition-colors duration-300",
          emphasized ? "text-accent-solid" : "text-ink-faint",
        ].join(" ")}
      >
        {service.index}
      </span>

      <span className="flex-1">
        <span className="flex items-center gap-2.5">
          <span
            className={[
              "text-[19px] font-semibold tracking-[-0.01em] transition-[color,transform] duration-300 sm:text-[22px]",
              active ? "text-ink" : emphasized ? "text-ink" : "text-ink-soft",
              emphasized ? "scale-[1.015]" : "scale-100",
            ].join(" ")}
            style={{ transformOrigin: "left center" }}
          >
            {service.name}
          </span>
          <span
            aria-hidden
            className={[
              "text-accent-solid transition-all duration-300",
              emphasized ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
            ].join(" ")}
          >
            →
          </span>
        </span>

        <span
          className={[
            "block overflow-hidden text-[13px] leading-relaxed text-ink-muted transition-all duration-300",
            active ? "mt-1.5 max-h-10 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          {service.tagline}
        </span>
      </span>
    </button>
  );
});

export default ServiceItem;
