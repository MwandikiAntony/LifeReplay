"use client";

let socket: WebSocket | null = null;

/* ---------- Start WebSocket ---------- */
export function startWebSocket(
  url: string = "ws://localhost:5000",
  onMessage?: (msg: any) => void
) {
  if (socket) return socket;

  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("LifeReplay WS connected");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      console.log("WS Message:", data);

      if (onMessage) {
        onMessage(data);
      }
    } catch {
      console.log("Raw WS message:", event.data);
    }
  };

  socket.onclose = () => {
    console.log("LifeReplay WS closed");
    socket = null;
  };

  socket.onerror = (err) => {
    console.error("WS error:", err);
  };

  return socket;
}

/* ---------- Send audio chunk (binary) ---------- */
export function sendAudio(buffer: ArrayBuffer) {
  if (!socket) return;
  if (socket.readyState !== WebSocket.OPEN) return;

  socket.send(buffer);
}

/* ---------- Send JSON event ---------- */
export function sendWS(data: any) {
  if (!socket) return;

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }
}