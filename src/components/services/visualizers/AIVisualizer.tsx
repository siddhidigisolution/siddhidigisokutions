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
              <span className="relative">AI</span>
            </span>
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/70 bg-white/85 shadow-[0_14px_28px_-12px_rgba(76,58,140,0.4)] backdrop-blur-md">
              <span className="h-2.5 w-2.5 rounded-full bg-[#8a7bf0]" />
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
    </div>
  );
}
