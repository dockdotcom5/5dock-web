/**
 * Next.js API 代理路由 — 将 /api/* 请求转发到 NewAPI 后端。
 *
 * 注意：生产环境中 Caddy 已直接将 /api/* 转发给 NewAPI，
 * 因此本文件在生产环境中不会被触发。
 * 保留此文件是为了本地开发时（没有 Caddy）仍能正常代理 API 请求。
 */
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL =
  process.env.BACKEND_URL || 'http://124.156.204.131:3000';

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const joinedPath = path.join('/');
  const url = `${BACKEND_URL}/api/${joinedPath}${req.nextUrl.search}`;

  const headers = new Headers();
  headers.set(
    'Content-Type',
    req.headers.get('Content-Type') || 'application/json'
  );

  // Forward cookies for session auth
  const cookie = req.headers.get('cookie');
  if (cookie) {
    headers.set('cookie', cookie);
  }

  // Forward New-Api-User header required by NewAPI auth middleware
  const newApiUser = req.headers.get('New-Api-User');
  if (newApiUser) {
    headers.set('New-Api-User', newApiUser);
  }

  const body = ['GET', 'HEAD'].includes(req.method)
    ? undefined
    : await req.text();

  try {
    const res = await fetch(url, {
      method: req.method,
      headers,
      body,
    });

    const data = await res.text();
    const response = new NextResponse(data, {
      status: res.status,
      headers: {
        'Content-Type':
          res.headers.get('Content-Type') || 'application/json',
      },
    });

    // Forward set-cookie headers, rewriting Domain to match proxy origin
    const setCookie = res.headers.getSetCookie();
    for (const c of setCookie) {
      // Strip Domain= attribute so the browser uses the current host (5dock.com)
      // Also strip Secure flag when running on HTTP (dev), keep it on HTTPS (prod)
      const rewritten = c
        .replace(/;\s*Domain=[^;]*/gi, '')
        .replace(/;\s*SameSite=Strict/gi, '; SameSite=Lax');
      response.headers.append('set-cookie', rewritten);
    }

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '后端服务不可用';
    return NextResponse.json(
      { success: false, message: `代理请求失败: ${message}` },
      { status: 502 }
    );
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
};
