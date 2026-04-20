"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import { SITE_CONFIG } from "@/data/config";

const QA_KEY = "aimflly_qa_data";
const POLL_KEY = "aimflly_poll_data";
const EMOJI_KEY = "aimflly_emoji_data";

export function InteractiveSection({ active }: { active: boolean }) {
  const [quizIndex, setQuizIndex] = useState(0);
  const [passed, setPassed] = useState(false);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [correctPick, setCorrectPick] = useState(false);
  const [qaInput, setQaInput] = useState("");
  const [qaWall, setQaWall] = useState<{ content: string; time: string }[]>([]);
  const [pollVotes, setPollVotes] = useState<number[]>(() => SITE_CONFIG.POLL_OPS.map(() => 0));
  const [fortuneText, setFortuneText] = useState<{ type: string; text: string } | null>(null);
  const [hue1, setHue1] = useState(45);
  const [hue2, setHue2] = useState(210);
  const [emojiData, setEmojiData] = useState<Record<string, number>>({});

  const quiz = SITE_CONFIG.QUIZ_BANK[quizIndex]!;

  const loadQa = useCallback(() => {
    try {
      const raw = localStorage.getItem(QA_KEY);
      setQaWall(raw ? (JSON.parse(raw) as { content: string; time: string }[]) : []);
    } catch {
      setQaWall([]);
    }
  }, []);

  useEffect(() => {
    startTransition(() => {
      loadQa();
      try {
        setEmojiData(JSON.parse(localStorage.getItem(EMOJI_KEY) || "{}"));
      } catch {
        setEmojiData({});
      }
      try {
        const raw = localStorage.getItem(POLL_KEY);
        if (raw) setPollVotes(JSON.parse(raw) as number[]);
      } catch {
        /* ignore */
      }
      setQuizIndex(Math.floor(Math.random() * SITE_CONFIG.QUIZ_BANK.length));
    });
  }, [loadQa]);

  const submitQuestion = () => {
    const val = qaInput.trim();
    if (!val) {
      window.alert("内容不能为空哦~");
      return;
    }
    const data = [{ content: val, time: new Date().toLocaleString() }, ...qaWall];
    localStorage.setItem(QA_KEY, JSON.stringify(data));
    setQaInput("");
    window.alert("发送成功！(已保存到本地)");
    loadQa();
  };

  const adminExport = () => {
    const pin = window.prompt("请输入管理口令:");
    if (pin === SITE_CONFIG.ADMIN_PIN) {
      const data = localStorage.getItem(QA_KEY) || "[]";
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "aimflly_qa_export.json";
      a.click();
      URL.revokeObjectURL(url);
    } else if (pin) {
      window.alert("口令错误！");
    }
  };

  const votePoll = (idx: number) => {
    const next = [...pollVotes];
    next[idx] = (next[idx] ?? 0) + 1;
    setPollVotes(next);
    localStorage.setItem(POLL_KEY, JSON.stringify(next));
  };

  const drawFortune = () => {
    setFortuneText(null);
    setTimeout(() => {
      const item = SITE_CONFIG.FORTUNE_BANK[Math.floor(Math.random() * SITE_CONFIG.FORTUNE_BANK.length)]!;
      setFortuneText(item);
    }, 200);
  };

  const updateThemeHue = (primary: number | null, secondary: number | null) => {
    const root = document.documentElement;
    if (primary !== null) {
      root.style.setProperty("--h-main", String(primary));
      root.style.setProperty("--accent-main", `hsl(${primary}, 85%, 65%)`);
      setHue1(primary);
    }
    if (secondary !== null) {
      root.style.setProperty("--h-sub", String(secondary));
      root.style.setProperty("--accent-sub", `hsl(${secondary}, 85%, 65%)`);
      setHue2(secondary);
    }
  };

  const bumpEmoji = (emoji: string) => {
    const next = { ...emojiData, [emoji]: (emojiData[emoji] ?? 0) + 1 };
    setEmojiData(next);
    localStorage.setItem(EMOJI_KEY, JSON.stringify(next));
  };

  const checkQuiz = (selected: number) => {
    if (selected === quiz.a) {
      setCorrectPick(true);
      setTimeout(() => {
        setPassed(true);
        setCorrectPick(false);
      }, 500);
    } else {
      setWrongIdx(selected);
      setTimeout(() => setWrongIdx(null), 500);
    }
  };

  const totalPoll = pollVotes.reduce((a, b) => a + b, 0);

  return (
    <section id="interactive" className={`page-section pb-20 ${active ? "active" : ""}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-art text-gradient">灵犀一动 · 交互空间</h2>
        <span className="text-[10px] text-gray-500 font-english tracking-widest uppercase">playground</span>
      </div>

      <a
        href="https://husteread.com/index.php/birthday/"
        target="_blank"
        rel="noopener noreferrer"
        className="block mb-6 group select-none"
      >
        <div className="glass-card relative overflow-hidden rounded-2xl px-5 py-4 md:px-7 md:py-5 flex items-center justify-between border border-amber-300/60 bg-gradient-to-r from-amber-400/25 via-pink-400/18 to-sky-400/20 transition-all duration-500 group-hover:translate-y-[-2px] group-hover:shadow-xl group-hover:shadow-amber-400/40">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/20 flex items-center justify-center shadow-inner">
              <i className="fas fa-birthday-cake text-lg md:text-xl text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-bold tracking-wide">友友们的庆生宴</span>
              <span className="text-[11px] md:text-xs text-gray-200/80">记录每一次「被记得」的生日小小仪式感 🎈</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] md:text-xs text-amber-100">
            <span>点我前往庆生活动页</span>
            <i className="fas fa-arrow-right-long text-xs md:text-sm group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="sm:hidden flex items-center justify-center ml-3 text-amber-100">
            <i className="fas fa-chevron-right text-sm" />
          </div>
          <div className="pointer-events-none absolute -right-10 -top-10 w-32 h-32 rounded-full bg-amber-300/25 blur-3xl opacity-70" />
          <div className="pointer-events-none absolute left-1/3 -bottom-10 w-40 h-40 rounded-full bg-pink-400/20 blur-3xl opacity-60" />
        </div>
      </a>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold flex items-center">
              <i className="fas fa-envelope-open-text mr-2" style={{ color: "var(--accent-main)" }} /> 匿名问我
            </h3>
            <button type="button" onClick={adminExport} className="text-[11px] text-gray-500 hover:text-white underline">
              管理导出
            </button>
          </div>

          {!passed ? (
            <div id="quiz-step">
              <p className="text-xs text-gray-400 mb-4">为了防止机器人，请先回答关于我的小问题，通过后即可开启匿名提问箱！</p>
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="font-bold mb-3 text-sm" id="quiz-question">
                  {quiz.q}
                </p>
                <div className="grid grid-cols-2 gap-2" id="quiz-options">
                  {quiz.options.map((opt, idx) => (
                    <button
                      type="button"
                      key={opt}
                      className={`quiz-option p-2.5 border border-white/15 rounded-lg text-center text-xs ${
                        wrongIdx === idx ? "wrong" : ""
                      } ${correctPick && idx === quiz.a ? "correct" : ""}`}
                      onClick={() => checkQuiz(idx)}
                    >
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
                  <button
                    type="button"
                    key={tag}
                    className="whitespace-nowrap px-2.5 py-1 bg-white/5 rounded-full text-[11px] cursor-pointer hover:bg-[color:var(--accent-main)] hover:text-black transition-colors"
                    onClick={() => setQaInput((v) => tag + " " + v)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <textarea
                id="qa-input"
                value={qaInput}
                onChange={(e) => setQaInput(e.target.value)}
                className="w-full bg-black/30 border border-white/15 rounded-xl p-3 text-sm focus:outline-none focus:border-[color:var(--accent-main)] transition-colors"
                rows={3}
                placeholder="写下你的问题或想说的话..."
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-[11px] text-gray-500">数据仅保存在本地存储</span>
                <button
                  type="button"
                  onClick={submitQuestion}
                  className="px-5 py-2 rounded-full font-bold text-sm transition-all hover:scale-105"
                  style={{ background: "var(--accent-main)", color: "#0a0f1a" }}
                >
                  发送 <i className="fas fa-paper-plane ml-1" />
                </button>
              </div>
              <div className="mt-5 pt-5 border-t border-white/10">
                <h4 className="text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Recent Messages</h4>
                <div id="qa-wall" className="space-y-2 max-h-32 overflow-y-auto pr-2">
                  {qaWall.length === 0 ? (
                    <div className="text-center text-gray-600 text-xs py-3">暂无留言，快来抢沙发~</div>
                  ) : (
                    qaWall.slice(0, 5).map((item, i) => (
                      <div
                        key={`${item.time}-${i}`}
                        className="bg-white/5 p-2.5 rounded-lg text-xs border-l-2"
                        style={{ borderColor: "var(--accent-main)" }}
                      >
                        <span className="text-[10px] text-gray-500 block">{item.time}</span>
                        {item.content}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-3 flex items-center">
            <i className="fas fa-chart-pie mr-2" style={{ color: "var(--accent-sub)" }} /> 偏好小投票
          </h3>
          <p className="text-[11px] text-gray-400 mb-4">点击选项即可投票，实时查看大家的选择（本地模拟）</p>
          <div id="poll-container" className="space-y-3">
            {SITE_CONFIG.POLL_OPS.map((op, idx) => {
              const count = pollVotes[idx] ?? 0;
              const percent = totalPoll === 0 ? 0 : Math.round((count / totalPoll) * 100);
              return (
                <button
                  type="button"
                  key={op}
                  className="relative h-10 bg-white/5 rounded-lg cursor-pointer overflow-hidden group w-full text-left"
                  onClick={() => votePoll(idx)}
                >
                  <div className="absolute top-0 left-0 h-full poll-bar-fill" style={{ width: `${percent}%` }} />
                  <div className="absolute inset-0 flex justify-between items-center px-4 z-10 pointer-events-none">
                    <span className="font-medium text-xs group-hover:text-[color:var(--accent-main)] transition-colors">{op}</span>
                    <span className="text-[11px] text-gray-400">
                      {percent}% ({count})
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="glass-card p-5 text-center relative overflow-hidden group flex-1">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <h3 className="text-lg font-bold mb-2">今日运势 · 幸运签</h3>
            <div
              id="fortune-display"
              className="font-art text-xl min-h-[3rem] flex flex-col items-center justify-center my-3 transition-all"
              style={{ color: "var(--accent-main)" }}
            >
              {fortuneText ? (
                <>
                  <span className="text-xs block text-gray-400 mb-1">[{fortuneText.type}]</span>
                  {fortuneText.text}
                </>
              ) : (
                "?"
              )}
            </div>
            <button
              type="button"
              onClick={drawFortune}
              className="px-4 py-1.5 border border-white/20 rounded-full text-xs hover:bg-white/10 transition-colors z-10 relative"
            >
              <i className="fas fa-random mr-1" /> 抽取签文
            </button>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-bold mb-3 text-gray-400 uppercase tracking-wider">Theme Settings</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Primary Hue</span>
                  <span id="hue-val-1">{hue1}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={hue1}
                  onChange={(e) => updateThemeHue(Number(e.target.value), null)}
                  className="w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Secondary Hue</span>
                  <span id="hue-val-2">{hue2}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={hue2}
                  onChange={(e) => updateThemeHue(null, Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-bold mb-3 text-gray-400 uppercase tracking-wider">Tiny Reactions</h3>
            <div className="flex flex-wrap gap-2" id="emoji-container">
              {(["👍", "✨", "🌲", "📷"] as const).map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  className="emoji-btn px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 flex items-center gap-2 text-sm"
                  onClick={() => bumpEmoji(emoji)}
                >
                  <span>{emoji}</span>
                  <span className="emoji-count text-[11px] text-gray-400">{emojiData[emoji] ?? 0}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
