import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "API 文档",
  description: "5Dock AI API 使用文档和接入指南",
}

const CODE_EXAMPLES = {
  curl: `curl https://api.5dock.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "gpt-5",
    "messages": [
      {"role": "user", "content": "你好！"}
    ]
  }'`,
  python: `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="https://api.5dock.com/v1"
)

response = client.chat.completions.create(
    model="gpt-5",
    messages=[
        {"role": "user", "content": "你好！"}
    ]
)

print(response.choices[0].message.content)`,
  node: `import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'https://api.5dock.com/v1',
});

const response = await client.chat.completions.create({
  model: 'gpt-5',
  messages: [
    { role: 'user', content: '你好！' }
  ],
});

console.log(response.choices[0].message.content);`,
} as const

const API_ENDPOINTS = [
  { method: "POST", path: "/v1/chat/completions", description: "聊天补全接口，支持多轮对话" },
  { method: "POST", path: "/v1/completions", description: "文本补全接口" },
  { method: "POST", path: "/v1/embeddings", description: "文本向量化接口" },
  { method: "POST", path: "/v1/images/generations", description: "图像生成接口" },
  { method: "POST", path: "/v1/audio/transcriptions", description: "语音转文字接口" },
  { method: "POST", path: "/v1/audio/speech", description: "文字转语音接口" },
  { method: "GET", path: "/v1/models", description: "获取可用模型列表" },
] as const

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">API 文档</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          完全兼容 OpenAI API 格式，只需替换 Base URL 即可使用
        </p>
      </div>

      {/* Quick Start */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">快速开始</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { step: "1", title: "获取 API Key", description: "注册账号后，在控制台创建 API Key" },
            { step: "2", title: "设置 Base URL", description: "将 API 请求地址替换为 https://api.5dock.com/v1" },
            { step: "3", title: "发送请求", description: "使用你熟悉的 SDK 或 HTTP 客户端发送请求" },
          ].map((item) => (
            <Card key={item.step}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Base URL */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold">Base URL</h2>
        <Card>
          <CardContent className="pt-6">
            <code className="rounded-lg bg-muted px-4 py-3 text-sm font-mono block">
              https://api.5dock.com/v1
            </code>
            <p className="mt-4 text-sm text-muted-foreground">
              所有请求都需要在 Header 中携带 API Key：
            </p>
            <code className="mt-2 rounded-lg bg-muted px-4 py-3 text-sm font-mono block">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </CardContent>
        </Card>
      </section>

      {/* API Endpoints */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">API 端点</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 text-left font-medium text-muted-foreground">方法</th>
                    <th className="py-3 text-left font-medium text-muted-foreground">端点</th>
                    <th className="py-3 text-left font-medium text-muted-foreground">说明</th>
                  </tr>
                </thead>
                <tbody>
                  {API_ENDPOINTS.map((endpoint) => (
                    <tr key={endpoint.path} className="border-b border-border/50 last:border-0">
                      <td className="py-3">
                        <Badge variant="outline" className="font-mono text-xs">{endpoint.method}</Badge>
                      </td>
                      <td className="py-3 font-mono text-xs">{endpoint.path}</td>
                      <td className="py-3 text-muted-foreground">{endpoint.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Code Examples */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">代码示例</h2>
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-lg font-semibold">cURL</h3>
            <Card>
              <CardContent className="pt-6">
                <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm font-mono">
                  {CODE_EXAMPLES.curl}
                </pre>
              </CardContent>
            </Card>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Python</h3>
            <Card>
              <CardContent className="pt-6">
                <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm font-mono">
                  {CODE_EXAMPLES.python}
                </pre>
              </CardContent>
            </Card>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Node.js</h3>
            <Card>
              <CardContent className="pt-6">
                <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm font-mono">
                  {CODE_EXAMPLES.node}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Rate Limits */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">速率限制</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 text-left font-medium text-muted-foreground">等级</th>
                    <th className="py-3 text-right font-medium text-muted-foreground">每分钟请求数</th>
                    <th className="py-3 text-right font-medium text-muted-foreground">每日请求数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-3 font-medium">体验版</td>
                    <td className="py-3 text-right text-muted-foreground">3 RPM</td>
                    <td className="py-3 text-right text-muted-foreground">100 RPD</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 font-medium">标准版</td>
                    <td className="py-3 text-right text-muted-foreground">60 RPM</td>
                    <td className="py-3 text-right text-muted-foreground">10,000 RPD</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">企业版</td>
                    <td className="py-3 text-right text-muted-foreground">无限</td>
                    <td className="py-3 text-right text-muted-foreground">无限</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Error Codes */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">错误码</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 text-left font-medium text-muted-foreground">状态码</th>
                    <th className="py-3 text-left font-medium text-muted-foreground">说明</th>
                    <th className="py-3 text-left font-medium text-muted-foreground">解决方案</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { code: "401", desc: "认证失败", solution: "检查 API Key 是否正确" },
                    { code: "403", desc: "权限不足", solution: "检查 API Key 的权限设置" },
                    { code: "429", desc: "请求过多", solution: "降低请求频率或升级套餐" },
                    { code: "500", desc: "服务器错误", solution: "稍后重试，如持续请联系支持" },
                    { code: "503", desc: "服务不可用", solution: "上游模型暂时不可用，请稍后重试" },
                  ].map((err) => (
                    <tr key={err.code} className="border-b border-border/50 last:border-0">
                      <td className="py-3"><Badge variant="outline" className="font-mono">{err.code}</Badge></td>
                      <td className="py-3 font-medium">{err.desc}</td>
                      <td className="py-3 text-muted-foreground">{err.solution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
