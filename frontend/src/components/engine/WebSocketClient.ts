let socket: WebSocket | null = null;

export function startWebSocket(url: string, onMessage: any) {
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("Connected to backend");
  };

  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    onMessage(msg);
  };

  return socket;
}

export function sendAudio(data: ArrayBuffer) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(data);
  }
}