"use client";

import type { AppId } from "@/apps/registry";

export type ViewMode = "icon" | "list";

type Props = {
  /* Breadcrumb state */
  pathStack: number[];
  currentTitle: string;
  activeApp: { id: AppId; title: string } | null;
  activeIframe: { url: string; title: string } | null;

  /* Actions */
  onBack: () => void;
  onBackToList: () => void;

  /* View mode */
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  /* Fullscreen */
  canFullscreen: boolean;
  onFullscreen: () => void;
};

export function FeatureToolbar({
  pathStack,
  currentTitle,
  activeApp,
  activeIframe,
  onBack,
  onBackToList,
  viewMode,
  setViewMode,
  canFullscreen,
  onFullscreen,
}: Props) {
  const isRendering = !!(activeApp || activeIframe);

  return (
    <div className="h-12 bg-white/5 dark:bg-black/20 flex items-center px-6 text-sm gap-2 backdrop-blur-sm z-10 relative border-b border-white/5">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {activeApp ? (
          <>
            <button
              type="button"
              onClick={onBackToList}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-bold shrink-0"
            >
              <i className="fas fa-arrow-left text-xs" /> 返回列表
            </button>
            <span className="opacity-30 mx-1">/</span>
            <i className="fas fa-th-large text-gray-400 text-xs" />
            <span className="text-gray-100 truncate">{activeApp.title}</span>
          </>
        ) : activeIframe ? (
          <>
            <button
              type="button"
              onClick={onBackToList}
              className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-bold shrink-0"
            >
              <i className="fas fa-arrow-left text-xs" /> 返回列表
            </button>
            <span className="opacity-30 mx-1">/</span>
            <i className="fas fa-file-code text-gray-400 text-xs" />
            <span className="text-gray-100 truncate">{activeIframe.title}</span>
          </>
        ) : pathStack.length === 0 ? (
          <>
            <i className="fas fa-desktop text-gray-400 text-xs" />
            <span className="font-bold text-gray-100">此电脀</span>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-bold shrink-0"
            >
              <i className="fas fa-arrow-left text-xs" /> 返回
            </button>
            <span className="opacity-30 mx-1">/</span>
            <i className="fas fa-folder-open text-gray-400 text-xs" />
            <span className="text-gray-100 truncate">{currentTitle}</span>
          </>
        )}
      </div>

      {/* Right: View controls */}
      <div className="flex items-center gap-1 shrink-0">
        {isRendering ? (
          /* Fullscreen button when rendering an app/iframe */
          canFullscreen && (
            <button
              type="button"
              onClick={onFullscreen}
              className="w-8 h-8 rounded-md flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              title="全屏打开"
            >
              <i className="fas fa-expand" />
            </button>
          )
        ) : (
          /* View mode toggle when browsing files */
          <div className="flex bg-black/20 rounded-lg p-0.5 border border-white/5">
            <button
              type="button"
              onClick={() => setViewMode("icon")}
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${
                viewMode === "icon"
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-300"
              }`}
              title="图标视图"
            >
              <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="6" height="6" rx="1.5" />
                <rect x="14" y="4" width="6" height="6" rx="1.5" />
                <rect x="14" y="14" width="6" height="6" rx="1.5" />
                <rect x="4" y="14" width="6" height="6" rx="1.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${
                viewMode === "list"
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-300"
              }`}
              title="列表视图"
            >
              <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="9" y1="6" x2="20" y2="6" />
                <line x1="9" y1="12" x2="20" y2="12" />
                <line x1="9" y1="18" x2="20" y2="18" />
                <circle cx="4.5" cy="6" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="4.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="4.5" cy="18" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
