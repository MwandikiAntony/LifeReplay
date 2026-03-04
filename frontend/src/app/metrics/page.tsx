"use client";

import MetricsDashboard from "@/components/coach/MetricsDashboard";

export default function MetricsPage() {
  return (
    <div className="p-16">
      <header className="mb-10">
        <h1 className="font-[var(--font-display)] text-4xl tracking-widest">
          PERFORMANCE METRICS
        </h1>
        <p className="text-[var(--text-secondary)] mt-2 max-w-xl">
          Behavioral analysis across speech clarity, confidence, pacing,
          engagement, and emotional control.
        </p>
      </header>

      <MetricsDashboard />
    </div>
  );
}