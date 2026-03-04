"use client";

import { useEffect, useState, useRef } from "react";
import CameraBox from "@/components/hud/CameraBox";
import { AudioEngine } from "@/components/engine/AudioEngine";
import { WebSocketClient } from "@/components/engine/WebSocketClient";
import WebSocketStatus from "@/components/system/WebSocketStatus";
import { motion } from "framer-motion";
import { SpeechActivityDetector } from "@/components/engine/SpeechActivityDetector";

export default function NavigationHUD() {
  const [status, setStatus] = useState("CONNECTING");
  const [speaking, setSpeaking] = useState(false);

  const audioEngine = useRef(new AudioEngine());
  const wsClient = useRef(new WebSocketClient("ws://localhost:5000"));
  const vad = useRef(new SpeechActivityDetector(0.02));

  useEffect(() => {
    wsClient.current.connect(setStatus);

    async function initAudio() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      await audioEngine.current.start(stream, (chunkBuffer) => {
        wsClient.current.sendAudio(chunkBuffer);

        // Convert ArrayBuffer back to Float32Array for SAD
        const floatData = new Float32Array(chunkBuffer.byteLength / 2);
        const view = new DataView(chunkBuffer);
        for (let i = 0; i < floatData.length; i++) {
          floatData[i] = view.getInt16(i * 2, true) / 0x7fff;
        }

        vad.current.start(floatData, setSpeaking);
      });
    }

    initAudio();

    return () => {
      audioEngine.current.stop();
    };
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-950 text-white px-6 py-16">

      <div className="max-w-6xl mx-auto text-center mb-6">
        <h2 className="text-3xl md:text-5xl font-bold">LifeReplay Live Monitor</h2>
      </div>

      <CameraBox />

      <WebSocketStatus status={status} />

      {/* Voice Activity Indicator */}
      <motion.div
        animate={{ scale: speaking ? 1.2 : 1 }}
        className={`fixed bottom-6 right-6 w-6 h-6 rounded-full ${
          speaking ? "bg-green-500" : "bg-gray-500"
        } shadow-xl`}
      />
    </section>
  );
}