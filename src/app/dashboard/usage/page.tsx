"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, Hash, DollarSign, Clock } from "lucide-react"
import { logApi, quotaToDollars } from "@/lib/api"
import type { LogEntry } from "@/lib/api"

interface StatItem {
  readonly label: string
  readonly value: string
  readonly icon: typeof Activity
  readonly color: string
  readonly bgColor: string
}

interface ModelStat {
  readonly model: string
  readonly calls: number
  readonly tokens: number
  readonly cost: number
  readonly percentage: number
  readonly color: string
}

const TIME_RANGES = [
  { label: "今天", days: 0 },
  { label: "7天", days: 7 },
  { label: "30天", days: 30 },
] as const

const MODEL_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
] as const

function getTimeRange(days: number): {
  start: number
  end: number
} {
  const now = new Date()
  const end = Math.floor(now.getTime() / 1000)
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  if (days > 0) {
    startDate.setDate(startDate.getDate() - days)
  }
  const start = Math.floor(startDate.getTime() / 1000)
  return { start, end }
}

function formatTimestamp(ts: number): string {
  const d = new Date(ts * 1000)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function UsagePage() {
  const [selectedRange, setSelectedRange] = useState<number>(7)
  const [overviewStats, setOverviewStats] = useState<readonly StatItem[]>([])
  const [modelStats, setModelStats] = useState<readonly ModelStat[]>([])
  const [logs, setLogs] = useState<readonly LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { start, end } = getTimeRange(selectedRange)

      const [statRes, logRes] = await Promise.all([
        logApi.getSelfStats({
          start_timestamp: String(start),
          end_timestamp: String(end),
        }),
        logApi.getSelfLogs({
          start_timestamp: String(start),
          end_timestamp: String(end),
          size: "50",
        }),
      ])

      // 处理统计数据
      if (statRes.success && Array.isArray(statRes.data)) {
        const rawStats = statRes.data as readonly {
          model_name?: string
          quota?: number
          token?: number
          request_count?: number
          prompt_tokens?: number
          completion_tokens?: number
        }[]

        const totalQuota = rawStats.reduce((s, r) => s + (r.quota || 0), 0)
        const totalTokens = rawStats.reduce((s, r) => s + (r.token || 0), 0)
        const totalRequests = rawStats.reduce(
          (s, r) => s + (r.request_count || 0),
          0
        )

        setOverviewStats([
          {
            label: "总请求数",
            value: totalRequests.toLocaleString(),
            icon: Activity,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
          },
          {
            label: "总 Token 数",
            value: totalTokens.toLocaleString(),
            icon: Hash,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
          },
          {
            label: "总花费",
            value: quotaToDollars(totalQuota),
            icon: DollarSign,
            color: "text-amber-600",
            bgColor: "bg-amber-50",
          },
          {
            label: "平均每次花费",
            value:
              totalRequests > 0
                ? quotaToDollars(Math.round(totalQuota / totalRequests))
                : "$0.00",
            icon: Clock,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
          },
        ])

        // 按模型聚合
        const modelMap = new Map<
          string,
          { calls: number; tokens: number; cost: number }
        >()
        for (const r of rawStats) {
          const name = r.model_name || "unknown"
          const existing = modelMap.get(name) || {
            calls: 0,
            tokens: 0,
            cost: 0,
          }
          modelMap.set(name, {
            calls: existing.calls + (r.request_count || 0),
            tokens: existing.tokens + (r.token || 0),
            cost: existing.cost + (r.quota || 0),
          })
        }

        const totalCallsForPercent = Array.from(modelMap.values()).reduce(
          (s, v) => s + v.calls,
          0
        )

        const builtModelStats: readonly ModelStat[] = Array.from(
          modelMap.entries()
        )
          .sort((a, b) => b[1].calls - a[1].calls)
          .map(([model, data], idx) => ({
            model,
            calls: data.calls,
            tokens: data.tokens,
            cost: data.cost,
            percentage:
              totalCallsForPercent > 0
                ? Math.round((data.calls / totalCallsForPercent) * 100)
                : 0,
            color: MODEL_COLORS[idx % MODEL_COLORS.length],
          }))

        setModelStats(builtModelStats)
      }

      // 日志列表
      if (logRes.success && Array.isArray(logRes.data)) {
        setLogs(logRes.data as readonly LogEntry[])
      }
    } catch {
      setError("加载统计数据失败，请稍后重试")
    } finally {
      setLoading(false)
    }
  }, [selectedRange])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">用量统计</h2>
          <p className="text-sm text-muted-foreground">
            查看你的 API 使用详情
          </p>
        </div>
        <div className="flex gap-2">
          {TIME_RANGES.map((range) => (
            <Button
              key={range.label}
              variant={selectedRange === range.days ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRange(range.days)}
              className={
                selectedRange === range.days
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : ""
              }
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
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
      ) : error ? (
        <div className="py-8 text-center">
          <p className="text-sm text-red-500">{error}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={fetchData}
          >
            重试
          </Button>
        </div>
      ) : (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {overviewStats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label}>
                  <CardContent className="flex items-center gap-4 pt-0">
                    <div className={`rounded-xl p-3 ${stat.bgColor}`}>
                      <Icon className={`size-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Model Distribution */}
          {modelStats.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>按模型分布</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {modelStats.map((item) => (
                  <div key={item.model} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block size-3 rounded-full ${item.color}`}
                        />
                        <span className="font-medium">{item.model}</span>
                      </div>
                      <span className="text-muted-foreground">
                        {item.percentage}%
                      </span>
                    </div>
                    <Progress value={item.percentage} />
                    <div className="flex gap-6 text-xs text-muted-foreground">
                      <span>调用: {item.calls.toLocaleString()} 次</span>
                      <span>Token: {item.tokens.toLocaleString()}</span>
                      <span>花费: {quotaToDollars(item.cost)}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Model Table */}
          {modelStats.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>模型明细</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="pb-3 pr-4 font-medium">模型</th>
                        <th className="pb-3 pr-4 text-right font-medium">
                          调用次数
                        </th>
                        <th className="pb-3 pr-4 text-right font-medium">
                          Token 数
                        </th>
                        <th className="pb-3 pr-4 text-right font-medium">
                          花费
                        </th>
                        <th className="pb-3 text-right font-medium">占比</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modelStats.map((item) => (
                        <tr
                          key={item.model}
                          className="border-b last:border-0"
                        >
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-block size-2.5 rounded-full ${item.color}`}
                              />
                              <span className="font-medium">{item.model}</span>
                            </div>
                          </td>
                          <td className="py-3 pr-4 text-right tabular-nums">
                            {item.calls.toLocaleString()}
                          </td>
                          <td className="py-3 pr-4 text-right tabular-nums">
                            {item.tokens.toLocaleString()}
                          </td>
                          <td className="py-3 pr-4 text-right font-medium tabular-nums">
                            {quotaToDollars(item.cost)}
                          </td>
                          <td className="py-3 text-right tabular-nums">
                            {item.percentage}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Logs */}
          <Card>
            <CardHeader>
              <CardTitle>调用记录</CardTitle>
            </CardHeader>
            <CardContent>
              {logs.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  该时间段暂无调用记录
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
                      {logs.map((log) => {
                        const totalTokens =
                          (log.prompt_tokens || 0) +
                          (log.completion_tokens || 0)
                        return (
                          <tr
                            key={log.id}
                            className="border-b last:border-0"
                          >
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
        </>
      )}
    </div>
  )
}
