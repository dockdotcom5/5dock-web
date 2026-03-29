import { Card, CardContent } from "@/components/ui/card";
import { Palette, Headphones, FileText, Globe, PenTool, Search } from "lucide-react";

const SCENES = [
  {
    icon: Palette,
    tag: "电商",
    title: "AI 美工",
    description: "上传产品照片 + 文案，AI 一分钟出商品图。不满意随时改，不会闹脾气。",
    before: "15 个美工",
    after: "2 人 + AI",
  },
  {
    icon: Headphones,
    tag: "客服",
    title: "AI 客服",
    description: "接入企业微信/在线客服，自动回答 80% 的重复问题，7×24 不休息。",
    before: "30 个客服",
    after: "5 人 + AI",
  },
  {
    icon: FileText,
    tag: "管理",
    title: "AI 报告助理",
    description: "说四个字「生成日报」，AI 自动读取今天的工作记录，生成专业报告。",
    before: "每人 30 分钟",
    after: "4 个字搞定",
  },
  {
    icon: Globe,
    tag: "外贸",
    title: "AI 外贸助理",
    description: "自动发询盘、写开发信、多语言翻译、整理客户资料，一个 AI 顶半个业务部。",
    before: "人工逐个联系",
    after: "批量自动化",
  },
  {
    icon: PenTool,
    tag: "内容",
    title: "AI 文案",
    description: "商品描述、广告文案、社媒帖子、SEO 文章……说清楚需求，AI 直接写。",
    before: "2 小时一篇",
    after: "5 分钟一篇",
  },
  {
    icon: Search,
    tag: "通用",
    title: "AI 数据整理",
    description: "1万字里找5个错别字？人要3天，AI 10秒。文档整理、数据分析、信息提取。",
    before: "人工 3 天",
    after: "AI 10 秒",
  },
] as const;

export function EnterpriseScenesSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            AI 员工能做<span className="text-gradient">什么</span>？
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            不是取代所有人，而是取代最重复、最耗时的工作
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SCENES.map((scene) => (
            <Card
              key={scene.title}
              className="group transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <scene.icon className="size-5 text-primary" />
                  </div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
                    {scene.tag}
                  </span>
                </div>
                <h3 className="text-base font-semibold">{scene.title}</h3>
                <p className="text-sm text-muted-foreground">{scene.description}</p>
                
                {/* Before/After */}
                <div className="mt-auto flex items-center gap-3 rounded-lg bg-muted/50 p-3 text-sm">
                  <div className="flex-1 text-center">
                    <div className="text-xs text-muted-foreground">之前</div>
                    <div className="font-medium text-red-500">{scene.before}</div>
                  </div>
                  <div className="text-muted-foreground">→</div>
                  <div className="flex-1 text-center">
                    <div className="text-xs text-muted-foreground">之后</div>
                    <div className="font-semibold text-green-600">{scene.after}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
