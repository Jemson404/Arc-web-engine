'use client';

import { useState, useCallback } from 'react';
import { Message, Turn, SessionHistory, ArcState } from '@/types/arc';
import { getArc0Reply, getArc1Reply, getSparkSummary } from '@/lib/mockResponses';

const STORAGE_KEY = 'arc-engine-state';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function createMessage(type: Message['type'], content: string): Message {
  return {
    id: generateId(),
    content,
    timestamp: new Date(),
    type
  };
}

function loadStateFromStorage(): ArcState | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert timestamp strings back to Date objects
      if (parsed.messages) {
        parsed.messages = parsed.messages.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
      if (parsed.currentTurn) {
        parsed.currentTurn.timestamp = new Date(parsed.currentTurn.timestamp);
      }
      if (parsed.history) {
        parsed.history = parsed.history.map((item: { id: string; promptPreview: string; timestamp: Date }) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
      }
      return parsed;
    }
  } catch (error) {
    console.error('Failed to load state from storage:', error);
  }
  return null;
}

function saveStateToStorage(state: ArcState): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to storage:', error);
  }
}

export function useArcEngine() {
  const initialState = loadStateFromStorage() || {
    messages: [] as Message[],
    currentTurn: null as Turn | null,
    history: [] as SessionHistory,
    isLoading: false,
    activeMobileTab: 'arc0' as const,
    isOptionsOpen: false
  };

  const [state, setState] = useState<ArcState>(initialState);

  const setStateAndSave = useCallback((newState: Partial<ArcState>) => {
    setState(prev => {
      const updated = { ...prev, ...newState };
      saveStateToStorage(updated);
      return updated;
    });
  }, []);

  const handleSubmitPrompt = useCallback(async (prompt: string) => {
    if (!prompt.trim() || state.isLoading) return;

    setStateAndSave({ isLoading: true });

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate responses
      const arc0Content = getArc0Reply(prompt);
      const arc1Content = getArc1Reply(prompt);
      const sparkResult = getSparkSummary(arc0Content, arc1Content, prompt);

      // Create messages
      const userMessage = createMessage('user', prompt);
      const arc0Message = createMessage('arc0', arc0Content);
      const arc1Message = createMessage('arc1', arc1Content);
      const sparkMessage = createMessage('spark',
        `Reconciliation: ${sparkResult.reconciliation}\n\nNext Step: ${sparkResult.nextStep}`
      );

      // Create turn
      const turn: Turn = {
        id: generateId(),
        userPrompt: prompt,
        arc0Reply: arc0Message,
        arc1Reply: arc1Message,
        sparkSummary: sparkMessage,
        timestamp: new Date()
      };

      // Add to history
      const historyItem = {
        id: turn.id,
        promptPreview: prompt.length > 50 ? prompt.substring(0, 47) + '...' : prompt,
        timestamp: turn.timestamp
      };

      setStateAndSave({
        messages: [...state.messages, userMessage, arc0Message, arc1Message, sparkMessage],
        currentTurn: turn,
        history: [historyItem, ...state.history],
        isLoading: false
      });
    } catch (error) {
      console.error('Error processing prompt:', error);
      setStateAndSave({ isLoading: false });
    }
  }, [state.messages, state.history, state.isLoading, setStateAndSave]);

  const loadHistoryItem = useCallback((historyId: string) => {
    // This would scroll to the specific turn in the UI
    // For now, we'll just find it and set as current turn
    const historyItem = state.history.find(item => item.id === historyId);
    if (historyItem) {
      // In a real implementation, this would find the corresponding turn
      // For now, we'll use the currentTurn if it matches
      if (state.currentTurn && state.currentTurn.id === historyId) {
        // Current turn is already the one we want
        return;
      }
    }
  }, [state.history, state.currentTurn]);

  const clearSession = useCallback(() => {
    const clearedState = {
      messages: [] as Message[],
      currentTurn: null as Turn | null,
      history: [] as SessionHistory,
      isLoading: false,
      activeMobileTab: 'arc0' as const,
      isOptionsOpen: false
    };

    setStateAndSave(clearedState);
  }, [setStateAndSave]);

  const setActiveMobileTab = useCallback((tab: 'arc0' | 'arc1') => {
    setStateAndSave({ activeMobileTab: tab });
  }, [setStateAndSave]);

  const setOptionsOpen = useCallback((isOpen: boolean) => {
    setStateAndSave({ isOptionsOpen: isOpen });
  }, [setStateAndSave]);

  return {
    ...state,
    handleSubmitPrompt,
    loadHistoryItem,
    clearSession,
    setActiveMobileTab,
    setOptionsOpen
  };
}