"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

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

  const updateViewportTransform = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    el.style.transform = `translate(${viewX.current}px, ${viewY.current}px) scale(${currentScale.current})`;
  }, []);

  const updateMinimap = useCallback(() => {
    const minimapViewport = minimapVpRef.current;
    if (!minimapViewport) return;
    const mapWidth = 150;
    const mapHeight = 100;
    const canvasWidth = 3000;
    const canvasHeight = 2000;
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

  useEffect(() => {
    if (!open) return;
    viewX.current = -200 + window.innerWidth / 2;
    viewY.current = -1000 + window.innerHeight / 2;
    currentScale.current = 1;
    updateViewportTransform();
    updateMinimap();
  }, [open, updateMinimap, updateViewportTransform]);

  useEffect(() => {
    if (!open) return;
    const container = containerRef.current;
    if (!container) return;

    const startDrag = (e: MouseEvent) => {
      isDragging.current = true;
      container.style.cursor = "grabbing";
      startX.current = e.clientX;
      startY.current = e.clientY;
    };
    const drag = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const dx = e.clientX - startX.current;
      const dy = e.clientY - startY.current;
      viewX.current += dx;
      viewY.current += dy;
      startX.current = e.clientX;
      startY.current = e.clientY;
      updateViewportTransform();
      updateMinimap();
    };
    const endDrag = () => {
      isDragging.current = false;
      container.style.cursor = "grab";
    };

    const startDragTouch = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        startX.current = e.touches[0]!.clientX;
        startY.current = e.touches[0]!.clientY;
      }
    };
    const dragTouch = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      e.preventDefault();
      const dx = e.touches[0]!.clientX - startX.current;
      const dy = e.touches[0]!.clientY - startY.current;
      viewX.current += dx;
      viewY.current += dy;
      startX.current = e.touches[0]!.clientX;
      startY.current = e.touches[0]!.clientY;
      updateViewportTransform();
      updateMinimap();
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(0.3, Math.min(2, currentScale.current * delta));
      currentScale.current = newScale;
      updateViewportTransform();
      updateMinimap();
    };

    container.addEventListener("mousedown", startDrag);
    container.addEventListener("mousemove", drag);
    container.addEventListener("mouseup", endDrag);
    container.addEventListener("mouseleave", endDrag);
    container.addEventListener("touchstart", startDragTouch);
    container.addEventListener("touchmove", dragTouch, { passive: false });
    container.addEventListener("touchend", endDrag);
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("mousedown", startDrag);
      container.removeEventListener("mousemove", drag);
      container.removeEventListener("mouseup", endDrag);
      container.removeEventListener("mouseleave", endDrag);
      container.removeEventListener("touchstart", startDragTouch);
      container.removeEventListener("touchmove", dragTouch);
      container.removeEventListener("touchend", endDrag);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [open, updateMinimap, updateViewportTransform]);

  const zoomJourney = (factor: number) => {
    const newScale = Math.max(0.3, Math.min(2, currentScale.current * factor));
    currentScale.current = newScale;
    updateViewportTransform();
    updateMinimap();
  };

  const resetJourneyView = () => {
    currentScale.current = 1;
    viewX.current = -200 + window.innerWidth / 2;
    viewY.current = -1000 + window.innerHeight / 2;
    updateViewportTransform();
    updateMinimap();
  };

  const toggleNode = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (!open) return null;

  return (
    <div id="journey-page" className="show">
      <div id="journey-close" onClick={onClose}>
        <i className="fas fa-times" />
      </div>

      <div id="journey-canvas-container" ref={containerRef}>
        <div id="journey-viewport" ref={viewportRef}>
          <svg id="path-svg" viewBox="0 0 3000 2000">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <path
              className="journey-path-glow"
              d="M 200,1000 
                        C 400,1000 500,700 700,700 
                        S 900,900 1100,850 
                        S 1400,600 1600,650 
                        S 1900,800 2100,750 
                        S 2400,500 2600,550 
                        S 2800,700 2900,650"
            />
            <path
              className="journey-path"
              d="M 200,1000 
                        C 400,1000 500,700 700,700 
                        S 900,900 1100,850 
                        S 1400,600 1600,650 
                        S 1900,800 2100,750 
                        S 2400,500 2600,550 
                        S 2800,700 2900,650"
            />
          </svg>

          <div className="journey-decoration decoration-tree" style={{ left: 150, top: 850 }}>
            🌲
          </div>
          <div className="journey-decoration decoration-tree" style={{ left: 350, top: 600 }}>
            🌳
          </div>
          <div className="journey-decoration decoration-tree" style={{ left: 850, top: 750 }}>
            🌲
          </div>
          <div className="journey-decoration decoration-tree" style={{ left: 1250, top: 500 }}>
            🌳
          </div>
          <div className="journey-decoration decoration-tree" style={{ left: 1750, top: 700 }}>
            🌲
          </div>
          <div className="journey-decoration decoration-tree" style={{ left: 2150, top: 600 }}>
            🌳
          </div>
          <div className="journey-decoration decoration-tree" style={{ left: 2550, top: 450 }}>
            🌲
          </div>

          <div className="journey-decoration decoration-star" style={{ left: 300, top: 500, animationDelay: "0s" }}>
            ✦
          </div>
          <div className="journey-decoration decoration-star" style={{ left: 600, top: 400, animationDelay: "0.3s" }}>
            ✦
          </div>
          <div className="journey-decoration decoration-star" style={{ left: 1000, top: 550, animationDelay: "0.6s" }}>
            ✦
          </div>
          <div className="journey-decoration decoration-star" style={{ left: 1400, top: 400, animationDelay: "0.9s" }}>
            ✦
          </div>
          <div className="journey-decoration decoration-star" style={{ left: 1800, top: 500, animationDelay: "1.2s" }}>
            ✦
          </div>
          <div className="journey-decoration decoration-star" style={{ left: 2200, top: 350, animationDelay: "1.5s" }}>
            ✦
          </div>
          <div className="journey-decoration decoration-star" style={{ left: 2600, top: 400, animationDelay: "1.8s" }}>
            ✦
          </div>

          <JourneyNode
            id="birth"
            left={200}
            top={1000}
            year="2004"
            emoji="👶"
            title="生命起点"
            detailTitle="🌅 生命起点"
            detailText="在哈尔滨这座冰城，一个小生命开始了他的旅程。北方的雪，南方的梦，都在等着他去探索。"
            expanded={expandedId === "birth"}
            onToggle={() => toggleNode("birth")}
            onCloseDetail={() => setExpandedId(null)}
          />
          <JourneyNode
            id="childhood"
            left={700}
            top={700}
            year="2010-2016"
            emoji="📚"
            title="求学启蒙"
            detailTitle="📖 求学启蒙"
            detailText="小学时代，第一次接触朗诵和主持。站上舞台的那一刻，发现声音原来可以传递这么多情感。"
            expanded={expandedId === "childhood"}
            onToggle={() => toggleNode("childhood")}
            onCloseDetail={() => setExpandedId(null)}
          />
          <JourneyNode
            id="junior"
            left={1100}
            top={850}
            year="2016-2019"
            emoji="🎤"
            title="初中岁月"
            detailTitle="🎭 初中岁月"
            detailText="主持、演讲、活动策划……开始在人群中找到自己的位置。那时候还不知道，这些经历会成为未来的养分。"
            expanded={expandedId === "junior"}
            onToggle={() => toggleNode("junior")}
            onCloseDetail={() => setExpandedId(null)}
          />
          <JourneyNode
            id="senior"
            left={1600}
            top={650}
            year="2022-2025"
            emoji="🔬"
            title="高中蜕变"
            detailTitle="🦋 高中蜕变"
            detailText="理科的严谨和文艺的浪漫在这里交汇。备考的日夜里，「不问前程，尽管繁荣」成了写在课桌上的座右铭。"
            expanded={expandedId === "senior"}
            onToggle={() => toggleNode("senior")}
            onCloseDetail={() => setExpandedId(null)}
          />
          <JourneyNode
            id="college"
            left={2100}
            top={750}
            year="2025"
            emoji="🏫"
            title="华科启程"
            detailTitle="🎓 华科启程"
            detailText="踏入华中科技大学基础医学院。森林大学的名号果然名不虚传，在这里，「世界不死，理想不灭」有了新的注脚。"
            expanded={expandedId === "college"}
            onToggle={() => toggleNode("college")}
            onCloseDetail={() => setExpandedId(null)}
          />
          <JourneyNode
            id="growth"
            left={2600}
            top={550}
            year="2025 初"
            emoji="🚀"
            title="探索成长"
            detailTitle="✨ 探索成长"
            detailText="摄影、剪辑、写作、编程……把想法搬到线上。基因工程、AI、多组学，在医学和算法之间，找一条属于自己的小径。"
            expanded={expandedId === "growth"}
            onToggle={() => toggleNode("growth")}
            onCloseDetail={() => setExpandedId(null)}
          />
          <JourneyNode
            id="future"
            left={2900}
            top={650}
            year="未来"
            emoji="🌟"
            title="无限可能"
            detailTitle="🌈 无限可能"
            detailText="故事还在继续书写。羽化成蝶，升生不息——前方的路，还有无限可能在等待。"
            expanded={expandedId === "future"}
            onToggle={() => toggleNode("future")}
            onCloseDetail={() => setExpandedId(null)}
          />
        </div>
      </div>

      <div className="journey-hint">
        <i className="fas fa-hand-pointer" />
        拖动画布探索 · 点击节点查看详情
      </div>

      <div className="journey-controls">
        <button type="button" onClick={() => zoomJourney(1.2)} title="放大">
          <i className="fas fa-plus" />
        </button>
        <button type="button" onClick={() => zoomJourney(0.8)} title="缩小">
          <i className="fas fa-minus" />
        </button>
        <button type="button" onClick={resetJourneyView} title="重置">
          <i className="fas fa-compress-arrows-alt" />
        </button>
      </div>

      <div className="journey-minimap">
        <svg width="150" height="100" viewBox="0 0 3000 2000">
          <path
            className="minimap-path"
            d="M 200,1000 
                    C 400,1000 500,700 700,700 
                    S 900,900 1100,850 
                    S 1400,600 1600,650 
                    S 1900,800 2100,750 
                    S 2400,500 2600,550 
                    S 2800,700 2900,650"
          />
          <circle className="minimap-dot" cx="200" cy="1000" r="40" />
          <circle className="minimap-dot" cx="700" cy="700" r="40" />
          <circle className="minimap-dot" cx="1100" cy="850" r="40" />
          <circle className="minimap-dot" cx="1600" cy="650" r="40" />
          <circle className="minimap-dot" cx="2100" cy="750" r="40" />
          <circle className="minimap-dot" cx="2600" cy="550" r="40" />
          <circle className="minimap-dot" cx="2900" cy="650" r="40" />
        </svg>
        <div className="minimap-viewport" id="minimap-viewport" ref={minimapVpRef} />
      </div>
    </div>
  );
}

function JourneyNode({
  id,
  left,
  top,
  year,
  emoji,
  title,
  detailTitle,
  detailText,
  expanded,
  onToggle,
  onCloseDetail,
}: {
  id: string;
  left: number;
  top: number;
  year: string;
  emoji: string;
  title: string;
  detailTitle: string;
  detailText: string;
  expanded: boolean;
  onToggle: () => void;
  onCloseDetail: () => void;
}) {
  return (
    <div
      className={`journey-node ${expanded ? "expanded" : ""}`}
      style={{ left, top }}
      data-id={id}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      <span className="node-year">{year}</span>
      <div className="node-circle">{emoji}</div>
      <span className="node-title">{title}</span>
      <div className="node-detail">
        <div
          className="node-detail-close"
          onClick={(e) => {
            e.stopPropagation();
            onCloseDetail();
          }}
        >
          <i className="fas fa-times" />
        </div>
        <h4>{detailTitle}</h4>
        <p>{detailText}</p>
      </div>
    </div>
  );
}
