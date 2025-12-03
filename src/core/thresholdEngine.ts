/**
 * Threshold Engine
 * Computes dynamic threshold for spark generation based on user state
 * Higher threshold = harder to trigger spark (more conservative)
 */

import type { UserState } from "@/types/arc";

/**
 * Computes the threshold for spark generation based on user state
 * @param userState - Inferred user emotional/cognitive state
 * @returns Threshold value between 0 and 1
 */
export function computeThreshold(userState: UserState): number {
  // Different thresholds based on user state
  // Sparks should be rare and meaningful
  switch (userState) {
    case "calm":
      // Calm users: moderate threshold, open to insight
      return 0.5;
    case "uncertain":
      // Uncertain users: slightly higher threshold, be more careful
      return 0.6;
    case "anxious":
      // Anxious users: high threshold, protect from overwhelm
      return 0.75;
    case "seeking":
      // Seeking users: lower threshold, they're ready for insight
      return 0.45;
    default:
      return 0.5;
  }
}

/**
 * Determines if a spark should be generated
 * @param delta - Tension value between ARC-0 and ARC-1
 * @param userState - Inferred user state
 * @returns True if spark should be generated
 */
export function canSpark(delta: number, userState: UserState): boolean {
  const threshold = computeThreshold(userState);

  // Spark only if tension exceeds threshold
  // This ensures sparks are rare and meaningful
  return delta > threshold;
}
