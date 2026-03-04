"use client";

export default function ReplayTimeline({
  markers,
}: {
  markers: { time: number; speaking: boolean }[];
}) {
  const duration = markers.at(-1)?.time || 1;

  return (
    <div className="w-full bg-black/70 border border-[var(--border)] rounded p-3">
      <div className="flex h-3 relative">
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
      <div className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
        Session Replay
      </div>
    </div>
  );
}