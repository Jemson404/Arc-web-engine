// src/lib/sparkEngine.ts

export type ArcRole = 'ARC0' | 'ARC1';

export interface SparkInput {
  userMessage: string;
  arc0Message: string;
  arc1Message: string;
  recentUserMessages?: string[];
}

export interface SparkDebugScores {
  emotionalIntensity: number; // 0–1
  conflict: number;           // 0–1
  readiness: number;          // 0–1
  lengthFactor: number;       // 0–1
  totalScore: number;         // 0–1
}

export interface SparkResult {
  spark: boolean;
  summary: string;
  scores: SparkDebugScores;
}

/**
 * Utility: normalize text
 */
function normalize(text: string): string {
  return text.toLowerCase();
}

/**
 * Simple keyword-based scoring helper
 */
function keywordScore(
  text: string,
  keywords: string[],
  weightPerHit = 0.15,
  maxScore = 1
): number {
  const norm = normalize(text);
  let score = 0;

  for (const kw of keywords) {
    if (norm.includes(kw)) {
      score += weightPerHit;
    }
  }

  return Math.min(score, maxScore);
}

/**
 * Emotional intensity detector
 */
function detectEmotionalIntensity(userMessage: string): number {
  const emotionalWords = [
    'i hate', 'i\'m scared', "i'm scared", 'i\'m tired', "i'm tired",
    'i feel lost', 'i feel stuck', 'i\'m anxious', "i'm anxious",
    'overwhelmed', 'depressed', 'burned out', 'burnt out',
    'crying', 'lonely', 'alone', 'hopeless', 'helpless'
  ];

  let score = keywordScore(userMessage, emotionalWords, 0.2, 1);

  // punctuation-based boost
  const exclamations = (userMessage.match(/!/g) || []).length;
  const questions = (userMessage.match(/\?/g) || []).length;

  const punctScore = Math.min((exclamations + questions) * 0.05, 0.3);
  score = Math.min(score + punctScore, 1);

  return score;
}

/**
 * Conflict between ARC0 & ARC1
 * Very naive: look for contrastive words and "but / however" style patterns.
 */
function detectConflict(arc0: string, arc1: string): number {
  const combined = normalize(arc0 + ' ' + arc1);

  const conflictWords = [
    'but', 'however', 'on the other hand', 'at the same time',
    'in contrast', 'yet', 'although'
  ];

  let score = keywordScore(combined, conflictWords, 0.2, 1);

  // If both are relatively long and have different vibe markers like "should" vs "could", etc.
  const hasShould = combined.includes('should');
  const hasCould = combined.includes('could');
  if (hasShould && hasCould) {
    score = Math.min(score + 0.2, 1);
  }

  return score;
}

/**
 * Readiness to reflect: user explicitly wants clarity / honesty / change
 */
function detectReadiness(userMessage: string): number {
  const readinessPhrases = [
    'be honest with me',
    'i want clarity',
    'i want to be honest',
    'tell me the truth',
    'i keep doing this',
    'why do i keep',
    'i realize',
    'i\'m realizing',
    "i'm realizing",
    'i think i\'m ready',
    "i think i'm ready",
    'help me understand',
    'what should i do',
    'what do i actually want',
    'how do i fix this',
  ];

  return keywordScore(userMessage, readinessPhrases, 0.25, 1);
}

/**
 * Length factor: longer messages suggest more context / vulnerability
 */
function detectLengthFactor(userMessage: string): number {
  const length = userMessage.trim().split(/\s+/).length;
  if (length <= 5) return 0;
  if (length >= 80) return 1;

  // Map 5..80 words to 0..1 linearly
  return (length - 5) / (80 - 5);
}

/**
 * Generate summary when no spark is triggered
 */
function buildNeutralSummary(arc0: string, arc1: string): string {
  const takeFirstSentence = (text: string): string => {
    const parts = text.split(/(?<=[.!?])\s+/);
    return parts[0] || text;
  };

  const arc0Sentence = takeFirstSentence(arc0);
  const arc1Sentence = takeFirstSentence(arc1);

  return `ARC-0 reflects: ${arc0Sentence}\nARC-1 explores: ${arc1Sentence}`;
}

/**
 * Generate Spark text when we do trigger a Spark
 */
function buildSparkText(input: SparkInput): string {
  const { userMessage, arc0Message, arc1Message } = input;

  const userSnippet =
    userMessage.length > 140 ? userMessage.slice(0, 137) + '…' : userMessage;

  const arc0Sentence = arc0Message.split(/(?<=[.!?])\s+/)[0] || arc0Message;
  const arc1Sentence = arc1Message.split(/(?<=[.!?])\s+/)[0] || arc1Message;

  return [
    '✦ Spark detected',
    '',
    `You're circling around this: "${userSnippet}"`,
    '',
    `ARC-0 is grounding you in: ${arc0Sentence}`,
    `ARC-1 is pushing you toward: ${arc1Sentence}`,
    '',
    'If you had to choose one tiny next action that respects both sides, what would it be?'
  ].join('\n');
}

/**
 * Main entry point
 */
export function evaluateSpark(input: SparkInput): SparkResult {
  const { userMessage, arc0Message, arc1Message } = input;

  const emotionalIntensity = detectEmotionalIntensity(userMessage);
  const conflict = detectConflict(arc0Message, arc1Message);
  const readiness = detectReadiness(userMessage);
  const lengthFactor = detectLengthFactor(userMessage);

  const totalScore =
    0.35 * emotionalIntensity +
    0.30 * conflict +
    0.25 * readiness +
    0.10 * lengthFactor;

  const sparkThreshold = 0.6;

  const spark = totalScore >= sparkThreshold;

  const summary = spark
    ? buildSparkText(input)
    : buildNeutralSummary(arc0Message, arc1Message);

  return {
    spark,
    summary,
    scores: {
      emotionalIntensity,
      conflict,
      readiness,
      lengthFactor,
      totalScore,
    },
  };
}
