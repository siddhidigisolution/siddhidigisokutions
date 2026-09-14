"use client";

import RevealHeading from "../shared/RevealHeading";

export default function ContactCTA({
  onStartProject,
  submitted,
}: {
  onStartProject: () => void;
  submitted: boolean;
}) {
  return (
    <div className="relative mx-auto mt-28 max-w-3xl px-6 text-center sm:mt-36">
      <RevealHeading
        as="h3"
        className="text-[28px] font-semibold leading-tight tracking-tight text-ink sm:text-[36px]"
      >
        Your next digital experience starts here.
      </RevealHeading>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
        {submitted
          ? "We've got your brief — but if there's more to say, we're always listening."
          : "No project is too early. Tell us what you're imagining and we'll help you shape it."}
      </p>
      {!submitted && (
        <button
          type="button"
          onClick={onStartProject}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-to hover:shadow-[0_16px_32px_-14px_rgba(91,63,224,0.55)] dark:bg-accent-solid"
        >
          Start a Project
          <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
        </button>
      )}
    </div>
  );
}
