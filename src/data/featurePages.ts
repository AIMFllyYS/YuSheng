import type { FeatureItem } from "@/data/features";
import { memoryData, notesData, revelationData, shareData, appsData, waveData } from "@/data/features";

export type FeaturePageConfig = {
  title: string;
  subtitle: string;
  headerIcon: string;
  headerGradientClass: string;
  data: FeatureItem[];
};

export const FEATURE_PAGE_CONFIG: Record<"memory" | "notes" | "share" | "revelation" | "apps" | "wave", FeaturePageConfig> = {
  memory: {
    title: "一刻记�?,
    subtitle: "Memory Moments · 一刻记�?,
    headerIcon: "fa-camera-retro",
    headerGradientClass: "from-emerald-400 to-cyan-400",
    data: memoryData,
  },
  notes: {
    title: "个人笔记�?,
    subtitle: "Personal Knowledge Base",
    headerIcon: "fa-book",
    headerGradientClass: "from-purple-500 to-pink-500",
    data: notesData,
  },
  share: {
    title: "开源共�?,
    subtitle: "Open Source & Sharing",
    headerIcon: "fa-github",
    headerGradientClass: "from-sky-500 to-emerald-400",
    data: shareData,
  },
  revelation: {
    title: "启示录导�?,
    subtitle: "Revelation · Insight Navigation",
    headerIcon: "fa-lightbulb-o",
    headerGradientClass: "from-indigo-500 to-violet-500",
    data: revelationData,
  },
  apps: {
    title: "我的应用",
    subtitle: "My Apps Center",
    headerIcon: "fa-layer-group",
    headerGradientClass: "from-purple-500 to-pink-500",
    data: appsData,
  },
  wave: {
    title: "致敬树林",
    subtitle: "Tribute to the Grove · 致敬树林",
    headerIcon: "fa-tree",
    headerGradientClass: "from-emerald-500 to-lime-400",
    data: waveData,
  },
};
