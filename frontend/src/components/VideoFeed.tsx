"use client";

import { useEffect, useRef } from "react";

export default function VideoFeed({
  onAudioStream,
}: {
  onAudioStream: (stream: MediaStream) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        onAudioStream(stream);
      });
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{ width: "500px", borderRadius: "16px" }}
    />
  );
}