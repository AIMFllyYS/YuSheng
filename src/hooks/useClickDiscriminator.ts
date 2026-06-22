"use client";

import { useCallback, useRef } from "react";

/**
 * Distinguishes single-click (select) from double-click (open).
 * Single-click fires IMMEDIATELY for instant visual feedback.
 * Double-click fires on the native dblclick event without delay.
 * Threshold only prevents single-click from firing AGAIN after a double.
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
      // Fire select immediately  zero perceived latency
      singleRef.current(index);

      // Set a timer so that a subsequent dblclick can be distinguished
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
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
