/**
 * Spark Engine
 * Orchestrates the full ARC evaluation pipeline
 * Generates the center panel content based on tension and threshold
 */

import type { ArcEngineResponse, ArcMode } from "@/types/arc";
import { generateARC0Text } from "@/core/arc0";
import { generateARC1Text } from "@/core/arc1";
import { computeTension } from "@/core/tensionEngine";
import { inferUserState } from "@/core/contextManager";
import { canSpark } from "@/core/thresholdEngine";

/**
 * Evaluates input and generates full ARC response
 * This is the main entry point for the ARC engine
 * @param input - User input text
 * @returns Full ARC engine response with mode, text, and metadata
 */
export function evaluateSpark(input: string): ArcEngineResponse {
  const trimmedInput = input.trim();

  // Handle empty input -> idle state
  if (!trimmedInput) {
    return {
      mode: "idle",
      hasSpark: false,
      centerText: "Waiting for your thoughts...",
      delta: 0,
      userState: "calm",
    };
  }

  // Generate both ARC perspectives
  const arc0Text = generateARC0Text(trimmedInput);
  const arc1Text = generateARC1Text(trimmedInput);

  // Compute tension between perspectives
  const delta = computeTension(arc0Text, arc1Text);

  // Infer user state
  const userState = inferUserState(trimmedInput);

  // Determine if spark is warranted
  const shouldSpark = canSpark(delta, userState);

  // Generate appropriate mode and center text
  let mode: ArcMode;
  let centerText: string;
  let hasSpark: boolean;

  if (shouldSpark) {
    mode = "spark";
    hasSpark = true;
    centerText = generateSparkText(arc0Text, arc1Text, userState);
  } else {
    mode = "summary";
    hasSpark = false;
    centerText = generateSummaryText(arc0Text, arc1Text, userState);
  }

  return {
    mode,
    hasSpark,
    centerText,
    delta,
    userState,
  };
}

/**
 * Generates spark text when tension threshold is exceeded
 * The spark should be insightful but not advisory
 */
function generateSparkText(
  arc0Text: string,
  arc1Text: string,
  userState: string
): string {
  // Spark messages are rare insights from the tension between perspectives
  // They should be reflective, not directive

  const sparkMessages = [
    "In the space between stillness and movement, something new takes shape.",
    "Where the known meets the unknown, a quiet clarity emerges.",
    "The tension between these perspectives holds a hidden doorway.",
    "Both truths exist simultaneously—and in that paradox, there is room.",
    "What feels contradictory might be two halves of the same whole.",
  ];

  // Select based on content characteristics
  const combined = (arc0Text + arc1Text + userState).length;
  const index = combined % sparkMessages.length;

  return sparkMessages[index];
}

/**
 * Generates neutral summary text when no spark occurs
 * The summary observes without directing
 */
function generateSummaryText(
  arc0Text: string,
  arc1Text: string,
  userState: string
): string {
  // Summary messages reflect back without prescribing action

  const summaryMessages = [
    "Two perspectives rest here, neither demanding resolution.",
    "The grounding and the exploring coexist in this moment.",
    "What is present and what is possible both have space here.",
    "These reflections hold the question without forcing an answer.",
    "The space between remains open, unhurried.",
  ];

  const combined = (arc0Text + arc1Text + userState).length;
  const index = combined % summaryMessages.length;

  return summaryMessages[index];
}

/**
 * Gets ARC-0 text for external use
 * @param input - User input text
 * @returns ARC-0 grounding text
 */
export function getARC0Text(input: string): string {
  return generateARC0Text(input);
}

/**
 * Gets ARC-1 text for external use
 * @param input - User input text
 * @returns ARC-1 exploring text
 */
export function getARC1Text(input: string): string {
  return generateARC1Text(input);
}
