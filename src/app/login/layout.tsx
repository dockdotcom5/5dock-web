import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "登录 | AI 搞定",
  description: "登录你的 AI 搞定 账号",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
