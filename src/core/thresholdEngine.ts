import { UserState } from '../types/arc';

export function inferUserState(input: string): UserState {
  const trimmed = input.trim();
  if (!trimmed) return { valence: 0, arousal: 0, stability: 1 };

  const ex = (trimmed.match(/!/g) || []).length;
  const qm = (trimmed.match(/\?/g) || []).length;
  const lenScore = Math.min(trimmed.length / 300, 1);

  const arousal = Math.min((ex + qm) / 5 + lenScore * 0.3, 1);
  const stability = 1 - Math.min(arousal * 0.5, 0.8);

  return { valence: 0, arousal, stability };
}

export function computeThreshold(userState: UserState): number {
  const base = 0.3;
  return Math.max(
    0.2,
    Math.min(0.9, base + userState.arousal * 0.4 + (1 - userState.stability) * 0.3)
  );
}

export function canSpark(delta: number, userState: UserState): boolean {
  return delta >= computeThreshold(userState);
}
