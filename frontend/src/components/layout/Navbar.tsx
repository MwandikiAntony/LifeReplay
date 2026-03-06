"use client";

import Link from "next/link";
import { useState } from "react";
import { useDeviceStore } from "@/lib/deviceStore";
import { useSessionStore } from "@/lib/sessionStore";

export default function Navbar() {
  const { micActive, cameraActive, pipActive, connectionQuality } =
    useDeviceStore();
  const sessionState = useSessionStore((s) => s.state);

  const [mobileOpen, setMobileOpen] = useState(false);

  const qualityColor =
    connectionQuality === "good"
      ? "bg-green-400"
      : connectionQuality === "medium"
      ? "bg-yellow-400"
      : "bg-red-500";

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 h-[64px] z-50 bg-[rgba(5,13,20,0.92)] backdrop-blur border-b border-[var(--border)] px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Brand */}
        <span className="font-semibold tracking-widest text-sm sm:text-base">
          LIFE<span className="text-cyan-400">REPLAY</span>
        </span>

        {/* Desktop system indicators */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-xs sm:text-sm font-mono text-gray-400">
          <span className="flex items-center gap-1 sm:gap-2">
            <span className={`w-2 h-2 rounded-full ${qualityColor}`} />
            NET
          </span>

          <span className="flex items-center gap-1 sm:gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                micActive ? "bg-red-500 animate-pulse" : "bg-gray-500"
              }`}
            />
            MIC
          </span>

          <span className="flex items-center gap-1 sm:gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                cameraActive ? "bg-cyan-400" : "bg-gray-500"
              }`}
            />
            CAM
          </span>

          {pipActive && <span className="text-cyan-400">PiP</span>}

          <span className="flex items-center gap-1 sm:gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                sessionState === "live"
                  ? "bg-green-400 animate-pulse"
                  : "bg-gray-500"
              }`}
            />
            {(sessionState || "idle").toUpperCase()}
          </span>

          <span className="border border-[var(--border)] rounded px-2 py-1 text-gray-500">
            ⌘K
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-300 text-2xl sm:text-3xl"
          onClick={() => setMobileOpen((v) => !v)}
        >
          ☰
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="absolute top-[64px] right-4 md:hidden bg-[#060d14] border border-[var(--border)] rounded-lg z-40">
          <div className="flex flex-col px-4 py-3 gap-3 text-sm sm:text-base text-gray-300 whitespace-nowrap">
            <Link href="/" onClick={() => setMobileOpen(false)}>Dashboard</Link>
            <Link href="/live" onClick={() => setMobileOpen(false)}>Live</Link>
            <Link href="/metrics" onClick={() => setMobileOpen(false)}>Metrics</Link>
            <Link href="/settings" onClick={() => setMobileOpen(false)}>Settings</Link>
            <Link href="/help" onClick={() => setMobileOpen(false)}>Help</Link>

            <div className="border-t border-[var(--border)] pt-2 mt-2 text-xs sm:text-sm text-gray-400 space-y-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${qualityColor}`} /> Network: {connectionQuality}
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${micActive ? "bg-red-500" : "bg-gray-500"}`} /> Mic {micActive ? "Active" : "Off"}
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${cameraActive ? "bg-cyan-400" : "bg-gray-500"}`} /> Camera {cameraActive ? "On" : "Off"}
              </div>
              {pipActive && <div className="text-cyan-400">PiP Active</div>}
              <div className="uppercase font-mono">Session: {sessionState}</div>
              <div className="text-gray-500">⌘K Command Palette</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}