"use client";

import { useEffect } from "react";
import { startWebSocket } from "@/components/engine/WebSocketClient";
import CameraBox from "@/components/hud/CameraBox";
import DetectionOverlay from "@/components/hud/DetectionOverlay";
import CoachPanel from "@/components/coach/CoachPanel";
import WebSocketStatus from "@/components/system/WebSocketStatus";

export default function LivePage() {
  useEffect(() => {
    startWebSocket();
  }, []);

  return (
    <div className="relative h-[calc(100vh-64px)] overflow-hidden bg-black">
      <CameraBox />
      <DetectionOverlay />

      <div className="absolute right-6 bottom-6 w-[380px]">
        <CoachPanel />
      </div>

      <div className="absolute left-6 bottom-6">
        <WebSocketStatus />
      </div>
    </div>
  );
}