export function cadenceToConfidence(
  speakingRatio: number,
  avgPauseMs: number
): number {
  let score = 50;

  if (speakingRatio > 0.55) score += 15;
  if (speakingRatio < 0.35) score -= 10;

  if (avgPauseMs > 400 && avgPauseMs < 1200) score += 20;
  if (avgPauseMs < 200) score -= 10;

  return Math.max(0, Math.min(100, score));
}