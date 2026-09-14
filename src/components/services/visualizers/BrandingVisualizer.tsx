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
      <div
        className="animate-float-y absolute left-[6%] top-[20%] w-[130px] rounded-xl border border-white/70 bg-white/85 p-3 shadow-[0_20px_40px_-16px_rgba(76,58,140,0.35)] backdrop-blur-md [transform:rotateZ(-6deg)]"
      >
        <div className="mb-2 h-4 w-4 rounded-full bg-gradient-to-br from-[#8a7bf0] to-[#5b3fe0]" />
        <div className="h-1.5 w-2/3 rounded-full bg-[#151327]" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-[#e4dfff]" />
      </div>

      {/* color palette */}
      <div
        className="animate-float-y-rev absolute right-[8%] top-[18%] flex items-center gap-1.5 rounded-full border border-white/70 bg-white/85 p-1.5 shadow-[0_16px_32px_-14px_rgba(76,58,140,0.35)] backdrop-blur-md"
        style={{ animationDelay: "-2s" }}
      >
        {["#5b3fe0", "#8a7bf0", "#c9beff", "#efedff", "#12111f"].map((c) => (
          <span key={c} className="h-4 w-4 rounded-full" style={{ background: c }} />
        ))}
      </div>

      {/* typography sample */}
      <div
        className="animate-float-y-slow absolute left-[10%] bottom-[16%] flex h-14 w-14 items-center justify-center rounded-xl border border-white/70 bg-white/85 text-lg font-bold text-[#151327] shadow-[0_16px_32px_-14px_rgba(76,58,140,0.35)] backdrop-blur-md"
        style={{ animationDelay: "-1.4s" }}
      >
        Aa
      </div>

      {/* guideline page */}
      <div
        className="animate-float-y absolute right-[10%] bottom-[14%] w-[110px] rounded-lg border border-white/70 bg-white/85 p-2.5 shadow-[0_16px_32px_-14px_rgba(76,58,140,0.35)] backdrop-blur-md [transform:rotateZ(5deg)]"
        style={{ animationDelay: "-3.2s" }}
      >
        <div className="h-1.5 w-1/2 rounded-full bg-[#8a7bf0]" />
        <div className="mt-2 space-y-1">
          <div className="h-1 w-full rounded-full bg-[#efedff]" />
          <div className="h-1 w-full rounded-full bg-[#efedff]" />
          <div className="h-1 w-2/3 rounded-full bg-[#efedff]" />
        </div>
      </div>
    </div>
  );
}
