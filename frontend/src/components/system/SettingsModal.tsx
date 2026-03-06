"use client";

import { useCamera } from "@/components/hud/CameraContext";

export default function SettingsModal() {
  const { brightness, setBrightness, contrast, setContrast } = useCamera();

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-8 space-y-6">
      <Setting label="Camera Enabled" />
      <Setting label="Microphone Enabled" />
      <Setting label="AI Whisper Mode" />
      <Setting label="Minimal Coaching" />

      {/* NEW Camera Settings */}
      <div className="space-y-4 pt-4 border-t border-[var(--border)]">
        <div>
          <label className="font-mono text-sm">Brightness</label>
          <input
            type="range"
            min={50}
            max={150}
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="font-mono text-sm">Contrast</label>
          <input
            type="range"
            min={50}
            max={150}
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
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