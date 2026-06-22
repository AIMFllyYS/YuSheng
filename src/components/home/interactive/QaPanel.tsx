import { SITE_CONFIG } from "@/data/config";

type Props = {
  passed: boolean;
  quiz: { q: string; options: readonly string[]; a: number };
  wrongIdx: number | null;
  correctPick: boolean;
  checkQuiz: (selected: number) => void;
  adminExport: () => void;
  qaInput: string;
  setQaInput: (value: string) => void;
  submitQuestion: () => void;
  qaWall: { content: string; time: string }[];
};

export function QaPanel({ passed, quiz, wrongIdx, correctPick, checkQuiz, adminExport, qaInput, setQaInput, submitQuestion, qaWall }: Props) {
  return (
    <div className="glass-card p-6 lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold flex items-center"><i className="fas fa-envelope-open-text mr-2" style={{ color: "var(--accent-main)" }} /> 匿名问我</h3>
        <button type="button" onClick={adminExport} className="text-[11px] text-gray-500 hover:text-white underline">管理导出</button>
      </div>
      {!passed ? (
        <div id="quiz-step">
          <p className="text-xs text-gray-400 mb-4">为了防止机器人，请先回答关于我的小问题，通过后即可开启匿名提问箱＀</p>
          <div className="bg-white/5 p-4 rounded-xl">
            <p className="font-bold mb-3 text-sm" id="quiz-question">{quiz.q}</p>
            <div className="grid grid-cols-2 gap-2" id="quiz-options">
              {quiz.options.map((opt, idx) => (
                <button type="button" key={opt} className={`quiz-option p-2.5 border border-white/15 rounded-lg text-center text-xs ${wrongIdx === idx ? "wrong" : ""} ${correctPick && idx === quiz.a ? "correct" : ""}`} onClick={() => checkQuiz(idx)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div id="ask-step">
          <div className="flex gap-2 mb-3 overflow-x-auto pb-2" id="truth-tags">
            {SITE_CONFIG.TRUTH_BANK.map((tag) => (
              <button type="button" key={tag} className="whitespace-nowrap px-2.5 py-1 bg-white/5 rounded-full text-[11px] cursor-pointer hover:bg-[color:var(--accent-main)] hover:text-black transition-colors" onClick={() => setQaInput(tag + " " + qaInput)}>
                {tag}
              </button>
            ))}
          </div>
          <textarea id="qa-input" value={qaInput} onChange={(e) => setQaInput(e.target.value)} className="w-full bg-black/30 border border-white/15 rounded-xl p-3 text-sm focus:outline-none focus:border-[color:var(--accent-main)] transition-colors" rows={3} placeholder="写下你的问题或想说的诀.." />
          <div className="flex justify-between items-center mt-3">
            <span className="text-[11px] text-gray-500">数据仅保存在本地存储</span>
            <button type="button" onClick={submitQuestion} className="px-5 py-2 rounded-full font-bold text-sm transition-all hover:scale-105" style={{ background: "var(--accent-main)", color: "#0a0f1a" }}>发退<i className="fas fa-paper-plane ml-1" /></button>
          </div>
          <div className="mt-5 pt-5 border-t border-white/10">
            <h4 className="text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Recent Messages</h4>
            <div id="qa-wall" className="space-y-2 max-h-32 overflow-y-auto pr-2">
              {qaWall.length === 0 ? (
                <div className="text-center text-gray-600 text-xs py-3">暂无留言，快来抢沙发~</div>
              ) : qaWall.slice(0, 5).map((item, i) => (
                <div key={`${item.time}-${i}`} className="bg-white/5 p-2.5 rounded-lg text-xs border-l-2" style={{ borderColor: "var(--accent-main)" }}>
                  <span className="text-[10px] text-gray-500 block">{item.time}</span>{item.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
