"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { FeatureItem } from "@/data/features";
import { AppRenderer } from "@/components/feature-window/AppRenderer";
import { FeatureSidebar } from "@/components/feature-window/FeatureSidebar";
import { FeatureToolbar, type ViewMode } from "@/components/feature-window/FeatureToolbar";
import { FeatureIconView } from "@/components/feature-window/FeatureIconView";
import { FeatureListView } from "@/components/feature-window/FeatureListView";
import { FeatureDetailPane } from "@/components/feature-window/FeatureDetailPane";
import { resolveAppUrl } from "@/apps/registry";
import type { AppId } from "@/apps/registry";
import { useClickDiscriminator } from "@/hooks/useClickDiscriminator";

type Props = {
  slug: string;
  title: string;
  subtitle: string;
  headerIcon: string;
  headerGradientClass?: string;
  data: FeatureItem[];
  onClose: () => void;
  openFeature: (slug: string) => void;
};

export function FeatureWindow({
  slug,
  title,
  subtitle,
  headerIcon,
  headerGradientClass = "from-cyan-500 to-teal-500",
  data,
  onClose,
  openFeature,
}: Props) {
  const router = useRouter();

  const [pathStack, setPathStack] = useState<number[]>([]);
  const [toast, setToast] = useState("");
  const [closing, setClosing] = useState(false);
  const [entered, setEntered] = useState(false);
  const [activeIframe, setActiveIframe] = useState<{ url: string; title: string; slug?: string } | null>(null);
  const [activeApp, setActiveApp] = useState<{ id: AppId; title: string; slug?: string } | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("icon");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const windowRef = useRef<HTMLDivElement | null>(null);

  // Reset when data (feature category) changes
  useEffect(() => {
    setActiveIframe(null);
    setActiveApp(null);
    setPathStack([]);
    setSelectedIndex(null);
  }, [data]);

  // Clear selection when navigating directories
  useEffect(() => {
    setSelectedIndex(null);
  }, [pathStack]);

  // Compute current directory items
  const current = useMemo(() => {
    let cursor = data;
    let currentTitle = "此电�?;
    for (const idx of pathStack) {
      currentTitle = cursor[idx]?.name || currentTitle;
      cursor = cursor[idx]?.children || [];
    }
    return { items: cursor, currentTitle };
  }, [data, pathStack]);

  // Selected item
  const selectedItem = selectedIndex !== null ? current.items[selectedIndex] ?? null : null;

  // --- Close animation ---
  const closeWindow = () => {
    const win = windowRef.current;
    if (win) {
      const closeBtn = document.getElementById("feature-close-btn");
      if (closeBtn) {
        const btnRect = closeBtn.getBoundingClientRect();
        const winRect = win.getBoundingClientRect();
        win.style.transformOrigin = `${btnRect.left + btnRect.width / 2 - winRect.left}px ${btnRect.top + btnRect.height / 2 - winRect.top}px`;
      }
      win.classList.remove("animate-reveal-from-point");
      win.classList.add("animate-zoom-out");
      setClosing(true);
      setTimeout(onClose, 300);
    } else {
      onClose();
    }
  };

  // --- Enter animation ---
  const triggerEnter = useCallback(() => {
    const win = windowRef.current;
    if (!win || entered) return;
    setEntered(true);

    const originRaw = sessionStorage.getItem("featureClickOrigin");
    let originX = window.innerWidth / 2;
    let originY = window.innerHeight / 2;
    if (originRaw) {
      try {
        const parsed = JSON.parse(originRaw);
        originX = parsed.x;
        originY = parsed.y;
        sessionStorage.removeItem("featureClickOrigin");
      } catch {}
    }
    const rect = win.getBoundingClientRect();
    win.style.transformOrigin = `${originX - rect.left}px ${originY - rect.top}px`;
    win.classList.add("animate-reveal-from-point");
  }, [entered]);

  useEffect(() => {
    const onFirst = () => {
      triggerEnter();
      window.removeEventListener("mousemove", onFirst);
      window.removeEventListener("click", onFirst);
    };
    window.addEventListener("mousemove", onFirst);
    window.addEventListener("click", onFirst);
    const t = setTimeout(() => { if (!entered) triggerEnter(); }, 100);
    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", onFirst);
      window.removeEventListener("click", onFirst);
    };
  }, [entered, triggerEnter]);

  useEffect(() => {
    const win = windowRef.current;
    if (!win) return;
    const onEnd = (e: AnimationEvent) => {
      if (e.animationName === "revealFromPoint") {
        win.classList.remove("initial-hidden");
      }
    };
    win.addEventListener("animationend", onEnd);
    return () => win.removeEventListener("animationend", onEnd);
  }, []);

  // --- Item interaction ---
  const openItem = useCallback(
    (index: number) => {
      const item = current.items[index];
      if (!item) return;

      if (item.type === "folder") {
        setPathStack((s) => [...s, index]);
        return;
      }
      if (!item.url || item.url === "#") {
        setToast("内容即将上线，敬请期�?);
        setTimeout(() => setToast(""), 2000);
        return;
      }
      // app:// protocol �?micro-app
      const appMeta = resolveAppUrl(item.url);
      if (appMeta && appMeta.render.type === "component") {
        setActiveApp({ id: appMeta.id, title: appMeta.name, slug: item.slug });
        return;
      }
      if (item.url.startsWith("http")) {
        window.open(item.url, "_blank");
      } else {
        setActiveIframe({ url: item.url, title: item.name, slug: item.slug });
      }
    },
    [current.items]
  );

  const selectItem = useCallback(
    (index: number) => {
      setSelectedIndex((prev) => (prev === index ? prev : index));
    },
    []
  );

  const { onClick, onDoubleClick } = useClickDiscriminator(selectItem, openItem);

  // --- Fullscreen ---
  const canFullscreen = !!(
    (activeApp?.slug) ||
    (activeIframe?.slug)
  );

  const goFullscreen = () => {
    const targetSlug = activeApp?.slug || activeIframe?.slug;
    if (targetSlug) {
      router.push(`/fullscreen/${targetSlug}`);
    }
  };

  // --- Keyboard shortcuts ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeApp || activeIframe) return; // Don't intercept when rendering

      if (e.key === "Backspace") {
        e.preventDefault();
        setPathStack((s) => s.slice(0, -1));
      }
      if (e.key === "Enter" && selectedIndex !== null) {
        e.preventDefault();
        openItem(selectedIndex);
      }
      // Ctrl+1 / Ctrl+2 for view toggle
      if (e.ctrlKey && e.key === "1") { e.preventDefault(); setViewMode("icon"); }
      if (e.ctrlKey && e.key === "2") { e.preventDefault(); setViewMode("list"); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeApp, activeIframe, selectedIndex, openItem]);

  return (
    <div className={`fixed inset-0 z-50 ${closing ? "pointer-events-none" : ""}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeWindow} />

      {/* Window �?top-aligned, expanded */}
      <div
        id="main-window"
        ref={windowRef}
        className="glass-window-feature-v2 initial-hidden absolute top-[72px] bottom-5 left-[2.5vw] right-[2.5vw] max-w-[1400px] mx-auto rounded-2xl flex flex-col overflow-hidden transition-all duration-300 z-[2]"
      >
        {/* Header */}
        <div className="h-14 border-b border-white/8 flex items-center justify-between px-6 select-none bg-black/10 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${headerGradientClass} flex items-center justify-center text-white shadow-md text-sm`}>
              <i className={`fas ${headerIcon}`} />
            </div>
            <span className="text-lg font-bold tracking-wider">{title}</span>
          </div>
          <button
            type="button"
            id="feature-close-btn"
            onClick={closeWindow}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            title="退�?
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <FeatureSidebar activeSlug={slug} openFeature={openFeature} onClose={closeWindow} />

          {/* Content area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-black/10 relative">
            {/* Toolbar */}
            <FeatureToolbar
              pathStack={pathStack}
              currentTitle={current.currentTitle}
              activeApp={activeApp}
              activeIframe={activeIframe}
              onBack={() => setPathStack((s) => s.slice(0, -1))}
              onBackToList={() => { setActiveApp(null); setActiveIframe(null); }}
              viewMode={viewMode}
              setViewMode={setViewMode}
              canFullscreen={canFullscreen}
              onFullscreen={goFullscreen}
            />

            {/* Render area */}
            {activeApp ? (
              <div className="flex-1 w-full relative animate-fade-up overflow-hidden">
                <AppRenderer appId={activeApp.id} />
              </div>
            ) : activeIframe ? (
              <div className="flex-1 w-full bg-white relative animate-fade-up overflow-hidden">
                <iframe
                  src={activeIframe.url}
                  className="w-full h-full border-none"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </div>
            ) : (
              <div className="flex-1 flex overflow-hidden">
                {/* File view (icon or list) */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {viewMode === "icon" ? (
                    <FeatureIconView
                      items={current.items}
                      selectedIndex={selectedIndex}
                      onClick={onClick}
                      onDoubleClick={onDoubleClick}
                    />
                  ) : (
                    <FeatureListView
                      items={current.items}
                      selectedIndex={selectedIndex}
                      onClick={onClick}
                      onDoubleClick={onDoubleClick}
                    />
                  )}

                  {/* Footer / Status bar */}
                  <div className="h-7 bg-white/3 dark:bg-black/20 flex items-center justify-between px-6 text-[11px] text-gray-500 shrink-0 border-t border-white/5">
                    <span>{current.items.length} 个项�?/span>
                    <span>{subtitle}</span>
                  </div>
                </div>

                {/* Detail pane (right side) */}
                <AnimatePresence>
                  {selectedItem && (
                    <FeatureDetailPane
                      item={selectedItem}
                      onClose={() => setSelectedIndex(null)}
                    />
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-up z-[10000] text-sm">
          {toast}
        </div>
      )}
    </div>
  );
}
