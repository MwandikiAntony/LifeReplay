import { useDeviceStore } from "@/lib/deviceStore";

export class AudioEngine {
  private audioContext: AudioContext | null = null;
  private processor: AudioWorkletNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private stream: MediaStream | null = null;
  private analyser: AnalyserNode | null = null;

  getAnalyser() {
    return this.analyser;
  }

  async start(stream: MediaStream, onChunk: (data: ArrayBuffer) => void) {
    this.stream = stream;

    this.audioContext = new AudioContext({ sampleRate: 16000 });

    // Required in Chrome (autoplay policy)
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    // Load worklet
    await this.audioContext.audioWorklet.addModule(
  `${window.location.origin}/audio-worklet.js`
);

    this.source = this.audioContext.createMediaStreamSource(stream);
    useDeviceStore.getState().setMicActive(true);

    this.processor = new AudioWorkletNode(
  this.audioContext,
  "pcm-processor"
);

    this.source.connect(this.processor);
    this.processor.connect(this.audioContext.destination);

    this.analyser = this.audioContext.createAnalyser();
    this.source.connect(this.analyser);

    this.processor.port.onmessage = (event) => {
  const input = event.data as Float32Array;
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
      useDeviceStore.getState().setMicActive(true);
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