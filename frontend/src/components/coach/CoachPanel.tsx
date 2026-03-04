"use client";

import FeedbackOverlay from "./FeedbackOverlay";

export default function CoachPanel() {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 shadow-lg">
      <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--cyan)] mb-2">
        LIVE COACH
      </h3>

      <FeedbackOverlay />

      <div className="mt-3 text-[11px] text-[var(--text-secondary)]">
        Whisper mode active • Minimal intervention
      </div>
    </div>
  );
}