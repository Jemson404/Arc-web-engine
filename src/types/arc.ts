export type Message = {
  id: string;
  content: string;
  timestamp: Date;
  type: 'user' | 'arc0' | 'arc1' | 'spark';
};

export type Turn = {
  id: string;
  userPrompt: string;
  arc0Reply: Message;
  arc1Reply: Message;
  sparkSummary: Message;
  timestamp: Date;
};

export type SessionHistory = {
  id: string;
  promptPreview: string;
  timestamp: Date;
}[];

export type PersonaType = 'arc0' | 'arc1' | 'spark';

export type SparkSummary = {
  reconciliation: string;
  nextStep: string;
};

export type ArcState = {
  messages: Message[];
  currentTurn: Turn | null;
  history: SessionHistory;
  isLoading: boolean;
  activeMobileTab: 'arc0' | 'arc1';
  isOptionsOpen: boolean;
};