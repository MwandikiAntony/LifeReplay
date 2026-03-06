"use client";

export default function DetectionOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Face frame */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] max-w-[320px] h-[60vw] max-h-[420px] border border-[var(--cyan)] rounded-xl opacity-50" />

      {/* Status HUD */}
      <div className="absolute top-2 sm:top-6 left-2 sm:left-6 bg-[var(--bg-card)] border border-[var(--border)] rounded px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono tracking-widest">
        OBSERVING • GAZE • POSTURE • VOICE
      </div>
    </div>
  );
}