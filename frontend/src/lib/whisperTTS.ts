let lastSpoken = 0;

export function whisper(text: string) {
  const now = Date.now();

  // Cooldown to avoid over-coaching
  if (now - lastSpoken < 8000) return;
  lastSpoken = now;

  // 🔒 HARD STOP: never overlap speech
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.volume = 0.3;
  utterance.rate = 0.9;
  utterance.pitch = 1.1;

  speechSynthesis.speak(utterance);
}