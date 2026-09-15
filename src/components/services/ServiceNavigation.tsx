"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { ServiceId } from "../hero/serviceData";
import { SERVICE_CONTENT, SERVICE_ORDER } from "./serviceContent";
import ServiceItem from "./ServiceItem";

export default function ServiceNavigation({
  activeService,
  onSelect,
  onHoverChange,
}: {
  activeService: ServiceId;
  onSelect: (id: ServiceId) => void;
  onHoverChange: (id: ServiceId | null) => void;
}) {
  const [hoveredId, setHoveredId] = useState<ServiceId | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<ServiceId, HTMLButtonElement>>(new Map());
  const indicatorRef = useRef<HTMLDivElement>(null);

  const setHover = (id: ServiceId | null) => {
    setHoveredId(id);
    onHoverChange(id);
  };

  useEffect(() => {
    const list = listRef.current;
    const active = itemRefs.current.get(activeService);
    const indicator = indicatorRef.current;
    if (!list || !active || !indicator) return;
    const listRect = list.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    gsap.to(indicator, {
      top: activeRect.top - listRect.top,
      height: activeRect.height,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [activeService]);

  return (
    <div className="w-full lg:max-w-[46%]">
      {/* desktop vertical list */}
      <div ref={listRef} className="relative hidden md:block">
        <div
          ref={indicatorRef}
          className="pointer-events-none absolute left-[-14px] w-[3px] rounded-full bg-gradient-to-b from-accent-from to-accent-to shadow-[0_0_16px_rgba(138,123,240,0.6)]"
        />
        {SERVICE_ORDER.map((id) => {
          const service = SERVICE_CONTENT[id];
          return (
            <ServiceItem
              key={id}
              ref={(el) => {
                if (el) itemRefs.current.set(id, el);
              }}
              service={service}
              active={activeService === id}
              hovered={hoveredId === id}
              onSelect={() => onSelect(id)}
              onEnter={() => setHover(id)}
              onLeave={() => setHover(null)}
            />
          );
        })}
      </div>

      {/* progress indicator */}
      <div className="mt-6 hidden items-center gap-2 md:flex">
        {SERVICE_ORDER.map((id, i) => {
          const activeIndex = SERVICE_ORDER.indexOf(activeService);
          const filled = i <= activeIndex;
          return (
            <div key={id} className="flex items-center gap-2">
              <span
                className={[
                  "text-[10px] font-semibold tabular-nums transition-colors duration-300",
                  filled ? "text-accent-solid" : "text-ink-faint",
                ].join(" ")}
              >
                {SERVICE_CONTENT[id].index}
              </span>
              {i < SERVICE_ORDER.length - 1 && (
                <span className="relative h-px w-6 overflow-hidden bg-accent-tint-border/50">
                  <span
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-from to-accent-to transition-all duration-500"
                    style={{ width: filled ? "100%" : "0%" }}
                  />
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* mobile horizontally scrollable tabs */}
      <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:hidden">
        {SERVICE_ORDER.map((id) => {
          const service = SERVICE_CONTENT[id];
          const active = activeService === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={[
                "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-medium transition-colors duration-300",
                active
                  ? "border-transparent bg-gradient-to-r from-accent-from to-accent-cta-to text-white shadow-[0_10px_24px_-8px_rgba(91,63,224,0.5)]"
                  : "border-black/10 bg-white/60 text-ink-soft dark:border-white/10 dark:bg-surface-raised/60",
              ].join(" ")}
            >
              <span className={active ? "opacity-80" : "opacity-50"}>{service.index}</span>
              {service.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
