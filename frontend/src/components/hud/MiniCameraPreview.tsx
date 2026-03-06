"use client";

import { useEffect, useRef, useState } from "react";
import { useCamera } from "@/components/hud/CameraContext";

export default function MiniCameraPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(true);
  const { stream } = useCamera();

  useEffect(() => {
    if (!enabled) return;

    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-2 sm:bottom-6 right-2 sm:right-6 w-[45vw] max-w-[220px] h-[28vw] max-h-[140px] bg-black border border-[var(--border)] rounded-lg overflow-hidden shadow-lg z-30">

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Close Button */}
      <button
        onClick={() => setEnabled(false)}
        className="absolute top-1 right-1 text-[10px] sm:text-xs bg-black/60 px-1.5 sm:px-2 py-0.5 rounded hover:bg-black/80"
      >
        ✕
      </button>

      {/* Live indicator */}
      <div className="absolute bottom-1 left-1.5 sm:left-2 flex items-center gap-1 text-[10px] sm:text-[10px] text-white/80">
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-pulse" />
        LIVE
      </div>

    </div>
  );
}