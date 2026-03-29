import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "定价",
  description: "AI 搞定 模型定价，透明按量计费",
}

const MODEL_CATEGORIES = [
  {
    category: "OpenAI 系列",
    models: [
      { name: "gpt-5", input: "$1.29/M", output: "$10.29/M", badge: "低价" },
      { name: "gpt-5.1", input: "$77.14/M", output: "$617.14/M", badge: null },
      { name: "gpt-5.2", input: "$77.14/M", output: "$617.14/M", badge: null },
      { name: "gpt-5.4", input: "$77.14/M", output: "$462.86/M", badge: null },
      { name: "gpt-5-codex", input: "$77.14/M", output: "$617.14/M", badge: "编程" },
      { name: "gpt-5-codex-mini", input: "$77.14/M", output: "$617.14/M", badge: "编程" },
      { name: "gpt-5.1-codex", input: "$77.14/M", output: "$617.14/M", badge: "编程" },
      { name: "gpt-5.1-codex-mini", input: "$77.14/M", output: "$617.14/M", badge: "编程" },
      { name: "gpt-5.1-codex-max", input: "$77.14/M", output: "$617.14/M", badge: "编程" },
      { name: "gpt-5.2-codex", input: "$77.14/M", output: "$617.14/M", badge: "编程" },
      { name: "gpt-5.3-codex", input: "$77.14/M", output: "$617.14/M", badge: "编程" },
      { name: "gpt-oss-120b-medium", input: "$77.14/M", output: "$154.29/M", badge: "开源" },
    ],
  },
  {
    category: "Anthropic 系列",
    models: [
      { name: "claude-sonnet-4-6", input: "$77.14/M", output: "$385.71/M", badge: "推荐" },
      { name: "claude-opus-4-6-thinking", input: "$77.14/M", output: "$385.71/M", badge: "推理" },
    ],
  },
  {
    category: "Google 系列",
    models: [
      { name: "gemini-2.5-flash", input: "$0.29/M", output: "$2.57/M", badge: "低价" },
      { name: "gemini-2.5-flash-lite", input: "$77.14/M", output: "$308.57/M", badge: null },
      { name: "gemini-3-flash", input: "$77.14/M", output: "$308.57/M", badge: null },
      { name: "gemini-3-pro-high", input: "$77.14/M", output: "$462.86/M", badge: null },
      { name: "gemini-3-pro-low", input: "$77.14/M", output: "$462.86/M", badge: null },
      { name: "gemini-3.1-flash-image", input: "$77.14/M", output: "$308.57/M", badge: "图像" },
      { name: "gemini-3.1-pro-high", input: "$77.14/M", output: "$308.57/M", badge: null },
      { name: "gemini-3.1-pro-high-a", input: "$77.14/M", output: "$308.57/M", badge: null },
      { name: "gemini-3.1-pro-high-b", input: "$77.14/M", output: "$308.57/M", badge: null },
      { name: "gemini-3.1-pro-low", input: "$77.14/M", output: "$308.57/M", badge: null },
    ],
  },
] as const

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">透明定价</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          按量计费，无月费，无最低消费。价格以每百万 tokens 计。
        </p>
      </div>

      <div className="mb-16 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "体验版",
            price: "免费",
            description: "注册即送 $1 额度",
            features: ["所有模型可用", "每分钟 3 次请求", "社区支持"],
            highlighted: false,
          },
          {
            title: "标准版",
            price: "按量付费",
            description: "适合个人开发者",
            features: ["所有模型可用", "每分钟 60 次请求", "优先支持", "用量统计面板"],
            highlighted: true,
          },
          {
            title: "企业版",
            price: "联系我们",
            description: "适合团队和企业",
            features: ["所有模型可用", "无限请求速率", "专属客服", "SLA 保障", "发票"],
            highlighted: false,
          },
        ].map((tier) => (
          <Card
            key={tier.title}
            className={`relative ${tier.highlighted ? "border-primary shadow-lg" : ""}`}
          >
            {tier.highlighted && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">最受欢迎</Badge>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{tier.title}</CardTitle>
              <div className="mt-2 text-3xl font-bold">{tier.price}</div>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <span className="text-primary">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="mb-16" />

      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight">模型定价详情</h2>
        <p className="mt-2 text-muted-foreground">所有价格均为每百万 tokens（美元）</p>
      </div>

      <div className="space-y-8">
        {MODEL_CATEGORIES.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 text-left font-medium text-muted-foreground">模型</th>
                      <th className="py-3 text-right font-medium text-muted-foreground">输入价格</th>
                      <th className="py-3 text-right font-medium text-muted-foreground">输出价格</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.models.map((model) => (
                      <tr key={model.name} className="border-b border-border/50 last:border-0">
                        <td className="py-3">
                          <span className="font-mono text-xs font-medium">{model.name}</span>
                          {model.badge && (
                            <Badge variant="secondary" className="ml-2 text-xs">{model.badge}</Badge>
                          )}
                        </td>
                        <td className="py-3 text-right text-muted-foreground">{model.input}</td>
                        <td className="py-3 text-right font-medium">{model.output}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-bold">常见问题</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { q: "如何计算 token 数量？", a: "1K tokens 大约等于 750 个英文单词或 500 个中文字。你可以在控制台的用量统计中查看具体消耗。" },
            { q: "支持哪些充值方式？", a: "目前支持支付宝、微信支付和 USDT 充值。最低充值金额为 ¥10。" },
            { q: "余额会过期吗？", a: "不会。充值的余额永久有效，没有过期时间限制。" },
            { q: "可以退款吗？", a: "未使用的余额可以在 30 天内申请退款，扣除手续费后退回原支付方式。" },
          ].map((faq) => (
            <Card key={faq.q}>
              <CardHeader><CardTitle className="text-base">{faq.q}</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">{faq.a}</p></CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
