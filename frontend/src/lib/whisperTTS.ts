let lastSpoken = 0;

export function whisper(text: string) {
  const now = Date.now();
  if (now - lastSpoken < 8000) return; // cooldown
  lastSpoken = now;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.volume = 0.3;
  utterance.rate = 0.9;
  utterance.pitch = 1.1;

  speechSynthesis.speak(utterance);
}