"use client";

const metrics = [
  { label: "Confidence", value: 82 },
  { label: "Clarity", value: 76 },
  { label: "Engagement", value: 88 },
  { label: "Pacing", value: 69 },
  { label: "Emotional Control", value: 91 },
];

export default function MetricsDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 sm:p-6 flex flex-col hover:scale-105 transform transition-all duration-300"
          >
            {/* Label */}
            <div className="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-widest mb-1 sm:mb-2 text-[var(--text-secondary)]">
              {m.label}
            </div>

            {/* Value */}
            <div className="text-xl sm:text-2xl md:text-4xl font-bold text-[var(--cyan)]">
              {m.value}%
            </div>

            {/* Progress bar */}
            <div className="mt-2 sm:mt-3 h-2 sm:h-3 bg-[var(--bg-surface)] rounded w-full overflow-hidden">
              <div
                className="h-full bg-[var(--cyan)] rounded transition-all duration-500"
                style={{ width: `${m.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}