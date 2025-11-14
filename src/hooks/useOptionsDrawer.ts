'use client';

import { useState, useCallback, useEffect } from 'react';

export function useOptionsDrawer(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const openDrawer = useCallback(() => {
    setIsOpen(true);
    setSelectedItem(null);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    setSelectedItem(null);
  }, []);

  const selectHistoryItem = useCallback((itemId: string) => {
    setSelectedItem(itemId);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeDrawer();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeDrawer]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return {
    isOpen,
    selectedItem,
    openDrawer,
    closeDrawer,
    selectHistoryItem,
    toggleDrawer: () => setIsOpen(prev => !prev)
  };
}