"use client";

import MetricsDashboard from "@/components/coach/MetricsDashboard";


export default function MetricsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)]">
      <main className="px-4 sm:px-8 md:px-16 py-8 md:py-12 flex-grow">
        <header className="mb-8 md:mb-10 max-w-4xl mx-auto text-center md:text-left">
          <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl tracking-widest">
            PERFORMANCE METRICS
          </h1>
          <p className="text-[var(--text-secondary)] mt-2 text-sm sm:text-base md:text-lg">
            Behavioral analysis across speech clarity, confidence, pacing,
            engagement, and emotional control.
          </p>
        </header>

        <MetricsDashboard />
      </main>


    </div>
  );
}