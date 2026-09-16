const WAVEFORM = [4, 8, 5, 11, 7, 14, 6, 10, 4, 9, 13, 6, 8, 5, 11, 7, 4, 9, 6, 12];
const FRAME_TINTS = [
  "from-[#8a7bf0]/50 to-[#5b3fe0]/40",
  "from-[#c9beff]/60 to-[#8a7bf0]/40",
  "from-[#6d8bff]/50 to-[#8a7bf0]/40",
];

export default function MotionVisualizer() {
  return (
    <div className="relative h-full w-full [perspective:1200px]">
      {/* filmstrip, floating behind on the left */}
      <div
        className="animate-float-y-slow absolute left-[4%] top-[16%] w-[64px] rounded-xl border border-white/70 bg-[#12101c] p-1.5 shadow-[0_20px_40px_-16px_rgba(30,20,70,0.5)] [transform:rotateY(14deg)_rotateZ(-3deg)]"
        style={{ animationDelay: "-1.4s" }}
      >
        <div className="space-y-1">
          {FRAME_TINTS.map((tint, i) => (
            <div
              key={i}
              className={`relative aspect-video rounded-[4px] bg-gradient-to-br ${tint}`}
            >
              <span className="absolute -left-0.5 top-1/2 h-2 w-1 -translate-y-1/2 rounded-[1px] bg-[#2a2340]" />
              <span className="absolute -right-0.5 top-1/2 h-2 w-1 -translate-y-1/2 rounded-[1px] bg-[#2a2340]" />
            </div>
          ))}
        </div>
      </div>

      {/* main video player card */}
      <div className="animate-float-y absolute left-1/2 top-1/2 w-[86%] max-w-[300px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/80 bg-[#0d0b16] shadow-[0_30px_65px_-20px_rgba(30,20,70,0.6)] [transform:rotateY(-7deg)_rotateX(3deg)]">
        {/* title bar */}
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-[#151223] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#f0a6a6]" />
          <span className="h-2 w-2 rounded-full bg-[#f0d5a6]" />
          <span className="h-2 w-2 rounded-full bg-[#a6e0b0]" />
          <span className="ml-1.5 flex-1 truncate text-[9px] text-white/50">brand-film_final.mp4</span>
          <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[8px] font-semibold text-white/70">4K</span>
        </div>

        {/* video canvas — a small rendered scene instead of a flat box */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-b from-[#2a2454] via-[#3a2f6b] to-[#171335]">
          <div className="absolute left-1/2 top-[30%] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5d9a6] opacity-90 blur-[1px]" />
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[#12101c] [clip-path:polygon(0%_60%,15%_35%,30%_55%,48%_20%,65%_48%,80%_30%,100%_50%,100%_100%,0%_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[#0d0b16] opacity-90 [clip-path:polygon(0%_70%,20%_45%,40%_65%,60%_38%,82%_58%,100%_42%,100%_100%,0%_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_100%,transparent_40%,rgba(0,0,0,0.45)_100%)]" />

          {/* play button with a soft breathing glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="animate-pulse-soft absolute h-12 w-12 rounded-full bg-white/25 blur-md" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-lg">
              <div className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-[#5b3fe0]" />
            </div>
          </div>

          <span className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[8px] font-medium text-white/80">
            00:12 / 00:45
          </span>
        </div>

        {/* waveform + scrubber */}
        <div className="space-y-2 bg-[#151223] px-3.5 py-3">
          <div className="flex h-4 items-end gap-[2px]">
            {WAVEFORM.map((h, i) => (
              <span
                key={i}
                className="w-full rounded-full"
                style={{
                  height: `${h * 6}%`,
                  background: i < 8 ? "linear-gradient(180deg,#8a7bf0,#5b3fe0)" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
          <div className="relative h-1.5 rounded-full bg-white/10">
            <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-[#8a7bf0] to-[#5b3fe0]" />
            <div className="animate-playhead absolute -top-1 h-3.5 w-[2px] rounded-full bg-white" />
          </div>
        </div>
      </div>

      {/* isometric cube — 3D animation capability */}
      <div
        className="animate-spin-slow absolute right-[8%] top-[8%] h-11 w-11 opacity-90 [transform-style:preserve-3d]"
        style={{ animationDuration: "14s" }}
      >
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#8a7bf0] to-[#5b3fe0] opacity-90 [transform:translateZ(9px)]" />
        <div className="absolute inset-0 rounded-md bg-[#c9beff] opacity-70 [transform:rotateY(90deg)_translateZ(9px)]" />
      </div>

      {/* render-progress chip */}
      <div
        className="animate-float-y-rev absolute left-[8%] bottom-[10%] w-[128px] rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-md backdrop-blur-md"
        style={{ animationDelay: "-2s" }}
      >
        <div className="flex items-center justify-between text-[9px] font-semibold text-[#5b3fe0]">
          <span>Rendering 4K</span>
          <span>86%</span>
        </div>
        <div className="mt-1.5 h-1 rounded-full bg-[#efedff]">
          <div className="h-1 w-[86%] rounded-full bg-gradient-to-r from-[#8a7bf0] to-[#5b3fe0]" />
        </div>
      </div>
    </div>
  );
}
