/**
 * App Registry  Single source of truth for all micro-apps.
 * Adding a new app = adding one entry here + creating its component (or pointing to an iframe URL).
 */

export type AppId =
  | "mygpa"
  | "calculus-viz"
  | "python-exam-01"
  | "python-exam-02"
  | "team-day"
  | "birthday-wxy"
  | "santi-characters"
  | "santi-quotes"
  | "book-narcissism";

export type AppRenderMode =
  | { type: "iframe"; url: string }
  | { type: "external"; url: string }
  | { type: "component"; id: AppId };

export type AppCategory = "campus" | "productivity" | "creative" | "dev" | "study" | "memory" | "share" | "revelation";

export type AppMeta = {
  id: AppId;
  name: string;
  icon: string;
  color: string;
  category: AppCategory;
  description: string;
  render: AppRenderMode;
};

export const APP_REGISTRY: Record<AppId, AppMeta> = {
  mygpa: {
    id: "mygpa",
    name: "MyGPA 计算噀,
    icon: "fa-graduation-cap",
    color: "text-amber-400",
    category: "campus",
    description: "GPA 计算与学期成绩管琀,
    render: { type: "component", id: "mygpa" },
  },
  "calculus-viz": {
    id: "calculus-viz",
    name: "微积分·积分可视化",
    icon: "fa-area-chart",
    color: "text-blue-400",
    category: "study",
    description: "微积分积分方法的交互式可视化学习工具",
    render: { type: "iframe", url: "/tools/微积分·积分方法可视化学习系统.html" },
  },
  "python-exam-01": {
    id: "python-exam-01",
    name: "Python 期中模拟复习01",
    icon: "fa-laptop",
    color: "text-yellow-300",
    category: "study",
    description: "Python 期中考试模拟练习",
    render: { type: "iframe", url: "/tools/Python期中考试模拟复习01.html" },
  },
  "python-exam-02": {
    id: "python-exam-02",
    name: "Python 期中模拟02",
    icon: "fa-laptop",
    color: "text-yellow-300",
    category: "study",
    description: "Python 期中考试第二套模拟题",
    render: { type: "iframe", url: "/tools/python期中模拟考试02.html" },
  },
  "team-day": {
    id: "team-day",
    name: "特色团日-光药医路",
    icon: "fa-flag",
    color: "text-sky-300",
    category: "memory",
    description: "特色团日活动互动展示",
    render: { type: "iframe", url: "/tools/特色团日-光药医路.html" },
  },
  "birthday-wxy": {
    id: "birthday-wxy",
    name: "会长汪欣悦的生日",
    icon: "fa-birthday-cake",
    color: "text-pink-300",
    category: "memory",
    description: "生日祝福互动页面",
    render: { type: "iframe", url: "/tools/会长汪欣悦的生日.html" },
  },
  "santi-characters": {
    id: "santi-characters",
    name: "三体可视化人物介绀,
    icon: "fa-globe",
    color: "text-sky-300",
    category: "share",
    description: "《三体》主要角色可视化介绍",
    render: { type: "iframe", url: "/tools/三体可视化人物介绀html" },
  },
  "santi-quotes": {
    id: "santi-quotes",
    name: "三体可视化语彀,
    icon: "fa-quote-left",
    color: "text-indigo-300",
    category: "share",
    description: "《三体》经典语录视觉化呈现",
    render: { type: "iframe", url: "/tools/三体可视化语彀html" },
  },
  "book-narcissism": {
    id: "book-narcissism",
    name: "书籍体验-自伤自恋精神分析",
    icon: "fa-book",
    color: "text-emerald-300",
    category: "revelation",
    description: "《自伤自恋的精神分析》沉浸式阅读体验",
    render: { type: "iframe", url: "/tools/书籍体验-自伤自恋的精神分枀html" },
  },
};

/** Resolve app:// URL to AppMeta or null */
export function resolveAppUrl(url: string): AppMeta | null {
  if (!url.startsWith("app://")) return null;
  const id = url.slice(6) as AppId;
  return APP_REGISTRY[id] ?? null;
}

/** Resolve a slug to AppMeta (for fullscreen routing) */
export function resolveSlug(slug: string): AppMeta | null {
  return APP_REGISTRY[slug as AppId] ?? null;
}
