import { useRouter } from "next/navigation";

export function PortalSection() {
  const router = useRouter();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    sessionStorage.setItem("featureClickOrigin", JSON.stringify({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }));
    if (path.startsWith("http")) {
      window.open(path, "_blank");
    } else if (path !== "#") {
      router.push(path);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-art border-l-4 pl-4" style={{ borderColor: "var(--accent-main)" }}>星际传送门</h2>
          <p className="mt-2 text-xs text-gray-400 max-w-lg">把生活拆成几颗小行星：有记笔记的星、有写日记的星、有 MC 方块宇宙，也有开源的星海。</p>
        </div>
        <span className="text-[10px] text-gray-500 border border-gray-600 px-2 py-1 rounded font-english tracking-widest uppercase">system links</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-16">
        <a href="/features/notes" onClick={(e) => handleNav(e, "/features/notes")} className="glass-card p-5 group"><Card iconWrap="rgba(59,130,246,0.15)" icon="fas fa-book-open text-lg" title="我的笔记" body="课堂边角、社团灵感与随机奇想，全都落在这一页页注脚里。" /></a>
        <a href="https://husteread.com/index.php/aimflly-apps/" onClick={(e) => handleNav(e, "https://husteread.com/index.php/aimflly-apps/")} className="glass-card p-5 group"><Card iconWrap="rgba(139,92,246,0.15)" icon="fas fa-layer-group text-lg" title="我的应用" body="小工具、小网页、小脚本，把「想做的事」变成「点一下就能做」。" /></a>
        <a href="/features/memory" onClick={(e) => handleNav(e, "/features/memory")} className="glass-card p-5 group"><Card iconWrap="rgba(236,72,153,0.15)" icon="fas fa-hourglass-half text-lg" title="一刻记忆" body="把时间折叠成一帧一帧画面，回头看时，会发现自己真的走了很远。" /></a>
        <a href="https://husteread.com/index.php/aimflly-wave/" onClick={(e) => handleNav(e, "https://husteread.com/index.php/aimflly-wave/")} className="glass-card p-5 group"><Card iconWrap="rgba(34,197,94,0.15)" icon="fas fa-tree text-lg" title="致敬树林" body="HUST 的森林，世界不死，理想不灭。每一阵风吹过，都是一次重新出发。" /></a>
        <a href="/features/share" onClick={(e) => handleNav(e, "/features/share")} className="glass-card p-5 group"><Card iconWrap="rgba(234,179,8,0.15)" icon="fas fa-share-alt text-lg" title="开源共享" body="写过的代码、做过的表单、踩过的坑，能帮到一个人，就多一份意义。" /></a>
        <a href="/features/revelation" onClick={(e) => handleNav(e, "/features/revelation")} className="glass-card p-5 group"><Card iconWrap="rgba(79,70,229,0.15)" icon="fas fa-lightbulb text-lg" title="人生启示录" body="一些路过的思考，一些当时没懂、后来突然懂了的小结。" /></a>
        <a href="https://space.bilibili.com/3546949376543207" onClick={(e) => handleNav(e, "https://space.bilibili.com/3546949376543207")} className="glass-card p-5 group"><Card iconWrap="rgba(248,113,113,0.15)" icon="fab fa-bilibili text-lg" title="羽升日记" body="B 站小日常和碎碎念，算是一份公开的「心情备份」。" /></a>
        <a href="https://space.bilibili.com/3461563507804968" onClick={(e) => handleNav(e, "https://space.bilibili.com/3461563507804968")} className="glass-card p-5 group"><Card iconWrap="rgba(16,185,129,0.15)" icon="fas fa-cube text-lg" title="MC 羽升" body="在方块世界里盖理想城，把「世界不死，理想不灭」搭成一条条路。" /></a>
        <a href="#" onClick={(e) => handleNav(e, "#")} className="glass-card p-5 group"><Card iconWrap="rgba(148,163,184,0.15)" icon="fab fa-github text-lg" title="代码仓库" body="这里会慢慢堆起一些小项目，欢迎以后一起来折腾。" /></a>
      </div>
    </>
  );
}

function Card({ iconWrap, icon, title, body }: { iconWrap: string; icon: string; title: string; body: string }) {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div className="p-3 rounded-full text-blue-300 group-hover:text-white transition-all" style={{ background: iconWrap }}>
          <i className={icon} />
        </div>
        <i className="fas fa-external-link-alt text-gray-500 group-hover:text-white text-xs" />
      </div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-xs text-gray-400 group-hover:text-gray-200">{body}</p>
    </>
  );
}
