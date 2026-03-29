import { Eye, ShieldCheck, Code2, Star, MessageSquare, Clock } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Star,
    title: "企业认可",
    description: "多家企业正在使用，节省超过 70% 人力成本",
  },
  {
    icon: ShieldCheck,
    title: "数据安全",
    description: "不存储、不审查、不转卖用户数据，企业级加密传输",
  },
  {
    icon: Clock,
    title: "极速响应",
    description: "2-3 天完成部署，5 分钟员工上手，专人技术支持",
  },
  {
    icon: Eye,
    title: "透明定价",
    description: "按需付费，用多少算多少，无隐藏费用",
  },
  {
    icon: Code2,
    title: "技术领先",
    description: "接入 GPT-5、Claude Opus、Gemini 等最前沿模型",
  },
  {
    icon: MessageSquare,
    title: "贴心服务",
    description: "一对一企业顾问，从需求评估到上线全程陪伴",
  },
] as const;

export function TrustSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            为什么选择 <span className="text-gradient">5Dock</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="size-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
