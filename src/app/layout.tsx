import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "AI 搞定 - 零学习成本，将 AI 应用于公司经营",
    template: "%s | AI 搞定",
  },
  description:
    "AI 搞定中小企业一切需求。零学习成本使用世界最强 AI 科技成果，解决经营问题，提高经营效率。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <ThemeProvider defaultTheme="light">
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
