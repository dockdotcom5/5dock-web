import Link from "next/link";

const FOOTER_GROUPS = [
  {
    title: "产品",
    links: [
      { label: "企业 AI 方案", href: "#enterprise" },
      { label: "API 中转站", href: "#api" },
      { label: "AiryBuddy", href: "#airybuddy" },
      { label: "AI 培训", href: "#training" },
    ],
  },
  {
    title: "开发者",
    links: [
      { label: "模型列表", href: "/models" },
      { label: "定价", href: "/pricing" },
      { label: "文档", href: "/docs" },
    ],
  },
  {
    title: "法律",
    links: [
      { label: "服务条款", href: "/terms" },
      { label: "隐私政策", href: "/privacy" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-3 lg:col-span-2">
            <span className="text-gradient text-xl font-bold">5Dock AI</span>
            <p className="text-sm text-muted-foreground">
              为所有人提供最前沿的 AI 能力
            </p>
            <p className="text-sm text-muted-foreground">
              企业 AI 员工平台 · API 中转站 · AI 伙伴 · AI 培训
            </p>
          </div>

          {/* Link Groups */}
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; 2026 5Dock AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
