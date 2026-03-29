import { HelpCircle, Code2, Layers, GraduationCap } from "lucide-react";

const PAIN_POINTS = [
  {
    icon: HelpCircle,
    title: "想用 AI，不知道从哪开始",
    description: "AI 工具太多，概念太复杂，不知道哪个适合自己的业务",
  },
  {
    icon: Code2,
    title: "没有技术团队，落地成本高",
    description: "招技术人员成本高，外包不了解业务，项目容易烂尾",
  },
  {
    icon: Layers,
    title: "工具太多，不知道怎么选",
    description: "市面上 AI 产品琳琅满目，试了一圈也不知道哪个真正有用",
  },
  {
    icon: GraduationCap,
    title: "想要结果，不想学复杂工具",
    description: "老板要的是经营结果，不是花时间学习又一个新系统",
  },
];

export function EnterprisePainSection() {
  return (
    <section id="pain" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            这些问题，是不是<span className="text-gradient">正困扰着你？</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            90% 的中小企业老板都遇到过
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PAIN_POINTS.map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex rounded-lg bg-red-50 p-3 text-red-600">
                <item.icon className="size-6" />
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
