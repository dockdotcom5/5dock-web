import { ShoppingBag, PenTool, Headphones, TrendingUp, BarChart3, Users, Workflow } from "lucide-react";
import Link from "next/link";

const SCENES = [
  {
    icon: ShoppingBag,
    title: "产品上新自动化",
    problem: "上新流程繁琐，拍照修图写描述耗时耗力",
    benefit: "AI 自动生成商品描述、修图、上架，效率提升 10 倍",
  },
  {
    icon: PenTool,
    title: "营销文案与平面设计",
    problem: "请设计师成本高，自己做效果差",
    benefit: "AI 秒出文案和设计图，质量媲美专业团队",
  },
  {
    icon: Headphones,
    title: "AI 智能客服",
    problem: "客服人员多、培训成本高、回答不统一",
    benefit: "7×24 小时在线，回答准确率 95%+，节省 80% 人力",
  },
  {
    icon: TrendingUp,
    title: "AI 销售辅助",
    problem: "销售话术不统一，新人上手慢",
    benefit: "AI 辅助话术推荐、客户画像分析、跟进提醒",
  },
  {
    icon: BarChart3,
    title: "数据整理分析",
    problem: "数据散落各处，统计分析靠人工 Excel",
    benefit: "AI 自动汇总分析，生成可视化报告，辅助决策",
  },
  {
    icon: Users,
    title: "招聘与培训",
    problem: "简历筛选耗时，培训材料准备麻烦",
    benefit: "AI 自动筛选简历、生成培训材料、考核评估",
  },
  {
    icon: Workflow,
    title: "业务流程自动化",
    problem: "重复性工作多，人工操作容易出错",
    benefit: "AI 打通各环节，自动执行流程，减少人为失误",
  },
];

export function EnterpriseScenesSection() {
  return (
    <section id="scenes" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            覆盖企业<span className="text-gradient">核心业务场景</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            不管您是什么行业，AI 都能帮您提效降本
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SCENES.map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-600">
                <item.icon className="size-6" />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <div className="mt-3 space-y-2">
                <p className="text-sm text-red-500">
                  <span className="font-medium">痛点：</span>{item.problem}
                </p>
                <p className="text-sm text-green-600">
                  <span className="font-medium">收益：</span>{item.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
          >
            查看更多场景，预约专属方案 →
          </Link>
        </div>
      </div>
    </section>
  );
}
