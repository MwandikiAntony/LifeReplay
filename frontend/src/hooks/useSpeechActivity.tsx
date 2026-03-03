import { useEffect, useState } from "react";

export function useSpeechActivity(stream: MediaStream | null) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!stream) return;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);

    analyser.fftSize = 512;
    microphone.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const detect = () => {
      analyser.getByteFrequencyData(dataArray);

      const volume =
        dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

      setIsSpeaking(volume > 30); // threshold

      requestAnimationFrame(detect);
    };

    detect();
  }, [stream]);

  return isSpeaking;
}