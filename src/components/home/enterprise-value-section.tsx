import { Lightbulb } from "lucide-react";

const COMPARISONS = [
  { label: "美工团队（10人）", old: "¥15万/月", new: "¥3万/月" },
  { label: "客服团队（20人）", old: "¥30万/月", new: "¥8万/月" },
  { label: "上手培训时间", old: "1-2 周", new: "5 分钟" },
  { label: "7×24 工作", old: "❌ 不可能", new: "✅ 全天候" },
  { label: "离职风险", old: "❌ 随时可能", new: "✅ 永不离职" },
  { label: "管理成本", old: "高（社保/纠纷/考勤）", new: "几乎为零" },
] as const;

export function EnterpriseValueSection() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            算一笔账：AI 员工 vs 传统员工
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            不是一个人的工资，而是一整个团队的成本
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-border bg-background shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-border bg-muted/50 px-4 py-3 text-sm font-semibold sm:px-6">
            <span></span>
            <span className="text-center">传统方式</span>
            <span className="text-center">5Dock AI 员工</span>
          </div>
          {/* Rows */}
          {COMPARISONS.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-3 border-b border-border px-4 py-3.5 text-sm last:border-b-0 sm:px-6"
            >
              <span className="font-medium">{row.label}</span>
              <span className="text-center text-muted-foreground">{row.old}</span>
              <span className="text-center font-semibold text-green-600">{row.new}</span>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="mx-auto mt-8 flex max-w-3xl items-start gap-4 rounded-xl border border-primary/30 bg-primary/5 p-6">
          <Lightbulb className="mt-0.5 size-6 shrink-0 text-primary" />
          <div className="text-sm leading-relaxed">
            <strong>一个简单的数学题：</strong>如果 AI 帮你省了 3 个岗位，每个岗位省 3 万/月 = 
            <span className="font-bold text-primary"> 每月省 9 万</span>。你愿意花 5 万/月来获得这个能力吗？
          </div>
        </div>
      </div>
    </section>
  );
}
