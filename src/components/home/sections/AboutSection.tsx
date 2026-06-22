import { useState } from "react";

export function AboutSection({ openJourney }: { openJourney: () => void }) {
  const [openTimeline, setOpenTimeline] = useState<string | null>(null);
  const timeline = [
    { y: "2022", title: "2025 · 序章", body: "正式踏入华中科技大学，初识医学与社团，在忙乱中慢慢找到节奏。" },
    { y: "2023", title: "2025 · 分岔路", body: "开始认真思考「基因工程」「多组学」「AI」与自己的关系。读书会、活动策划、视频剪辑陆续上线。" },
    { y: "2024", title: "2025 · 升生不息", body: "把更多想法搬到线上：网站、表单、习惯计划、长期项目。一点点把「世界不死，理想不灭」写成自己的脚注。" },
  ] as const;
  return (
    <>
      <div className="glass-card p-8 md:p-10 relative overflow-hidden mb-8">
        <div className="absolute -right-8 -top-8 text-[140px] opacity-[0.03] font-art pointer-events-none select-none" style={{ color: "var(--accent-main)" }}>羽</div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-art flex items-center"><span className="font-english text-lg mr-2" style={{ color: "var(--accent-main)" }}>01</span> 羽升 MEself</h2>
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-english">about</span>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-5">
            <div>
              <span className="text-xs tracking-widest block mb-1" style={{ color: "var(--accent-main)" }}>COORDINATE</span>
              <div className="flex items-center space-x-2 text-sm"><i className="fas fa-map-marker-alt text-red-400" /><span>黑龙江 · 哈尔滨</span></div>
              <div className="flex items-center space-x-2 mt-1.5 text-gray-400 text-xs"><i className="fas fa-university" /><span>华中科技大学 · 基础医学院</span></div>
            </div>
            <div>
              <span className="text-xs tracking-widest block mb-1" style={{ color: "var(--accent-main)" }}>HOBBIES</span>
              <div className="flex flex-wrap gap-1.5">{["剪辑", "摄影", "写作", "编程", "主持", "抽象", "修仙"].map((t) => <span key={t} className="px-2.5 py-1 bg-white/5 rounded-full text-[11px] border border-white/10">{t}</span>)}</div>
            </div>
            <div>
              <span className="text-xs tracking-widest block mb-1" style={{ color: "var(--accent-main)" }}>MBTI</span>
              <div className="text-3xl font-bold text-gradient font-english">ENFP</div>
              <p className="text-[11px] text-gray-400 mt-0.5">竞选者型人格 · e/i 双模切换</p>
            </div>
            <div>
              <span className="text-xs tracking-widest block mb-2" style={{ color: "var(--accent-main)" }}>TIMELINE</span>
              <div className="space-y-2 text-xs" id="timeline-container">
                {timeline.map((row) => (
                  <button type="button" key={row.y} className={`timeline-item glass-card p-3 rounded-lg w-full text-left ${openTimeline === row.y ? "open" : ""}`} data-year={row.y} onClick={() => setOpenTimeline((v) => (v === row.y ? null : row.y))}>
                    <div className="flex justify-between items-center"><span className="font-medium">{row.title}</span><i className="fas fa-chevron-down text-gray-400 chevron" /></div>
                    <div className="timeline-body text-gray-300 text-[11px] leading-relaxed">{row.body}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-2 space-y-5 text-gray-300 text-sm leading-relaxed">
            <div><h4 className="font-bold text-white mb-1.5">何言 e/i？🙃</h4><p>进行活动时基本上是最外向的，平时跟大家熟了可以很抽象 ₍₍ ง(*Ӧ)ว ⁾⁾，也可以很严肃（｀へ´）。不过面对一些陌生人，尤其是在线下的时候，会突然切换成 i 人模式。所以 MBTI 对我来说更像一个「观察自己状态」的小标签，而不是定论。</p></div>
            <div><h4 className="font-bold text-white mb-1.5">赋予想象 🤔</h4><p>只要时间足够长，就会忍不住琢磨很多细枝末节的小东西：流程该怎么拆、仪式感怎么设计、这个活动的「彩蛋」藏在哪里。喜欢未雨绸缪，也喜欢通过剪辑和写作，为自己制造一点点可以回头看的纪念。</p></div>
            <div><h4 className="font-bold text-white mb-1.5">永远完不成的计划？😳</h4><p>做事容易细到极致，也就很容易低估时间，再加上总被各种事情打断，于是计划表上永远有「未完待续」。但在高压之下，反而能锁定一件事情埋头硬刚，最后靠「临门一脚」完成一些当时觉得不太可能的目标。</p></div>
            <div><h4 className="font-bold text-white mb-1.5">一点简单的「三观基底」</h4><p>不太喜欢「万能答案」，更偏向于「一起讨论」。世界在变化，人也在变化，但我希望保留的底色是：尊重、共情，以及对知识和理想还没完全磨掉的那点热情。</p></div>
            <div className="pt-4 border-t border-white/10 text-xs text-gray-400"><span className="font-medium text-gray-300">未来方向：</span>基因工程、AI + 多组学精准医学，在医学和算法之间找一条适合自己的小径。</div>
          </div>
        </div>
      </div>
      <div className="text-center pb-10">
        <button type="button" onClick={openJourney} className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden transition-all duration-500 hover:scale-105" style={{ background: "linear-gradient(135deg, rgba(255,200,100,0.2), rgba(100,150,255,0.2))", border: "1px solid rgba(255,255,255,0.2)" }}>
          <span className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <i className="fas fa-route text-xl" style={{ color: "var(--accent-main)" }} />
          <span className="font-art text-lg tracking-wider">探索人生轨迹</span>
          <i className="fas fa-arrow-right text-sm opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
        </button>
        <p className="text-xs text-gray-500 mt-3"><i className="fas fa-info-circle mr-1" /> 可拖动画布，点击节点查看详情</p>
      </div>
    </>
  );
}
