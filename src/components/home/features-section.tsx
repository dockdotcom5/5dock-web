import { Globe, Zap, Shield, Coins } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Globe,
    title: "20+ 前沿模型",
    description:
      "OpenAI, Anthropic, Google, DeepSeek... 一个接口全搞定",
  },
  {
    icon: Zap,
    title: "极速稳定",
    description: "全球节点加速，99.9% 可用性保障",
  },
  {
    icon: Shield,
    title: "安全可靠",
    description: "不存储请求内容，TLS 加密传输",
  },
  {
    icon: Coins,
    title: "按量计费",
    description: "用多少付多少，注册即送 $1 体验额度",
  },
] as const;

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            为什么选择 <span className="text-gradient">5Dock AI</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            一站式 AI API 中转服务，让接入 AI 变得简单
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="group transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-start gap-3 pt-2">
                <div className="bg-gradient-brand flex size-10 items-center justify-center rounded-lg">
                  <feature.icon className="size-5 text-white" />
                </div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
