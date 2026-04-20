import type { FeatureItem } from "@/data/features";
import { memoryData, notesData, revelationData, shareData } from "@/data/features";

export type FeaturePageConfig = {
  title: string;
  subtitle: string;
  headerIcon: string;
  headerGradientClass: string;
  data: FeatureItem[];
};

export const FEATURE_PAGE_CONFIG: Record<"memory" | "notes" | "share" | "revelation", FeaturePageConfig> = {
  memory: {
    title: "一刻记忆",
    subtitle: "Memory Moments · 一刻记忆",
    headerIcon: "fa-camera-retro",
    headerGradientClass: "from-emerald-400 to-cyan-400",
    data: memoryData,
  },
  notes: {
    title: "个人笔记库",
    subtitle: "Personal Knowledge Base",
    headerIcon: "fa-book",
    headerGradientClass: "from-purple-500 to-pink-500",
    data: notesData,
  },
  share: {
    title: "开源共享",
    subtitle: "Open Source & Sharing",
    headerIcon: "fa-github",
    headerGradientClass: "from-sky-500 to-emerald-400",
    data: shareData,
  },
  revelation: {
    title: "启示录导航",
    subtitle: "Revelation · Insight Navigation",
    headerIcon: "fa-lightbulb-o",
    headerGradientClass: "from-indigo-500 to-violet-500",
    data: revelationData,
  },
};
