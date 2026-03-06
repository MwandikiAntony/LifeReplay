"use client";

export default function ReplayTimeline({
  markers,
}: {
  markers: { time: number; speaking: boolean }[];
}) {
  const duration = markers.at(-1)?.time || 1;

  return (
    <div className="w-full max-w-full sm:max-w-lg bg-black/70 border border-[var(--border)] rounded p-2 sm:p-3">
      <div className="flex h-2 sm:h-3 relative">
        {markers.map((m, i) => (
          <div
            key={i}
            className={m.speaking ? "bg-green-400" : "bg-gray-700"}
            style={{
              width: `${(m.time / duration) * 100}%`,
            }}
          />
        ))}
      </div>
      <div className="text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-2 uppercase tracking-widest">
        Session Replay
      </div>
    </div>
  );
}