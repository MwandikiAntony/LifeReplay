"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useDeviceStore } from "@/lib/deviceStore";
import { useCamera } from "@/components/hud/CameraContext";

export default function AICameraBox({ compact = false }: { compact?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();
  const { stream } = useCamera();
  
  const setPiPActive = useDeviceStore((s) => s.setPiPActive);
  
  const [error, setError] = useState<string | null>(null);
  const [pipSupported, setPipSupported] = useState(false);

  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  useEffect(() => {
    setPipSupported(
      typeof document !== "undefined" &&
        "pictureInPictureEnabled" in document &&
        document.pictureInPictureEnabled
    );
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  async function enablePiP() {
    try {
      if (videoRef.current && pipSupported && !document.pictureInPictureElement) {
        await videoRef.current.requestPictureInPicture();
        setPiPActive(true);
      }
    } catch (err) {
      console.warn("PiP failed:", err);
    }
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLeavePiP = () => setPiPActive(false);
    video.addEventListener("leavepictureinpicture", handleLeavePiP);

    async function autoEnterPiP() {
      if (pathname !== "/live" && pipSupported && !document.pictureInPictureElement) {
        try {
          await video.requestPictureInPicture();
          setPiPActive(true);
        } catch {}
      }
    }
    autoEnterPiP();

    return () => video.removeEventListener("leavepictureinpicture", handleLeavePiP);
  }, [pathname, pipSupported, setPiPActive]);

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="bg-[var(--bg-card)] border border-red-500 rounded-lg p-4 sm:p-6 max-w-xs sm:max-w-sm text-center">
          <h3 className="font-mono text-[12px] sm:text-sm uppercase tracking-widest text-red-400 mb-2">
            Camera Unavailable
          </h3>
          <p className="text-[var(--text-secondary)] text-[12px] sm:text-sm">
            Please allow camera access to enable live coaching.
          </p>
        </div>
      </div>
    );
  }

  const togglePause = () => {
    if (!videoRef.current) return;
    paused ? videoRef.current.play() : videoRef.current.pause();
    setPaused(!paused);
  };

  return (
    <div className={`relative w-full h-full bg-black overflow-hidden ${compact ? "rounded-lg" : "rounded-xl"}`}>

      <video
        ref={videoRef}
        autoPlay
        muted={muted}
        playsInline
        className="w-full h-full object-cover"
        style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
      />

      {/* LIVE INDICATOR */}
      <div className="absolute top-2 left-2 flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs bg-black/60 px-2 py-1 rounded">
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-pulse" />
        LIVE
      </div>

      
      {/* VIDEO CONTROLS */}
<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2 bg-black/60 p-1 sm:p-2 rounded-xl items-center">
  {/* Microphone toggle */}
  <button
    onClick={() => console.log("Mic button pressed")}
    className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-lg sm:text-xl bg-black/70 border-2 border-[var(--border)] rounded-full text-white hover:bg-black/80 hover:scale-105 transition"
  >
    🎤
  </button>

  {/* Camera toggle */}
  <button
    onClick={() => console.log("Camera button pressed")}
    className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-lg sm:text-xl bg-black/70 border-2 border-[var(--cyan)] rounded-full text-[var(--cyan)] hover:bg-black/80 hover:scale-105 transition"
  >
    📹
  </button>

  {/* Play / Pause */}
  <button
    onClick={togglePause}
    className="w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center text-xl sm:text-2xl border-2 border-[var(--amber)] rounded-full text-[var(--amber)] bg-black/70 hover:bg-black/80 hover:scale-105 transition"
  >
    {paused ? "▶️" : "⏸"}
  </button>

  {/* Volume toggle */}
  <button
    onClick={() => setMuted(!muted)}
    className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-lg sm:text-xl bg-black/70 border-2 border-[var(--border)] rounded-full text-white hover:bg-black/80 hover:scale-105 transition"
  >
    🔊
  </button>

  {/* Stop */}
  <button
    onClick={() => {
      if (!videoRef.current) return;
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      setPaused(true);
      setMuted(true);
    }}
    className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-lg sm:text-xl bg-black/70 border-2 border-[var(--red)] rounded-full text-[var(--red)] hover:bg-black/80 hover:scale-105 transition"
  >
    ⏹
  </button>
</div>

      {/* PiP Button */}
      {pipSupported && (
        <button
          onClick={enablePiP}
          className="absolute top-4 right-4 text-[10px] sm:text-xs bg-black/60 border border-[var(--border)] px-2 sm:px-3 py-1 rounded font-mono uppercase tracking-widest hover:border-[var(--border-bright)]"
        >
          PiP
        </button>
      )}
    </div>
  );
}