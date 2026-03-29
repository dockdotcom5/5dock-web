import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "隐私政策 | 5Dock AI",
  description: "5Dock AI 隐私政策",
}

const LAST_UPDATED = "2025年1月1日"

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">隐私政策</h1>
        <p className="mt-2 text-sm text-muted-foreground">最后更新：{LAST_UPDATED}</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>1. 我们收集的信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>当您使用 5Dock AI 时，我们会收集以下信息：</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>账号信息：</strong>注册时提供的用户名和邮箱地址（邮箱为可选项）。</li>
              <li><strong>用量数据：</strong>API 调用记录，包括调用时间、模型名称、Token 消耗量及费用。</li>
              <li><strong>支付信息：</strong>充值金额和交易记录，不存储完整的支付卡信息。</li>
              <li><strong>日志信息：</strong>服务器访问日志，用于安全审计和问题排查，不包含 API 请求的具体内容。</li>
            </ul>
            <p>
              我们<strong>不会</strong>存储您通过 API 发送的具体请求内容或 AI 返回的响应内容。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. 信息的用途</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>收集的信息仅用于：</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>提供和维护 API 中转服务。</li>
              <li>计算用量及账单，保证计费准确。</li>
              <li>发送与账号相关的重要通知（如余额不足提醒）。</li>
              <li>安全审计，防止滥用和未授权访问。</li>
              <li>改善平台性能和用户体验。</li>
            </ul>
            <p>我们不会将您的个人信息出售或租借给任何第三方。</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. 数据保护</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              我们采取合理的技术措施保护您的数据，包括 HTTPS 加密传输、数据库访问控制等。
            </p>
            <p>
              您的 API Key 采用加密方式存储。请妥善保管您的 API Key，如发现泄露请立即在控制台中删除并重新生成。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. 第三方服务</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              本平台作为中转服务，您的 API 请求会转发至上游 AI 提供商（如 OpenAI、Anthropic、Google 等）。这些请求受上游提供商各自的隐私政策约束。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. 您的权利</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>您可以随时：</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>在控制台查看和管理您的账号信息。</li>
              <li>申请删除账号及相关数据，请通过客服渠道联系我们。</li>
            </ul>
          </CardContent>
        </Card>

        <Separator />

        <p className="text-xs text-center text-muted-foreground">
          如对本隐私政策有任何疑问，请通过客服渠道联系我们。
        </p>
      </div>
    </div>
  )
}
