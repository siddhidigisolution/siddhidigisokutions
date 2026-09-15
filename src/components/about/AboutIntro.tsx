import { forwardRef } from "react";
import RevealHeading from "../shared/RevealHeading";

const AboutIntro = forwardRef<HTMLDivElement>(function AboutIntro(_props, ref) {
  return (
    <div ref={ref} className="max-w-xl">
      <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-ink-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-solid" />
        ABOUT SIDDHI DIGITAL SOLUTION
      </span>

      <RevealHeading
        as="h2"
        className="mt-5 text-[2.1rem] font-bold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.5rem]"
      >
        More than a digital agency.
        <br />
        We&rsquo;re your{" "}
        <span className="reveal-gradient bg-gradient-to-r from-accent-from to-accent-to">
          digital partner.
        </span>
      </RevealHeading>

      <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
        Siddhi Digital Solution is a creative technology studio focused on turning ideas
        into meaningful digital experiences — from brand identities and websites to
        software, motion and intelligent automation.
      </p>
    </div>
  );
});

export default AboutIntro;
