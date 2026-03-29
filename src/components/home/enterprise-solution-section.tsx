import { Search, Settings, Cpu, RefreshCw } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "识别您的业务场景",
    description: "我们深入了解您的业务流程，找出最适合 AI 提效的环节",
  },
  {
    icon: Settings,
    step: "02",
    title: "接入经营流程",
    description: "将 AI 能力无缝融入您现有的工作流程，无需改变习惯",
  },
  {
    icon: Cpu,
    step: "03",
    title: "配置合适的 AI 能力",
    description: "根据您的具体需求，配置最合适的 AI 模型和工具",
  },
  {
    icon: RefreshCw,
    step: "04",
    title: "持续升级 AI 方案",
    description: "AI 技术日新月异，我们帮您持续迭代，保持竞争力",
  },
];

export function EnterpriseSolutionSection() {
  return (
    <section id="solutions" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            我们如何帮你<span className="text-gradient">搞定 AI</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            满足您最直接的需求，四步搞定
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="mx-auto mb-4 inline-flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                <item.icon className="size-7" />
              </div>
              <div className="mb-2 text-sm font-bold text-blue-600">
                STEP {item.step}
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
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
