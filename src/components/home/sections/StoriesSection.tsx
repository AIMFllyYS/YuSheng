export function StoriesSection() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-art border-l-4 pl-4" style={{ borderColor: "var(--accent-sub)" }}>众妙之门</h2>
          <p className="mt-2 text-xs text-gray-400">这里是「兴趣宇宙」的一小角：镜头、文字、舞台，都只是载体，核心是「想把当下好好记录一下」　</p>
        </div>
        <span className="text-[10px] text-gray-500 border border-gray-600 px-2 py-1 rounded font-english tracking-widest uppercase">stories</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <StoryCard icon="fas fa-camera-retro text-5xl" caption="捕捉光影的瞬闀 title="摄影 plus 剪辑 🎬" body="快门按下去的那一刻，画面只是素材；真正的故事在后期慢慢拼起来。剪辑带给我的快乐，是把「当时没来得及感受的情绪」重新拼回时间里　 />
        <StoryCard icon="fas fa-pen-nib text-5xl" caption="修仙之路的宁靀 title="写作 ◀修仙 ✍️" body="相比于「一次性讲明白一个大道理」，我更喜欢写一些很日常、但回头看会微微心软的片段。修仙不一定要刀光剑影，可以是一杯热水、一封写给未来的信　 />
      </div>
      <div className="glass-card p-5 mt-5">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="p-4 bg-white/10 rounded-full shrink-0"><i className="fas fa-microphone-alt text-3xl" style={{ color: "var(--accent-main)" }} /></div>
          <div>
            <h3 className="text-lg font-bold mb-2">主持朗诵 📚</h3>
            <p className="text-sm text-gray-300 leading-relaxed">若论一技之长，大概是主持和朗诵带来的「声音肌肉记忆」。从小舞台到更大的礼堂，每一次站上去，都是在重新学习如何跟观众对话，也在学着把紧张转化成一种温柔的力量　</p>
          </div>
        </div>
      </div>
    </>
  );
}

function StoryCard({ icon, caption, title, body }: { icon: string; caption: string; title: string; body: string }) {
  return (
    <div className="glass-card p-5 hover:bg-purple-900/10 transition-colors">
      <div className="h-44 rounded-xl bg-gradient-to-b from-gray-700/50 to-gray-900/50 mb-4 overflow-hidden relative group">
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform duration-500"><i className={icon} /></div>
        <div className="absolute bottom-0 left-0 w-full p-2 bg-black/60 text-[11px] text-center">{caption}</div>
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed">{body}</p>
    </div>
  );
}
