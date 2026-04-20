"use client";

import { useCallback } from "react";

export function useLocalStorageJson() {
  const readJson = useCallback(<T,>(key: string, fallback: T): T => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }, []);

  const writeJson = useCallback((key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  return { readJson, writeJson };
}
