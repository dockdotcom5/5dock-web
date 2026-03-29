"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "不懂 AI 可以用吗？",
    answer: "完全可以！我们的产品专为不懂技术的老板设计，零学习成本，会说话就能用。我们的团队会全程协助您配置和使用。",
  },
  {
    question: "是否需要部署很多系统？",
    answer: "不需要。我们采用云端部署，您无需购买服务器、安装软件，打开浏览器就能使用。所有技术细节由我们搞定。",
  },
  {
    question: "适合哪些企业？",
    answer: "适合所有中小企业，尤其是电商、外贸、零售、服务业、制造业等行业。只要有重复性工作、需要客服、营销、数据分析的企业，都能从 AI 中获益。",
  },
  {
    question: "多久能见效？",
    answer: "最快 7 天部署上线，通常 1-2 周就能看到明显的效率提升和成本节省。我们会持续跟进优化，确保效果。",
  },
  {
    question: "与普通 AI 工具有什么区别？",
    answer: "普通 AI 工具需要您自己学习、配置、调试。我们是完整的解决方案——帮您分析场景、配置工具、培训使用、持续优化。您只需要说出需求，我们搞定一切。",
  },
  {
    question: "数据安全吗？",
    answer: "绝对安全。我们采用企业级数据加密，所有数据存储在国内合规服务器上，严格遵守数据保护法规。您的商业数据不会被用于任何其他用途。",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            常见问题
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            还有疑问？随时联系我们
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-background overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium hover:bg-muted/50 transition-colors"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`size-5 text-muted-foreground transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-sm text-muted-foreground">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
