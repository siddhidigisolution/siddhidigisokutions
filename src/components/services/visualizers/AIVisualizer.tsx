const NODES = [
  { key: "input", label: "Input", x: 12, y: 50 },
  { key: "ai", label: "AI", x: 40, y: 24 },
  { key: "automation", label: "Automation", x: 68, y: 50 },
  { key: "result", label: "Result", x: 90, y: 26 },
];

const LINKS: [string, string][] = [
  ["input", "ai"],
  ["ai", "automation"],
  ["automation", "result"],
];

function nodeByKey(key: string) {
  return NODES.find((n) => n.key === key)!;
}

const NODE_ICONS: Record<string, React.ReactNode> = {
  input: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path d="M12 16V4M12 4 7 9M12 4l5 5" stroke="#8a7bf0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" stroke="#8a7bf0" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path
        d="M12 5.5V3m0 18v-2.5M18.5 12H21M3 12h2.5m11.3-6.8 1.4-1.4M6.8 17.2l-1.4 1.4m0-13.2 1.4 1.4m10.8 10.8 1.4 1.4"
        stroke="#8a7bf0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="4" stroke="#8a7bf0" strokeWidth="1.6" />
    </svg>
  ),
  result: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path d="M5 13l4.5 4.5L19 8" stroke="#8a7bf0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function AIVisualizer() {
  return (
    <div className="relative h-full w-full [perspective:1200px]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {LINKS.map(([from, to], i) => {
          const a = nodeByKey(from);
          const b = nodeByKey(to);
          return (
            <path
              key={i}
              d={`M${a.x} ${a.y} Q${(a.x + b.x) / 2} ${Math.min(a.y, b.y) - 10} ${b.x} ${b.y}`}
              fill="none"
              stroke="#a692f0"
              strokeWidth="0.6"
              strokeDasharray="2.2 2.4"
              className="animate-dash-flow"
            />
          );
        })}
      </svg>

      {NODES.map((n) => (
        <div
          key={n.key}
          className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 ${
            n.key === "ai" ? "" : "animate-float-y"
          }`}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          {n.key === "ai" ? (
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#8a7bf0] to-[#5b3fe0] text-[11px] font-bold text-white shadow-[0_20px_50px_-14px_rgba(91,63,224,0.6)]">
              <span className="animate-pulse-soft absolute inset-0 rounded-full bg-[#8a7bf0]/40 blur-md" />
              <span className="absolute -inset-1.5 rounded-full border border-dashed border-[#c9beff]/70 animate-spin-slow" />
              <span className="relative">AI</span>
            </span>
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/70 bg-white/85 shadow-[0_14px_28px_-12px_rgba(76,58,140,0.4)] backdrop-blur-md">
              {NODE_ICONS[n.key]}
            </span>
          )}
          <span className="whitespace-nowrap text-[9px] font-medium text-[#6b6785]">{n.label}</span>
        </div>
      ))}

      {/* drifting particles */}
      {[
        { left: "22%", top: "70%", delay: "-0.4s" },
        { left: "50%", top: "78%", delay: "-1.6s" },
        { left: "78%", top: "68%", delay: "-2.4s" },
      ].map((p, i) => (
        <span
          key={i}
          className="animate-float-y-slow absolute h-1.5 w-1.5 rounded-full bg-[#c9beff]"
          style={{ left: p.left, top: p.top, animationDelay: p.delay }}
        />
      ))}

      {/* status chip */}
      <div
        className="animate-float-y absolute left-[6%] bottom-[6%] flex items-center gap-1.5 rounded-full border border-white/70 bg-white/85 px-2.5 py-1.5 text-[9px] font-semibold text-[#5b3fe0] shadow-[0_14px_28px_-12px_rgba(76,58,140,0.35)] backdrop-blur-md"
        style={{ animationDelay: "-1.8s" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#3fa564]" />
        Running 24/7
      </div>
    </div>
  );
}
