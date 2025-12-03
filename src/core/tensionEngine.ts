/**
 * Tension Engine
 * Computes the tension (Δ) between ARC-0 (grounding) and ARC-1 (exploring)
 * This represents the creative/reflective tension between stability and possibility
 */

// Tension calculation weights
const LENGTH_TENSION_WEIGHT = 0.2;
const SEMANTIC_TENSION_WEIGHT = 0.4;
const EMOTIONAL_TENSION_WEIGHT = 0.4;

// Minimum word length for semantic analysis
const MIN_WORD_LENGTH = 3;

/**
 * Computes the tension delta between two ARC outputs
 * @param arc0Text - Text from ARC-0 (grounding panel)
 * @param arc1Text - Text from ARC-1 (exploring panel)
 * @returns Tension value bounded between 0 and 1
 */
export function computeTension(arc0Text: string, arc1Text: string): number {
  // If either text is empty, no tension
  if (!arc0Text.trim() || !arc1Text.trim()) {
    return 0;
  }

  // Compute various tension factors
  const lengthTension = computeLengthTension(arc0Text, arc1Text);
  const semanticTension = computeSemanticTension(arc0Text, arc1Text);
  const emotionalTension = computeEmotionalTension(arc0Text, arc1Text);

  // Weighted combination of tension factors
  const rawTension =
    lengthTension * LENGTH_TENSION_WEIGHT +
    semanticTension * SEMANTIC_TENSION_WEIGHT +
    emotionalTension * EMOTIONAL_TENSION_WEIGHT;

  // Ensure bounded between 0 and 1
  return Math.max(0, Math.min(1, rawTension));
}

/**
 * Computes tension based on difference in text lengths
 */
function computeLengthTension(arc0: string, arc1: string): number {
  const len0 = arc0.length;
  const len1 = arc1.length;
  const maxLen = Math.max(len0, len1);

  if (maxLen === 0) return 0;

  // Normalize length difference
  const diff = Math.abs(len0 - len1) / maxLen;
  return diff;
}

/**
 * Computes semantic tension based on word overlap/divergence
 */
function computeSemanticTension(arc0: string, arc1: string): number {
  const words0 = new Set(arc0.toLowerCase().split(/\s+/).filter((w) => w.length > MIN_WORD_LENGTH));
  const words1 = new Set(arc1.toLowerCase().split(/\s+/).filter((w) => w.length > MIN_WORD_LENGTH));

  if (words0.size === 0 || words1.size === 0) return 0;

  // Count overlapping words
  let overlap = 0;
  words0.forEach((word) => {
    if (words1.has(word)) overlap++;
  });

  // Higher divergence = higher tension
  const unionSize = new Set([...words0, ...words1]).size;
  const overlapRatio = overlap / unionSize;

  // Invert: less overlap = more tension
  return 1 - overlapRatio;
}

/**
 * Computes emotional tension based on emotional keywords
 */
function computeEmotionalTension(arc0: string, arc1: string): number {
  const groundingWords = ["present", "now", "here", "stable", "known", "familiar", "current"];
  const exploringWords = ["might", "could", "unknown", "beyond", "possible", "hidden", "new"];

  const text0Lower = arc0.toLowerCase();
  const text1Lower = arc1.toLowerCase();

  // Count emotional markers in each text
  let groundingInArc0 = 0;
  let exploringInArc1 = 0;

  groundingWords.forEach((word) => {
    if (text0Lower.includes(word)) groundingInArc0++;
  });

  exploringWords.forEach((word) => {
    if (text1Lower.includes(word)) exploringInArc1++;
  });

  // If both have strong markers, higher tension
  const maxGround = groundingWords.length;
  const maxExplore = exploringWords.length;

  const groundRatio = groundingInArc0 / maxGround;
  const exploreRatio = exploringInArc1 / maxExplore;

  // Tension is the product of both ratios (both need to be present)
  return (groundRatio + exploreRatio) / 2;
}
