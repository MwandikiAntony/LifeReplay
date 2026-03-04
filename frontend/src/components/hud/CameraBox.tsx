"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CameraEngine } from "@/components/engine/CameraEngine";

export default function CameraBox() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraEngine = useRef(new CameraEngine());

  useEffect(() => {
    async function initCamera() {
      const stream = await cameraEngine.current.start();
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }

    initCamera();

    return () => {
      cameraEngine.current.stop();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-3xl mx-auto"
    >
      <div className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-2xl bg-black">
        
        {/* Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-auto object-cover"
        />

        {/* Premium Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 text-xs text-green-400 tracking-widest">
            ● LIVE
          </div>

          <div className="absolute bottom-4 right-4 text-xs text-gray-400">
            ARIA Vision Active
          </div>
        </div>
      </div>
    </motion.div>
  );
}