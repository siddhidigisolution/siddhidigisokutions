export default function SoftwareVisualizer() {
  return (
    <div className="relative h-full w-full [perspective:1200px]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M28 32 Q50 20 74 40"
          fill="none"
          stroke="#b9a9f5"
          strokeWidth="0.5"
          strokeDasharray="2 3"
          className="animate-dash-flow"
        />
        <path
          d="M30 68 Q50 76 72 58"
          fill="none"
          stroke="#b9a9f5"
          strokeWidth="0.5"
          strokeDasharray="2 3"
          className="animate-dash-flow"
        />
      </svg>

      {/* dashboard card, floating back-left */}
      <div
        className="animate-float-y-slow absolute left-[6%] top-[16%] w-[130px] rounded-xl border border-white/70 bg-white/75 p-3 shadow-[0_20px_40px_-16px_rgba(76,58,140,0.35)] backdrop-blur-md [transform:rotateY(14deg)]"
        style={{ animationDelay: "-1s" }}
      >
        <div className="mb-2 h-1.5 w-2/3 rounded-full bg-[#e4dfff]" />
        <div className="flex items-end gap-1">
          {[6, 10, 5, 13, 8].map((h, i) => (
            <div key={i} className="w-2 rounded-t bg-gradient-to-t from-[#8a7bf0] to-[#c9beff]" style={{ height: h * 2 }} />
          ))}
        </div>
      </div>

      {/* main code window */}
      <div className="animate-float-y absolute left-1/2 top-1/2 w-[76%] max-w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/80 bg-[#12101c] shadow-[0_30px_60px_-20px_rgba(30,20,70,0.55)] [transform:rotateY(-6deg)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#f0a6a6]" />
          <span className="h-2 w-2 rounded-full bg-[#f0d5a6]" />
          <span className="h-2 w-2 rounded-full bg-[#a6e0b0]" />
          <span className="ml-2 text-[9px] text-white/40">api/workflow.ts</span>
        </div>
        <div className="space-y-1.5 p-4 font-mono text-[9px] leading-relaxed">
          <div className="flex gap-2"><span className="text-[#7c5ce0]">const</span><span className="h-2 w-24 rounded-full bg-white/20" /></div>
          <div className="flex gap-2 pl-3"><span className="h-2 w-32 rounded-full bg-[#6d8bff]/40" /></div>
          <div className="flex gap-2 pl-3"><span className="h-2 w-20 rounded-full bg-white/15" /></div>
          <div className="flex gap-2"><span className="text-[#a692f0]">return</span><span className="h-2 w-16 rounded-full bg-white/20" /></div>
        </div>
      </div>

      {/* database node */}
      <div
        className="animate-float-y-rev absolute right-[8%] bottom-[16%] flex flex-col items-center gap-1"
        style={{ animationDelay: "-3s" }}
      >
        <div className="h-10 w-14 rounded-lg border border-white/70 bg-white/80 shadow-[0_16px_32px_-14px_rgba(76,58,140,0.4)] backdrop-blur-md">
          <div className="mx-2 mt-1.5 h-[3px] rounded-full bg-[#c9beff]" />
          <div className="mx-2 mt-1.5 h-[3px] rounded-full bg-[#e4dfff]" />
          <div className="mx-2 mt-1.5 h-[3px] rounded-full bg-[#e4dfff]" />
        </div>
        <span className="text-[9px] font-medium text-[#6b6785]">database</span>
      </div>

      <div className="animate-pulse-soft absolute left-[30%] top-[42%] h-1.5 w-1.5 rounded-full bg-[#8a7bf0]" />
      <div className="animate-pulse-soft absolute right-[26%] bottom-[38%] h-1.5 w-1.5 rounded-full bg-[#5b3fe0]" style={{ animationDelay: "-1.2s" }} />
    </div>
  );
}
