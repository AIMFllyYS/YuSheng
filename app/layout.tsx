import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIMflly - 羽升 | 羽化成蝶 升生不息",
  description: "AIMFlly personal intro",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Preconnect: eliminates DNS+TLS latency for external font/icon resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        {/* Google Fonts — 6 families loaded in one request */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Ma+Shan+Zheng&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cinzel:wght@400;600;700&family=ZCOOL+KuaiLe&family=ZCOOL+XiaoWei&display=swap"
        />
        {/* Font Awesome 6 — all icons migrated to FA6-native classes */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="antialiased selection:bg-yellow-400 selection:text-black">{children}</body>
    </html>
  );
}
