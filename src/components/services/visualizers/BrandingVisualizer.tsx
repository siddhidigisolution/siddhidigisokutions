const PALETTE = [
  { hex: "#5b3fe0", label: "5B3FE0" },
  { hex: "#8a7bf0", label: "8A7BF0" },
  { hex: "#c9beff", label: "C9BEFF" },
  { hex: "#efedff", label: "EFEDFF" },
  { hex: "#12111f", label: "12111F" },
];

export default function BrandingVisualizer() {
  return (
    <div className="relative h-full w-full [perspective:1200px]">
      {/* rotating dashed ring behind the mark */}
      <div className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#c9beff] opacity-70 animate-spin-slow" />

      {/* central logo mark */}
      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#8a7bf0] to-[#5b3fe0] shadow-[0_20px_50px_-14px_rgba(91,63,224,0.55)]">
        <span className="font-serif text-3xl italic text-white">S</span>
      </div>

      {/* business card */}
      <div className="animate-float-y absolute left-[5%] top-[16%] w-[132px] rounded-xl border border-white/70 bg-white/90 p-3 shadow-[0_20px_40px_-16px_rgba(76,58,140,0.35)] backdrop-blur-md [transform:rotateZ(-6deg)]">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#8a7bf0] to-[#5b3fe0] text-[9px] font-bold italic text-white">
          S
        </div>
        <div className="mt-2 h-1.5 w-2/3 rounded-full bg-[#151327]" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-[#e4dfff]" />
      </div>

      {/* color palette, with hex labels */}
      <div
        className="animate-float-y-rev absolute right-[5%] top-[14%] rounded-xl border border-white/70 bg-white/90 p-2 shadow-[0_16px_32px_-14px_rgba(76,58,140,0.35)] backdrop-blur-md"
        style={{ animationDelay: "-2s" }}
      >
        <div className="flex items-center gap-1.5">
          {PALETTE.map((c) => (
            <span key={c.hex} className="h-4 w-4 rounded-full" style={{ background: c.hex }} />
          ))}
        </div>
        <div className="mt-1.5 text-center font-mono text-[7px] text-[#8a86a3]">{PALETTE[0].label}</div>
      </div>

      {/* typography sample */}
      <div
        className="animate-float-y-slow absolute left-[8%] bottom-[15%] flex h-14 w-14 items-center justify-center rounded-xl border border-white/70 bg-white/90 text-lg font-bold text-[#151327] shadow-[0_16px_32px_-14px_rgba(76,58,140,0.35)] backdrop-blur-md"
        style={{ animationDelay: "-1.4s" }}
      >
        Aa
      </div>

      {/* logo lockup variations — primary, wordmark, icon-only */}
      <div
        className="animate-float-y absolute right-[6%] bottom-[26%] grid grid-cols-3 gap-1.5 rounded-lg border border-white/70 bg-white/90 p-2 shadow-[0_16px_32px_-14px_rgba(76,58,140,0.35)] backdrop-blur-md"
        style={{ animationDelay: "-3.2s" }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#8a7bf0] to-[#5b3fe0] text-[9px] font-bold italic text-white">
          S
        </span>
        <span className="flex h-6 w-8 items-center justify-center rounded-md bg-[#efedff] font-serif text-[9px] italic text-[#5b3fe0]">
          Sd
        </span>
        <span className="flex h-6 w-6 items-center justify-center rounded-md border border-[#c9beff] text-[9px] font-bold italic text-[#5b3fe0]">
          S
        </span>
      </div>

      {/* packaging mockup — brand applied to a real object */}
      <div
        className="animate-float-y-rev absolute left-[10%] bottom-[6%] flex h-14 w-11 flex-col items-center justify-center gap-1 rounded-md border border-white/70 bg-gradient-to-b from-white/95 to-[#efedff]/90 shadow-[0_16px_32px_-14px_rgba(76,58,140,0.35)] backdrop-blur-md"
        style={{ animationDelay: "-0.8s" }}
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-[#8a7bf0] to-[#5b3fe0] text-[7px] font-bold italic text-white">
          S
        </span>
        <span className="h-[3px] w-6 rounded-full bg-[#c9beff]" />
      </div>
    </div>
  );
}
