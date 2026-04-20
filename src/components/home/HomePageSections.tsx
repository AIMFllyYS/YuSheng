"use client";

import Link from "next/link";
import { useState } from "react";
import { InteractiveSection } from "./InteractiveSection";
import { MusicSection } from "./MusicSection";

type PageId = "home" | "about" | "portal" | "stories" | "insight" | "interactive" | "music";

type Props = {
  page: PageId;
  setPage: (p: PageId) => void;
  openJourney: () => void;
  onAvatarEnter: () => void;
  onAvatarLeave: () => void;
};

export function HomePageSections({ page, setPage, openJourney, onAvatarEnter, onAvatarLeave }: Props) {
  const [openTimeline, setOpenTimeline] = useState<string | null>(null);

  const sec = (id: PageId, className: string, children: React.ReactNode) => (
    <section id={id} className={`page-section ${page === id ? "active" : ""} ${className}`}>
      {children}
    </section>
  );

  return (
    <>
      {sec(
        "home",
        "flex flex-col items-center pt-32",
        <div className="w-full max-w-4xl mx-auto text-center">
          <div
            className="avatar-trigger animate-float w-36 h-36 mx-auto mb-10 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            onMouseEnter={onAvatarEnter}
            onMouseLeave={onAvatarLeave}
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-5xl text-white">
              <i className="fas fa-feather-alt" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-art mb-5 text-gradient">在下羽升</h1>
          <p className="text-xl md:text-2xl font-light mb-3 tracking-[0.25em] text-gray-200">羽化成蝶 · 升生不息</p>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent my-6 mx-auto" />
          <p className="text-lg md:text-xl text-gray-300 italic font-art max-w-xl mx-auto leading-relaxed mb-12">
            &quot;不问前程，尽管繁荣&quot;
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 text-left">
            <div className="glass-card p-5">
              <h3 className="text-base font-bold mb-4 flex items-center text-pink-300">
                <i className="fab fa-bilibili mr-2 text-lg" /> 视频创作
              </h3>
              <div className="space-y-2">
                <a
                  href="https://space.bilibili.com/3546949376543207"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-pink-500/15 transition-colors group"
                >
                  <div className="flex items-center">
                    <i className="fas fa-video text-gray-400 mr-3 group-hover:text-pink-300 w-5" />
                    <span className="text-sm">羽升日记 (Vlog)</span>
                  </div>
                  <i className="fas fa-external-link-alt text-xs text-gray-500" />
                </a>
                <a
                  href="https://space.bilibili.com/3461563507804968"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-emerald-500/15 transition-colors group"
                >
                  <div className="flex items-center">
                    <i className="fas fa-cube text-gray-400 mr-3 group-hover:text-emerald-300 w-5" />
                    <span className="text-sm">MC 羽升 (Game)</span>
                  </div>
                  <i className="fas fa-external-link-alt text-xs text-gray-500" />
                </a>
              </div>
            </div>

            <div className="glass-card p-5">
              <h3 className="text-base font-bold mb-4 flex items-center" style={{ color: "var(--accent-main)" }}>
                <i className="fas fa-address-card mr-2 text-lg" /> 建立连接
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors">
                  <i className="fab fa-weixin text-green-400 w-4" />
                  <span className="select-all">AIMFlly</span>
                </div>
                <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors">
                  <i className="fab fa-qq text-blue-400 w-4" />
                  <span className="select-all">2158858577</span>
                </div>
                <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors">
                  <span className="font-bold text-red-400 text-[10px] w-4 text-center">书</span>
                  <span className="select-all">AIMFlly</span>
                </div>
                <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors">
                  <i className="fas fa-fish text-orange-400 w-4" />
                  <span className="select-all">羽升羽升</span>
                </div>
                <div className="col-span-2 p-2.5 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors">
                  <i className="fas fa-envelope text-yellow-400 w-4" />
                  <span className="select-all text-[11px]">AIMFlly@outlook.com</span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPage("about")}
            className="glass-card px-8 py-3 hover:bg-white/10 transition-colors text-sm tracking-widest"
            style={{ color: "var(--accent-main)", borderColor: "var(--accent-main)" }}
          >
            <i className="fas fa-chevron-right mr-2" /> 开启旅程
          </button>
        </div>,
      )}

      {sec(
        "about",
        "",
        <>
          <div className="glass-card p-8 md:p-10 relative overflow-hidden mb-8">
            <div
              className="absolute -right-8 -top-8 text-[140px] opacity-[0.03] font-art pointer-events-none select-none"
              style={{ color: "var(--accent-main)" }}
            >
              羽
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-art flex items-center">
                <span className="font-english text-lg mr-2" style={{ color: "var(--accent-main)" }}>
                  01
                </span>{" "}
                羽升 MEself
              </h2>
              <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-english">about</span>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-5">
                <div>
                  <span className="text-xs tracking-widest block mb-1" style={{ color: "var(--accent-main)" }}>
                    COORDINATE
                  </span>
                  <div className="flex items-center space-x-2 text-sm">
                    <i className="fas fa-map-marker-alt text-red-400" />
                    <span>黑龙江 · 哈尔滨</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1.5 text-gray-400 text-xs">
                    <i className="fas fa-university" />
                    <span>华中科技大学 · 基础医学院</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs tracking-widest block mb-1" style={{ color: "var(--accent-main)" }}>
                    HOBBIES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {["剪辑", "摄影", "写作", "编程", "主持", "抽象", "修仙"].map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-white/5 rounded-full text-[11px] border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs tracking-widest block mb-1" style={{ color: "var(--accent-main)" }}>
                    MBTI
                  </span>
                  <div className="text-3xl font-bold text-gradient font-english">ENFP</div>
                  <p className="text-[11px] text-gray-400 mt-0.5">竞选者型人格 · e/i 双模切换</p>
                </div>

                <div>
                  <span className="text-xs tracking-widest block mb-2" style={{ color: "var(--accent-main)" }}>
                    TIMELINE
                  </span>
                  <div className="space-y-2 text-xs" id="timeline-container">
                    {(
                      [
                        { y: "2022", title: "2025 · 序章", body: "正式踏入华中科技大学，初识医学与社团，在忙乱中慢慢找到节奏。" },
                        { y: "2023", title: "2025 · 分岔路", body: "开始认真思考「基因工程」「多组学」「AI」与自己的关系。读书会、活动策划、视频剪辑陆续上线。" },
                        { y: "2024", title: "2025 · 升生不息", body: "把更多想法搬到线上：网站、表单、习惯计划、长期项目。一点点把「世界不死，理想不灭」写成自己的脚注。" },
                      ] as const
                    ).map((row) => (
                      <button
                        type="button"
                        key={row.y}
                        className={`timeline-item glass-card p-3 rounded-lg w-full text-left ${openTimeline === row.y ? "open" : ""}`}
                        data-year={row.y}
                        onClick={() => setOpenTimeline((v) => (v === row.y ? null : row.y))}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{row.title}</span>
                          <i className="fas fa-chevron-down text-gray-400 chevron" />
                        </div>
                        <div className="timeline-body text-gray-300 text-[11px] leading-relaxed">{row.body}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-5 text-gray-300 text-sm leading-relaxed">
                <div>
                  <h4 className="font-bold text-white mb-1.5">何言 e/i？🙃</h4>
                  <p>
                    进行活动时基本上是最外向的，平时跟大家熟了可以很抽象 ₍₍ ง(*Ӧ)ว ⁾⁾，也可以很严肃（｀へ´）。不过面对一些陌生人，尤其是在线下的时候，会突然切换成 i
                    人模式。所以 MBTI 对我来说更像一个「观察自己状态」的小标签，而不是定论。
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1.5">赋予想象 🤔</h4>
                  <p>
                    只要时间足够长，就会忍不住琢磨很多细枝末节的小东西：流程该怎么拆、仪式感怎么设计、这个活动的「彩蛋」藏在哪里。喜欢未雨绸缪，也喜欢通过剪辑和写作，为自己制造一点点可以回头看的纪念。
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1.5">永远完不成的计划？😳</h4>
                  <p>
                    做事容易细到极致，也就很容易低估时间，再加上总被各种事情打断，于是计划表上永远有「未完待续」。但在高压之下，反而能锁定一件事情埋头硬刚，最后靠「临门一脚」完成一些当时觉得不太可能的目标。
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1.5">一点简单的「三观基底」</h4>
                  <p>
                    不太喜欢「万能答案」，更偏向于「一起讨论」。世界在变化，人也在变化，但我希望保留的底色是：尊重、共情，以及对知识和理想还没完全磨掉的那点热情。
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs text-gray-400">
                  <span className="font-medium text-gray-300">未来方向：</span>
                  基因工程、AI + 多组学精准医学，在医学和算法之间找一条适合自己的小径。
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pb-10">
            <button
              type="button"
              onClick={openJourney}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(255,200,100,0.2), rgba(100,150,255,0.2))",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <i className="fas fa-route text-xl" style={{ color: "var(--accent-main)" }} />
              <span className="font-art text-lg tracking-wider">探索人生轨迹</span>
              <i className="fas fa-arrow-right text-sm opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </button>
            <p className="text-xs text-gray-500 mt-3">
              <i className="fas fa-info-circle mr-1" />
              可拖动画布，点击节点查看详情
            </p>
          </div>
        </>,
      )}

      {sec(
        "portal",
        "",
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-art border-l-4 pl-4" style={{ borderColor: "var(--accent-main)" }}>
                星际传送门
              </h2>
              <p className="mt-2 text-xs text-gray-400 max-w-lg">
                把生活拆成几颗小行星：有记笔记的星、有写日记的星、有 MC 方块宇宙，也有开源的星海。
              </p>
            </div>
            <span className="text-[10px] text-gray-500 border border-gray-600 px-2 py-1 rounded font-english tracking-widest uppercase">
              system links
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-16">
            <Link href="/features/notes" className="glass-card p-5 group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-full text-blue-300 group-hover:text-white transition-all" style={{ background: "rgba(59,130,246,0.15)" }}>
                  <i className="fas fa-book-open text-lg" />
                </div>
                <i className="fas fa-external-link-alt text-gray-500 group-hover:text-white text-xs" />
              </div>
              <h3 className="text-lg font-bold mb-1">我的笔记</h3>
              <p className="text-xs text-gray-400 group-hover:text-gray-200">课堂边角、社团灵感与随机奇想，全都落在这一页页注脚里。</p>
            </Link>

            <a href="https://husteread.com/index.php/aimflly-apps/" className="glass-card p-5 group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-full text-purple-300 group-hover:text-white transition-all" style={{ background: "rgba(139,92,246,0.15)" }}>
                  <i className="fas fa-layer-group text-lg" />
                </div>
                <i className="fas fa-external-link-alt text-gray-500 group-hover:text-white text-xs" />
              </div>
              <h3 className="text-lg font-bold mb-1">我的应用</h3>
              <p className="text-xs text-gray-400 group-hover:text-gray-200">小工具、小网页、小脚本，把「想做的事」变成「点一下就能做」。</p>
            </a>

            <Link href="/features/memory" className="glass-card p-5 group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-full text-pink-300 group-hover:text-white transition-all" style={{ background: "rgba(236,72,153,0.15)" }}>
                  <i className="fas fa-hourglass-half text-lg" />
                </div>
                <i className="fas fa-external-link-alt text-gray-500 group-hover:text-white text-xs" />
              </div>
              <h3 className="text-lg font-bold mb-1">一刻记忆</h3>
              <p className="text-xs text-gray-400 group-hover:text-gray-200">把时间折叠成一帧一帧画面，回头看时，会发现自己真的走了很远。</p>
            </Link>

            <a href="https://husteread.com/index.php/aimflly-wave/" className="glass-card p-5 group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-full text-green-300 group-hover:text-white transition-all" style={{ background: "rgba(34,197,94,0.15)" }}>
                  <i className="fas fa-tree text-lg" />
                </div>
                <i className="fas fa-external-link-alt text-gray-500 group-hover:text-white text-xs" />
              </div>
              <h3 className="text-lg font-bold mb-1">致敬树林</h3>
              <p className="text-xs text-gray-400 group-hover:text-gray-200">HUST 的森林，世界不死，理想不灭。每一阵风吹过，都是一次重新出发。</p>
            </a>

            <Link href="/features/share" className="glass-card p-5 group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-full text-yellow-300 group-hover:text-white transition-all" style={{ background: "rgba(234,179,8,0.15)" }}>
                  <i className="fas fa-share-alt text-lg" />
                </div>
                <i className="fas fa-external-link-alt text-gray-500 group-hover:text-white text-xs" />
              </div>
              <h3 className="text-lg font-bold mb-1">开源共享</h3>
              <p className="text-xs text-gray-400 group-hover:text-gray-200">写过的代码、做过的表单、踩过的坑，能帮到一个人，就多一份意义。</p>
            </Link>

            <Link href="/features/revelation" className="glass-card p-5 group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-full text-indigo-300 group-hover:text-white transition-all" style={{ background: "rgba(79,70,229,0.15)" }}>
                  <i className="fas fa-lightbulb text-lg" />
                </div>
                <i className="fas fa-external-link-alt text-gray-500 group-hover:text-white text-xs" />
              </div>
              <h3 className="text-lg font-bold mb-1">人生启示录</h3>
              <p className="text-xs text-gray-400 group-hover:text-gray-200">一些路过的思考，一些当时没懂、后来突然懂了的小结。</p>
            </Link>

            <a href="https://space.bilibili.com/3546949376543207" className="glass-card p-5 group" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-full text-red-300 group-hover:text-white transition-all" style={{ background: "rgba(248,113,113,0.15)" }}>
                  <i className="fab fa-bilibili text-lg" />
                </div>
                <i className="fas fa-external-link-alt text-gray-500 group-hover:text-white text-xs" />
              </div>
              <h3 className="text-lg font-bold mb-1">羽升日记</h3>
              <p className="text-xs text-gray-400 group-hover:text-gray-200">B 站小日常和碎碎念，算是一份公开的「心情备份」。</p>
            </a>

            <a href="https://space.bilibili.com/3461563507804968" className="glass-card p-5 group" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-full text-emerald-300 group-hover:text-white transition-all" style={{ background: "rgba(16,185,129,0.15)" }}>
                  <i className="fas fa-cube text-lg" />
                </div>
                <i className="fas fa-gamepad text-gray-500 group-hover:text-white text-xs" />
              </div>
              <h3 className="text-lg font-bold mb-1">MC 羽升</h3>
              <p className="text-xs text-gray-400 group-hover:text-gray-200">在方块世界里盖理想城，把「世界不死，理想不灭」搭成一条条路。</p>
            </a>

            <a href="#" className="glass-card p-5 group" onClick={(e) => e.preventDefault()}>
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-full text-gray-300 group-hover:text-white transition-all" style={{ background: "rgba(148,163,184,0.15)" }}>
                  <i className="fab fa-github text-lg" />
                </div>
                <i className="fas fa-code-branch text-gray-500 group-hover:text-white text-xs" />
              </div>
              <h3 className="text-lg font-bold mb-1">代码仓库</h3>
              <p className="text-xs text-gray-400 group-hover:text-gray-200">这里会慢慢堆起一些小项目，欢迎以后一起来折腾。</p>
            </a>
          </div>
        </>,
      )}

      {sec(
        "stories",
        "",
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-art border-l-4 pl-4" style={{ borderColor: "var(--accent-sub)" }}>
                众妙之门
              </h2>
              <p className="mt-2 text-xs text-gray-400">
                这里是「兴趣宇宙」的一小角：镜头、文字、舞台，都只是载体，核心是「想把当下好好记录一下」。
              </p>
            </div>
            <span className="text-[10px] text-gray-500 border border-gray-600 px-2 py-1 rounded font-english tracking-widest uppercase">stories</span>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="glass-card p-5 hover:bg-purple-900/10 transition-colors">
              <div className="h-44 rounded-xl bg-gradient-to-b from-gray-700/50 to-gray-900/50 mb-4 overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform duration-500">
                  <i className="fas fa-camera-retro text-5xl" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-2 bg-black/60 text-[11px] text-center">捕捉光影的瞬间</div>
              </div>
              <h3 className="text-lg font-bold mb-2">摄影 plus 剪辑 🎬</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                快门按下去的那一刻，画面只是素材；真正的故事在后期慢慢拼起来。剪辑带给我的快乐，是把「当时没来得及感受的情绪」重新拼回时间里。
              </p>
            </div>

            <div className="glass-card p-5 hover:bg-indigo-900/10 transition-colors">
              <div className="h-44 rounded-xl bg-gradient-to-b from-gray-700/50 to-gray-900/50 mb-4 overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform duration-500">
                  <i className="fas fa-pen-nib text-5xl" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-2 bg-black/60 text-[11px] text-center">修仙之路的宁静</div>
              </div>
              <h3 className="text-lg font-bold mb-2">写作 ◎ 修仙 ✍️</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                相比于「一次性讲明白一个大道理」，我更喜欢写一些很日常、但回头看会微微心软的片段。修仙不一定要刀光剑影，可以是一杯热水、一封写给未来的信。
              </p>
            </div>
          </div>

          <div className="glass-card p-5 mt-5">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div className="p-4 bg-white/10 rounded-full shrink-0">
                <i className="fas fa-microphone-alt text-3xl" style={{ color: "var(--accent-main)" }} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">主持朗诵 📚</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  若论一技之长，大概是主持和朗诵带来的「声音肌肉记忆」。从小舞台到更大的礼堂，每一次站上去，都是在重新学习如何跟观众对话，也在学着把紧张转化成一种温柔的力量。
                </p>
              </div>
            </div>
          </div>
        </>,
      )}

      {sec(
        "insight",
        "",
        <div className="glass-card p-8 md:p-10 relative overflow-hidden border-t-4" style={{ borderColor: "var(--accent-main)" }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-3xl font-art">
              <span className="font-english text-lg mr-2 text-red-400">03</span> 三观临世 🎉
            </h2>
            <span className="text-[10px] text-gray-500 font-english tracking-widest uppercase">worldview</span>
          </div>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              过去几年，我们于书海中遨游，我们在人群中欢呼，我们在世界里承载一份又一份的梦想。有时候会觉得自己只是洪流中的一个小点，但转念一想，每一个小点汇在一起，才真正在改变时代。
            </p>
            <p>
              假期的三天，我们透过屏幕看见远方无尽的戈壁，看见人头攒动、川流不息。我们站在与时代交汇的路口，一侧是用算法和芯片构成的未来，一侧是仍在努力被看见的普通生活。
            </p>
            <blockquote
              className="border-l-4 pl-5 italic text-lg text-white my-6 bg-white/5 p-5 rounded-r-xl"
              style={{ borderColor: "var(--accent-main)" }}
            >
              &quot;尽管繁华，不问前程&quot;
            </blockquote>
            <p>
              我们追溯过往的那一代，仁人志士洒血战场，无数科学家饱经风霜，用这一生的积累换取一栋栋高楼大厦。而我们这一代，站在他们的肩膀上，看得更远，也更应该明白：所谓繁华，不是为了炫耀，而是为了让更多人看见希望的光。
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <h3 className="text-2xl font-cinzel tracking-widest mb-2" style={{ color: "var(--accent-main)" }}>
              LIVE LONG AND PROSPER
            </h3>
            <p className="font-kuaile text-xl text-gray-300">—— 我们是：既寿永昌</p>
          </div>
        </div>,
      )}

      <InteractiveSection active={page === "interactive"} />
      <MusicSection active={page === "music"} />
    </>
  );
}
