export function InsightSection() {
  return (
    <div className="glass-card p-8 md:p-10 relative overflow-hidden border-t-4" style={{ borderColor: "var(--accent-main)" }}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-3xl font-art"><span className="font-english text-lg mr-2 text-red-400">03</span> 三观临世 🎉</h2>
        <span className="text-[10px] text-gray-500 font-english tracking-widest uppercase">worldview</span>
      </div>
      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>过去几年，我们于书海中遨游，我们在人群中欢呼，我们在世界里承载一份又一份的梦想。有时候会觉得自己只是洪流中的一个小点，但转念一想，每一个小点汇在一起，才真正在改变时代。</p>
        <p>假期的三天，我们透过屏幕看见远方无尽的戈壁，看见人头攒动、川流不息。我们站在与时代交汇的路口，一侧是用算法和芯片构成的未来，一侧是仍在努力被看见的普通生活。</p>
        <blockquote className="border-l-4 pl-5 italic text-lg text-white my-6 bg-white/5 p-5 rounded-r-xl" style={{ borderColor: "var(--accent-main)" }}>&quot;尽管繁华，不问前程&quot;</blockquote>
        <p>我们追溯过往的那一代，仁人志士洒血战场，无数科学家饱经风霜，用这一生的积累换取一栋栋高楼大厦。而我们这一代，站在他们的肩膀上，看得更远，也更应该明白：所谓繁华，不是为了炫耀，而是为了让更多人看见希望的光。</p>
      </div>
      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <h3 className="text-2xl font-cinzel tracking-widest mb-2" style={{ color: "var(--accent-main)" }}>LIVE LONG AND PROSPER</h3>
        <p className="font-kuaile text-xl text-gray-300">—— 我们是：既寿永昌</p>
      </div>
    </div>
  );
}
