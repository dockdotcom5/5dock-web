import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "忘记密码 | AI 搞定",
  description: "重置你的 AI 搞定 账号密码",
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">忘记密码</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              忘记密码功能即将上线。
              <br />
              如需重置密码，请联系客服，我们会尽快协助您处理。
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              返回登录
            </Link>
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              回到首页
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
