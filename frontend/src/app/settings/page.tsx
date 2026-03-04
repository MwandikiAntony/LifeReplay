"use client";

import SettingsModal from "@/components/system/SettingsModal";

export default function SettingsPage() {
  return (
    <div className="p-16 max-w-5xl">
      <header className="mb-8">
        <h1 className="font-[var(--font-display)] text-4xl tracking-widest">
          SYSTEM SETTINGS
        </h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Configure devices, AI behavior, feedback frequency, and privacy.
        </p>
      </header>

      <SettingsModal />
    </div>
  );
}