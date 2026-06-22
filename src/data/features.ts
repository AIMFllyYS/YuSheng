export type FeatureItem = {
  type: "folder" | "file";
  name: string;
  icon: string;
  color?: string;
  url?: string;
  children?: FeatureItem[];
  /** Brief description shown in detail pane */
  description?: string;
  /** Unique slug for fullscreen route /app/[slug] */
  slug?: string;
  /** Tags for categorization */
  tags?: string[];
};

export const notesData: FeatureItem[] = [
  {
    type: "folder",
    name: "基础医学",
    icon: "fa-heartbeat",
    color: "text-red-400",
    children: [
      { type: "file", name: "系统解剖学", url: "#", icon: "fa-user-md" },
      { type: "file", name: "病理生理", url: "#", icon: "fa-stethoscope" },
      { type: "file", name: "药理学笔记", url: "#", icon: "fa-medkit" },
    ],
  },
  {
    type: "folder",
    name: "基础化学",
    icon: "fa-flask",
    color: "text-green-400",
    children: [
      { type: "file", name: "无机化学", url: "#", icon: "fa-tint" },
      { type: "file", name: "有机反应", url: "#", icon: "fa-chain" },
      { type: "file", name: "实验报告", url: "#", icon: "fa-file-text" },
    ],
  },
  {
    type: "folder",
    name: "文综",
    icon: "fa-globe",
    color: "text-amber-300",
    children: [
      { type: "file", name: "历史大事年表", url: "#", icon: "fa-history" },
      { type: "file", name: "地理图册", url: "#", icon: "fa-map" },
      { type: "file", name: "政治考点", url: "#", icon: "fa-gavel" },
    ],
  },
  {
    type: "folder",
    name: "数学",
    icon: "fa-calculator",
    color: "text-blue-400",
    children: [
      { type: "file", name: "微积分·积分可视化", url: "/tools/微积分·积分方法可视化学习系统.html", icon: "fa-area-chart", slug: "calculus-viz", description: "微积分积分方法的交互式可视化学习工具，支持多种积分方法的动态演示。", tags: ["数学", "可视化"] },
      { type: "file", name: "高等数学", url: "#", icon: "fa-superscript" },
      { type: "file", name: "线性代数", url: "#", icon: "fa-th" },
      { type: "file", name: "概率统计", url: "#", icon: "fa-line-chart" },
    ],
  },
  {
    type: "folder",
    name: "英语",
    icon: "fa-language",
    color: "text-purple-400",
    children: [
      { type: "file", name: "考研词汇", url: "#", icon: "fa-book" },
      { type: "file", name: "语法长难句", url: "#", icon: "fa-pencil" },
      { type: "file", name: "外刊精读", url: "#", icon: "fa-newspaper-o" },
    ],
  },
  {
    type: "folder",
    name: "Python",
    icon: "fa-code",
    color: "text-yellow-300",
    children: [
      { type: "file", name: "期中考试模拟复习01", url: "/tools/Python期中考试模拟复习01.html", icon: "fa-laptop", slug: "python-exam-01", description: "Python 期中考试模拟练习，涵盖基础语法与常见题型。", tags: ["Python", "考试"] },
      { type: "file", name: "期中考试模拟02", url: "/tools/python期中模拟考试02.html", icon: "fa-laptop", slug: "python-exam-02", description: "Python 期中考试第二套模拟题，侧重函数与数据结构。", tags: ["Python", "考试"] },
      { type: "file", name: "爬虫实战", url: "#", icon: "fa-bug" },
      { type: "file", name: "数据分析", url: "#", icon: "fa-pie-chart" },
      { type: "file", name: "机器学习", url: "#", icon: "fa-cogs" },
    ],
  },
  {
    type: "folder",
    name: "MC",
    icon: "fa-cube",
    color: "text-emerald-400",
    children: [
      { type: "file", name: "红石电路", url: "#", icon: "fa-bolt" },
      { type: "file", name: "建筑设计", url: "#", icon: "fa-building" },
      { type: "file", name: "服务器指令", url: "#", icon: "fa-terminal" },
    ],
  },
];

export const memoryData: FeatureItem[] = [
  {
    type: "folder",
    name: "回忆小录",
    icon: "fa-clock-o",
    color: "text-amber-300",
    children: [
      { type: "file", name: "高中时代：走廊里的黄昏", url: "#", icon: "fa-sun-o" },
      { type: "file", name: "高三那年：夜灯与试卷", url: "#", icon: "fa-file-text-o" },
      { type: "file", name: "大一初见：初到校园的那一天", url: "#", icon: "fa-university" },
      { type: "file", name: "第一次社团活动：紧张又开心", url: "#", icon: "fa-users" },
      { type: "file", name: "某个深夜的漫步与长谈", url: "#", icon: "fa-moon-o" },
    ],
  },
  {
    type: "folder",
    name: "那些活动",
    icon: "fa-calendar-check-o",
    color: "text-sky-300",
    children: [
      { type: "file", name: "特色团日-光药医路", url: "/tools/特色团日-光药医路.html", icon: "fa-flag", slug: "team-day", description: "特色团日活动「光药医路」的互动展示页面。", tags: ["活动", "团日"] },
      { type: "file", name: "会长汪欣悦的生日", url: "/tools/会长汪欣悦的生日.html", icon: "fa-birthday-cake", slug: "birthday-wxy", description: "为会长汪欣悦制作的生日祝福互动页面。", tags: ["生日", "纪念"] },
      { type: "file", name: "迎新晚会 · 舞台灯光下的自己", url: "#", icon: "fa-star" },
      { type: "file", name: "读书会 · 一起翻过的书页", url: "#", icon: "fa-book" },
      { type: "file", name: "社团招新 · 摊位后的故事", url: "#", icon: "fa-handshake-o" },
      { type: "file", name: "期末告别 · 考完那天的合影", url: "#", icon: "fa-camera" },
    ],
  },
  {
    type: "folder",
    name: "万籁生灵",
    icon: "fa-paw",
    color: "text-emerald-300",
    children: [
      { type: "file", name: "校园小猫：草坪上的伸懒腰", url: "#", icon: "fa-heart" },
      { type: "file", name: "窗外鸟鸣：清晨的第一声问候", url: "#", icon: "fa-music" },
      { type: "file", name: "雨后天空：被冲洗过的云", url: "#", icon: "fa-cloud" },
      { type: "file", name: "路边花草：不经意瞥见的颜色", url: "#", icon: "fa-leaf" },
    ],
  },
  {
    type: "folder",
    name: "岁序奇观",
    icon: "fa-snowflake-o",
    color: "text-indigo-300",
    children: [
      { type: "file", name: "初雪记事：落在袖口的那片雪花", url: "#", icon: "fa-snowflake-o" },
      { type: "file", name: "夏夜烟火：抬头时的光", url: "#", icon: "fa-fire" },
      { type: "file", name: "秋日银杏：满地金黄的校园路", url: "#", icon: "fa-tree" },
      { type: "file", name: "跨年夜：零点前后的心愿", url: "#", icon: "fa-hourglass-half" },
    ],
  },
  {
    type: "folder",
    name: "美食飘香",
    icon: "fa-cutlery",
    color: "text-rose-300",
    children: [
      { type: "file", name: "宿舍夜宵：方便面 + 聊天", url: "#", icon: "fa-coffee" },
      { type: "file", name: "食堂限定：永远排长队的窗口", url: "#", icon: "fa-spoon" },
      { type: "file", name: "街角小店：只和熟人分享的馆子", url: "#", icon: "fa-home" },
      { type: "file", name: "某次聚餐：照片里满满一桌菜", url: "#", icon: "fa-smile-o" },
    ],
  },
];

export const shareData: FeatureItem[] = [
  {
    type: "folder",
    name: "个人开源项目",
    icon: "fa-folder-open",
    color: "text-sky-300",
    children: [
      { type: "file", name: "三体可视化人物介绍", url: "/tools/三体可视化人物介绍.html", icon: "fa-globe", slug: "santi-characters", description: "《三体》系列小说主要角色的可视化介绍与关系图谱。", tags: ["三体", "可视化"] },
      { type: "file", name: "三体可视化语录", url: "/tools/三体可视化语录.html", icon: "fa-quote-left", slug: "santi-quotes", description: "《三体》经典语录的视觉化呈现与交互浏览。", tags: ["三体", "语录"] },
      { type: "file", name: "个人主页主题（自介 plus）", url: "#", icon: "fa-html5" },
      { type: "file", name: "前端小组件集合（导航栏 / 卡片）", url: "#", icon: "fa-puzzle-piece" },
      { type: "file", name: "学习可视化工具 Demo", url: "#", icon: "fa-bar-chart" },
      { type: "file", name: "小型 API 实验项目", url: "#", icon: "fa-server" },
    ],
  },
  {
    type: "folder",
    name: "学习与参考",
    icon: "fa-graduation-cap",
    color: "text-indigo-300",
    children: [
      { type: "file", name: "Git & GitHub 使用速查", url: "#", icon: "fa-git" },
      { type: "file", name: "优秀开源项目清单（前端 / 教学）", url: "#", icon: "fa-star-o" },
      { type: "file", name: "常用开源库笔记（Tailwind, Vue 等）", url: "#", icon: "fa-book" },
      { type: "file", name: "贡献指南阅读笔记（CONTRIBUTING）", url: "#", icon: "fa-sticky-note" },
    ],
  },
  {
    type: "folder",
    name: "工具与脚本",
    icon: "fa-code",
    color: "text-emerald-300",
    children: [
      { type: "file", name: "批量重命名 / 整理资料脚本", url: "#", icon: "fa-cog" },
      { type: "file", name: "爬取公开数据的小工具", url: "#", icon: "fa-bug" },
      { type: "file", name: "Markdown 转 HTML 渲染工具", url: "#", icon: "fa-file-code-o" },
      { type: "file", name: "自动生成学习计划的小脚本", url: "#", icon: "fa-magic" },
    ],
  },
  {
    type: "folder",
    name: "协作与贡献",
    icon: "fa-handshake-o",
    color: "text-amber-300",
    children: [
      { type: "file", name: "已提交的 PR / Issue 记录", url: "#", icon: "fa-github-alt" },
      { type: "file", name: "想参与的项目清单", url: "#", icon: "fa-list-ul" },
      { type: "file", name: "代码评审与留言片段收藏", url: "#", icon: "fa-comments-o" },
      { type: "file", name: "未来协作设想 & 约定", url: "#", icon: "fa-lightbulb-o" },
    ],
  },
  {
    type: "folder",
    name: "开源协议与规范",
    icon: "fa-balance-scale",
    color: "text-rose-300",
    children: [
      { type: "file", name: "常见开源协议对比（MIT / GPL / Apache）", url: "#", icon: "fa-file-text-o" },
      { type: "file", name: "个人项目 License 选择记录", url: "#", icon: "fa-legal" },
      { type: "file", name: "代码规范与提交约定（Commit Style）", url: "#", icon: "fa-check-square-o" },
      { type: "file", name: "隐私与数据使用的思考", url: "#", icon: "fa-user-secret" },
    ],
  },
  {
    type: "folder",
    name: "创意草稿与 TODO",
    icon: "fa-lightbulb-o",
    color: "text-purple-300",
    children: [
      { type: "file", name: "想做但还没开始的小项目", url: "#", icon: "fa-rocket" },
      { type: "file", name: "适合开源的课程 / 活动点子", url: "#", icon: "fa-university" },
      { type: "file", name: "“把自己用到爽”为目标的工具设想", url: "#", icon: "fa-smile-o" },
      { type: "file", name: "和朋友一起做的 Side Project 列表", url: "#", icon: "fa-users" },
    ],
  },
];

export const revelationData: FeatureItem[] = [
  {
    type: "folder",
    name: "生命观",
    icon: "fa-leaf",
    color: "text-emerald-300",
    children: [
      { type: "file", name: "书籍体验-自伤自恋精神分析", url: "/tools/书籍体验-自伤自恋的精神分析.html", icon: "fa-book", slug: "book-narcissism", description: "《自伤自恋的精神分析》的沉浸式阅读体验页面。", tags: ["书籍", "心理学"] },
      { type: "file", name: "生命的韧性与成长", icon: "fa-seedling", url: "#" },
      { type: "file", name: "在不确定中寻找确定", icon: "fa-compass", url: "#" },
    ],
  },
  {
    type: "folder",
    name: "学习观",
    icon: "fa-lightbulb-o",
    color: "text-yellow-300",
    children: [
      { type: "file", name: "长期主义学习法", icon: "fa-clock-o", url: "#" },
      { type: "file", name: "跨学科思维训练", icon: "fa-random", url: "#" },
    ],
  },
  {
    type: "folder",
    name: "世界观",
    icon: "fa-globe",
    color: "text-cyan-300",
    children: [
      { type: "file", name: "技术与人文的交叉", icon: "fa-code", url: "#" },
      { type: "file", name: "共建、共享、开源协作", icon: "fa-users", url: "#" },
    ],
  },
];

export const appsData: FeatureItem[] = [
  {
    type: "folder",
    name: "学习工具",
    icon: "fa-graduation-cap",
    color: "text-indigo-300",
    children: [
      { type: "file", name: "Anki 记忆卡片", url: "#", icon: "fa-clone" },
      { type: "file", name: "Notion 学习空间", url: "#", icon: "fa-sticky-note" },
      { type: "file", name: "Obsidian 知识库", url: "#", icon: "fa-database" },
    ],
  },
  {
    type: "folder",
    name: "写作与笔记",
    icon: "fa-pencil-square-o",
    color: "text-rose-300",
    children: [
      { type: "file", name: "每日日记本", url: "#", icon: "fa-book" },
      { type: "file", name: "读书卡片模版", url: "#", icon: "fa-id-card" },
      { type: "file", name: "Markdown 编辑器", url: "#", icon: "fa-file-code-o" },
    ],
  },
  {
    type: "folder",
    name: "编程与开发",
    icon: "fa-code",
    color: "text-emerald-300",
    children: [
      { type: "file", name: "VS Code 启动器", url: "#", icon: "fa-file-code-o" },
      { type: "file", name: "GitHub 仓库入口", url: "#", icon: "fa-github" },
      { type: "file", name: "在线运行环境", url: "#", icon: "fa-terminal" },
    ],
  },
  {
    type: "folder",
    name: "效率与计划",
    icon: "fa-tasks",
    color: "text-amber-300",
    children: [
      { type: "file", name: "待办清单（To-Do）", url: "#", icon: "fa-check-square-o" },
      { type: "file", name: "番茄钟（Pomodoro）", url: "#", icon: "fa-clock-o" },
      { type: "file", name: "日程日历视图", url: "#", icon: "fa-calendar" },
    ],
  },
  {
    type: "folder",
    name: "影音与娱乐",
    icon: "fa-play-circle",
    color: "text-yellow-300",
    children: [
      { type: "file", name: "音乐播放器", url: "#", icon: "fa-music" },
      { type: "file", name: "播客 / B 站收藏", url: "#", icon: "fa-youtube-play" },
      { type: "file", name: "观影清单", url: "#", icon: "fa-film" },
    ],
  },
  {
    type: "folder",
    name: "校园 & 生活",
    icon: "fa-university",
    color: "text-sky-300",
    children: [
      { type: "file", name: "MyGPA 计算器", url: "app://mygpa", icon: "fa-graduation-cap", slug: "mygpa", description: "GPA 计算与学期成绩管理工具，支持多学期成绩录入与加权计算。", tags: ["校园", "工具"] },
      { type: "file", name: "教务系统入口", url: "#", icon: "fa-university" },
      { type: "file", name: "图书馆检索", url: "#", icon: "fa-book" },
      { type: "file", name: "校园网登录页", url: "#", icon: "fa-wifi" },
    ],
  },
  {
    type: "folder",
    name: "创意与设计",
    icon: "fa-paint-brush",
    color: "text-rose-300",
    children: [
      { type: "file", name: "在线白板工具", url: "#", icon: "fa-object-group" },
      { type: "file", name: "思维导图", url: "#", icon: "fa-sitemap" },
      { type: "file", name: "配色 / 字体工具", url: "#", icon: "fa-tint" },
    ],
  },
];

export const waveData: FeatureItem[] = [
  {
    type: "folder",
    name: "希望者联盟",
    icon: "fa-lightbulb-o",
    color: "text-amber-300",
    children: [
      { type: "file", name: "起点宣言：我们想成为什么样的大人", url: "#", icon: "fa-quote-left" },
      { type: "file", name: "四年成长路线图：树成林计划草稿", url: "#", icon: "fa-road" },
      { type: "file", name: "自救手册：迷茫时期的行动清单", url: "#", icon: "fa-life-ring" },
      { type: "file", name: "小小愿望单：想一起完成的 10 件事", url: "#", icon: "fa-star-half-o" },
    ],
  },
  {
    type: "folder",
    name: "浪前前哨站",
    icon: "fa-compass",
    color: "text-sky-300",
    children: [
      { type: "file", name: "前哨日志：这一周的灵感摘录", url: "#", icon: "fa-pencil-square-o" },
      { type: "file", name: "共读书单：一起翻过的那些书页", url: "#", icon: "fa-book" },
      { type: "file", name: "练习与任务：完成情况记录", url: "#", icon: "fa-check-square" },
      { type: "file", name: "问与答：我们抛出的那些问题", url: "#", icon: "fa-question-circle" },
    ],
  },
  {
    type: "folder",
    name: "战友们",
    icon: "fa-users",
    color: "text-emerald-300",
    children: [
      { type: "file", name: "战友名册：一起走过这段路的人", url: "#", icon: "fa-id-badge" },
      { type: "file", name: "故事合集：他们的片段与转折", url: "#", icon: "fa-bookmark" },
      { type: "file", name: "生日与纪念日：不想错过的日子", url: "#", icon: "fa-birthday-cake" },
      { type: "file", name: "写给战友的一封信", url: "#", icon: "fa-envelope-open-o" },
    ],
  },
  {
    type: "folder",
    name: "分浪忆",
    icon: "fa-wave-square",
    color: "text-indigo-300",
    children: [
      { type: "file", name: "开营那天：按下“开始”的瞬间", url: "#", icon: "fa-play-circle" },
      { type: "file", name: "第一次交作业的夜晚", url: "#", icon: "fa-moon-o" },
      { type: "file", name: "差点想放弃的那个时刻", url: "#", icon: "fa-exclamation-circle" },
      { type: "file", name: "回望时最感谢的一件小事", url: "#", icon: "fa-heart-o" },
    ],
  },
  {
    type: "folder",
    name: "其他时节",
    icon: "fa-leaf",
    color: "text-rose-300",
    children: [
      { type: "file", name: "暑假特刊：在家也在成长的日子", url: "#", icon: "fa-sun-o" },
      { type: "file", name: "期末大战周：图书馆里的长夜", url: "#", icon: "fa-clock-o" },
      { type: "file", name: "实习与打工记：试着走进社会的你", url: "#", icon: "fa-briefcase" },
      { type: "file", name: "路上的风景：车窗外一闪而过的画面", url: "#", icon: "fa-camera" },
    ],
  },
];
