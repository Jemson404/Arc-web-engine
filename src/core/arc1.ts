/**
 * ARC-1: The Exploring Panel
 * Represents the expanding, questioning perspective
 * Focuses on what could be, alternatives, and possibilities
 */

/**
 * Generates ARC-1 (exploring) text based on user input
 * The text should be reflective, not advisory
 * @param input - User input text
 * @returns Exploring perspective text
 */
export function generateARC1Text(input: string): string {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    return "";
  }

  // Reflective exploring patterns - not advice, just possibilities
  const exploringPatterns = [
    "What might be stirring: ",
    "The unexplored edge hints at: ",
    "Another shape this could take: ",
    "What lies just beyond: ",
    "The uncharted territory holds: ",
  ];

  // Use input length to vary the pattern (different from ARC-0)
  const patternIndex = (trimmedInput.length + 2) % exploringPatterns.length;
  const pattern = exploringPatterns[patternIndex];

  // Extract exploratory context from input
  const exploringContext = extractExploringContext(trimmedInput);

  return `${pattern}${exploringContext}`;
}

/**
 * Extracts exploring context from input
 * Focuses on possibilities and alternatives
 */
function extractExploringContext(input: string): string {
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes("decision") || lowerInput.includes("choose")) {
    return "the weight of choosing, and the freedom within that weight.";
  }

  if (lowerInput.includes("stuck") || lowerInput.includes("can't")) {
    return "what stillness might be protecting or preparing.";
  }

  if (lowerInput.includes("feel") || lowerInput.includes("feeling")) {
    return "the invitation hidden within the sensation.";
  }

  if (lowerInput.includes("want") || lowerInput.includes("need")) {
    return "the shape of a desire not yet named.";
  }

  if (lowerInput.includes("change") || lowerInput.includes("different")) {
    return "the unknown self, waiting at the threshold.";
  }

  if (lowerInput.includes("confused") || lowerInput.includes("lost")) {
    return "what new clarity might emerge from the fog.";
  }

  if (lowerInput.includes("afraid") || lowerInput.includes("fear")) {
    return "what the fear might be guarding, or pointing toward.";
  }

  // Default exploring response
  return "possibility resting just beneath the visible surface.";
}
