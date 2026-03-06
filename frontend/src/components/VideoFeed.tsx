"use client";

import { useEffect, useRef } from "react";

export default function LiveStream() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const miniVideoRef = useRef<HTMLVideoElement | null>(null);
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
        if (videoRef.current) videoRef.current.srcObject = stream;
        if (miniVideoRef.current) miniVideoRef.current.srcObject = stream;

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
        position: "relative",
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      {/* Main Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: "12px",
          border: "2px solid black",
          objectFit: "cover",
        }}
      />

      {/* Mini Video */}
      <video
        ref={miniVideoRef}
        autoPlay
        playsInline
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          width: "30%",
          maxWidth: "200px",
          aspectRatio: "16/9",
          borderRadius: "8px",
          border: "2px solid white",
          objectFit: "cover",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      />

      {/* Live Indicator */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(255,0,0,0.7)",
          padding: "4px 8px",
          borderRadius: "8px",
          color: "white",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "red",
            animation: "pulse 1s infinite",
          }}
        />
        LIVE
      </div>

      {/* Responsive Styles */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 600px) {
          video {
            max-width: 100% !important;
          }

          /* Mini video adjusts size and position on mobile */
          video:nth-of-type(2) {
            width: 40% !important;
            max-width: 120px !important;
            bottom: 8px !important;
            right: 8px !important;
          }

          /* Live indicator smaller on mobile */
          div[style*="LIVE"] {
            font-size: 12px !important;
            gap: 4px !important;
            padding: 3px 6px !important;
          }
        }
      `}</style>
    </div>
  );
}