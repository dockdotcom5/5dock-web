import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-10 text-center text-white shadow-2xl sm:p-14">
          <h2 className="text-3xl font-bold sm:text-4xl">
            让 AI 帮您的企业降本增效
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            不需要懂技术，不需要大预算，只需要一次沟通，我们帮您找到最适合的 AI 方案
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-base font-semibold text-blue-700 shadow-lg transition-all hover:bg-blue-50"
            >
              预约免费演示
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="tel:13800138000"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              <Phone className="size-4" />
              电话咨询
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
