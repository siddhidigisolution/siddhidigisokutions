export default function GraphicVisualizer() {
  return (
    <div className="relative h-full w-full [perspective:1200px]">
      {/* social media post card */}
      <div
        className="animate-float-y absolute left-[6%] top-[10%] w-[104px] overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_20px_40px_-16px_rgba(76,58,140,0.4)]"
        style={{ transform: "rotate(-7deg)", animationDelay: "-0.5s" }}
      >
        <div className="aspect-square bg-gradient-to-br from-[#8a7bf0] to-[#5b3fe0]" />
        <div className="flex items-center gap-1.5 p-2">
          <span className="h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-[#c9beff] to-[#8a7bf0]" />
          <div className="flex-1 space-y-1">
            <div className="h-1.5 w-3/4 rounded-full bg-[#e4dfff]" />
            <div className="h-1.5 w-1/2 rounded-full bg-[#f3f0ff]" />
          </div>
          <span className="text-[10px] text-[#e0a6c0]">♥</span>
        </div>
      </div>

      {/* poster with headline block */}
      <div
        className="animate-float-y-slow absolute left-[36%] top-[4%] flex h-[84px] w-[84px] flex-col justify-end gap-1.5 rounded-2xl border border-white/60 bg-gradient-to-br from-[#c9beff] to-[#8a7bf0] p-2.5 shadow-[0_20px_40px_-16px_rgba(76,58,140,0.4)]"
        style={{ transform: "rotate(5deg)", animationDelay: "-2s" }}
      >
        <div className="h-2 w-4/5 rounded-full bg-white/80" />
        <div className="h-2 w-3/5 rounded-full bg-white/80" />
        <div className="h-1.5 w-2/5 rounded-full bg-white/40" />
      </div>

      {/* story-style vertical card */}
      <div
        className="animate-float-y-rev absolute left-[58%] top-[12%] w-[76px] overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-b from-[#e0a6f0] to-[#a692f0] shadow-[0_20px_40px_-16px_rgba(76,58,140,0.4)]"
        style={{ transform: "rotate(-4deg)", animationDelay: "-1.2s" }}
      >
        <div className="flex gap-1 p-1.5">
          <span className="h-[3px] flex-1 rounded-full bg-white/90" />
          <span className="h-[3px] flex-1 rounded-full bg-white/40" />
          <span className="h-[3px] flex-1 rounded-full bg-white/40" />
        </div>
        <div className="flex h-[88px] items-center justify-center">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/30">
            <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
          </span>
        </div>
      </div>

      {/* print swatch, corner-folded */}
      <div
        className="animate-float-y absolute left-[10%] top-[54%] h-[76px] w-[92px] rounded-2xl border border-white/60 bg-gradient-to-br from-[#6d8bff] to-[#8a7bf0] shadow-[0_20px_40px_-16px_rgba(76,58,140,0.4)]"
        style={{ transform: "rotate(7deg)", animationDelay: "-3s" }}
      >
        <div className="flex h-full w-full flex-col justify-end p-2.5">
          <div className="h-1.5 w-1/2 rounded-full bg-white/70" />
          <div className="mt-1 h-1.5 w-1/3 rounded-full bg-white/40" />
        </div>
        <div className="absolute -right-1 -top-1 h-6 w-6 rounded-bl-lg bg-white/35 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
      </div>

      {/* campaign card with icon */}
      <div
        className="animate-float-y-slow absolute left-[54%] top-[52%] flex h-[92px] w-[104px] flex-col justify-between rounded-2xl border border-white/60 bg-gradient-to-br from-[#5b3fe0] to-[#a692f0] p-2.5 shadow-[0_20px_40px_-16px_rgba(76,58,140,0.4)]"
        style={{ transform: "rotate(-5deg)", animationDelay: "-1.6s" }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-[11px]">✎</span>
        <div>
          <div className="h-1.5 w-3/4 rounded-full bg-white/70" />
          <div className="mt-1 h-1.5 w-1/2 rounded-full bg-white/40" />
        </div>
      </div>

      {/* small illustration blob accent */}
      <svg
        className="animate-float-y-rev absolute right-[6%] bottom-[6%] h-16 w-16 opacity-90"
        viewBox="0 0 100 100"
        style={{ animationDelay: "-2.6s" }}
      >
        <path d="M50 8C68 8 88 24 90 46C92 68 72 92 48 90C24 88 8 68 10 46C12 24 32 8 50 8Z" fill="url(#blobGrad)" />
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
