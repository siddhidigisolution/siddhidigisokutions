export default function MotionVisualizer() {
  return (
    <div className="relative h-full w-full [perspective:1200px]">
      {/* floating frame with play button */}
      <div className="animate-float-y absolute left-1/2 top-[36%] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/80 bg-[#12101c] shadow-[0_30px_60px_-20px_rgba(30,20,70,0.55)] [transform:rotateY(-6deg)]">
        <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-[#2a2340] to-[#12101c]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <div className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-[#5b3fe0]" />
          </div>
        </div>
      </div>

      {/* isometric cube, rotating slowly */}
      <div
        className="animate-spin-slow absolute right-[10%] top-[10%] h-12 w-12 opacity-90 [transform-style:preserve-3d]"
        style={{ animationDuration: "14s" }}
      >
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#8a7bf0] to-[#5b3fe0] opacity-90 [transform:translateZ(10px)]" />
        <div className="absolute inset-0 rounded-md bg-[#c9beff] opacity-70 [transform:rotateY(90deg)_translateZ(10px)]" />
      </div>

      {/* animated typography */}
      <div
        className="animate-float-y-rev absolute left-[8%] top-[14%] rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-[11px] font-semibold text-[#5b3fe0] shadow-md backdrop-blur-md"
        style={{ animationDelay: "-2s" }}
      >
        Aa · motion
      </div>

      {/* timeline track */}
      <div className="absolute bottom-[16%] left-1/2 w-[82%] -translate-x-1/2">
        <div className="relative h-1.5 rounded-full bg-[#efedff]">
          <div className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-gradient-to-r from-[#8a7bf0] to-[#5b3fe0]" />
          <div className="animate-playhead absolute -top-1.5 h-4 w-[2px] rounded-full bg-[#12111f]" />
          {[12, 34, 58, 80].map((pos) => (
            <span
              key={pos}
              className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 rounded-[2px] bg-white shadow-[0_0_0_1.5px_#8a7bf0]"
              style={{ left: `${pos}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[9px] text-[#8a86a3]">
          <span>00:00</span>
          <span>00:24</span>
        </div>
      </div>
    </div>
  );
}
