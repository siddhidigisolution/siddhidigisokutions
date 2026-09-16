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
        className="animate-float-y-slow absolute left-[5%] top-[13%] w-[136px] rounded-xl border border-white/70 bg-white/80 p-3 shadow-[0_20px_40px_-16px_rgba(76,58,140,0.35)] backdrop-blur-md [transform:rotateY(14deg)]"
        style={{ animationDelay: "-1s" }}
      >
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-14 rounded-full bg-[#e4dfff]" />
          <span className="rounded-full bg-[#e5f7ea] px-1.5 py-0.5 text-[8px] font-bold text-[#3fa564]">▲ 24%</span>
        </div>
        <div className="mt-2.5 flex items-end gap-1">
          {[6, 10, 5, 13, 8, 15, 11].map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-t bg-gradient-to-t from-[#8a7bf0] to-[#c9beff]"
              style={{ height: h * 2 }}
            />
          ))}
        </div>
      </div>

      {/* main code window */}
      <div className="animate-float-y absolute left-1/2 top-1/2 w-[78%] max-w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/80 bg-[#12101c] shadow-[0_30px_60px_-20px_rgba(30,20,70,0.55)] [transform:rotateY(-6deg)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#f0a6a6]" />
          <span className="h-2 w-2 rounded-full bg-[#f0d5a6]" />
          <span className="h-2 w-2 rounded-full bg-[#a6e0b0]" />
          <span className="ml-2 text-[9px] text-white/40">api/workflow.ts</span>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-[#1e3a2a] px-1.5 py-0.5 text-[8px] font-semibold text-[#8ee0a8]">
            <span className="h-1 w-1 rounded-full bg-[#8ee0a8]" /> tests passing
          </span>
        </div>
        <div className="flex font-mono text-[9px] leading-relaxed">
          <div className="select-none space-y-1.5 py-4 pl-3 pr-2 text-right text-white/20">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n}>{n}</div>
            ))}
          </div>
          <div className="space-y-1.5 py-4 pr-4">
            <div>
              <span className="text-[#a692f0]">async</span> <span className="text-[#7c9cf0]">function</span>{" "}
              <span className="text-[#f0d99a]">syncOrders</span>() {"{"}
            </div>
            <div className="pl-3">
              <span className="text-[#7c5ce0]">const</span> <span className="text-[#e6e2f5]">data</span> ={" "}
              <span className="text-[#a692f0]">await</span> <span className="text-[#f0d99a]">fetchOrders</span>();
            </div>
            <div className="pl-3">
              <span className="text-[#7c5ce0]">const</span> <span className="text-[#e6e2f5]">clean</span> ={" "}
              <span className="text-[#e6e2f5]">data</span>.<span className="text-[#f0d99a]">map</span>(normalize);
            </div>
            <div className="pl-3">
              <span className="text-white/25">{"// pushes to the pipeline"}</span>
            </div>
            <div className="pl-3">
              <span className="text-[#a692f0]">return</span> <span className="text-[#f0d99a]">db</span>.
              <span className="text-[#f0d99a]">save</span>(clean);
            </div>
            <div>{"}"}</div>
          </div>
        </div>
      </div>

      {/* database node */}
      <div
        className="animate-float-y-rev absolute right-[7%] bottom-[15%] flex flex-col items-center gap-1"
        style={{ animationDelay: "-3s" }}
      >
        <div className="h-11 w-14 rounded-lg border border-white/70 bg-white/80 shadow-[0_16px_32px_-14px_rgba(76,58,140,0.4)] backdrop-blur-md">
          <div className="mx-2 mt-1.5 h-[3px] rounded-full bg-[#c9beff]" />
          <div className="mx-2 mt-1.5 h-[3px] rounded-full bg-[#e4dfff]" />
          <div className="mx-2 mt-1.5 h-[3px] rounded-full bg-[#e4dfff]" />
        </div>
        <span className="text-[9px] font-medium text-[#6b6785]">database</span>
      </div>

      {/* live data pulse traveling from the code window toward the database */}
      <span
        className="animate-pulse-soft absolute right-[18%] bottom-[30%] h-1.5 w-1.5 rounded-full bg-[#5b3fe0]"
        style={{ animationDelay: "-0.6s" }}
      />
      <div className="animate-pulse-soft absolute left-[30%] top-[42%] h-1.5 w-1.5 rounded-full bg-[#8a7bf0]" />
      <div
        className="animate-pulse-soft absolute right-[26%] bottom-[38%] h-1.5 w-1.5 rounded-full bg-[#5b3fe0]"
        style={{ animationDelay: "-1.2s" }}
      />

      {/* API response chip */}
      <div
        className="animate-float-y-slow absolute left-[10%] bottom-[10%] rounded-lg border border-white/70 bg-white/85 px-2.5 py-1.5 font-mono text-[8px] text-[#3c3950] shadow-[0_14px_28px_-12px_rgba(76,58,140,0.35)] backdrop-blur-md"
        style={{ animationDelay: "-2.2s" }}
      >
        <span className="text-[#a692f0]">status</span>: <span className="text-[#3fa564]">200 ok</span>
      </div>
    </div>
  );
}
