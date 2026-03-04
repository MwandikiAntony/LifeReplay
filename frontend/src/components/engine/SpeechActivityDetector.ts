type ActivityCallback = (isSpeaking: boolean) => void;

export class SpeechActivityDetector {
  private vadThreshold: number;
  private speakingFrames = 0;
  private totalFrames = 0;

  constructor(vadThreshold = 0.02) {
    this.vadThreshold = vadThreshold;
  }

  /* ---------- Main entry (call per chunk) ---------- */
  process(data: Float32Array, onSpeaking?: ActivityCallback) {
    const rms = this.computeRMS(data);
    const speaking = rms > this.vadThreshold;

    this.totalFrames++;
    if (speaking) this.speakingFrames++;

    onSpeaking?.(speaking);
  }

  /* ---------- Metrics ---------- */
  getSpeakingRatio() {
    return this.totalFrames > 0
      ? this.speakingFrames / this.totalFrames
      : 0;
  }

  reset() {
    this.speakingFrames = 0;
    this.totalFrames = 0;
  }

  /* ---------- Internal ---------- */
  private computeRMS(buffer: Float32Array) {
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) {
      sum += buffer[i] * buffer[i];
    }
    return Math.sqrt(sum / buffer.length);
  }
}