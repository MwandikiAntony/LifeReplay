type SpeechMarker = {
  time: number;
  speaking: boolean;
};
export class SessionRecorder {
  private audioChunks: ArrayBuffer[] = [];
  private events: any[] = [];
private startTime = Date.now();
  private speechMarkers: SpeechMarker[] = [];
  recordAudio(chunk: ArrayBuffer) {
    this.audioChunks.push(chunk);
  }

  recordEvent(event: any) {
    this.events.push({ time: Date.now(), event });
  }
   recordSpeech(speaking: boolean) {
    this.speechMarkers.push({
      time: Date.now() - this.startTime,
      speaking,
    });
  }
  getMarkers() {
    return this.speechMarkers;
  }


  export() {
    return {
      audio: this.audioChunks,
      events: this.events,
    };
  }
}



 
