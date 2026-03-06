"use client";

import SOSModule from "@/components/system/SOSModule";

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)] px-4 sm:px-8 md:px-16 py-8 md:py-12">

      <header className="mb-8 max-w-4xl mx-auto text-center md:text-left">
        <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl tracking-widest text-red-400">
          SOS & ASSISTANCE
        </h1>
        <p className="text-[var(--text-secondary)] mt-2 text-sm sm:text-base md:text-lg">
          Emergency support, usage guidance, and system recovery tools.
        </p>
      </header>

      <main className="flex-grow max-w-5xl mx-auto w-full">
        <SOSModule />
      </main>

    </div>
  );
}