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
        <div className="w-full h-full bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white relative transition-transform duration-500 group-hover:scale-110">
          <svg className="w-16 h-16 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] -rotate-12 transition-transform duration-300 hover:rotate-0" viewBox="0 0 512 512" fill="url(#featherGradient)">
            <defs>
              <linearGradient id="featherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#e0e7ff" />
                <stop offset="100%" stopColor="#a5b4fc" />
              </linearGradient>
            </defs>
            <path d="M512 0c-40 0-149.3 12.8-232 95.6-26.2 26.2-46.7 54.4-61.9 83.2-34-31.5-84.3-33-119.5-3.3l-.6.6-8.9 8.9c-12 12-14.7 30.1-6.6 44.9l80.5 147.2-152 119.7c-13.3 10.5-14.5 30.5-2.2 42.8l10.2 10.2c12.3 12.3 32.3 11 42.8-2.2l119.7-152 147.2 80.5c14.8 8.1 32.9 5.4 44.9-6.6l8.9-8.9.6-.6c29.7-35.3 28.2-85.5-3.3-119.5 28.8-15.1 57-35.7 83.2-61.9C499.2 149.3 512 40 512 0zm-242.4 316.5l-33.9-33.9 84.9-84.9 33.9 33.9-84.9 84.9z"/>
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
