"use client";

export default function WebSocketStatus() {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded px-4 py-2 font-mono text-xs">
      <span className="text-green-400">●</span> CONNECTED TO AI STREAM
    </div>
  );
}