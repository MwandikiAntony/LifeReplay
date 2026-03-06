class PCMProcessor extends AudioWorkletProcessor {
  process(inputs, outputs) {
    return true;
  }
}

registerProcessor('pcm-processor', PCMProcessor);