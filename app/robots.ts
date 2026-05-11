import type { MetadataRoute } from "next";

/**
 * 全面禁止所有搜索引擎爬虫索引本站任何页面
 * 这是防止被搜索到的第一道防线
 */
export default function robots(): MetadataRoute["robots"] {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  };
}
