/**
 * ARC-0: The Grounding Panel
 * Represents the stable, anchoring perspective
 * Focuses on what is currently true, known, or present
 */

/**
 * Generates ARC-0 (grounding) text based on user input
 * The text should be reflective, not advisory
 * @param input - User input text
 * @returns Grounding perspective text
 */
export function generateARC0Text(input: string): string {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    return "";
  }

  // Reflective grounding patterns - not advice, just observations
  const groundingPatterns = [
    "What seems present right now: ",
    "The current ground feels like: ",
    "There appears to be: ",
    "What's here at this moment: ",
    "The familiar part of this: ",
  ];

  // Simple heuristic: use input length to vary the pattern
  const patternIndex = trimmedInput.length % groundingPatterns.length;
  const pattern = groundingPatterns[patternIndex];

  // Extract key themes from input for grounding context
  const groundingContext = extractGroundingContext(trimmedInput);

  return `${pattern}${groundingContext}`;
}

/**
 * Extracts grounding context from input
 * Focuses on the stable, known elements
 */
function extractGroundingContext(input: string): string {
  // Identify emotional keywords and reflect them
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes("decision") || lowerInput.includes("choose")) {
    return "a moment where choices become visible, where the path splits into possibilities.";
  }

  if (lowerInput.includes("stuck") || lowerInput.includes("can't")) {
    return "a sensation of stillness, where movement feels uncertain.";
  }

  if (lowerInput.includes("feel") || lowerInput.includes("feeling")) {
    return "an awareness of something stirring beneath the surface.";
  }

  if (lowerInput.includes("want") || lowerInput.includes("need")) {
    return "a pull toward something not yet fully formed.";
  }

  if (lowerInput.includes("change") || lowerInput.includes("different")) {
    return "the edge between what was and what might become.";
  }

  if (lowerInput.includes("confused") || lowerInput.includes("lost")) {
    return "a space where clarity has momentarily stepped aside.";
  }

  if (lowerInput.includes("afraid") || lowerInput.includes("fear")) {
    return "a protective instinct, watchful and alert.";
  }

  // Default grounding response
  return "something seeking to be seen and acknowledged.";
}
