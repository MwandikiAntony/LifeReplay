"use client";

import { useState } from "react";
import VideoFeed from "@/components/VideoFeed";
import AgentDashboard from "@/components/AgentDashboard";
import { useSpeechActivity } from "@/hooks/useSpeechActivity";
import { AgentState } from "@/lib/agentState";

export default function Home() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const speaking = useSpeechActivity(stream);
  const [state, setState] = useState<AgentState>("Listening");

  return (
    <main style={{ padding: "40px" }}>
      <h1>LifeReplay Agent</h1>

      <VideoFeed onAudioStream={setStream} />

      <AgentDashboard state={state} speaking={speaking} />
    </main>
  );
}