import { ArcMode } from '../types/arc';
import { computeTension } from './tensionEngine';
import { inferUserState, canSpark } from './thresholdEngine';

interface SparkResult {
  mode: ArcMode;
  centerText: string;
  delta: number;
  hasSpark: boolean;
}

export function evaluateSpark(input: string, arc0: string, arc1: string): SparkResult {
  const delta = computeTension(arc0, arc1);
  const userState = inferUserState(input);
  const sparkAllowed = canSpark(delta, userState);

  if (!input.trim()) {
    return { mode: 'idle', centerText: 'Two minds await a real thought.', delta, hasSpark: false };
  }

  if (!sparkAllowed) {
    return {
      mode: 'summary',
      centerText: 'A calm middle lens emerges — not a spark, but clarity in tension.',
      delta,
      hasSpark: false
    };
  }

  return {
    mode: 'spark',
    centerText: '✦ A reflection emerges: not advice — but the part of you that can hold both angles at once.',
    delta,
    hasSpark: true
  };
}
