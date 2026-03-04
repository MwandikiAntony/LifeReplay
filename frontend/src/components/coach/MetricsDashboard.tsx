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
    <div className="grid grid-cols-3 gap-6">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6"
        >
          <div className="font-mono text-xs uppercase tracking-widest mb-2">
            {m.label}
          </div>

          <div className="text-4xl font-bold text-[var(--cyan)]">
            {m.value}%
          </div>

          <div className="mt-3 h-2 bg-[var(--bg-surface)] rounded">
            <div
              className="h-full bg-[var(--cyan)] rounded"
              style={{ width: `${m.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}