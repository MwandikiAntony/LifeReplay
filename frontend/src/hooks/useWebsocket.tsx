"use client";

import { useEffect, useRef } from "react";
import { useDeviceStore } from "@/lib/deviceStore";

/* ---------- WebSocket Hook ---------- */
export function useWebSocket(url: string) {
  const socketRef = useRef<WebSocket | null>(null);
  const lastPingRef = useRef<number>(Date.now());

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log("🔗 Connected to backend");

      // Start heartbeat every 2 seconds
      const interval = setInterval(() => {
        lastPingRef.current = Date.now();
        if (socketRef.current?.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({ type: "ping" }));
        }
      }, 2000);

      return () => clearInterval(interval);
    };

    socketRef.current.onmessage = () => {
      const latency = Date.now() - lastPingRef.current;
      const quality: "good" | "medium" | "poor" =
        latency < 150 ? "good" : latency < 400 ? "medium" : "poor";

      useDeviceStore.getState().setConnectionQuality(quality);
    };

    socketRef.current.onclose = () => {
      useDeviceStore.getState().setConnectionQuality("poor");
    };

    return () => {
      socketRef.current?.close();
    };
  }, [url]);

  const send = (data: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(data);
    }
  };

  return { send };
}