import { UserPlus, Brain, Users, MessageSquare, Lock, RefreshCcw, BarChart3, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const STEPS = [
  {
    num: "01",
    icon: UserPlus,
    title: "创建 AI 员工",
    description: "选择岗位模板（美工/客服/运营/文案...），AI 员工自动具备该岗位专业技能",
  },
  {
    num: "02",
    icon: Brain,
    title: "注入企业记忆",
    description: "上传公司资料、产品信息、品牌风格，AI 员工自动理解你的业务",
  },
  {
    num: "03",
    icon: Users,
    title: "分配给团队",
    description: "一键分配给不同部门的员工，权限隔离，数据安全",
  },
  {
    num: "04",
    icon: MessageSquare,
    title: "说话即工作",
    description: "员工只需用自然语言提需求，AI 员工自动完成并交付结果",
  },
] as const;

const FEATURES = [
  {
    icon: Lock,
    title: "企业级权限管控",
    description: "老板控制 AI 能力边界，员工只能在授权范围内使用",
  },
  {
    icon: RefreshCcw,
    title: "一键升级同步",
    description: "后台更新技能/提示词，所有员工端自动同步，不用再发链接",
  },
  {
    icon: BarChart3,
    title: "用量看板",
    description: "谁在用、用了多少、效果如何，管理层一目了然",
  },
  {
    icon: Cpu,
    title: "持久记忆",
    description: "AI 员工记住每次交互，越用越懂你的业务",
  },
] as const;

export function EnterpriseSolutionSection() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            像招员工一样，<span className="text-gradient">招 AI</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            5Dock 把 AI 的复杂性全部屏蔽，企业只需要「说话」
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <Card
              key={step.num}
              className="group relative transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-center gap-3 pt-2 text-center">
                <span className="text-xs font-bold text-primary">{step.num}</span>
                <div className="bg-gradient-brand flex size-12 items-center justify-center rounded-xl">
                  <step.icon className="size-6 text-white" />
                </div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="size-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">{feature.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
