"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { JOURNEY_NODES, JOURNEY_STAR_DECORATIONS, JOURNEY_TREE_DECORATIONS } from "@/components/home/journey/journeyData";
import { JourneyNode } from "@/components/home/journey/JourneyNode";
import { RoadmapView } from "./journey/RoadmapView";
import { CalendarView } from "./journey/CalendarView";

type ViewMode = 'journey' | 'roadmap' | 'calendar';

type Props = { open: boolean; onClose: () => void };

export function JourneyOverlay({ open, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const minimapVpRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const viewX = useRef(0);
  const viewY = useRef(0);
  const currentScale = useRef(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [mode, setMode] = useState<ViewMode>('journey');

  const updateViewportTransform = useCallback(() => {
    if (viewportRef.current) viewportRef.current.style.transform = `translate(${viewX.current}px, ${viewY.current}px) scale(${currentScale.current})`;
  }, []);

  const updateMinimap = useCallback(() => {
    const minimapViewport = minimapVpRef.current;
    if (!minimapViewport) return;
    const mapWidth = 150, mapHeight = 100, canvasWidth = 3000, canvasHeight = 2000;
    const vpWidth = window.innerWidth / currentScale.current;
    const vpHeight = window.innerHeight / currentScale.current;
    const x = (-viewX.current / currentScale.current / canvasWidth) * mapWidth;
    const y = (-viewY.current / currentScale.current / canvasHeight) * mapHeight;
    const w = (vpWidth / canvasWidth) * mapWidth;
    const h = (vpHeight / canvasHeight) * mapHeight;
    minimapViewport.style.left = `${Math.max(0, Math.min(mapWidth - w, x))}px`;
    minimapViewport.style.top = `${Math.max(0, Math.min(mapHeight - h, y))}px`;
    minimapViewport.style.width = `${Math.min(mapWidth, w)}px`;
    minimapViewport.style.height = `${Math.min(mapHeight, h)}px`;
  }, []);

  const resetJourneyView = useCallback(() => {
    currentScale.current = 1;
    viewX.current = -200 + window.innerWidth / 2;
    viewY.current = -1000 + window.innerHeight / 2;
    updateViewportTransform();
    updateMinimap();
  }, [updateMinimap, updateViewportTransform]);

  useEffect(() => { if (open) resetJourneyView(); }, [open, resetJourneyView]);

  useEffect(() => {
    if (!open || !containerRef.current || mode !== 'journey') return;
    const container = containerRef.current;
    let rafId = 0;

    const startDrag = (x: number, y: number) => { isDragging.current = true; container.style.cursor = "grabbing"; startX.current = x; startY.current = y; };
    const dragTo = (x: number, y: number) => {
      if (!isDragging.current) return;
      viewX.current += x - startX.current;
      viewY.current += y - startY.current;
      startX.current = x;
      startY.current = y;
      // rAF throttle: batch DOM writes to compositor tick (60fps max)
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updateViewportTransform();
          updateMinimap();
          rafId = 0;
        });
      }
    };
    const endDrag = () => { isDragging.current = false; container.style.cursor = "grab"; };
    const onMouseDown = (e: MouseEvent) => startDrag(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => { if (isDragging.current) e.preventDefault(); dragTo(e.clientX, e.clientY); };
    const onTouchStart = (e: TouchEvent) => { if (e.touches.length === 1) startDrag(e.touches[0]!.clientX, e.touches[0]!.clientY); };
    const onTouchMove = (e: TouchEvent) => { if (!isDragging.current || e.touches.length !== 1) return; e.preventDefault(); dragTo(e.touches[0]!.clientX, e.touches[0]!.clientY); };
    const onWheel = (e: WheelEvent) => { e.preventDefault(); currentScale.current = Math.max(0.3, Math.min(2, currentScale.current * (e.deltaY > 0 ? 0.9 : 1.1))); updateViewportTransform(); updateMinimap(); };
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseup", endDrag);
    container.addEventListener("mouseleave", endDrag);
    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", endDrag);
    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseup", endDrag);
      container.removeEventListener("mouseleave", endDrag);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", endDrag);
      container.removeEventListener("wheel", onWheel);
    };
  }, [open, updateMinimap, updateViewportTransform]);

  if (!open) return null;

  return (
    <div id="journey-page" className="show">
      <div id="journey-close" onClick={onClose}><i className="fas fa-times" /></div>
      
      {/* View Mode Switcher */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[210] flex bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
        <button type="button" onClick={() => setMode('journey')} className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm transition-all ${mode === 'journey' ? 'bg-white/20 text-white font-bold' : 'text-gray-400 hover:text-white'}`}>回忆轨迹</button>
        <button type="button" onClick={() => setMode('roadmap')} className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm transition-all ${mode === 'roadmap' ? 'bg-white/20 text-white font-bold' : 'text-gray-400 hover:text-white'}`}>星图路线</button>
        <button type="button" onClick={() => setMode('calendar')} className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm transition-all ${mode === 'calendar' ? 'bg-white/20 text-white font-bold' : 'text-gray-400 hover:text-white'}`}>日月规划</button>
      </div>

      {mode === 'journey' && (
        <>
          <div id="journey-canvas-container" ref={containerRef}>
        <div id="journey-viewport" ref={viewportRef}>
          <svg id="path-svg" viewBox="0 0 3000 2000">
            <defs><linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#fbbf24" /><stop offset="50%" stopColor="#f472b6" /><stop offset="100%" stopColor="#60a5fa" /></linearGradient></defs>
            <path className="journey-path-glow" d="M 200,1000 C 400,1000 500,700 700,700 S 900,900 1100,850 S 1400,600 1600,650 S 1900,800 2100,750 S 2400,500 2600,550 S 2800,700 2900,650" />
            <path className="journey-path" d="M 200,1000 C 400,1000 500,700 700,700 S 900,900 1100,850 S 1400,600 1600,650 S 1900,800 2100,750 S 2400,500 2600,550 S 2800,700 2900,650" />
          </svg>
          {JOURNEY_TREE_DECORATIONS.map((deco) => <div key={`${deco.left}-${deco.top}`} className="journey-decoration decoration-tree" style={{ left: deco.left, top: deco.top }}>{deco.label}</div>)}
          {JOURNEY_STAR_DECORATIONS.map((deco) => <div key={`${deco.left}-${deco.top}`} className="journey-decoration decoration-star" style={{ left: deco.left, top: deco.top, animationDelay: deco.animationDelay }}>✦</div>)}
          {JOURNEY_NODES.map((node) => (
            <JourneyNode key={node.id} {...node} expanded={expandedId === node.id} onToggle={() => setExpandedId((prev) => (prev === node.id ? null : node.id))} onCloseDetail={() => setExpandedId(null)} />
          ))}
        </div>
      </div>
      <div className="journey-hint"><i className="fas fa-hand-pointer" />拖动画布探索 · 点击节点查看详情</div>
      <div className="journey-controls">
        <button type="button" onClick={() => { currentScale.current = Math.min(2, currentScale.current * 1.2); updateViewportTransform(); updateMinimap(); }} title="放大"><i className="fas fa-plus" /></button>
        <button type="button" onClick={() => { currentScale.current = Math.max(0.3, currentScale.current * 0.8); updateViewportTransform(); updateMinimap(); }} title="缩小"><i className="fas fa-minus" /></button>
        <button type="button" onClick={resetJourneyView} title="重置"><i className="fas fa-compress-arrows-alt" /></button>
      </div>
      <div className="journey-minimap">
        <svg width="150" height="100" viewBox="0 0 3000 2000">
          <path className="minimap-path" d="M 200,1000 C 400,1000 500,700 700,700 S 900,900 1100,850 S 1400,600 1600,650 S 1900,800 2100,750 S 2400,500 2600,550 S 2800,700 2900,650" />
          {[200, 700, 1100, 1600, 2100, 2600, 2900].map((cx) => <circle key={cx} className="minimap-dot" cx={cx} cy={cx === 1600 ? 650 : cx === 200 ? 1000 : cx === 700 ? 700 : cx === 1100 ? 850 : cx === 2100 ? 750 : cx === 2600 ? 550 : 650} r="40" />)}
        </svg>
        <div className="minimap-viewport" id="minimap-viewport" ref={minimapVpRef} />
      </div>
        </>
      )}

      {mode === 'roadmap' && <RoadmapView />}
      {mode === 'calendar' && <CalendarView />}
    </div>
  );
}
