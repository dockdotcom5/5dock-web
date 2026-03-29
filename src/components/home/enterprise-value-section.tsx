import { Zap, Rocket, Crown, Target, TrendingUp } from "lucide-react";

const ADVANTAGES = [
  {
    icon: Zap,
    title: "零学习成本",
    description: "不需要懂技术，不需要学新工具，会说话就能用 AI",
  },
  {
    icon: Rocket,
    title: "快速部署",
    description: "最快 7 天上线，无需漫长的开发周期和复杂的系统对接",
  },
  {
    icon: Crown,
    title: "面向老板",
    description: "不是给技术人员用的工具，而是帮老板解决经营问题的方案",
  },
  {
    icon: Target,
    title: "聚焦经营结果",
    description: "不卖概念，不堆功能，只关注帮您省多少钱、赚多少钱",
  },
  {
    icon: TrendingUp,
    title: "持续接入最新 AI",
    description: "全球最强 AI 模型持续迭代，您的方案自动升级，保持竞争力",
  },
];

export function EnterpriseValueSection() {
  return (
    <section id="advantages" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            为什么选择 <span className="text-gradient">AI 搞定</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            我们和其他 AI 产品最大的区别
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl border border-border bg-background p-6 shadow-sm"
            >
              <div className="flex-shrink-0">
                <div className="inline-flex rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-3 text-white">
                  <item.icon className="size-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
