import type { PageId } from "./types";

type Props = {
  setPage: (p: PageId) => void;
  onAvatarEnter: () => void;
  onAvatarLeave: () => void;
};

export function HomeHeroSection({ setPage, onAvatarEnter, onAvatarLeave }: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <div
        className="avatar-trigger animate-float w-36 h-36 mx-auto mb-10 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
        onMouseEnter={onAvatarEnter}
        onMouseLeave={onAvatarLeave}
      >
        <div className="w-full h-full bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white">
          <svg className="w-20 h-20 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]" viewBox="0 0 512 512" fill="currentColor">
            <path d="M495.12 16.88a12 12 0 0 0-16-1.57c-25.79 17.6-58.4 34.56-96 49.92-38 15.53-76.32 25.13-112.59 29.83-36.54 4.74-69.69 4.38-98.3-1.07-28.84-5.49-51-14.76-65.73-27.57a12 12 0 0 0-15.51-1.32c-5.83 4-9.35 10.55-9.35 17.65 0 24.36 10.15 57.06 30 94 18.25 34 43.12 70.08 72 105.74 27.28 33.72 57.25 64.91 85.54 90.7 27 24.6 51 43.17 68 53.64l48.21 48.22a12 12 0 0 0 17-17l-35.34-35.34c11.96-18 29.21-43.16 52.88-72.33 26.8-33.09 60.1-71.94 92.49-106.87 34.1-36.78 65-68 86.87-91.82 23.36-25.43 36.63-42.6 36.63-47.53 0-7.3-3.69-13.97-9.8-17.76z"/>
            <path d="M366.52 144.38A307.72 307.72 0 0 0 286.95 240l28.61-28.61a12 12 0 0 0-16.97-16.97l-47.28 47.28a307.96 307.96 0 0 0-38.31 52l15.93-15.92a12 12 0 0 0-16.97-16.97l-35.63 35.63A307.35 307.35 0 0 0 151.72 334l12.44-12.43a12 12 0 1 0-16.97-16.97l-15.56 15.56c15.22 17.52 31.86 35.19 50 52.55L73.18 481.18a12 12 0 1 0 16.97 16.97l102.58-102.58c17.51 15 35.21 28.78 52.62 41 4.54-5.32 9.5-10.96 14.88-16.91l-14-14a12 12 0 1 0 16.97-16.97l25.88 25.88c22.56-25.4 46-52.41 68.74-79.62l-21.75-21.75a12 12 0 1 0 16.97-16.97l30.68 30.68c28.53-34.62 55.43-68.53 78.43-98.3l-20.73-20.73a12 12 0 0 0 16.97-16.97l24.49 24.49c18.52-25.84 34.34-49.33 46.54-68-15.34 23.51-34.79 50.15-56.93 78.53z"/>
          </svg>
        </div>
      </div>
      <h1 className="text-5xl md:text-7xl font-art mb-5 text-gradient">在下羽升</h1>
      <p className="text-xl md:text-2xl font-light mb-3 tracking-[0.25em] text-gray-200">羽化成蝶 · 升生不息</p>
      <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent my-6 mx-auto" />
      <p className="text-lg md:text-xl text-gray-300 italic font-art max-w-xl mx-auto leading-relaxed mb-12">&quot;不问前程，尽管繁荣&quot;</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 text-left">
        <div className="glass-card p-5">
          <h3 className="text-base font-bold mb-4 flex items-center text-pink-300">
            <i className="fab fa-bilibili mr-2 text-lg" /> 视频创作
          </h3>
          <div className="space-y-2">
            <a href="https://space.bilibili.com/3546949376543207" className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-pink-500/15 transition-colors group">
              <div className="flex items-center">
                <i className="fas fa-video text-gray-400 mr-3 group-hover:text-pink-300 w-5" />
                <span className="text-sm">羽升日记 (Vlog)</span>
              </div>
              <i className="fas fa-external-link-alt text-xs text-gray-500" />
            </a>
            <a href="https://space.bilibili.com/3461563507804968" className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-emerald-500/15 transition-colors group">
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
            <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors"><i className="fab fa-weixin text-green-400 w-4" /><span className="select-all">AIMFlly</span></div>
            <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors"><i className="fab fa-qq text-blue-400 w-4" /><span className="select-all">2158858577</span></div>
            <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors"><span className="font-bold text-red-400 text-[10px] w-4 text-center">书</span><span className="select-all">AIMFlly</span></div>
            <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors"><i className="fas fa-fish text-orange-400 w-4" /><span className="select-all">羽升羽升</span></div>
            <div className="col-span-2 p-2.5 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors"><i className="fas fa-envelope text-yellow-400 w-4" /><span className="select-all text-[11px]">AIMFlly@outlook.com</span></div>
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
    </div>
  );
}
