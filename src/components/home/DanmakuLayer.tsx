"use client";

import { useEffect, useRef } from "react";
import { SITE_CONFIG } from "@/data/config";

const POOL_SIZE = 6;

export function DanmakuLayer() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = layerRef.current;
    if (!container) return;

    // Pre-create a fixed pool of DOM nodes  zero create/remove per spawn cycle
    const pool: HTMLDivElement[] = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const el = document.createElement("div");
      el.className = "danmaku";
      el.style.visibility = "hidden";
      container.appendChild(el);
      pool.push(el);
    }

    let poolIndex = 0;

    const spawn = () => {
      const el = pool[poolIndex % POOL_SIZE]!;
      poolIndex++;

      const text = SITE_CONFIG.DANMAKU_TEXTS[Math.floor(Math.random() * SITE_CONFIG.DANMAKU_TEXTS.length)]!;
      el.textContent = text;
      el.style.top = `${Math.random() * 75 + 10}%`;
      const dur = Math.random() * 6 + 10;
      el.style.animationDuration = `${dur}s`;
      el.style.fontSize = `${Math.random() * 0.6 + 0.9}rem`;

      // Reset CSS animation without triggering layout  remove and re-add class
      el.style.animation = "none";
      el.style.visibility = "hidden";
      // Force a rAF to let the browser flush the "none" state before restarting
      requestAnimationFrame(() => {
        el.style.animation = "";
        el.style.visibility = "visible";
      });
    };

    const id = window.setInterval(spawn, 4000);
    return () => {
      clearInterval(id);
      pool.forEach((el) => el.remove());
    };
  }, []);

  return <div id="danmaku-layer" ref={layerRef} />;
}
