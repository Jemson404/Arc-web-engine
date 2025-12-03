/**
 * Context Manager
 * Infers user emotional/cognitive state from input
 * Used to personalize threshold and response generation
 */

import type { UserState } from "@/types/arc";

/**
 * Infers the user's current state from their input
 * @param input - User input text
 * @returns Inferred user state
 */
export function inferUserState(input: string): UserState {
  const trimmedInput = input.trim().toLowerCase();

  if (!trimmedInput) {
    return "calm";
  }

  // Anxiety indicators
  const anxietyIndicators = [
    "worried",
    "anxious",
    "afraid",
    "fear",
    "panic",
    "overwhelmed",
    "stressed",
    "can't handle",
    "too much",
    "scared",
    "terrified",
  ];

  // Uncertainty indicators
  const uncertaintyIndicators = [
    "confused",
    "lost",
    "don't know",
    "not sure",
    "maybe",
    "uncertain",
    "unclear",
    "doubt",
    "wondering",
    "puzzled",
  ];

  // Seeking indicators (actively looking for direction)
  const seekingIndicators = [
    "help",
    "what should",
    "how do i",
    "need to",
    "want to",
    "looking for",
    "trying to find",
    "searching",
    "seeking",
    "advice",
  ];

  // Count matches for each state
  let anxietyScore = 0;
  let uncertaintyScore = 0;
  let seekingScore = 0;

  anxietyIndicators.forEach((indicator) => {
    if (trimmedInput.includes(indicator)) anxietyScore++;
  });

  uncertaintyIndicators.forEach((indicator) => {
    if (trimmedInput.includes(indicator)) uncertaintyScore++;
  });

  seekingIndicators.forEach((indicator) => {
    if (trimmedInput.includes(indicator)) seekingScore++;
  });

  // Determine dominant state
  const maxScore = Math.max(anxietyScore, uncertaintyScore, seekingScore);

  if (maxScore === 0) {
    return "calm";
  }

  if (anxietyScore === maxScore) {
    return "anxious";
  }

  if (seekingScore === maxScore) {
    return "seeking";
  }

  if (uncertaintyScore === maxScore) {
    return "uncertain";
  }

  return "calm";
}
