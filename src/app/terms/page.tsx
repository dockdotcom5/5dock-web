import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "服务条款 | AI 搞定",
  description: "AI 搞定 服务条款",
}

const LAST_UPDATED = "2025年1月1日"

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">服务条款</h1>
        <p className="mt-2 text-sm text-muted-foreground">最后更新：{LAST_UPDATED}</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>1. 服务描述</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              AI 搞定（以下简称"本平台"）提供 AI 大语言模型 API 中转服务，聚合 OpenAI、Anthropic、Google 等主流 AI 提供商的模型，以统一的 OpenAI 兼容接口对外开放。
            </p>
            <p>
              用户通过注册账号并充值，获得 API Key 后即可调用本平台支持的所有模型，按实际使用量扣费。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. 用户责任</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>使用本平台服务，您同意：</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>不将服务用于任何违反中华人民共和国法律法规或您所在地区法律的用途。</li>
              <li>不生成、传播违法、有害、侵权、诽谤、色情或其他不当内容。</li>
              <li>不对本平台或上游 AI 服务商的系统发起攻击、滥用或恶意请求。</li>
              <li>妥善保管您的 API Key，不得转售或公开分享给未授权的第三方。</li>
              <li>承担因违规使用导致的全部法律责任。</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. 费用与充值</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              本平台采用预付费模式，用户先充值后使用。已充值的额度不支持无故退款，但因平台故障导致的损失将按实际情况处理。
            </p>
            <p>
              本平台保留调整模型定价的权利，价格变动将提前在平台公告中通知。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. 免责声明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              本平台作为 API 中转服务，不对 AI 模型生成内容的准确性、完整性或适用性作任何保证。AI 输出结果仅供参考，用户应自行判断并承担使用风险。
            </p>
            <p>
              由于上游 AI 提供商服务中断、限流或政策变更导致的服务不可用，本平台不承担赔偿责任，但会尽力提供替代方案。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. 服务变更与终止</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              本平台保留随时修改、暂停或终止服务的权利。重大变更将提前通过邮件或平台公告通知用户。
            </p>
            <p>
              如您违反本条款，本平台有权立即暂停或注销您的账号，且无需退还剩余余额。
            </p>
          </CardContent>
        </Card>

        <Separator />

        <p className="text-xs text-center text-muted-foreground">
          如有疑问，请通过客服渠道联系我们。
        </p>
      </div>
    </div>
  )
}
