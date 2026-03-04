type StatusCallback = (status: string) => void;

export class WebSocketClient {
  private socket: WebSocket | null = null;
  private statusCallback?: StatusCallback;

  constructor(private url: string) {}

  connect(onStatusChange?: StatusCallback) {
    this.statusCallback = onStatusChange;

    this.socket = new WebSocket(this.url);
    this.socket.binaryType = "arraybuffer";

    this.socket.onopen = () => {
      this.statusCallback?.("CONNECTED");
    };

    this.socket.onclose = () => {
      this.statusCallback?.("DISCONNECTED");
    };

    this.socket.onerror = () => {
      this.statusCallback?.("ERROR");
    };
  }

  sendAudio(data: ArrayBuffer) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(data);
    }
  }
}