import { useState, useRef, useEffect, useCallback } from 'react';

export function useButtonHold({
  onPressStart,
  onPressEnd,
  minHoldDuration = 150,
  key = 'Space',
}: {
  onPressStart: () => void;
  onPressEnd: () => void;
  minHoldDuration?: number;
  key?: string;
}) {
  const [isVisuallyPressed, setIsVisuallyPressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = useCallback(() => {
    setIsVisuallyPressed(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onPressStart();
      timeoutRef.current = null;
    }, minHoldDuration);
  }, [onPressStart, minHoldDuration]);

  const handlePressEnd = useCallback(() => {
    setIsVisuallyPressed(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onPressEnd();
  }, [onPressEnd]);

  // Keyboard support (moved from useKeyPress)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === key) {
        e.preventDefault();
        handlePressStart();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === key) {
        e.preventDefault();
        handlePressEnd();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [key, handlePressStart, handlePressEnd]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    isVisuallyPressed,
    handlePressStart,
    handlePressEnd,
  };
}
