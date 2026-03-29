"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CODE_TABS = [
  {
    id: "python",
    label: "Python",
    code: `from openai import OpenAI
client = OpenAI(base_url="https://api.aigetdone.com/v1", api_key="sk-xxx")
response = client.chat.completions.create(model="claude-sonnet-4-20250514", messages=[{"role": "user", "content": "Hello"}])`,
  },
  {
    id: "nodejs",
    label: "Node.js",
    code: `import OpenAI from "openai";
const client = new OpenAI({ baseURL: "https://api.aigetdone.com/v1", apiKey: "sk-xxx" });
const response = await client.chat.completions.create({ model: "claude-sonnet-4-20250514", messages: [{ role: "user", content: "Hello" }] });`,
  },
  {
    id: "curl",
    label: "cURL",
    code: `curl https://api.aigetdone.com/v1/chat/completions \\
  -H "Authorization: Bearer sk-xxx" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"claude-sonnet-4-20250514","messages":[{"role":"user","content":"Hello"}]}'`,
  },
] as const;

type TabId = (typeof CODE_TABS)[number]["id"];

export function CodeSection() {
  const [activeTab, setActiveTab] = useState<TabId>("python");
  const [copied, setCopied] = useState(false);

  const activeCode =
    CODE_TABS.find((tab) => tab.id === activeTab)?.code ?? "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API not available
    }
  };

  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient">3 行代码</span>接入
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            兼容 OpenAI SDK，只需修改 base_url 即可接入 20+ 前沿模型
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          {/* Tabs */}
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

            {/* Copy button */}
            <button
              type="button"
              onClick={handleCopy}
              className="ml-auto flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-400 transition-colors hover:text-gray-200"
              aria-label="复制代码"
            >
              {copied ? (
                <>
                  <Check className="size-3.5" />
                  <span>已复制</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>复制</span>
                </>
              )}
            </button>
          </div>

          {/* Code Block */}
          <div className="overflow-x-auto rounded-b-lg border border-gray-700 bg-gray-900 p-4 sm:p-6">
            <pre className="font-mono text-sm leading-relaxed text-gray-100">
              <code>{activeCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
