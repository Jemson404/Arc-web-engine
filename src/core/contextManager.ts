import { ArcEngineResponse } from '../types/arc';

let lastResponse: ArcEngineResponse | null = null;

export function setLastResponse(r: ArcEngineResponse): void {
  lastResponse = r;
}

export function getLastResponse(): ArcEngineResponse | null {
  return lastResponse;
}
