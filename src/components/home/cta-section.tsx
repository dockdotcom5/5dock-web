import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            准备好让 AI 帮你<span className="text-gradient">省钱</span>了吗？
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            2-3 天完成部署，员工上手只需 5 分钟
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="#contact"
              className="bg-gradient-brand inline-flex items-center gap-2 rounded-lg px-10 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:opacity-90 hover:shadow-xl hover:shadow-blue-500/30"
            >
              预约企业演示
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-10 py-3.5 text-base font-semibold transition-colors hover:bg-muted"
            >
              免费注册 API
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>✅ 免费需求评估</span>
            <span>✅ 定制化方案</span>
            <span>✅ 7 天无理由退款</span>
          </div>
        </div>
      </div>
    </section>
  );
}
