const PIECES = [
  { left: "8%", top: "12%", w: 96, h: 120, rot: -8, gradient: "from-[#8a7bf0] to-[#5b3fe0]", delay: "-0.5s", anim: "animate-float-y" },
  { left: "34%", top: "6%", w: 78, h: 78, rot: 5, gradient: "from-[#c9beff] to-[#8a7bf0]", delay: "-2s", anim: "animate-float-y-slow" },
  { left: "58%", top: "14%", w: 100, h: 70, rot: -4, gradient: "from-[#e0a6f0] to-[#a692f0]", delay: "-1.2s", anim: "animate-float-y-rev" },
  { left: "12%", top: "56%", w: 90, h: 70, rot: 7, gradient: "from-[#6d8bff] to-[#8a7bf0]", delay: "-3s", anim: "animate-float-y" },
  { left: "56%", top: "54%", w: 110, h: 96, rot: -6, gradient: "from-[#5b3fe0] to-[#a692f0]", delay: "-1.6s", anim: "animate-float-y-slow" },
];

export default function GraphicVisualizer() {
  return (
    <div className="relative h-full w-full [perspective:1200px]">
      {PIECES.map((p, i) => (
        <div
          key={i}
          className={`${p.anim} absolute rounded-2xl border border-white/60 bg-gradient-to-br shadow-[0_20px_40px_-16px_rgba(76,58,140,0.4)] ${p.gradient}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.w,
            height: p.h,
            transform: `rotate(${p.rot}deg)`,
            animationDelay: p.delay,
          }}
        >
          <div className="flex h-full w-full flex-col justify-end p-2.5">
            <div className="h-1.5 w-1/2 rounded-full bg-white/70" />
            <div className="mt-1 h-1.5 w-1/3 rounded-full bg-white/40" />
          </div>
        </div>
      ))}

      {/* small illustration blob accent */}
      <svg
        className="animate-float-y-rev absolute right-[6%] bottom-[8%] h-16 w-16 opacity-90"
        viewBox="0 0 100 100"
        style={{ animationDelay: "-2.6s" }}
      >
        <path
          d="M50 8C68 8 88 24 90 46C92 68 72 92 48 90C24 88 8 68 10 46C12 24 32 8 50 8Z"
          fill="url(#blobGrad)"
        />
        <defs>
          <linearGradient id="blobGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8a7bf0" />
            <stop offset="1" stopColor="#5b3fe0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
