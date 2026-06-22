type Fortune = { type: string; text: string } | null;

type Props = {
  pollOps: readonly string[];
  pollVotes: number[];
  onVote: (idx: number) => void;
  totalPoll: number;
  fortuneText: Fortune;
  onDrawFortune: () => void;
  hue1: number;
  hue2: number;
  onUpdateThemeHue: (primary: number | null, secondary: number | null) => void;
  emojiData: Record<string, number>;
  onBumpEmoji: (emoji: string) => void;
};

export function InteractiveSidebar({
  pollOps,
  pollVotes,
  onVote,
  totalPoll,
  fortuneText,
  onDrawFortune,
  hue1,
  hue2,
  onUpdateThemeHue,
  emojiData,
  onBumpEmoji,
}: Props) {
  return (
    <>
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold mb-3 flex items-center"><i className="fas fa-chart-pie mr-2" style={{ color: "var(--accent-sub)" }} /> 偏好小投祀</h3>
        <p className="text-[11px] text-gray-400 mb-4">点击选项即可投票，实时查看大家的选择（本地模拟）</p>
        <div id="poll-container" className="space-y-3">
          {pollOps.map((op, idx) => {
            const count = pollVotes[idx] ?? 0;
            const percent = totalPoll === 0 ? 0 : Math.round((count / totalPoll) * 100);
            return (
              <button type="button" key={op} className="relative h-10 bg-white/5 rounded-lg cursor-pointer overflow-hidden group w-full text-left" onClick={() => onVote(idx)}>
                <div className="absolute top-0 left-0 h-full poll-bar-fill" style={{ width: `${percent}%` }} />
                <div className="absolute inset-0 flex justify-between items-center px-4 z-10 pointer-events-none">
                  <span className="font-medium text-xs group-hover:text-[color:var(--accent-main)] transition-colors">{op}</span>
                  <span className="text-[11px] text-gray-400">{percent}% ({count})</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="glass-card p-5 text-center relative overflow-hidden group flex-1">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <h3 className="text-lg font-bold mb-2">今日运势 · 幸运筀</h3>
          <div id="fortune-display" className="font-art text-xl min-h-[3rem] flex flex-col items-center justify-center my-3 transition-all" style={{ color: "var(--accent-main)" }}>
            {fortuneText ? (<><span className="text-xs block text-gray-400 mb-1">[{fortuneText.type}]</span>{fortuneText.text}</>) : "?"}
          </div>
          <button type="button" onClick={onDrawFortune} className="px-4 py-1.5 border border-white/20 rounded-full text-xs hover:bg-white/10 transition-colors z-10 relative"><i className="fas fa-random mr-1" /> 抽取签文</button>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-bold mb-3 text-gray-400 uppercase tracking-wider">Theme Settings</h3>
          <div className="space-y-4">
            <div><div className="flex justify-between text-[11px] mb-1"><span>Primary Hue</span><span id="hue-val-1">{hue1}</span></div><input type="range" min={0} max={360} value={hue1} onChange={(e) => onUpdateThemeHue(Number(e.target.value), null)} className="w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-lg appearance-none cursor-pointer" /></div>
            <div><div className="flex justify-between text-[11px] mb-1"><span>Secondary Hue</span><span id="hue-val-2">{hue2}</span></div><input type="range" min={0} max={360} value={hue2} onChange={(e) => onUpdateThemeHue(null, Number(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-lg appearance-none cursor-pointer" /></div>
          </div>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-bold mb-3 text-gray-400 uppercase tracking-wider">Tiny Reactions</h3>
          <div className="flex flex-wrap gap-2" id="emoji-container">
            {(["👍", "✀, "🌲", "📷"] as const).map((emoji) => (
              <button type="button" key={emoji} className="emoji-btn px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 flex items-center gap-2 text-sm" onClick={() => onBumpEmoji(emoji)}>
                <span>{emoji}</span>
                <span className="emoji-count text-[11px] text-gray-400">{emojiData[emoji] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
