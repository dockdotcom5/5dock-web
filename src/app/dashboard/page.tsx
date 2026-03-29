"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  Activity,
  DollarSign,
  Key,
  Copy,
  Megaphone,
  ArrowRight,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { tokenApi, logApi, quotaToDollars, publicApi } from "@/lib/api"
import type { LogEntry } from "@/lib/api"

interface StatData {
  readonly label: string
  readonly value: string
  readonly icon: typeof Wallet
  readonly color: string
  readonly bgColor: string
}

interface Announcement {
  readonly id: number
  readonly title: string
  readonly content: string
  readonly date: string
  readonly isNew: boolean
}

const BASE_URL = "https://api.aigetdone.com/v1"

const CODE_EXAMPLE = `curl ${BASE_URL}/chat/completions \\
  -H "Authorization: Bearer sk-****" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"gpt-5","messages":[{"role":"user","content":"Hello"}]}'`

function StatCard({ stat }: { readonly stat: StatData }) {
  const Icon = stat.icon
  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-0">
        <div className={`rounded-xl p-3 ${stat.bgColor}`}>
          <Icon className={`size-5 ${stat.color}`} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function formatTimestamp(ts: number): string {
  const d = new Date(ts * 1000)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<readonly StatData[]>([])
  const [recentLogs, setRecentLogs] = useState<readonly LogEntry[]>([])
  const [announcements, setAnnouncements] = useState<readonly Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      // 今天 0 点的 timestamp
      const now = new Date()
      const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      )
      const startTimestamp = Math.floor(todayStart.getTime() / 1000)

      const [statRes, tokenRes, logRes, noticeRes] = await Promise.all([
        logApi.getSelfStats({
          start_timestamp: String(startTimestamp),
        }),
        tokenApi.list(1, 100),
        logApi.getSelfLogs({ size: "5" }),
        publicApi.getNotice().catch(() => ({
          success: false,
          message: "",
          data: undefined,
        })),
      ])

      // 构建统计卡片
      const todayQuota =
        statRes.success && Array.isArray(statRes.data)
          ? (statRes.data as readonly { quota?: number; request_count?: number }[]).reduce(
              (sum, s) => sum + (s.quota || 0),
              0
            )
          : 0
      const todayCalls =
        statRes.success && Array.isArray(statRes.data)
          ? (statRes.data as readonly { request_count?: number }[]).reduce(
              (sum, s) => sum + (s.request_count || 0),
              0
            )
          : 0

      const tokenCount =
        tokenRes.success && Array.isArray(tokenRes.data)
          ? tokenRes.data.length
          : 0

      const builtStats: readonly StatData[] = [
        {
          label: "当前余额",
          value: quotaToDollars(user.quota),
          icon: Wallet,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          label: "今日调用",
          value: `${todayCalls.toLocaleString()} 次`,
          icon: Activity,
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
        },
        {
          label: "今日消耗",
          value: quotaToDollars(todayQuota),
          icon: DollarSign,
          color: "text-amber-600",
          bgColor: "bg-amber-50",
        },
        {
          label: "API 密钥",
          value: `${tokenCount} 个`,
          icon: Key,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        },
      ]

      setStats(builtStats)

      // 最近记录
      if (logRes.success && Array.isArray(logRes.data)) {
        setRecentLogs(logRes.data as readonly LogEntry[])
      }

      // 公告
      if (noticeRes.success && noticeRes.data) {
        const raw = noticeRes.data
        if (typeof raw === "string") {
          setAnnouncements([
            {
              id: 1,
              title: "公告",
              content: raw,
              date: new Date().toISOString().split("T")[0],
              isNew: true,
            },
          ])
        } else if (Array.isArray(raw)) {
          setAnnouncements(
            (raw as readonly Announcement[]).map((a, i) => ({
              ...a,
              id: a.id || i + 1,
              isNew: i === 0,
            }))
          )
        }
      }
    } catch {
      setError("加载数据失败，请稍后重试")
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">欢迎回来</h2>
          <p className="text-sm text-muted-foreground">加载中...</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="flex items-center gap-4 pt-0">
                <div className="size-11 animate-pulse rounded-xl bg-gray-100" />
                <div className="space-y-2">
                  <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
                  <div className="h-6 w-20 animate-pulse rounded bg-gray-100" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">欢迎回来</h2>
          <p className="text-sm text-red-500">{error}</p>
        </div>
        <Button onClick={fetchData} variant="outline">
          重试
        </Button>
      </div>
    )
  }

  const displayName = user?.display_name || user?.username || "用户"

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          欢迎回来，{displayName}
        </h2>
        <p className="text-sm text-muted-foreground">这是你的 API 使用概览</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle>快速开始</CardTitle>
          <CardDescription>
            使用以下 Base URL 和你的 API Key 即可开始调用
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-lg bg-gray-100 px-3 py-2 font-mono text-sm text-gray-800">
              {BASE_URL}
            </code>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigator.clipboard.writeText(BASE_URL)}
            >
              <Copy className="size-4" />
            </Button>
          </div>
          <div className="rounded-lg bg-gray-900 p-4">
            <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm text-gray-100">
              {CODE_EXAMPLE}
            </pre>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Usage */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>最近使用记录</CardTitle>
          </CardHeader>
          <CardContent>
            {recentLogs.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                暂无使用记录
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 pr-4 font-medium">时间</th>
                      <th className="pb-3 pr-4 font-medium">模型</th>
                      <th className="pb-3 pr-4 text-right font-medium">
                        Token 数
                      </th>
                      <th className="pb-3 text-right font-medium">花费</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLogs.map((log) => {
                      const totalTokens =
                        (log.prompt_tokens || 0) + (log.completion_tokens || 0)
                      return (
                        <tr key={log.id} className="border-b last:border-0">
                          <td className="py-3 pr-4 text-gray-500">
                            {formatTimestamp(log.created_at)}
                          </td>
                          <td className="py-3 pr-4 font-medium">
                            {log.model_name}
                          </td>
                          <td className="py-3 pr-4 text-right tabular-nums">
                            {totalTokens.toLocaleString()}
                          </td>
                          <td className="py-3 text-right font-medium tabular-nums">
                            {quotaToDollars(log.quota)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="size-4" />
              公告
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.length === 0 ? (
              <p className="text-sm text-muted-foreground">暂无公告</p>
            ) : (
              announcements.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{item.title}</p>
                    {item.isNew && <Badge variant="default">新</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.content}
                  </p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              ))
            )}
            <Button variant="ghost" className="w-full gap-1 text-xs">
              查看全部公告 <ArrowRight className="size-3" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
