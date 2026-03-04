import { useEffect, useRef } from "react";

export default function CameraBox() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera error:", err);
      }
    }
    initCamera();
  }, []);

  return (
    <div className="relative w-full md:w-1/2 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full h-full object-cover"
      />
      <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded">
        Live
      </div>
    </div>
  );
}