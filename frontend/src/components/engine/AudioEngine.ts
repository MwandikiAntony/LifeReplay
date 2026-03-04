export class AudioEngine {
  private audioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private stream: MediaStream | null = null;
   private analyser: AnalyserNode | null = null;

getAnalyser() {
  return this.analyser;
}

  async start(stream: MediaStream, onChunk: (data: ArrayBuffer) => void) {
    this.stream = stream;

    this.audioContext = new AudioContext({ sampleRate: 16000 });

    // 🔴 Required in Chrome (autoplay policy)
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    this.source = this.audioContext.createMediaStreamSource(stream);
    this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

    this.source.connect(this.processor);
    this.processor.connect(this.audioContext.destination);
    this.analyser = this.audioContext.createAnalyser();
    this.source.connect(this.analyser);
    this.processor.onaudioprocess = (event) => {
      const input = event.inputBuffer.getChannelData(0);
      const pcmData = this.convertFloatTo16BitPCM(input);
      onChunk(pcmData);
    };
  }

 

  private convertFloatTo16BitPCM(input: Float32Array): ArrayBuffer {
    const buffer = new ArrayBuffer(input.length * 2);
    const view = new DataView(buffer);

    for (let i = 0; i < input.length; i++) {
      let sample = Math.max(-1, Math.min(1, input[i]));
      view.setInt16(
        i * 2,
        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
        true
      );
    }

    return buffer;
  }

  stop() {
    try {
      this.processor?.disconnect();
      this.source?.disconnect();

      this.stream?.getTracks().forEach((track) => track.stop());

      this.audioContext?.close();
    } catch (e) {
      console.warn("AudioEngine stop error:", e);
    } finally {
      this.processor = null;
      this.source = null;
      this.audioContext = null;
      this.stream = null;
    }
  }
}