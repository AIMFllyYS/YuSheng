export const navItems = [
  { id: "home", label: "首页" },
  { id: "about", label: "自我" },
  { id: "portal", label: "功能" },
  { id: "stories", label: "众妙" },
  { id: "insight", label: "三观" },
  { id: "interactive", label: "灵犀" },
  { id: "music", label: "歌单" },
] as const;

export const portalCards = [
  { title: "我的知识庀, href: "/features/notes", icon: "fa-book" },
  { title: "AIMFlly 应用", href: "#", icon: "fa-th-large" },
  { title: "一刻记忀, href: "/features/memory", icon: "fa-camera-retro" },
  { title: "AIMFlly 波纹", href: "#", icon: "fa-tint" },
  { title: "开源共亀, href: "/features/share", icon: "fa-github" },
  { title: "启示录导舀, href: "/features/revelation", icon: "fa-compass" },
] as const;

export const journeyNodes = [
  { year: "2004", icon: "👶", title: "生命起点", desc: "在哈尔滨这座冰城，一个小生命开始了旅程　 },
  { year: "2010-2016", icon: "📚", title: "求学启蒙", desc: "第一次接触朗诵和主持，开始爱上表达　 },
  { year: "2016-2019", icon: "🎤", title: "初中岁月", desc: "主持、演讲、活动策划，学会与世界对话　 },
  { year: "2022-2025", icon: "🔬", title: "高中蜕变", desc: "理性与浪漫并行，形成长期主义学习方式　 },
  { year: "2025", icon: "🏫", title: "华科启程", desc: "踏入华中科技大学基础医学院，开启新阶段　 },
  { year: "未来", icon: "🌟", title: "无限可能", desc: "羽化成蝶，升生不息，持续探索前沿方向　 },
] as const;

export const insightCards = [
  { title: "世界不死，理想不灀, body: "愿你始终保有对世界的热爱，对远方的好奇　, tone: "amber" },
  { title: "羽化成蝶，升生不恀, body: "成长不是突变，而是持续迭代与重构　, tone: "cyan" },
  { title: "不问前程，尽管繁荀, body: "把每一个今天做到极致，就是对未来最好的回答　, tone: "violet" },
] as const;
