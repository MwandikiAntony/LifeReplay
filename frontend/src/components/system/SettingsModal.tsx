"use client";

export default function SettingsModal() {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-8 space-y-6">
      <Setting label="Camera Enabled" />
      <Setting label="Microphone Enabled" />
      <Setting label="AI Whisper Mode" />
      <Setting label="Minimal Coaching" />
    </div>
  );
}

function Setting({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-sm">{label}</span>
      <input type="checkbox" className="accent-cyan-400 scale-125" defaultChecked />
    </div>
  );
}