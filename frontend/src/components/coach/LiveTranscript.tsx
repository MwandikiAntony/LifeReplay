"use client";

import { useSessionStore } from "@/lib/sessionStore";

export default function LiveTranscript() {
  const transcript = useSessionStore((s) => s.transcript);

  return (
    <div className="fixed bottom-20 left-6 w-80 bg-black/60 border border-[var(--border)] rounded p-3 text-sm">
      {transcript.slice(-5).map((t, i) => (
        <div key={i} className="text-gray-300">
          {t.text}
        </div>
      ))}
    </div>
  );
}