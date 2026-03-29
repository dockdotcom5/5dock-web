import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "模型目录",
  description: "5Dock AI 支持的所有 AI 模型列表",
}

const MODELS = [
  {
    provider: "OpenAI",
    description: "GPT-5 系列及 Codex 编程模型，通过 5Dock AI 访问",
    models: [
      { name: "gpt-5", context: "128K", capability: "GPT-5 旗舰对话模型", tags: ["文本", "视觉"] },
      { name: "gpt-5.1", context: "128K", capability: "GPT-5.1 增强版本", tags: ["文本", "编程"] },
      { name: "gpt-5.2", context: "128K", capability: "GPT-5.2 增强版本", tags: ["文本", "编程"] },
      { name: "gpt-5.4", context: "128K", capability: "GPT-5.4 高级版本", tags: ["文本", "推理"] },
      { name: "gpt-5-codex", context: "128K", capability: "GPT-5 Codex 编程专用", tags: ["编程"] },
      { name: "gpt-5-codex-mini", context: "128K", capability: "GPT-5 Codex 轻量版", tags: ["编程"] },
      { name: "gpt-5.1-codex", context: "128K", capability: "GPT-5.1 Codex 编程专用", tags: ["编程"] },
      { name: "gpt-5.1-codex-mini", context: "128K", capability: "GPT-5.1 Codex 轻量版", tags: ["编程"] },
      { name: "gpt-5.1-codex-max", context: "128K", capability: "GPT-5.1 Codex 旗舰版", tags: ["编程"] },
      { name: "gpt-5.2-codex", context: "128K", capability: "GPT-5.2 Codex 编程专用", tags: ["编程"] },
      { name: "gpt-5.3-codex", context: "128K", capability: "GPT-5.3 Codex 编程专用", tags: ["编程"] },
      { name: "gpt-oss-120b-medium", context: "128K", capability: "OpenAI 开源 120B 中等规模模型", tags: ["文本", "编程"] },
    ],
  },
  {
    provider: "Anthropic",
    description: "Claude 4.6 系列，安全且强大的 AI 助手",
    models: [
      { name: "claude-sonnet-4-6", context: "200K", capability: "Claude Sonnet 4.6，平衡性能与速度", tags: ["文本", "视觉", "编程"] },
      { name: "claude-opus-4-6-thinking", context: "200K", capability: "Claude Opus 4.6 扩展思维版，深度推理", tags: ["文本", "推理", "编程"] },
    ],
  },
  {
    provider: "Google",
    description: "Gemini 3 系列及 2.5 系列，多模态能力领先",
    models: [
      { name: "gemini-3-pro-high", context: "1M", capability: "Gemini 3 Pro 高性能版", tags: ["文本", "视觉"] },
      { name: "gemini-3-pro-low", context: "1M", capability: "Gemini 3 Pro 高效版", tags: ["文本", "视觉"] },
      { name: "gemini-3-flash", context: "1M", capability: "Gemini 3 Flash，速度优先", tags: ["文本", "视觉"] },
      { name: "gemini-3.1-pro-high", context: "1M", capability: "Gemini 3.1 Pro 高性能版", tags: ["文本", "视觉"] },
      { name: "gemini-3.1-pro-high-a", context: "1M", capability: "Gemini 3.1 Pro 高性能 A 版", tags: ["文本", "视觉"] },
      { name: "gemini-3.1-pro-high-b", context: "1M", capability: "Gemini 3.1 Pro 高性能 B 版", tags: ["文本", "视觉"] },
      { name: "gemini-3.1-pro-low", context: "1M", capability: "Gemini 3.1 Pro 高效版", tags: ["文本", "视觉"] },
      { name: "gemini-3.1-flash-image", context: "1M", capability: "Gemini 3.1 Flash，支持图像生成", tags: ["文本", "视觉", "图像生成"] },
      { name: "gemini-2.5-flash", context: "1M", capability: "Gemini 2.5 Flash，超低延迟", tags: ["文本", "视觉"] },
      { name: "gemini-2.5-flash-lite", context: "1M", capability: "Gemini 2.5 Flash Lite，极速响应", tags: ["文本"] },
    ],
  },
] as const

export default function ModelsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">模型目录</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          通过 5Dock AI 访问 24 个前沿 AI 模型，一个 API Key 即可调用
        </p>
      </div>

      <div className="space-y-12">
        {MODELS.map((group) => (
          <section key={group.provider}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{group.provider}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.models.map((model) => (
                <Card key={model.name} className="transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-mono">{model.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs ml-2 shrink-0">{model.context}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{model.capability}</p>
                    <div className="flex flex-wrap gap-1">
                      {model.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator className="mt-8" />
          </section>
        ))}
      </div>
    </div>
  )
}
