import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'arc0' | 'arc1' | 'summary' | 'spark';
  content: string;
  timestamp: number;
  streaming?: boolean;
}

interface ArcState {
  messages: Message[];
  isProcessing: boolean;
  showSpark: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, content: string) => void;
  setProcessing: (processing: boolean) => void;
  setShowSpark: (show: boolean) => void;
  clearMessages: () => void;
}

export const useArcStore = create<ArcState>((set) => ({
  messages: [],
  isProcessing: false,
  showSpark: false,
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    }]
  })),
  
  updateMessage: (id, content) => set((state) => ({
    messages: state.messages.map((msg) =>
      msg.id === id ? { ...msg, content } : msg
    )
  })),
  
  setProcessing: (processing) => set({ isProcessing: processing }),
  
  setShowSpark: (show) => set({ showSpark: show }),
  
  clearMessages: () => set({ messages: [] }),
}));
