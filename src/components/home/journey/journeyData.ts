export type JourneyNodeData = {
  id: string;
  left: number;
  top: number;
  year: string;
  emoji: string;
  title: string;
  detailTitle: string;
  detailText: string;
};

export const JOURNEY_TREE_DECORATIONS = [
  { left: 150, top: 850, label: "🌲" }, { left: 350, top: 600, label: "🌳" }, { left: 850, top: 750, label: "🌲" },
  { left: 1250, top: 500, label: "🌳" }, { left: 1750, top: 700, label: "🌲" }, { left: 2150, top: 600, label: "🌳" }, { left: 2550, top: 450, label: "🌲" },
] as const;

export const JOURNEY_STAR_DECORATIONS = [
  { left: 300, top: 500, animationDelay: "0s" }, { left: 600, top: 400, animationDelay: "0.3s" }, { left: 1000, top: 550, animationDelay: "0.6s" },
  { left: 1400, top: 400, animationDelay: "0.9s" }, { left: 1800, top: 500, animationDelay: "1.2s" }, { left: 2200, top: 350, animationDelay: "1.5s" }, { left: 2600, top: 400, animationDelay: "1.8s" },
] as const;

export const JOURNEY_NODES: JourneyNodeData[] = [
  { id: "birth", left: 200, top: 1000, year: "2004", emoji: "👶", title: "生命起点", detailTitle: "🌅 生命起点", detailText: "在哈尔滨这座冰城，一个小生命开始了他的旅程。北方的雪，南方的梦，都在等着他去探索　 },
  { id: "childhood", left: 700, top: 700, year: "2010-2016", emoji: "📚", title: "求学启蒙", detailTitle: "📖 求学启蒙", detailText: "小学时代，第一次接触朗诵和主持。站上舞台的那一刻，发现声音原来可以传递这么多情感　 },
  { id: "junior", left: 1100, top: 850, year: "2016-2019", emoji: "🎤", title: "初中岁月", detailTitle: "🎭 初中岁月", detailText: "主持、演讲、活动策划……开始在人群中找到自己的位置。那时候还不知道，这些经历会成为未来的养分　 },
  { id: "senior", left: 1600, top: 650, year: "2022-2025", emoji: "🔬", title: "高中蜕变", detailTitle: "🦋 高中蜕变", detailText: "理科的严谨和文艺的浪漫在这里交汇。备考的日夜里，「不问前程，尽管繁荣」成了写在课桌上的座右铭　 },
  { id: "college", left: 2100, top: 750, year: "2025", emoji: "🏫", title: "华科启程", detailTitle: "🎓 华科启程", detailText: "踏入华中科技大学基础医学院。森林大学的名号果然名不虚传，在这里，「世界不死，理想不灭」有了新的注脚　 },
  { id: "growth", left: 2600, top: 550, year: "2025 刀, emoji: "🚀", title: "探索成长", detailTitle: "✀探索成长", detailText: "摄影、剪辑、写作、编程……把想法搬到线上。基因工程、AI、多组学，在医学和算法之间，找一条属于自己的小径　 },
  { id: "future", left: 2900, top: 650, year: "未来", emoji: "🌟", title: "无限可能", detailTitle: "🌈 无限可能", detailText: "故事还在继续书写。羽化成蝶，升生不息——前方的路，还有无限可能在等待　 },
];
