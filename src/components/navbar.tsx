"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, LogOut, LayoutDashboard, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth-context";
import { quotaToDollars } from "@/lib/api";

const NAV_LINKS = [
  { href: "/", label: "首页" },
  { href: "/models", label: "模型" },
  { href: "/pricing", label: "定价" },
  { href: "/docs", label: "文档" },
] as const;

function UserMenu() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) return null;

  const displayName = user.display_name || user.username;
  const balance = quotaToDollars(user.quota);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted">
            <User className="size-4" />
            <span>{displayName}</span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {balance}
            </Badge>
          </button>
        }
      />
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => router.push("/dashboard")}
        >
          <LayoutDashboard className="mr-2 size-4" />
          控制台
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => router.push("/dashboard/settings")}
        >
          <Settings className="mr-2 size-4" />
          设置
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={handleLogout}
        >
          <LogOut className="mr-2 size-4" />
          退出登录
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthButtons() {
  return (
    <>
      <Link
        href="/login"
        className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        登录
      </Link>
      <Link
        href="/register"
        className="bg-gradient-brand rounded-lg px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        注册
      </Link>
    </>
  );
}

function MobileAuthSection() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="mt-4 flex flex-col gap-2">
        <Link
          href="/login"
          className="flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          登录
        </Link>
        <Link
          href="/register"
          className="bg-gradient-brand flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          注册
        </Link>
      </div>
    );
  }

  const displayName = user.display_name || user.username;
  const balance = quotaToDollars(user.quota);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="mt-4 flex flex-col gap-1">
      <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground">
        <User className="size-4" />
        {displayName}
        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
          {balance}
        </Badge>
      </div>
      <Link
        href="/dashboard"
        className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        控制台
      </Link>
      <Link
        href="/dashboard/settings"
        className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        设置
      </Link>
      <button
        onClick={handleLogout}
        className="rounded-md px-3 py-2 text-left text-sm font-medium text-destructive transition-colors hover:bg-muted"
      >
        退出登录
      </button>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-sm border-border/40" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <span className="text-gradient text-xl font-bold tracking-tight">
            5Dock
          </span>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
            AI
          </Badge>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-2 md:flex">
          {!loading && (user ? <UserMenu /> : <AuthButtons />)}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon-sm">
                  <Menu className="size-5" />
                  <span className="sr-only">打开菜单</span>
                </Button>
              }
            />
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <span className="text-gradient text-lg font-bold">
                    5Dock
                  </span>{" "}
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0"
                  >
                    AI
                  </Badge>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                {!loading && <MobileAuthSection />}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
