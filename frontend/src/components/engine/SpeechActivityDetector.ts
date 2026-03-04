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
//get confidence score
  getConfidenceScore() {
  const ratio = this.getSpeakingRatio();

  // Ideal range: 0.4–0.65
  if (ratio < 0.4) return Math.round(ratio * 100);
  if (ratio > 0.65) return Math.round((1 - (ratio - 0.65)) * 100);

  return Math.round(80 + (ratio - 0.4) * 100);
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

