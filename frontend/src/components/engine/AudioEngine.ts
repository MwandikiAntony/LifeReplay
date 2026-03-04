export class AudioEngine {
  private audioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;

  async start(stream: MediaStream, onChunk: (data: ArrayBuffer) => void) {
    this.audioContext = new AudioContext({ sampleRate: 16000 });

    const source = this.audioContext.createMediaStreamSource(stream);
    this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

    source.connect(this.processor);
    this.processor.connect(this.audioContext.destination);

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
      view.setInt16(i * 2, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
    }

    return buffer;
  }

  stop() {
    this.processor?.disconnect();
    this.audioContext?.close();
  }
}