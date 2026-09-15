import RobotCompanion2D from "../shared/RobotCompanion2D";

export default function HumanConnection() {
  return (
    <section className="relative mx-auto w-full max-w-[1400px] px-6 py-24 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="mb-10 flex items-center gap-8 sm:gap-14">
          <RobotCompanion2D expression="loving" />

          <svg width="30" height="14" viewBox="0 0 30 14" fill="none" className="text-accent-tint-border">
            <path d="M0 7h26M20 1l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* minimal abstract human silhouette */}
          <svg width="56" height="72" viewBox="0 0 56 72" fill="none">
            <circle cx="28" cy="20" r="16" fill="url(#humanGrad)" />
            <path d="M4 70c3-20 14-28 24-28s21 8 24 28" fill="url(#humanGrad)" opacity="0.85" />
            <defs>
              <linearGradient id="humanGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#a692f0" />
                <stop offset="1" stopColor="#5b3fe0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h3 className="text-[1.7rem] font-bold leading-[1.25] tracking-[-0.01em] text-ink sm:text-[2rem]">
          Technology is what we build.
          <br />
          <span className="bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
            People are why we build it.
          </span>
        </h3>
      </div>
    </section>
  );
}
