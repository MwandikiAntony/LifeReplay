"use client";

import { useEffect } from "react";
import { startWebSocket } from "@/components/engine/WebSocketClient";
import NavigationHUD from "@/components/hud/NavigationHUD";
import DetectionOverlay from "@/components/hud/DetectionOverlay";
import CoachPanel from "@/components/coach/CoachPanel";
import WebSocketStatus from "@/components/system/WebSocketStatus";
import AICameraBox from "@/components/hud/AICameraBox";

import { useSessionStore } from "@/lib/sessionStore";

export default function LivePage() {
  const setState = useSessionStore((s) => s.setState);

  useEffect(() => {
    startWebSocket("ws://localhost:5000", () => {});

    // Activate Live Mode
    setState("live");

    return () => {
      setState("idle");
    };
  }, [setState]);

  return (
    <div className="relative h-[calc(100vh-64px)] overflow-hidden bg-black">
  <AICameraBox />     
  <DetectionOverlay />  
  <CoachPanel />       
  <NavigationHUD />    
  <WebSocketStatus />  
</div>
  );
}