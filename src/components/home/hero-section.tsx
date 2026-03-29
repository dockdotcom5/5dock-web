import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid-pattern absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <Sparkles className="size-4" />
            中小企业 AI 转型加速器
          </div>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            零学习成本
            <br />
            <span className="text-gradient">将 AI 应用于公司经营</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            AI 搞定中小企业一切需求，不需要技术团队，不需要懂深奥概念，一看就会，立即可用
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="bg-gradient-brand inline-flex items-center gap-2 rounded-lg px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:opacity-90 hover:shadow-xl hover:shadow-blue-500/30"
            >
              预约演示
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#solutions"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-base font-semibold transition-colors hover:bg-muted"
            >
              查看解决方案
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold sm:text-4xl">0</div>
              <div className="mt-1 text-sm text-muted-foreground">学习成本</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold sm:text-4xl">7天</div>
              <div className="mt-1 text-sm text-muted-foreground">快速部署上线</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold sm:text-4xl">70%</div>
              <div className="mt-1 text-sm text-muted-foreground">人力成本降低</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
