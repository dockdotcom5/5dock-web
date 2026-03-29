import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BRANDS = [
  "OpenAI",
  "Anthropic",
  "Google",
] as const;

const POPULAR_MODELS = [
  {
    name: "gpt-5",
    brand: "OpenAI",
    inputPrice: "$1.30/M",
    outputPrice: "$10.00/M",
  },
  {
    name: "claude-sonnet-4-6",
    brand: "Anthropic",
    inputPrice: "$75.00/M",
    outputPrice: "$375.00/M",
  },
  {
    name: "gemini-3-pro-high",
    brand: "Google",
    inputPrice: "$75.00/M",
    outputPrice: "$450.00/M",
  },
  {
    name: "gemini-2.5-flash",
    brand: "Google",
    inputPrice: "$0.30/M",
    outputPrice: "$2.50/M",
  },
] as const;

export function ModelsSection() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            接入全球领先的 <span className="text-gradient">AI 模型</span>
          </h2>
        </div>

        {/* Brand logos (text) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="text-lg font-semibold text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {brand}
            </span>
          ))}
        </div>

        {/* Price table */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-border bg-muted/50 px-4 py-3 text-sm font-semibold sm:px-6">
              <span>模型</span>
              <span className="text-right">输入价格</span>
              <span className="text-right">输出价格</span>
            </div>
            {/* Rows */}
            {POPULAR_MODELS.map((model) => (
              <div
                key={model.name}
                className="grid grid-cols-3 border-b border-border px-4 py-3 text-sm last:border-b-0 sm:px-6"
              >
                <div>
                  <span className="font-mono text-xs font-medium">{model.name}</span>
                  <span className="ml-2 hidden text-xs text-muted-foreground sm:inline">
                    {model.brand}
                  </span>
                </div>
                <span className="text-right font-mono text-muted-foreground">
                  {model.inputPrice}
                </span>
                <span className="text-right font-mono text-muted-foreground">
                  {model.outputPrice}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            所有价格均为每百万 tokens（美元）
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
          >
            查看完整价格表
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
