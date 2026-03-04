"use client";

import CameraBox from "@/components/hud/CameraBox";

export default function NavigationHUD() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-950 text-white px-6 py-16">

      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Live Interaction Monitor
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Real-time behavioral analysis and communication coaching.
        </p>
      </div>

      <CameraBox />

    </section>
  );
}