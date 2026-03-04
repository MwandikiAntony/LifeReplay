"use client";

import { useEffect, useRef, useState } from "react";

export default function MiniCameraPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    async function initCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    }

    initCamera();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[220px] h-[140px] bg-black border border-[var(--border)] rounded-lg overflow-hidden shadow-lg z-30">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <button
        onClick={() => setEnabled(false)}
        className="absolute top-1 right-1 text-xs bg-black/60 px-2 py-0.5 rounded"
      >
        ✕
      </button>
    </div>
  );
}