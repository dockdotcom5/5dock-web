import Link from "next/link";

const FOOTER_GROUPS = [
  {
    title: "产品",
    links: [
      { label: "应用场景", href: "#scenes" },
      { label: "解决方案", href: "#solutions" },
      { label: "常见问题", href: "#faq" },
    ],
  },
  {
    title: "服务",
    links: [
      { label: "预约演示", href: "/contact" },
      { label: "服务条款", href: "/terms" },
      { label: "隐私政策", href: "/privacy" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3 lg:col-span-2">
            <span className="text-gradient text-xl font-bold">AI 搞定</span>
            <p className="text-sm text-muted-foreground">
              零学习成本，将 AI 应用于公司经营
            </p>
            <p className="text-sm text-muted-foreground">
              AI 搞定中小企业一切需求
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
            &copy; 2026 AI 搞定. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
