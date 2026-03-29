"use client";

import { useState } from "react";
import { Copy, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const CODE_TABS = [
  {
    id: "python",
    label: "Python",
    code: `from openai import OpenAI
client = OpenAI(base_url="https://api.5dock.com/v1", api_key="sk-xxx")
response = client.chat.completions.create(model="claude-sonnet-4-20250514", messages=[{"role": "user", "content": "Hello"}])`,
  },
  {
    id: "nodejs",
    label: "Node.js",
    code: `import OpenAI from "openai";
const client = new OpenAI({ baseURL: "https://api.5dock.com/v1", apiKey: "sk-xxx" });
const response = await client.chat.completions.create({ model: "claude-sonnet-4-20250514", messages: [{ role: "user", content: "Hello" }] });`,
  },
  {
    id: "curl",
    label: "cURL",
    code: `curl https://api.5dock.com/v1/chat/completions \\
  -H "Authorization: Bearer sk-xxx" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"claude-sonnet-4-20250514","messages":[{"role":"user","content":"Hello"}]}'`,
  },
] as const;

type TabId = (typeof CODE_TABS)[number]["id"];

const MODELS = [
  { name: "gpt-5", brand: "OpenAI", inputPrice: "$1.30/M", outputPrice: "$10.00/M" },
  { name: "claude-sonnet-4-6", brand: "Anthropic", inputPrice: "$75.00/M", outputPrice: "$375.00/M" },
  { name: "gemini-2.5-flash", brand: "Google", inputPrice: "$0.30/M", outputPrice: "$2.50/M" },
] as const;

export function ApiSection() {
  const [activeTab, setActiveTab] = useState<TabId>("python");
  const [copied, setCopied] = useState(false);

  const activeCode = CODE_TABS.find((tab) => tab.id === activeTab)?.code ?? "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard API not available */ }
  };

  return (
    <section className="py-20 sm:py-24" id="api">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-sm font-semibold text-primary">⚡ API 中转站</div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            一个 Key，连接<span className="text-gradient">所有 AI 模型</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            20+ 前沿模型 · OpenAI 兼容接口 · 按量计费 · 注册即送 $1
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Code Block */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">3 行代码接入</h3>
            <div>
              <div className="flex gap-1 rounded-t-lg border border-b-0 border-gray-700 bg-gray-800 p-1">
                {CODE_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="ml-auto flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-400 transition-colors hover:text-gray-200"
                >
                  {copied ? <><Check className="size-3.5" /><span>已复制</span></> : <><Copy className="size-3.5" /><span>复制</span></>}
                </button>
              </div>
              <div className="overflow-x-auto rounded-b-lg border border-gray-700 bg-gray-900 p-4 sm:p-6">
                <pre className="font-mono text-sm leading-relaxed text-gray-100">
                  <code>{activeCode}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Model Prices */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">热门模型</h3>
            <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
              <div className="grid grid-cols-3 border-b border-border bg-muted/50 px-4 py-3 text-sm font-semibold">
                <span>模型</span>
                <span className="text-right">输入</span>
                <span className="text-right">输出</span>
              </div>
              {MODELS.map((model) => (
                <div key={model.name} className="grid grid-cols-3 border-b border-border px-4 py-3 text-sm last:border-b-0">
                  <div>
                    <span className="font-mono text-xs font-medium">{model.name}</span>
                    <span className="ml-2 hidden text-xs text-muted-foreground sm:inline">{model.brand}</span>
                  </div>
                  <span className="text-right font-mono text-muted-foreground">{model.inputPrice}</span>
                  <span className="text-right font-mono text-muted-foreground">{model.outputPrice}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
              >
                查看完整价格表
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
