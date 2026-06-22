"use client";

import { FEATURE_PAGE_CONFIG } from "@/data/featurePages";

type SidebarItem =
  | { kind: "feature"; slug: string; name: string; icon: string; color: string }
  | { kind: "external"; name: string; icon: string; color: string; url: string };

type SidebarSection = {
  label: string;
  items: SidebarItem[];
};

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    label: "此电脀,
    items: [
      { kind: "feature", slug: "notes", name: FEATURE_PAGE_CONFIG.notes.title, icon: "fa-book", color: "text-pink-400" },
      { kind: "feature", slug: "memory", name: FEATURE_PAGE_CONFIG.memory.title, icon: "fa-hourglass-half", color: "text-emerald-400" },
      { kind: "feature", slug: "share", name: FEATURE_PAGE_CONFIG.share.title, icon: "fa-share-alt", color: "text-yellow-400" },
      { kind: "feature", slug: "revelation", name: FEATURE_PAGE_CONFIG.revelation.title, icon: "fa-lightbulb-o", color: "text-indigo-400" },
    ],
  },
  {
    label: "外部应用",
    items: [
      { kind: "feature", slug: "apps", name: FEATURE_PAGE_CONFIG.apps.title, icon: "fa-layer-group", color: "text-cyan-400" },
      { kind: "feature", slug: "wave", name: FEATURE_PAGE_CONFIG.wave.title, icon: "fa-tree", color: "text-green-400" },
      { kind: "external", name: "羽升日记", icon: "fa-video-camera", color: "text-red-400", url: "https://space.bilibili.com/3546949376543207" },
    ],
  },
];

type Props = {
  activeSlug: string;
  openFeature: (slug: string) => void;
  onClose: () => void;
};

export function FeatureSidebar({ activeSlug, openFeature, onClose }: Props) {
  return (
    <div className="w-56 border-r border-white/10 dark:border-slate-700/70 bg-white/5 backdrop-blur-md overflow-y-auto hidden md:flex flex-col select-none no-scrollbar">
      {/* Home button */}
      <div className="p-4 space-y-1">
        <div className="text-xs font-bold text-gray-400 mb-2 px-2">主页</div>
        <button
          type="button"
          onClick={onClose}
          className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm flex items-center gap-3 transition-colors"
        >
          <i className="fas fa-home w-4 text-center text-blue-400" />
          <span>返回主页</span>
        </button>
      </div>

      {/* Data-driven sections */}
      {SIDEBAR_SECTIONS.map((section) => (
        <div key={section.label} className="p-4 space-y-1 pt-0">
          <div className="text-xs font-bold text-gray-400 mb-2 px-2">{section.label}</div>
          {section.items.map((item) => {
            if (item.kind === "external") {
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm flex items-center gap-3 transition-colors"
                >
                  <i className={`fas ${item.icon} w-4 text-center ${item.color}`} />
                  <span>{item.name}</span>
                </a>
              );
            }

            const isActive = activeSlug === item.slug;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => openFeature(item.slug)}
                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm flex items-center gap-3 transition-colors ${
                  isActive ? "bg-white/20 font-bold shadow-inner text-white" : ""
                }`}
              >
                <i className={`fas ${item.icon} w-4 text-center ${item.color}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
