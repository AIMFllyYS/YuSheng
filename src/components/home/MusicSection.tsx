"use client";

import { startTransition, useCallback, useEffect, useState } from "react";

const MUSIC_KEY = "aimflly_playlist_v1";

const MUSIC_CATEGORIES = [
  { key: "pure", label: "纯音" },
  { key: "english", label: "英文" },
  { key: "favorite", label: "最爱" },
  { key: "insight", label: "顿悟" },
  { key: "other", label: "其他" },
] as const;

type Song = { name: string; url: string };
type MusicData = Record<(typeof MUSIC_CATEGORIES)[number]["key"], Song[]>;

const emptyData = (): MusicData => ({
  pure: [],
  english: [],
  favorite: [],
  insight: [],
  other: [],
});

export function MusicSection({ active }: { active: boolean }) {
  const [musicData, setMusicData] = useState<MusicData>(emptyData);
  const [nowPlaying, setNowPlaying] = useState("暂无播放 · 点击某一首歌尝试播放");

  const loadMusicData = useCallback(() => {
    try {
      const raw = localStorage.getItem(MUSIC_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<MusicData>;
        const next = emptyData();
        MUSIC_CATEGORIES.forEach((cat) => {
          next[cat.key] = parsed[cat.key] ?? [];
        });
        setMusicData(next);
      }
    } catch {
      console.warn("音乐数据解析失败，将使用空歌单");
    }
  }, []);

  useEffect(() => {
    startTransition(() => {
      loadMusicData();
    });
  }, [loadMusicData]);

  const saveMusicData = (data: MusicData) => {
    localStorage.setItem(MUSIC_KEY, JSON.stringify(data));
    setMusicData(data);
  };

  const addSong = (catKey: (typeof MUSIC_CATEGORIES)[number]["key"], name: string, url: string) => {
    if (!name.trim()) {
      window.alert("歌名不能为空呀～");
      return;
    }
    const next = { ...musicData, [catKey]: [...musicData[catKey], { name: name.trim(), url: url.trim() }] };
    saveMusicData(next);
  };

  const playSong = (catKey: (typeof MUSIC_CATEGORIES)[number]["key"], index: number) => {
    const song = musicData[catKey][index];
    if (!song) return;
    if (!song.url) {
      window.alert('这首歌还没有绑定音频链接，暂时只能当作「记忆清单」哦～');
      return;
    }
    const audio = document.getElementById("music-audio") as HTMLAudioElement | null;
    if (!audio) return;
    audio.src = song.url;
    audio.play().catch((err) => {
      console.warn("播放失败", err);
      window.alert("浏览器拒绝自动播放，或者链接不可用，请检查音频地址。");
    });
    setNowPlaying(song.name);
  };

  const deleteSong = (catKey: (typeof MUSIC_CATEGORIES)[number]["key"], index: number) => {
    if (!window.confirm("确定要删除这首歌吗？")) return;
    const arr = [...musicData[catKey]];
    arr.splice(index, 1);
    saveMusicData({ ...musicData, [catKey]: arr });
  };

  return (
    <section id="music" className={`page-section pb-20 ${active ? "active" : ""}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-art text-gradient flex items-center">
            <i className="fas fa-music mr-3" /> 羽升的歌单
          </h2>
          <p className="mt-2 text-xs text-gray-400 max-w-lg">
            这里是「随缘更新」的私人歌单，所有内容只保存在浏览器本地，你可以随时增删自己的歌名和链接。
          </p>
        </div>
        <span className="text-[10px] text-gray-500 border border-gray-600 px-2 py-1 rounded font-english tracking-widest uppercase">
          playlist
        </span>
      </div>

      <div className="glass-card p-5 mb-6 grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-bold mb-2 text-gray-200">最爱的音乐人 · ONLY ONE</h3>
          <div className="px-4 py-3 rounded-xl bg-white/5 border border-amber-400/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-pink-400 flex items-center justify-center text-black text-lg">
                🎵
              </div>
              <div>
                <div className="text-sm font-semibold">祝一可</div>
                <div className="text-[11px] text-gray-300">「唯一本命」 · 写在这里当签名</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold mb-2 text-gray-200">其他爱慕的音乐人</h3>
          <div className="px-4 py-3 rounded-xl bg-white/5 border border-blue-400/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-black text-lg">
                💿
              </div>
              <div>
                <div className="text-sm font-semibold">hanser</div>
                <div className="text-[11px] text-gray-300">温柔收藏夹里的常驻嘉宾</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="music-list" className="grid md:grid-cols-2 gap-5 mb-8">
        {MUSIC_CATEGORIES.map((cat) => (
          <div key={cat.key} className="glass-card p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-100">{cat.label}</h3>
              <span className="text-[11px] text-gray-500">{musicData[cat.key].length} 首</span>
            </div>
            <div className="space-y-2 mb-3">
              <input
                name="song-name"
                type="text"
                className="w-full bg-black/20 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[color:var(--accent-main)]"
                placeholder="歌名 / 备注（必填）"
                id={`song-name-${cat.key}`}
              />
              <input
                name="song-url"
                type="text"
                className="w-full bg-black/10 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[color:var(--accent-main)]"
                placeholder="可选：音频链接（mp3 / 直链）"
                id={`song-url-${cat.key}`}
              />
              <button
                type="button"
                className="w-full mt-1 text-xs px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                onClick={() => {
                  const nameEl = document.getElementById(`song-name-${cat.key}`) as HTMLInputElement;
                  const urlEl = document.getElementById(`song-url-${cat.key}`) as HTMLInputElement;
                  addSong(cat.key, nameEl.value, urlEl.value);
                  nameEl.value = "";
                  urlEl.value = "";
                }}
              >
                + 添加到「{cat.label}」
              </button>
            </div>
            <div className="music-song-list flex-1 overflow-y-auto pr-1 space-y-1 text-xs max-h-48">
              {musicData[cat.key].map((song, idx) => (
                <div key={`${song.name}-${idx}`} className="flex items-center justify-between px-2 py-1 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex-1 pr-2">
                    <div className="text-gray-100 truncate">{song.name}</div>
                    <div className="text-[10px] text-gray-500 truncate">
                      {song.url ? "已绑定音频链接" : "未绑定音频链接"}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="w-7 h-7 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 flex items-center justify-center text-[10px]"
                      onClick={() => playSong(cat.key, idx)}
                    >
                      <i className="fas fa-play" />
                    </button>
                    <button
                      type="button"
                      className="w-7 h-7 rounded-full bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center text-[10px]"
                      onClick={() => deleteSong(cat.key, idx)}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-xs text-gray-400">
          <div className="font-bold text-gray-200 mb-1">Now Playing</div>
          <div id="now-playing" className="text-sm text-gray-300">
            {nowPlaying}
          </div>
          <div className="mt-1 text-[11px] text-gray-500">
            提示：你可以在添加歌曲时填入 mp3 链接（公网可访问），本页面不会内置任何真实歌曲，只是提供一个播放壳子。
          </div>
        </div>
        <audio id="music-audio" controls className="w-full md:w-1/2">
          您的浏览器不支持 audio 标签。
        </audio>
      </div>
    </section>
  );
}
