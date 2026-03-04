export function whisperSpeak(text: string) {
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.rate = 0.85;     // calm
  utterance.pitch = 0.9;     // lower pitch
  utterance.volume = 0.35;   // whisper-like

  const voices = speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.name.toLowerCase().includes("female") ||
    v.name.toLowerCase().includes("english")
  );

  if (preferred) utterance.voice = preferred;

  speechSynthesis.speak(utterance);
}