"use client";

import { useSessionStore } from "@/lib/sessionStore";

export default function LiveTranscript() {
  const transcript = useSessionStore((s) => s.transcript);

  return (
    <div className="fixed bottom-20 left-2 sm:left-6 w-[90vw] sm:w-80 bg-black/60 border border-[var(--border)] rounded p-2 sm:p-3 text-[12px] sm:text-sm max-w-sm sm:max-w-none">
      {transcript.slice(-5).map((t, i) => (
        <div key={i} className="text-gray-300 break-words">
          {t.text}
        </div>
      ))}
    </div>
  );
}