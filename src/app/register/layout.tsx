import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "注册 | AI 搞定",
  description: "创建你的 AI 搞定 账号，注册即送 $1 体验额度",
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
