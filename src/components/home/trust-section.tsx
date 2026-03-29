import { CheckCircle, Building2, Handshake } from "lucide-react";

const SERVICE_STEPS = [
  { step: "1", title: "需求沟通", desc: "深入了解您的业务和痛点" },
  { step: "2", title: "方案定制", desc: "针对您的场景制定 AI 解决方案" },
  { step: "3", title: "快速部署", desc: "7 天内完成部署和配置" },
  { step: "4", title: "培训上手", desc: "手把手教会您和团队使用" },
  { step: "5", title: "持续优化", desc: "定期回访，持续迭代提升效果" },
];

export function TrustSection() {
  return (
    <section id="trust" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            值得信赖的 <span className="text-gradient">AI 服务商</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            从方案到落地，全程陪伴
          </p>
        </div>

        {/* 服务流程 */}
        <div className="mt-14">
          <h3 className="text-center text-xl font-semibold mb-8">服务流程</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2">
            {SERVICE_STEPS.map((item, index) => (
              <div key={item.step} className="flex items-center gap-2">
                <div className="flex flex-col items-center text-center w-32">
                  <div className="flex size-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <h4 className="mt-2 text-sm font-semibold">{item.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                </div>
                {index < SERVICE_STEPS.length - 1 && (
                  <div className="hidden sm:block w-8 h-0.5 bg-blue-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 信任要素 */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-background p-6 text-center">
            <CheckCircle className="mx-auto size-10 text-green-500 mb-3" />
            <h3 className="font-semibold">全球顶尖 AI 技术</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              接入 GPT-5、Claude、Gemini 等世界最强 AI 模型
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 text-center">
            <Building2 className="mx-auto size-10 text-blue-500 mb-3" />
            <h3 className="font-semibold">专业服务团队</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              AI 行业资深专家，深耕企业数字化转型
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 text-center">
            <Handshake className="mx-auto size-10 text-purple-500 mb-3" />
            <h3 className="font-semibold">效果导向合作</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              不满意可退款，用结果说话，与您共赢
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
