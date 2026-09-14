"use client";

import { forwardRef } from "react";
import type { ServiceDef } from "./serviceData";
import { SERVICE_ICONS } from "./icons";

interface Props {
  service: ServiceDef;
  onClose: () => void;
}

const ServicePanel = forwardRef<HTMLDivElement, Props>(function ServicePanel(
  { service, onClose },
  ref
) {
  const Icon = SERVICE_ICONS[service.id];
  return (
    <div
      ref={ref}
      className="pointer-events-auto relative w-full rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_30px_70px_-15px_rgba(40,25,90,0.4)] backdrop-blur-2xl dark:border-white/15 dark:bg-surface-raised/95"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close service details"
        className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-black/10 text-ink transition hover:border-black/20 hover:bg-black/5 dark:border-white/15 dark:hover:border-white/25 dark:hover:bg-white/5"
      >
        <span className="text-sm leading-none">×</span>
      </button>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#c9befb] to-[#8b7cf6] text-white">
        <span className="h-6 w-6">
          <Icon />
        </span>
      </span>
      <h3 className="mt-4 text-lg font-semibold leading-snug text-ink">
        {service.name}
      </h3>
      <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-muted">
        {service.description}
      </p>
      <a
        href="#contact"
        className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent-to transition-transform duration-300 hover:translate-x-0.5"
      >
        Explore Service <span aria-hidden>→</span>
      </a>
    </div>
  );
});

export default ServicePanel;
