"use client";

export default function DetectionOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Face frame */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] h-[420px] border border-[var(--cyan)] rounded-xl opacity-50" />

      {/* Status HUD */}
      <div className="absolute top-6 left-6 bg-[var(--bg-card)] border border-[var(--border)] rounded px-4 py-2 text-xs font-mono tracking-widest">
        OBSERVING • GAZE • POSTURE • VOICE
      </div>
    </div>
  );
}