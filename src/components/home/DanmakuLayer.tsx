"use client";

import { useEffect, useRef } from "react";
import { SITE_CONFIG } from "@/data/config";

export function DanmakuLayer() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = layerRef.current;
    if (!container) return;

    const spawn = () => {
      const text = SITE_CONFIG.DANMAKU_TEXTS[Math.floor(Math.random() * SITE_CONFIG.DANMAKU_TEXTS.length)]!;
      const el = document.createElement("div");
      el.className = "danmaku";
      el.textContent = text;
      el.style.top = `${Math.random() * 75 + 10}%`;
      el.style.animationDuration = `${Math.random() * 6 + 10}s`;
      el.style.fontSize = `${Math.random() * 0.6 + 0.9}rem`;
      container.appendChild(el);
      setTimeout(() => el.remove(), 16000);
    };

    const id = window.setInterval(spawn, 4000);
    return () => clearInterval(id);
  }, []);

  return <div id="danmaku-layer" ref={layerRef} />;
}
