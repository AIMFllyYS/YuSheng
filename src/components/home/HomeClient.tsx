"use client";

import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { BackgroundCanvas } from "@/components/effects/BackgroundCanvas";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { DanmakuLayer } from "@/components/home/DanmakuLayer";
import { HomePageSections } from "@/components/home/HomePageSections";
import { JourneyOverlay } from "@/components/home/JourneyOverlay";
import { VideoOverlay } from "@/components/home/VideoOverlay";

import { FeatureWindow } from "@/components/feature-window/FeatureWindow";
import { FEATURE_PAGE_CONFIG, type FeaturePageConfig } from "@/data/featurePages";
import { GlobalToolkit } from "./GlobalToolkit";

const THEME_KEY = "aimflly_theme";

const ALLOWED_PAGES = ["home", "about", "portal", "stories", "insight", "interactive", "music"] as const;
export type PageId = (typeof ALLOWED_PAGES)[number];

export function HomeClient() {
  const [page, setPage] = useState<PageId>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [featureOpen, setFeatureOpen] = useState(false);
  const [featureSlug, setFeatureSlug] = useState<keyof typeof FEATURE_PAGE_CONFIG | "">("");
  const [themeLight, setThemeLight] = useState(false);
  const videoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openFeature = useCallback((slug: string) => {
    setFeatureSlug(slug as keyof typeof FEATURE_PAGE_CONFIG);
    setFeatureOpen(true);
  }, []);

  const clearVideoTimeout = useCallback(() => {
    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
      videoTimeoutRef.current = null;
    }
  }, []);

  const showVideo = useCallback(() => {
    clearVideoTimeout();
    setVideoOpen(true);
  }, [clearVideoTimeout]);

  const hideVideo = useCallback(() => {
    videoTimeoutRef.current = setTimeout(() => {
      setVideoOpen(false);
    }, 300);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches ?? false;
    const shouldUseLight = saved ? saved === "light" : prefersLight;
    if (shouldUseLight) {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
    startTransition(() => {
      setThemeLight(shouldUseLight);
    });
  }, []);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (ALLOWED_PAGES.includes(hash as PageId)) {
        setPage(hash as PageId);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.replaceState(null, "", `#${page}`);
  }, [page]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("light-theme");
    const isLight = document.documentElement.classList.contains("light-theme");
    localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");
    setThemeLight(isLight);
  };

  const goPage = (p: PageId) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <BackgroundCanvas />
      <CursorGlow />
      <DanmakuLayer />

      <VideoOverlay
        open={videoOpen}
        onCloseClick={() => {
          clearVideoTimeout();
          setVideoOpen(false);
        }}
        onOverlayMouseEnter={clearVideoTimeout}
        onOverlayMouseLeave={hideVideo}
      />

      <JourneyOverlay open={journeyOpen} onClose={() => setJourneyOpen(false)} />

      {featureOpen && featureSlug && FEATURE_PAGE_CONFIG[featureSlug] && (
        <FeatureWindow
          slug={featureSlug}
          {...FEATURE_PAGE_CONFIG[featureSlug]}
          onClose={() => setFeatureOpen(false)}
          openFeature={openFeature}
        />
      )}

      <nav className="fixed w-full z-[60] top-0 pt-2 pb-0 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center glass-card px-6 py-3 rounded-full">
          <button type="button" onClick={() => goPage("home")} className="text-2xl font-bold font-art tracking-widest text-gradient">
            羽升
          </button>

          <div className="hidden md:flex space-x-6 text-sm tracking-wider font-light text-gray-300">
            <button type="button" onClick={() => goPage("home")} className="nav-btn hover:text-white transition-colors">
              首页
            </button>
            <button type="button" onClick={() => goPage("about")} className="nav-btn hover:text-white transition-colors">
              自我
            </button>
            <button type="button" onClick={() => goPage("portal")} className="nav-btn hover:text-white transition-colors">
              功能
            </button>
            <button type="button" onClick={() => goPage("stories")} className="nav-btn hover:text-white transition-colors">
              众妙
            </button>
            <button type="button" onClick={() => goPage("insight")} className="nav-btn hover:text-white transition-colors">
              三观
            </button>
            <button
              type="button"
              onClick={() => goPage("interactive")}
              className="nav-btn hover:text-[color:var(--accent-main)] transition-colors font-medium"
            >
              <i className="fas fa-magic mr-1" />
              灵犀
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              id="theme-toggle"
              className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 transition-colors"
              title="切换日夜模式"
              onClick={toggleTheme}
            >
              <i id="theme-toggle-icon" className={`${themeLight ? "fas fa-sun" : "fas fa-moon"} text-sm`} />
            </button>

            <button
              type="button"
              onClick={() => goPage("music")}
              className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 transition-colors"
              title="歌单"
            >
              <i className="fas fa-music text-sm" />
            </button>

            <button type="button" className="md:hidden text-white text-xl" onClick={() => setMobileOpen((v) => !v)}>
              <i className="fas fa-bars" />
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`${mobileOpen ? "flex" : "hidden"} absolute top-20 left-4 right-4 glass-card p-5 flex-col space-y-3 text-center md:hidden`}
        >
          <button type="button" onClick={() => { goPage("home"); setMobileOpen(false); }}>首页</button>
          <button type="button" onClick={() => { goPage("about"); setMobileOpen(false); }}>自我</button>
          <button type="button" onClick={() => { goPage("portal"); setMobileOpen(false); }}>功能</button>
          <button type="button" onClick={() => { goPage("stories"); setMobileOpen(false); }}>众妙</button>
          <button type="button" onClick={() => { goPage("insight"); setMobileOpen(false); }}>三观</button>
          <button type="button" onClick={() => { goPage("interactive"); setMobileOpen(false); }}>灵犀</button>
          <button type="button" onClick={() => { goPage("music"); setMobileOpen(false); }}>歌单</button>
        </div>
      </nav>

      <main className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto">
        <HomePageSections
          page={page}
          setPage={goPage}
          openJourney={() => setJourneyOpen(true)}
          onAvatarEnter={showVideo}
          onAvatarLeave={hideVideo}
          openFeature={openFeature}
        />
      </main>

      <GlobalToolkit goPage={goPage} toggleTheme={toggleTheme} themeLight={themeLight} />

      <footer className="text-center py-6 text-gray-500 text-xs relative z-10 glass-card mx-4 mb-4 rounded-xl">
        <p>&copy; 2025 AIMflly-羽升. All Rights Reserved.</p>
        <p className="mt-1 font-art text-gray-400">尽管繁华 · 不问前程</p>
      </footer>
    </>
  );
}
