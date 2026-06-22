"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import { QaPanel } from "@/components/home/interactive/QaPanel";
import { InteractiveSidebar } from "@/components/home/interactive/InteractiveSidebar";
import { SITE_CONFIG } from "@/data/config";
import { useLocalStorageJson } from "@/hooks/useLocalStorageJson";

const QA_KEY = "aimflly_qa_data";
const POLL_KEY = "aimflly_poll_data";
const EMOJI_KEY = "aimflly_emoji_data";

export function InteractiveSection({ active }: { active: boolean }) {
  const { readJson, writeJson } = useLocalStorageJson();
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
  const loadQa = useCallback(() => setQaWall(readJson(QA_KEY, [] as { content: string; time: string }[])), [readJson]);

  useEffect(() => {
    if (!active) return;
    startTransition(() => {
      loadQa();
      setEmojiData(readJson(EMOJI_KEY, {} as Record<string, number>));
      setPollVotes(readJson(POLL_KEY, SITE_CONFIG.POLL_OPS.map(() => 0)));
      setQuizIndex(Math.floor(Math.random() * SITE_CONFIG.QUIZ_BANK.length));
    });
  }, [active, loadQa, readJson]);

  const submitQuestion = () => {
    const val = qaInput.trim();
    if (!val) return window.alert("内容不能为空哦~");
    const data = [{ content: val, time: new Date().toLocaleString() }, ...qaWall];
    writeJson(QA_KEY, data);
    setQaInput("");
    window.alert("发送成功！(已保存到本地)");
    loadQa();
  };

  const adminExport = () => {
    const pin = window.prompt("请输入管理口令:");
    if (pin !== SITE_CONFIG.ADMIN_PIN) return pin ? window.alert("口令错误！") : undefined;
    const blob = new Blob([localStorage.getItem(QA_KEY) || "[]"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aimflly_qa_export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const votePoll = (idx: number) => {
    const next = [...pollVotes];
    next[idx] = (next[idx] ?? 0) + 1;
    setPollVotes(next);
    writeJson(POLL_KEY, next);
  };

  const drawFortune = () => {
    setFortuneText(null);
    setTimeout(() => setFortuneText(SITE_CONFIG.FORTUNE_BANK[Math.floor(Math.random() * SITE_CONFIG.FORTUNE_BANK.length)]!), 200);
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
    writeJson(EMOJI_KEY, next);
  };

  const checkQuiz = (selected: number) => {
    if (selected === quiz.a) {
      setCorrectPick(true);
      return setTimeout(() => { setPassed(true); setCorrectPick(false); }, 500);
    }
    setWrongIdx(selected);
    setTimeout(() => setWrongIdx(null), 500);
  };

  const totalPoll = pollVotes.reduce((a, b) => a + b, 0);

  return (
    <section id="interactive" className={`page-section pb-20 ${active ? "active" : ""}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-art text-gradient">灵犀一动 · 交互空间</h2>
        <span className="text-[10px] text-gray-500 font-english tracking-widest uppercase">playground</span>
      </div>
      <a href="https://husteread.com/index.php/birthday/" target="_blank" rel="noopener noreferrer" className="block mb-6 group select-none">
        <div className="glass-card relative overflow-hidden rounded-2xl px-5 py-4 md:px-7 md:py-5 flex items-center justify-between border border-amber-300/60 bg-gradient-to-r from-amber-400/25 via-pink-400/18 to-sky-400/20 transition-all duration-500 group-hover:translate-y-[-2px] group-hover:shadow-xl group-hover:shadow-amber-400/40">
          <div className="flex items-center gap-3 md:gap-4"><div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/20 flex items-center justify-center shadow-inner"><i className="fas fa-birthday-cake text-lg md:text-xl text-amber-300" /></div><div className="flex flex-col"><span className="text-sm md:text-base font-bold tracking-wide">友友们的庆生宴</span><span className="text-[11px] md:text-xs text-gray-200/80">记录每一次「被记得」的生日小小仪式感 🎈</span></div></div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] md:text-xs text-amber-100"><span>点我前往庆生活动页</span><i className="fas fa-arrow-right-long text-xs md:text-sm group-hover:translate-x-0.5 transition-transform" /></div>
          <div className="sm:hidden flex items-center justify-center ml-3 text-amber-100"><i className="fas fa-chevron-right text-sm" /></div>
          <div className="pointer-events-none absolute -right-10 -top-10 w-32 h-32 rounded-full bg-amber-300/25 blur-3xl opacity-70" />
          <div className="pointer-events-none absolute left-1/3 -bottom-10 w-40 h-40 rounded-full bg-pink-400/20 blur-3xl opacity-60" />
        </div>
      </a>
      <div className="grid lg:grid-cols-2 gap-6">
        <QaPanel
          passed={passed}
          quiz={quiz}
          wrongIdx={wrongIdx}
          correctPick={correctPick}
          checkQuiz={checkQuiz}
          adminExport={adminExport}
          qaInput={qaInput}
          setQaInput={setQaInput}
          submitQuestion={submitQuestion}
          qaWall={qaWall}
        />
        <InteractiveSidebar
          pollOps={SITE_CONFIG.POLL_OPS}
          pollVotes={pollVotes}
          onVote={votePoll}
          totalPoll={totalPoll}
          fortuneText={fortuneText}
          onDrawFortune={drawFortune}
          hue1={hue1}
          hue2={hue2}
          onUpdateThemeHue={updateThemeHue}
          emojiData={emojiData}
          onBumpEmoji={bumpEmoji}
        />
      </div>
    </section>
  );
}
