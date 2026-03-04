"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { AudioEngine } from "@/components/engine/AudioEngine";
import { SpeechActivityDetector } from "@/components/engine/SpeechActivityDetector";
import { startMockWebSocket } from "@/components/engine/WebSocketClient";
import { useSessionStore } from "@/lib/sessionStore";
import WebSocketStatus from "@/components/system/WebSocketStatus";
import { SessionRecorder } from "@/lib/sessionRecorder";

export default function NavigationHUD() {
  const [speaking, setSpeaking] = useState(false);
  const recorder = useRef(new SessionRecorder());
  const audioEngine = useRef<AudioEngine | null>(null);
  const vad = useRef<SpeechActivityDetector | null>(null);

  const sessionState = useSessionStore((s) => s.state);

  /* ---------- WebSocket lifecycle ---------- */
  useEffect(() => {
    startMockWebSocket();
  }, []);

  /* ---------- Audio + VAD ---------- */
  useEffect(() => {
    audioEngine.current = new AudioEngine();
    vad.current = new SpeechActivityDetector(0.02);
    recorder.current.recordAudio(chunkBuffer);
    async function initAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        await audioEngine.current!.start(stream, (chunkBuffer) => {
          // Convert PCM16 → Float32
          const floatData = new Float32Array(chunkBuffer.byteLength / 2);
          const view = new DataView(chunkBuffer);

          for (let i = 0; i < floatData.length; i++) {
            floatData[i] = view.getInt16(i * 2, true) / 0x7fff;
          }
          recorder.current.recordEvent({ feedback: msg });

          // Feed data to VAD
          vad.current!.process(floatData, setSpeaking);
        });
      } catch (err) {
        console.warn("Audio init failed:", err);
      }
    }

    initAudio();

    return () => {
      audioEngine.current?.stop();
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black to-gray-950 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-bold">
          LifeReplay Live Monitor
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          Session state: <span className="uppercase">{sessionState}</span>
        </p>
      </div>

      {/* WebSocket / AI status */}
      <div className="flex justify-center mb-10">
        <WebSocketStatus />
      </div>

      {/* Voice Activity Indicator */}
      <motion.div
        animate={{ scale: speaking ? 1.3 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`fixed bottom-6 right-6 w-6 h-6 rounded-full ${
          speaking ? "bg-green-500" : "bg-gray-500"
        } shadow-xl`}
      />
    </section>
  );
}