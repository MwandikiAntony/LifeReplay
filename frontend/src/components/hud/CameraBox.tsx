"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function CameraBox() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();

  const [error, setError] = useState<string | null>(null);
  const [pipSupported, setPipSupported] = useState(false);

  /* ---------- Detect PiP support + init camera ---------- */
  useEffect(() => {
    setPipSupported(
      typeof document !== "undefined" &&
        "pictureInPictureEnabled" in document
    );

    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setError("Camera access denied");
      }
    }

    initCamera();
  }, []);

  /* ---------- Manual PiP ---------- */
  async function enablePiP() {
    try {
      if (
        videoRef.current &&
        document.pictureInPictureEnabled &&
        !document.pictureInPictureElement
      ) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.warn("PiP failed:", err);
    }
  }

  /* ---------- AUTO PiP when leaving /live ---------- */
  useEffect(() => {
    async function autoEnterPiP() {
      if (
        pathname !== "/live" &&
        pipSupported &&
        videoRef.current &&
        document.pictureInPictureEnabled &&
        !document.pictureInPictureElement
      ) {
        try {
          await videoRef.current.requestPictureInPicture();
        } catch {
          // silently fail – browser may block
        }
      }
    }

    autoEnterPiP();
  }, [pathname, pipSupported]);

  /* ---------- Permission fallback ---------- */
  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="bg-[var(--bg-card)] border border-red-500 rounded-lg p-6 max-w-sm text-center">
          <h3 className="font-mono text-sm uppercase tracking-widest text-red-400 mb-2">
            Camera Unavailable
          </h3>
          <p className="text-[var(--text-secondary)] text-sm">
            Please allow camera access to enable live coaching.
          </p>
        </div>
      </div>
    );
  }

  /* ---------- Normal camera ---------- */
  return (
    <div className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Manual PiP button */}
      {pipSupported && (
        <button
          onClick={enablePiP}
          className="absolute top-4 right-4 bg-black/60 border border-[var(--border)] px-3 py-1 rounded text-xs font-mono uppercase tracking-widest hover:border-[var(--border-bright)]"
        >
          PiP
        </button>
      )}
    </div>
  );
}