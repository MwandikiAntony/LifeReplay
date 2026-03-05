"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { AudioEngine } from "@/components/engine/AudioEngine";
import { SpeechActivityDetector } from "@/components/engine/SpeechActivityDetector";
import { startMockWebSocket } from "@/components/engine/WebSocketClient";
import { useSessionStore } from "@/lib/sessionStore";
import WebSocketStatus from "@/components/system/WebSocketStatus";
import { SessionRecorder } from "@/lib/sessionRecorder";
import ConfidenceHUD from "./confidenceHUD";
import { whisper } from "@/lib/whisperTTS";

export default function NavigationHUD() {
  const [speaking, setSpeaking] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const lastSpeechTime = useRef<number>(Date.now());
  const hasSpokenOnce = useRef(false);
  const audioEngine = useRef<AudioEngine | null>(null);
  const vad = useRef<SpeechActivityDetector | null>(null);
  const recorder = useRef<SessionRecorder | null>(null);

  const sessionState = useSessionStore((s) => s.state);

  /* ---------- WebSocket lifecycle ---------- */
  useEffect(() => {
    startMockWebSocket();
  }, []);

  /* ---------- Whisper coaching ---------- */
  useEffect(() => {
  if (!hasSpokenOnce.current) return;

  const silenceDuration = Date.now() - lastSpeechTime.current;

  // Speak only after real silence (e.g. 2 seconds)
  if (!speaking && silenceDuration > 2000 && confidence < 50) {
    whisper("Slow down. Speak with intention.");
  }
}, [speaking, confidence]);

  /* ---------- Audio + VAD + Recording ---------- */
  useEffect(() => {
    audioEngine.current = new AudioEngine();
    vad.current = new SpeechActivityDetector(0.02);
    recorder.current = new SessionRecorder();

    async function initAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        await audioEngine.current!.start(stream, (chunkBuffer) => {
          /* --- Record raw PCM16 --- */
          recorder.current?.recordAudio(chunkBuffer);

          /* --- PCM16 → Float32 for VAD --- */
          const floatData = new Float32Array(chunkBuffer.byteLength / 2);
          const view = new DataView(chunkBuffer);

          for (let i = 0; i < floatData.length; i++) {
            floatData[i] = view.getInt16(i * 2, true) / 0x7fff;
          }

          /* --- Voice activity detection --- */
            vad.current?.process(floatData, (isSpeaking) => {
            setSpeaking(isSpeaking);
            recorder.current?.recordSpeech(isSpeaking);

            if (isSpeaking) {
              lastSpeechTime.current = Date.now();
              hasSpokenOnce.current = true;
            }

            const score = vad.current?.getConfidenceScore();
            if (score !== undefined) setConfidence(score);
          });
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
          Session state:{" "}
          <span className="uppercase font-mono">{sessionState}</span>
        </p>
      </div>

      {/* AI status */}
      <div className="flex justify-center mb-10">
        <WebSocketStatus />
      </div>

      {/* Confidence HUD */}
      <ConfidenceHUD score={confidence} />

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