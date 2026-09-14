export default function WebVisualizer() {
  return (
    <div className="relative h-full w-full [perspective:1200px]">
      {/* phone preview, floating behind */}
      <div
        className="animate-float-y-slow absolute left-[6%] top-[18%] h-[150px] w-[74px] rounded-[16px] border border-white/70 bg-white/70 shadow-[0_20px_40px_-16px_rgba(76,58,140,0.35)] backdrop-blur-md [transform:rotateY(18deg)_rotateZ(-4deg)]"
        style={{ animationDelay: "-1.2s" }}
      >
        <div className="m-2 space-y-1.5">
          <div className="h-2 w-2/3 rounded-full bg-[#e4dfff]" />
          <div className="h-8 rounded-lg bg-gradient-to-br from-[#8a7bf0]/30 to-[#5b3fe0]/20" />
          <div className="h-1.5 w-full rounded-full bg-[#efedff]" />
          <div className="h-1.5 w-4/5 rounded-full bg-[#efedff]" />
        </div>
      </div>

      {/* main browser window */}
      <div className="animate-float-y absolute left-1/2 top-1/2 w-[78%] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/80 bg-white shadow-[0_30px_60px_-20px_rgba(76,58,140,0.45)] [transform:rotateY(-8deg)_rotateX(4deg)]">
        <div className="flex items-center gap-1.5 rounded-t-2xl border-b border-black/[0.06] bg-[#faf9ff] px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#f0a6a6]" />
          <span className="h-2 w-2 rounded-full bg-[#f0d5a6]" />
          <span className="h-2 w-2 rounded-full bg-[#a6e0b0]" />
          <span className="ml-2 flex-1 truncate rounded-full bg-white px-3 py-1 text-[9px] text-[#8a86a3]">
            siddhidigital.com
          </span>
        </div>
        <div className="space-y-2.5 p-4">
          <div className="flex items-center justify-between">
            <div className="h-2 w-16 rounded-full bg-[#151327]" />
            <div className="flex gap-1.5">
              <div className="h-2 w-8 rounded-full bg-[#efedff]" />
              <div className="h-2 w-8 rounded-full bg-[#efedff]" />
              <div className="h-2 w-10 rounded-full bg-gradient-to-r from-[#8a7bf0] to-[#5b3fe0]" />
            </div>
          </div>
          <div className="h-20 rounded-xl bg-gradient-to-br from-[#8a7bf0]/25 via-[#c9beff]/20 to-transparent" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 rounded-lg bg-[#faf9ff]" />
            <div className="h-10 rounded-lg bg-[#faf9ff]" />
            <div className="h-10 rounded-lg bg-[#faf9ff]" />
          </div>
        </div>
        {/* animated cursor */}
        <div className="animate-cursor-move pointer-events-none absolute left-6 top-16 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#5b3fe0] shadow-[0_0_0_4px_rgba(91,63,224,0.15)]" />
      </div>

      {/* tablet preview, floating in front-right */}
      <div
        className="animate-float-y-rev absolute right-[4%] bottom-[12%] h-[86px] w-[124px] rounded-[14px] border border-white/70 bg-white/70 shadow-[0_20px_40px_-16px_rgba(76,58,140,0.35)] backdrop-blur-md [transform:rotateY(-16deg)_rotateZ(3deg)]"
        style={{ animationDelay: "-2.4s" }}
      >
        <div className="m-2 grid grid-cols-3 gap-1">
          <div className="col-span-3 h-2 w-1/2 rounded-full bg-[#e4dfff]" />
          <div className="h-6 rounded-md bg-gradient-to-br from-[#8a7bf0]/30 to-transparent" />
          <div className="h-6 rounded-md bg-[#efedff]" />
          <div className="h-6 rounded-md bg-[#efedff]" />
        </div>
      </div>

      {/* small code indicator chip */}
      <div className="animate-float-y absolute right-[10%] top-[10%] flex items-center gap-1.5 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-[10px] font-semibold text-[#5b3fe0] shadow-md backdrop-blur-md">
        <span aria-hidden>{"</>"}</span> responsive
      </div>
    </div>
  );
}
