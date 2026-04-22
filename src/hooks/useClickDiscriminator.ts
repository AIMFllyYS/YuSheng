"use client";

import { useCallback, useRef } from "react";

/**
 * Distinguishes single-click (select) from double-click (open)
 * using a 280ms threshold — matching Windows Explorer behavior.
 */
export function useClickDiscriminator(
  onSingle: (index: number) => void,
  onDouble: (index: number) => void,
  delay = 280
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const singleRef = useRef(onSingle);
  const doubleRef = useRef(onDouble);
  singleRef.current = onSingle;
  doubleRef.current = onDouble;

  const onClick = useCallback(
    (index: number) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        singleRef.current(index);
      }, delay);
    },
    [delay]
  );

  const onDoubleClick = useCallback((index: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    doubleRef.current(index);
  }, []);

  return { onClick, onDoubleClick };
}
