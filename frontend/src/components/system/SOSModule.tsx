"use client";

export default function SOSModule() {
  return (
    <div className="bg-[var(--bg-card)] border border-red-500 rounded-[var(--radius-lg)] p-8 space-y-4">
      <h2 className="font-[var(--font-display)] text-xl tracking-widest text-red-400">
        EMERGENCY MODE
      </h2>

      <p className="text-[var(--text-secondary)]">
        Pause AI coaching, mute feedback, or exit session immediately.
      </p>

      <div className="flex gap-4">
        <button className="px-6 py-2 bg-red-600 rounded font-mono text-xs uppercase">
          Stop Session
        </button>
        <button className="px-6 py-2 border border-[var(--border)] rounded font-mono text-xs uppercase">
          Mute AI
        </button>
      </div>
    </div>
  );
}