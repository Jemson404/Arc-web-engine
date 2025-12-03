export type ArcMode = 'idle' | 'summary' | 'spark';

export interface UserState {
  valence: number;
  arousal: number;
  stability: number;
}

export interface ArcEngineResponse {
  arc0: string;
  arc1: string;
  centerText: string;
  mode: ArcMode;
  delta: number;
  hasSpark: boolean;
}
