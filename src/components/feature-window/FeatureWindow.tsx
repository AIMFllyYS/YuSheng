"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BackgroundCanvas } from "@/components/effects/BackgroundCanvas";
import { CursorGlow } from "@/components/effects/CursorGlow";
import type { FeatureItem } from "@/data/features";

type Props = {
  title: string;
  subtitle: string;
  headerIcon: string;
  headerGradientClass?: string;
  data: FeatureItem[];
  onClose: () => void;
  openFeature: (slug: string) => void;
};

export function FeatureWindow({
  title,
  subtitle,
  headerIcon,
  headerGradientClass = "from-purple-500 to-pink-500",
  data,
  onClose,
  openFeature,
}: Props) {
  const [pathStack, setPathStack] = useState<number[]>([]);
  const [toast, setToast] = useState("");
  const [closing, setClosing] = useState(false);
  const [entered, setEntered] = useState(false);
  const [activeIframe, setActiveIframe] = useState<{url: string, title: string} | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveIframe(null);
    setPathStack([]);
  }, [data]);

  const current = useMemo(() => {
    let cursor = data;
    let currentTitle = "此电脑";
    for (const idx of pathStack) {
      currentTitle = cursor[idx]?.name || currentTitle;
      cursor = cursor[idx]?.children || [];
    }
    return { items: cursor, currentTitle };
  }, [data, pathStack]);

  const closeWindow = () => {
    const win = windowRef.current;
    if (win) {
      const closeBtn = document.getElementById("feature-close-btn");
      if (closeBtn) {
        const btnRect = closeBtn.getBoundingClientRect();
        const winRect = win.getBoundingClientRect();
        const originX = btnRect.left + btnRect.width / 2 - winRect.left;
        const originY = btnRect.top + btnRect.height / 2 - winRect.top;
        win.style.transformOrigin = `${originX}px ${originY}px`;
      }
      win.classList.remove("animate-reveal-from-point");
      win.classList.add("animate-zoom-out");
      setClosing(true);
      setTimeout(() => {
        onClose();
      }, 300);
    } else {
      onClose();
    }
  };

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
      } catch (e) {}
    }

    const rect = win.getBoundingClientRect();
    const transformOriginX = originX - rect.left;
    const transformOriginY = originY - rect.top;
    win.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
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
    const t = window.setTimeout(() => {
      if (!entered) {
        triggerEnter();
      }
    }, 1200);
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

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${closing ? "pointer-events-none" : ""}`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeWindow} />

      <div
        id="main-window"
        ref={windowRef}
        className="glass-window-feature initial-hidden w-[90%] max-w-5xl h-[650px] rounded-2xl flex flex-col overflow-hidden transition-all duration-300 relative z-[2]"
      >
        <div className="h-16 border-b border-white/10 dark:border-slate-700/70 flex items-center justify-between px-8 select-none bg-black/5">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded bg-gradient-to-br ${headerGradientClass} flex items-center justify-center text-white shadow-md`}>
              <i className={`fa ${headerIcon}`} />
            </div>
            <span className="text-xl font-bold tracking-wider">{title}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              id="feature-close-btn"
              onClick={closeWindow}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-500/10 dark:text-gray-300 dark:hover:bg-red-500/20 transition-all"
              title="退出"
            >
              <i className="fa fa-times text-lg" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* 左侧 Windows 风格导航窗格 */}
          <div className="w-56 border-r border-white/10 dark:border-slate-700/70 bg-white/5 backdrop-blur-md overflow-y-auto hidden md:flex flex-col select-none no-scrollbar">
            <div className="p-4 space-y-1">
              <div className="text-xs font-bold text-gray-400 mb-2 px-2">主页</div>
              <button type="button" onClick={closeWindow} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm flex items-center gap-3 transition-colors">
                <i className="fa fa-home w-4 text-center text-blue-400" /> <span>返回主页</span>
              </button>
            </div>
            
            <div className="p-4 space-y-1 pt-0">
              <div className="text-xs font-bold text-gray-400 mb-2 px-2">此电脑</div>
              <button type="button" onClick={() => openFeature("notes")} className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm flex items-center gap-3 transition-colors ${title === "个人笔记库" ? "bg-white/20 font-bold shadow-inner text-white" : ""}`}>
                <i className="fa fa-book w-4 text-center text-pink-400" /> <span>个人笔记库</span>
              </button>
              <button type="button" onClick={() => openFeature("memory")} className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm flex items-center gap-3 transition-colors ${title === "一刻记忆" ? "bg-white/20 font-bold shadow-inner text-white" : ""}`}>
                <i className="fa fa-hourglass-half w-4 text-center text-emerald-400" /> <span>一刻记忆</span>
              </button>
              <button type="button" onClick={() => openFeature("share")} className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm flex items-center gap-3 transition-colors ${title === "开源共享" ? "bg-white/20 font-bold shadow-inner text-white" : ""}`}>
                <i className="fa fa-share-alt w-4 text-center text-yellow-400" /> <span>开源共享</span>
              </button>
              <button type="button" onClick={() => openFeature("revelation")} className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm flex items-center gap-3 transition-colors ${title === "启示录导航" ? "bg-white/20 font-bold shadow-inner text-white" : ""}`}>
                <i className="fa fa-lightbulb-o w-4 text-center text-indigo-400" /> <span>启示录导航</span>
              </button>
            </div>

            <div className="p-4 space-y-1 pt-0">
              <div className="text-xs font-bold text-gray-400 mb-2 px-2">外部应用</div>
              <button type="button" onClick={() => openFeature("apps")} className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm flex items-center gap-3 transition-colors ${title === "我的应用" ? "bg-white/20 font-bold shadow-inner text-white" : ""}`}>
                <i className="fa fa-layer-group w-4 text-center text-purple-400" /> <span>我的应用</span>
              </button>
              <button type="button" onClick={() => openFeature("wave")} className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm flex items-center gap-3 transition-colors ${title === "致敬树林" ? "bg-white/20 font-bold shadow-inner text-white" : ""}`}>
                <i className="fa fa-tree w-4 text-center text-green-400" /> <span>致敬树林</span>
              </button>
              <a href="https://space.bilibili.com/3546949376543207" target="_blank" rel="noopener noreferrer" className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm flex items-center gap-3 transition-colors">
                <i className="fa fa-video-camera w-4 text-center text-red-400" /> <span>羽升日记</span>
              </a>
            </div>
          </div>

          {/* 右侧内容区 */}
          <div className="flex-1 flex flex-col overflow-hidden bg-black/10 relative">
            <div className="h-12 bg-white/5 dark:bg-black/20 flex items-center px-8 text-sm gap-2 backdrop-blur-sm z-10 relative">
              <div className="flex items-center gap-2 w-full">
                {activeIframe ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveIframe(null)}
                      className="flex items-center gap-1 text-indigo-300 hover:underline font-bold"
                    >
                      <i className="fa fa-arrow-left" /> 返回列表
                    </button>
                    <span className="opacity-30 mx-1">/</span>
                    <i className="fa fa-file-code text-gray-300" />
                    <span className="text-gray-100">{activeIframe.title}</span>
                  </>
                ) : pathStack.length === 0 ? (
                  <>
                    <i className="fa fa-desktop text-gray-300" />
                    <span className="font-bold text-gray-100">此电脑</span>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setPathStack((s) => s.slice(0, -1))}
                      className="flex items-center gap-1 text-indigo-300 hover:underline font-bold"
                    >
                      <i className="fa fa-arrow-left" /> 返回
                    </button>
                    <span className="opacity-30 mx-1">/</span>
                    <i className="fa fa-folder-open text-gray-300" />
                    <span className="text-gray-100">{current.currentTitle}</span>
                  </>
                )}
              </div>
            </div>

            {activeIframe ? (
              <div className="flex-1 w-full bg-white relative animate-fade-up overflow-hidden rounded-bl-none rounded-br-2xl">
                <iframe src={activeIframe.url} className="w-full h-full border-none" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
              </div>
            ) : (
              <>
                <div
                  id="content-grid"
                  className="flex-1 p-8 overflow-y-auto no-scrollbar grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 content-start"
                >
              {current.items.length === 0 ? (
                <div className="col-span-full text-center text-gray-400 mt-20 opacity-50">空文件夹</div>
              ) : (
                current.items.map((item, index) => (
                  <button
                    type="button"
                    key={`${item.name}-${index}`}
                    className="group flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 dark:hover:bg-black/40 hover:shadow-lg animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => {
                      if (item.type === "folder") {
                        setPathStack((s) => [...s, index]);
                        return;
                      }
                      if (!item.url || item.url === "#") {
                        setToast("请在代码中配置真实链接");
                        setTimeout(() => setToast(""), 2000);
                        return;
                      }
                      if (item.url.startsWith("http")) {
                        window.open(item.url, "_blank");
                      } else {
                        setActiveIframe({ url: item.url, title: item.name });
                      }
                    }}
                  >
                    <div
                      className={`mb-4 text-5xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110 ${
                        item.type === "folder"
                          ? item.color || "text-yellow-300"
                          : "text-gray-400 dark:text-gray-300 group-hover:text-blue-300"
                      }`}
                    >
                      <i className={`fa ${item.icon || "fa-file"}`} />
                    </div>
                    <span className="text-sm font-medium text-center text-gray-100 line-clamp-2 w-full break-words">{item.name}</span>
                  </button>
                ))
              )}
                </div>

                <div className="h-8 bg-white/5 dark:bg-black/30 flex items-center justify-between px-8 text-xs opacity-70">
                  <span id="item-count">{current.items.length} 个项目</span>
                  <span>{subtitle}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {toast ? (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded shadow animate-fade-up z-[10000]">{toast}</div>
      ) : null}
    </div>
  );
}
