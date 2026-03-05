import WebSocket, { WebSocketServer } from "ws";
import STTService from "../services/sttService";

function startSocketServer(): void {
  const wss = new WebSocketServer({ port: 5000 });

  console.log("WebSocket server running on port 5000");

  wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");

    const stt = new STTService();
    stt.start();

    ws.on("message", (audioChunk: WebSocket.RawData) => {
      try {
        stt.sendAudio(audioChunk as Buffer);
      } catch (err) {
        console.error("Audio processing error:", err);
      }
    });

    stt.onTranscript = (text: string) => {
      ws.send(
        JSON.stringify({
          type: "transcript",
          text: text,
          time: Date.now(),
        })
      );
    };

    ws.on("close", () => {
      console.log("Client disconnected");
      stt.stop();
    });
  });
}

export default startSocketServer;