"use client";

import { useEffect, useRef } from "react";
import { useCamera } from "@/components/hud/CameraContext";

export default function HeroCameraPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { stream } = useCamera();

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="aspect-video bg-black rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}