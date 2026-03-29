import { Wrench, UserX, Link2, ShieldOff, RefreshCw, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PAIN_POINTS = [
  {
    icon: Wrench,
    title: "配置地狱",
    description: "API Key、Token、插件、驱动……老板花半天配好，员工一脸懵",
    quote: "我买的是电脑，不是让我学装系统的",
  },
  {
    icon: UserX,
    title: "员工躺平",
    description: "员工把手一摊：老板我不会。学习动力为零，着急的永远是老板",
    quote: "提示词都要我来配，链接也要我来发",
  },
  {
    icon: Link2,
    title: "链接噩梦",
    description: "20个员工要发20个链接，改个提示词，所有链接重新发一遍",
    quote: "我资产几个亿，不想天天搞这些",
  },
  {
    icon: ShieldOff,
    title: "权限失控",
    description: "没有权限管理，员工拿着 AI 就跑，企业数据安全毫无保障",
    quote: "AI 这么强，万一员工学会了自己干怎么办",
  },
  {
    icon: RefreshCw,
    title: "信息孤岛",
    description: "换个设备信息全没，换个对话记忆清零，AI 连昨天聊过什么都不知道",
    quote: "每次都要从头教一遍，比新员工还笨",
  },
  {
    icon: Bot,
    title: "又蠢又难",
    description: "用便宜模型觉得 AI 太蠢，用贵模型又不会配置，进退两难",
    quote: "不是说 AI 万能吗？到我这儿就不行了？",
  },
] as const;

export function EnterprisePainSection() {
  return (
    <section className="py-20 sm:py-24" id="enterprise">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-sm font-semibold text-red-500">🔥 企业 AI 方案</div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            为什么企业用 AI 这么<span className="text-gradient">痛苦</span>？
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            AI 明明很强大，但 90% 的企业卡在「用不起来」
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PAIN_POINTS.map((item) => (
            <Card
              key={item.title}
              className="group transition-all hover:-translate-y-1 hover:shadow-lg hover:border-red-200"
            >
              <CardContent className="flex flex-col gap-3 pt-2">
                <div className="flex size-10 items-center justify-center rounded-lg bg-red-50">
                  <item.icon className="size-5 text-red-500" />
                </div>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="mt-auto border-l-2 border-red-200 pl-3 text-xs italic text-muted-foreground">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
