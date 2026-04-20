import type { Metadata } from "next";
import { Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const noto = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "AIMflly - 羽升 | 羽化成蝶 升生不息",
  description: "AIMFlly personal intro",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 与源站 HTML 一致的多字体组合；Turbopack 下多 next/font 曾构建失败，故保留外链 */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cinzel:wght@400;600;700&family=ZCOOL+KuaiLe&family=ZCOOL+XiaoWei&display=swap"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <body className={`${noto.variable} antialiased selection:bg-yellow-400 selection:text-black`}>{children}</body>
    </html>
  );
}
