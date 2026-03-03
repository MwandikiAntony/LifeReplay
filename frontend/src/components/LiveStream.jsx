import { useEffect, useRef } from "react";

export default function LiveStream() {
  const videoRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect WebSocket
    socketRef.current = new WebSocket("ws://localhost:5000");

    socketRef.current.onopen = () => {
      console.log("🔗 Connected to backend");
    };

    // Get Camera + Mic
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then((stream) => {
      videoRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(event.data);
        }
      };

      recorder.start(1000); // Send every 1 second
    });

  }, []);

  return (
    <div>
      <h2>🎥 LiveReplay Streaming</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "400px", borderRadius: "10px" }}
      />
    </div>
  );
}