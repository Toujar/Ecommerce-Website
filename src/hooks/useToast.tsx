import { useState, useCallback } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = crypto.randomUUID();
    const toast = { id, message, type };
    
    setToasts(current => [...current, toast]);
    
    setTimeout(() => {
      setToasts(current => current.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(current => current.filter(t => t.id !== id));
  }, []);

  return {
    toasts,
    addToast,
    removeToast
  };
}