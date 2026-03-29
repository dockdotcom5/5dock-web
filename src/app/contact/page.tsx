"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Building2, Phone, User, Briefcase, MessageSquare } from "lucide-react";
import type { Metadata } from "next";

const INDUSTRIES = [
  "电商/零售",
  "外贸/跨境",
  "制造业",
  "服务业",
  "餐饮",
  "教育/培训",
  "医疗健康",
  "金融",
  "房地产",
  "其他",
];

const COMPANY_SIZES = [
  "1-10 人",
  "11-50 人",
  "51-200 人",
  "201-500 人",
  "500 人以上",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company_name: "",
    industry: "",
    company_size: "",
    problem_desc: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: 接入后端 API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <CheckCircle className="mx-auto size-16 text-green-500" />
        <h1 className="mt-6 text-3xl font-bold">提交成功！</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          感谢您的信任，我们将在 1 小时内与您联系
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          工作时间：9:00-22:00，非工作时间将在次日优先联系您
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* 左侧：价值说明 */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold sm:text-4xl">
            预约免费演示
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            留下您的信息，我们的 AI 专家将为您量身定制解决方案
          </p>

          <div className="mt-8 space-y-4">
            {[
              "1 对 1 专家咨询，深入了解您的需求",
              "免费演示 AI 如何解决您的具体业务问题",
              "获取定制化方案和 ROI 预估报告",
              "无任何附加费用，不满意无需付款",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 size-5 flex-shrink-0 text-green-500" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：表单 */}
        <div className="rounded-2xl border border-border bg-background p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 姓名 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                姓名 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  required
                  placeholder="请输入您的姓名"
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* 手机号 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                手机号 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="tel"
                  required
                  pattern="1[3-9]\d{9}"
                  placeholder="请输入手机号"
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* 公司名称 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                公司名称
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="选填"
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                />
              </div>
            </div>

            {/* 行业 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                行业 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <select
                  required
                  className="w-full appearance-none rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                >
                  <option value="">请选择行业</option>
                  {INDUSTRIES.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 企业规模 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                企业规模
              </label>
              <select
                className="w-full appearance-none rounded-lg border border-border bg-background py-2.5 px-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.company_size}
                onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
              >
                <option value="">请选择企业规模</option>
                {COMPANY_SIZES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* 问题描述 */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                当前最想解决的问题
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <textarea
                  rows={3}
                  placeholder="简单描述您希望 AI 帮您解决的问题（选填）"
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.problem_desc}
                  onChange={(e) => setFormData({ ...formData, problem_desc: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-brand flex w-full items-center justify-center gap-2 rounded-lg py-3 text-base font-semibold text-white shadow-lg transition-all hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "提交中..." : "预约免费演示"}
              {!loading && <ArrowRight className="size-4" />}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              提交即表示您同意我们的隐私政策，我们承诺保护您的信息安全
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
