type AnalysisResult = {
  advice: string[]
}

export function analyzeConversation(text: string): AnalysisResult {

  const advice: string[] = []

  const lower = text.toLowerCase()

  if (lower.includes("maybe") || lower.includes("i think")) {
    advice.push("Speak more confidently. Avoid filler phrases.")
  }

  if (lower.split(" ").length > 25) {
    advice.push("Your sentence is long. Try shorter statements.")
  }

  if (lower.includes("um") || lower.includes("uh")) {
    advice.push("Reduce filler words like 'um' and 'uh'.")
  }

  return { advice }
}