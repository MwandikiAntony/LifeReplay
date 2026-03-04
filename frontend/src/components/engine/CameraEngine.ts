export class CameraEngine {
  private stream: MediaStream | null = null;

  async start(): Promise<MediaStream> {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: true,
    });

    return this.stream;
  }

  stop() {
    this.stream?.getTracks().forEach((track) => track.stop());
  }
}