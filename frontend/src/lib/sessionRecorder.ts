export class SessionRecorder {
  private audioChunks: ArrayBuffer[] = [];
  private events: any[] = [];

  recordAudio(chunk: ArrayBuffer) {
    this.audioChunks.push(chunk);
  }

  recordEvent(event: any) {
    this.events.push({ time: Date.now(), event });
  }

  export() {
    return {
      audio: this.audioChunks,
      events: this.events,
    };
  }
}