"use client";

import { useEffect, useRef } from "react";
import { useDeviceStore } from "@/lib/deviceStore";

export function useWebSocket(url: string) {
  const socketRef = useRef<WebSocket | null>(null);
  const lastPingRef = useRef<number>(Date.now());

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log("Connected to backend");

      // Start heartbeat
      setInterval(() => {
        lastPingRef.current = Date.now();
        socketRef.current?.send(JSON.stringify({ type: "ping" }));
      }, 2000);
    };

    socketRef.current.onmessage = () => {
      const latency = Date.now() - lastPingRef.current;

      const quality =
        latency < 150 ? "good" : latency < 400 ? "medium" : "poor";

      useDeviceStore.getState().setConnection(quality);
    };

    socketRef.current.onclose = () => {
      useDeviceStore.getState().setConnection("poor");
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