"use client";

import CameraBox from "@/components/hud/CameraBox";
import DetectionOverlay from "@/components/hud/DetectionOverlay";
import CoachPanel from "@/components/coach/CoachPanel";
import WebSocketStatus from "@/components/system/WebSocketStatus";

export default function LivePage() {
  return (
    <div className="relative h-[calc(100vh-64px)] bg-black overflow-hidden">
      {/* Camera feed */}
      <CameraBox />

      {/* Visual intelligence overlay */}
      <DetectionOverlay />

      {/* Coach whisper panel */}
      <div className="absolute right-6 bottom-6 w-[380px]">
        <CoachPanel />
      </div>

      {/* System status */}
      <div className="absolute left-6 bottom-6">
        <WebSocketStatus />
      </div>
    </div>
  );
}