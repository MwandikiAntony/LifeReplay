type ActivityCallback = (isSpeaking: boolean) => void;

export class SpeechActivityDetector {
  private vadThreshold: number;
  private buffer: Float32Array[] = [];
  private callback?: ActivityCallback;

  constructor(vadThreshold = 0.02) {
    // Threshold for detecting speech: adjust dynamically if needed
    this.vadThreshold = vadThreshold;
  }

  start(chunk: Float32Array, onActivity?: ActivityCallback) {
    this.callback = onActivity;
    this.buffer.push(chunk);

    const rms = this.computeRMS(chunk);
    const speaking = rms > this.vadThreshold;

    this.callback?.(speaking);
  }

  private computeRMS(buffer: Float32Array) {
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) {
      sum += buffer[i] * buffer[i];
    }
    return Math.sqrt(sum / buffer.length);
  }

  reset() {
    this.buffer = [];
  }
}