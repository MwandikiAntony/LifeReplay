"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useDeviceStore } from "@/lib/deviceStore";

export default function CameraBox() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();

  const setCamera = useDeviceStore((s) => s.setCamera);
  const setPiP = useDeviceStore((s) => s.setPiP);

  const [error, setError] = useState<string | null>(null);
  const [pipSupported, setPipSupported] = useState(false);

  /* ---------- Detect PiP support ---------- */
  useEffect(() => {
    setPipSupported(
      typeof document !== "undefined" &&
        "pictureInPictureEnabled" in document &&
        document.pictureInPictureEnabled
    );
  }, []);

  /* ---------- Camera lifecycle ---------- */
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function initCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setCamera(true);
      } catch {
        setError("Camera access denied");
        setCamera(false);
      }
    }

    initCamera();

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
      setCamera(false);
    };
  }, [setCamera]);

  /* ---------- Manual PiP ---------- */
  async function enablePiP() {
    try {
      if (
        videoRef.current &&
        pipSupported &&
        !document.pictureInPictureElement
      ) {
        await videoRef.current.requestPictureInPicture();
        setPiP(true);
      }
    } catch (err) {
      console.warn("PiP failed:", err);
    }
  }

  /* ---------- Auto PiP when leaving /live ---------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLeavePiP = () => {
      setPiP(false);
    };

    video.addEventListener("leavepictureinpicture", handleLeavePiP);

    async function autoEnterPiP() {
      if (
        pathname !== "/live" &&
        pipSupported &&
        !document.pictureInPictureElement
      ) {
        try {
          await video.requestPictureInPicture();
          setPiP(true);
        } catch {
          // browser may block without user gesture
        }
      }
    }

    autoEnterPiP();

    return () => {
      video.removeEventListener("leavepictureinpicture", handleLeavePiP);
    };
  }, [pathname, pipSupported, setPiP]);

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