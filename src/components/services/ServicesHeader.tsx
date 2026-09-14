import { forwardRef } from "react";
import RevealHeading from "../shared/RevealHeading";

const ServicesHeader = forwardRef<HTMLDivElement>(function ServicesHeader(_props, ref) {
  return (
    <div ref={ref} className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-ink-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-solid" />
        WHAT WE DO
      </span>

      <RevealHeading
        as="h2"
        className="mt-5 text-[2.1rem] font-bold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.6rem]"
      >
        Digital solutions,
        <br />
        <span className="reveal-gradient bg-gradient-to-r from-accent-from to-accent-to">
          built around your vision.
        </span>
      </RevealHeading>

      <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-ink-muted">
        From strategy and branding to websites, software and AI — we create digital
        experiences designed to move your business forward.
      </p>
    </div>
  );
});

export default ServicesHeader;
