"use client";

export default function ConfidenceHUD({ score }: { score: number }) {
  return (
    <div className="fixed bottom-2 sm:bottom-6 right-2 sm:right-20 bg-black/70 border border-[var(--border)] rounded px-3 sm:px-4 py-1.5 sm:py-2 max-w-[90vw] sm:max-w-[250px]">
      <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 mb-1">
        Confidence
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="flex-1 h-2 bg-gray-800 rounded overflow-hidden">
          <div
            className="h-full bg-cyan-400 transition-all"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-[10px] sm:text-xs font-mono">{score}%</span>
      </div>
    </div>
  );
}