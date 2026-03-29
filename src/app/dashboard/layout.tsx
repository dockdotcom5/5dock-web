"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Key,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { quotaToDollars } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { ReactNode } from "react"
import type { User } from "@/lib/auth-context"

const NAV_ITEMS = [
  { label: "概览", href: "/dashboard", icon: LayoutDashboard },
  { label: "API 密钥", href: "/dashboard/keys", icon: Key },
  { label: "用量统计", href: "/dashboard/usage", icon: BarChart3 },
  { label: "充值", href: "/dashboard/topup", icon: CreditCard },
  { label: "设置", href: "/dashboard/settings", icon: Settings },
] as const

const PAGE_TITLES: Readonly<Record<string, string>> = {
  "/dashboard": "概览",
  "/dashboard/keys": "API 密钥管理",
  "/dashboard/usage": "用量统计",
  "/dashboard/topup": "充值",
  "/dashboard/settings": "账号设置",
}

function SidebarNav({ pathname }: { readonly pathname: string }) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href)
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

function SidebarUserSection({
  user,
  onLogout,
}: {
  readonly user: User
  readonly onLogout: () => void
}) {
  const initial = (user.display_name || user.username || "U")
    .charAt(0)
    .toUpperCase()

  return (
    <div className="px-3 pb-4">
      <Separator className="mb-4" />
      <div className="flex items-center gap-3 rounded-lg px-3 py-2">
        <Avatar>
          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white">
            {initial}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-sm font-medium text-gray-900">
            {user.display_name || user.username}
          </p>
          <p className="truncate text-xs text-gray-500">{user.email}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        className="mt-1 w-full justify-start gap-3 px-3 text-gray-500 hover:text-red-600"
        onClick={onLogout}
      >
        <LogOut className="size-4" />
        退出登录
      </Button>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <p className="text-sm text-muted-foreground">加载中...</p>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  readonly children: ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, logout } = useAuth()
  const pageTitle = PAGE_TITLES[pathname] ?? "仪表盘"

  const handleLogout = React.useCallback(async () => {
    await logout()
    router.push("/login")
  }, [logout, router])

  // 未登录时 redirect
  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [loading, user, router])

  if (loading) return <LoadingScreen />
  if (!user) return <LoadingScreen />

  const balanceDisplay = quotaToDollars(user.quota)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-gray-200 bg-white md:flex md:flex-col">
        <div className="flex h-14 items-center px-6">
          <Link
            href="/dashboard"
            className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent"
          >
            5Dock AI
          </Link>
        </div>
        <Separator />
        <div className="mt-4 flex flex-1 flex-col justify-between">
          <SidebarNav pathname={pathname} />
          <SidebarUserSection user={user} onLogout={handleLogout} />
        </div>
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet>
        <div className="fixed top-0 left-0 z-40 flex h-14 w-full items-center gap-2 border-b border-gray-200 bg-white px-4 md:hidden">
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
              </Button>
            }
          />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent">
            5Dock AI
          </span>
        </div>
        <SheetContent side="left" className="w-60 p-0">
          <SheetHeader className="flex h-14 items-center px-6">
            <SheetTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              5Dock AI
            </SheetTitle>
          </SheetHeader>
          <Separator />
          <div className="mt-4 flex flex-1 flex-col justify-between">
            <SidebarNav pathname={pathname} />
            <SidebarUserSection user={user} onLogout={handleLogout} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header Bar */}
        <header className="hidden h-14 items-center justify-between border-b border-gray-200 bg-white px-6 md:flex">
          <h1 className="text-lg font-semibold text-gray-900">{pageTitle}</h1>
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5">
            <Wallet className="size-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              余额: <span className="text-blue-600">{balanceDisplay}</span>
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 pt-18 md:p-6 md:pt-6">{children}</main>
      </div>
    </div>
  )
}
