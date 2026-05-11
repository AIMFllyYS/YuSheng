import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 隐私保护中间件 — 四层防护体系的核心
 *
 * 功能：
 * 1. 访问令牌验证：只有 URL 带正确 token 才能访问，否则返回 404
 * 2. HTTP Header 防索引：所有响应添加 X-Robots-Tag: noindex
 * 3. Cookie 记忆：首次验证通过后设置 cookie，后续访问无需重复带 token
 *
 * 分享方式：
 *   https://your-domain.com?token=你设置的密钥
 *   访客点开后 cookie 生效，后续刷新/跳转页面不会丢失访问权限
 */

// ========== 配置区 ==========
// 请在环境变量 ACCESS_TOKEN 中设置你的访问令牌
// 如未设置，使用此默认值（部署前务必修改！）
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "yusheng2024";

// Cookie 有效期（秒）：默认 7 天
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

// Cookie 名称
const COOKIE_NAME = "ys_access";

// 不需要验证的路径（静态资源、API 路由等）
const PUBLIC_PATHS = [
  "/robots.txt",
  "/favicon.ico",
  "/_next",
  "/api",
];
// =============================

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 静态资源和内部路径跳过验证
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
    return response;
  }

  // 检查是否已有有效 cookie
  const hasValidCookie = request.cookies.get(COOKIE_NAME)?.value === ACCESS_TOKEN;

  // 检查 URL 中是否带有正确的 token
  const urlToken = searchParams.get("token");
  const hasValidToken = urlToken === ACCESS_TOKEN;

  // 如果既没有有效 cookie，也没有正确的 URL token → 返回 404
  if (!hasValidCookie && !hasValidToken) {
    return new NextResponse("404 Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
      },
    });
  }

  // 验证通过
  let response: NextResponse;

  // 如果是通过 URL token 验证的，去掉 URL 中的 token 参数（美化链接）并设置 cookie
  if (hasValidToken && !hasValidCookie) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("token");
    response = NextResponse.redirect(cleanUrl);
    response.cookies.set(COOKIE_NAME, ACCESS_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  } else {
    response = NextResponse.next();
  }

  // 所有响应都添加防索引 Header
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");

  return response;
}

export const config = {
  // 匹配所有路径（排除静态资源）
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
