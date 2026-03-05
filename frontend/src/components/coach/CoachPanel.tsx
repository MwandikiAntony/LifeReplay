"use client";

import { useEffect } from "react";
import { useSessionStore } from "@/lib/sessionStore";
import FeedbackOverlay from "./FeedbackOverlay";
import { whisperSpeak } from "@/lib/tts";
import { connectCoach } from "@/lib/coachSocket";

export default function CoachPanel() {
  const feedback = useSessionStore((s) => s.feedback);
  const setFeedback = useSessionStore((s) => s.setFeedback);
  const state = useSessionStore((s) => s.state);

  useEffect(() => {
  if (state !== "live") return;

  connectCoach((msg) => {
    setFeedback(msg);
    whisperSpeak(msg);
  });
}, [state]);

  if (state !== "live") {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-4 text-xs text-[var(--text-secondary)]">
        Coach standing by…
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-4">
      <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--cyan)] mb-2">
        LIVE COACH
      </h3>

      {feedback && <FeedbackOverlay message={feedback} />}
    </div>
  );
}