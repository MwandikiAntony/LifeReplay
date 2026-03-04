"use client";

import { useEffect, useState, useRef } from "react";
import CameraBox from "@/components/hud/CameraBox";
import { AudioEngine } from "@/components/engine/AudioEngine";
import { WebSocketClient } from "@/components/engine/WebSocketClient";
import WebSocketStatus from "@/components/system/WebSocketStatus";

export default function NavigationHUD() {
  const [status, setStatus] = useState("CONNECTING");

  const audioEngine = useRef(new AudioEngine());
  const wsClient = useRef(new WebSocketClient("ws://localhost:5000"));

  useEffect(() => {
    wsClient.current.connect(setStatus);

    async function initAudio() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      await audioEngine.current.start(stream, (chunk) => {
        wsClient.current.sendAudio(chunk);
      });
    }

    initAudio();

    return () => {
      audioEngine.current.stop();
    };
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-950 text-white px-6 py-16">

      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold">
          LifeReplay Live Monitor
        </h2>
      </div>

      <CameraBox />

      <WebSocketStatus status={status} />
    </section>
  );
}