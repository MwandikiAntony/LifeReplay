"use client";

export default function ConfidenceHUD({ score }: { score: number }) {
  return (
    <div className="fixed bottom-6 right-20 bg-black/70 border border-[var(--border)] rounded px-4 py-2">
      <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
        Confidence
      </div>
      <div className="flex items-center gap-2">
        <div className="w-24 h-2 bg-gray-800 rounded overflow-hidden">
          <div
            className="h-full bg-cyan-400 transition-all"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-xs font-mono">{score}%</span>
      </div>
    </div>
  );
}