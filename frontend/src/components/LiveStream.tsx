"use client";

import { useEffect, useRef } from "react";

export default function LiveStream() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:5000");

    socketRef.current.onopen = () => {
      console.log("🔗 Connected to backend");
    };

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event: BlobEvent) => {
          if (
            socketRef.current &&
            socketRef.current.readyState === WebSocket.OPEN
          ) {
            socketRef.current.send(event.data);
          }
        };

        recorder.start(1000);
      })
      .catch((error) => {
        console.error("Camera error:", error);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        width: "100%",
        height: "100%", // allows container to grow if needed
        boxSizing: "border-box",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",          // fill container width
          maxWidth: "600px",      // desktop max width
          aspectRatio: "16/9",    // maintain 16:9 aspect ratio
          borderRadius: "12px",
          border: "2px solid black",
          objectFit: "cover",     // ensures video scales nicely
        }}
      />
    </div>
  );
}