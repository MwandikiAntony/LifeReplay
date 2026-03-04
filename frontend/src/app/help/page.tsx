"use client";

import SOSModule from "@/components/system/SOSModule";

export default function HelpPage() {
  return (
    <div className="p-16 max-w-4xl">
      <header className="mb-8">
        <h1 className="font-[var(--font-display)] text-4xl tracking-widest text-red-400">
          SOS & ASSISTANCE
        </h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Emergency support, usage guidance, and system recovery tools.
        </p>
      </header>

      <SOSModule />
    </div>
  );
}