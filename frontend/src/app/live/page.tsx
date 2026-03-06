"use client";

import { useEffect } from "react";
import { startWebSocket } from "@/components/engine/WebSocketClient";
import CameraBox from "@/components/hud/CameraBox";
import DetectionOverlay from "@/components/hud/DetectionOverlay";
import CoachPanel from "@/components/coach/CoachPanel";
import WebSocketStatus from "@/components/system/WebSocketStatus";
import CameraSelector from "@/components/hud/CameraSelector";
import NavigationHUD from "@/components/hud/NavigationHUD";

import { useSessionStore } from "@/lib/sessionStore";

export default function LivePage() {
  const setState = useSessionStore((s) => s.setState);

  useEffect(() => {
    startWebSocket("ws://localhost:5000", () =>{});

    // Activate Live Mode
    setState("live");

    return () => {
      setState("idle");
    };
  }, [setState]);

  return (
    <div className="relative h-[calc(100vh-64px)] overflow-hidden bg-black">
     
      
      <NavigationHUD />
       <CameraBox />
       <div className="absolute right-6 bottom-6 w-[380px]">
        <CoachPanel />
      </div>
     
      <DetectionOverlay />

      

      <div className="absolute left-6 bottom-6">
        <WebSocketStatus />
      </div>
    </div>
  );
}