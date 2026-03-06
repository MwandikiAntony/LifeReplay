import WebSocket, { WebSocketServer } from "ws";
import STTService from "../services/sttService";
import { analyzeConversation } from "../ai/conversationAnalyzer";

function startSocketServer(): void {
  const wss = new WebSocketServer({ port: 5000 });

  console.log("WebSocket server running on port 5000");

  wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");

    const stt = new STTService();
    stt.start();

    /* ---------- RECEIVE AUDIO STREAM ---------- */

    ws.on("message", (audioChunk: WebSocket.RawData) => {
      try {
        stt.sendAudio(audioChunk as Buffer);
      } catch (err) {
        console.error("Audio processing error:", err);
      }
    });

    /* ---------- TRANSCRIPT CALLBACK ---------- */

    stt.onTranscript = (text: string) => {

  console.log("Transcript:", text); 

  ws.send(
    JSON.stringify({
      type: "transcript",
      text,
      time: Date.now(),
    })
  )

  const result = analyzeConversation(text)

  if (result.advice.length > 0) {
    ws.send(
      JSON.stringify({
        type: "coach",
        advice: result.advice,
        time: Date.now(),
      })
    )
  }
};

    /* ---------- CLEANUP ---------- */

    ws.on("close", () => {
      console.log("Client disconnected");
      stt.stop();
    });

    ws.on("error", (err) => {
      console.error("WebSocket error:", err);
      stt.stop();
    });
  });
}

export default startSocketServer;