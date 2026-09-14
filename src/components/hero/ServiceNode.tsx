"use client";

import { forwardRef } from "react";
import type { ServiceDef } from "./serviceData";
import { SERVICE_ICONS } from "./icons";

interface Props {
  service: ServiceDef;
  hovered: boolean;
  dimmed: boolean;
  hidden: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}

const ServiceNode = forwardRef<HTMLButtonElement, Props>(function ServiceNode(
  { service, hovered, dimmed, hidden, onEnter, onLeave, onClick },
  ref
) {
  const Icon = SERVICE_ICONS[service.id];
  return (
    <button
      ref={ref}
      type="button"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onClick}
      aria-label={`${service.name} — ${service.descriptor}`}
      className={[
        "group pointer-events-auto flex w-max -translate-x-1/2 -translate-y-1/2 select-none flex-row items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-left backdrop-blur-xl transition-[opacity,transform,box-shadow,background-color,border-color] duration-500",
        "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        hidden ? "pointer-events-none opacity-0" : "opacity-100",
        hovered
          ? "z-20 scale-[1.08] border-white/80 bg-white/80 shadow-[0_18px_45px_-12px_rgba(76,58,140,0.35)] dark:border-white/25 dark:bg-surface-raised/90"
          : "z-10 scale-100 border-white/40 bg-white/45 shadow-[0_8px_24px_-10px_rgba(30,20,70,0.18)] dark:border-white/10 dark:bg-surface-raised/60",
        dimmed && !hovered ? "opacity-35" : "",
      ].join(" ")}
      style={{ willChange: "transform" }}
    >
      <span
        className={[
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-accent-solid transition-transform duration-500",
          hovered ? "scale-110 text-accent-to" : "",
        ].join(" ")}
      >
        <Icon />
      </span>
      <span className="text-[13px] font-semibold leading-snug text-ink">
        {service.name}
      </span>
    </button>
  );
});

export default ServiceNode;
