import { useSessionStore } from "@/lib/sessionStore";

let ws: WebSocket;

export function connectCoach(onCoach: (msg: string) => void) {
  ws = new WebSocket("ws://localhost:5000");

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "coach") {
      onCoach(data.advice[0]);
    }

    if (data.type === "transcript") {
      const addTranscript = useSessionStore.getState().addTranscript;
      addTranscript(data.text);
    }
  };
}