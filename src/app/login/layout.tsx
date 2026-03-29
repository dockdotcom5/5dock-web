import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "登录 | 5Dock AI",
  description: "登录你的 5Dock AI 账号",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
