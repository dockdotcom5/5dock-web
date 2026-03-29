"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Plus,
  Copy,
  Pause,
  Play,
  Trash2,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react"
import { tokenApi, quotaToDollars } from "@/lib/api"

interface TokenItem {
  readonly id: number
  readonly name: string
  readonly key: string
  readonly status: number
  readonly created_time: number
  readonly used_quota: number
  readonly remain_quota: number
  readonly unlimited_quota: boolean
  readonly expired_time: number
  readonly models?: readonly string[]
}

function formatDate(ts: number): string {
  if (!ts) return "-"
  const d = new Date(ts * 1000)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function maskKey(key: string): string {
  if (!key || key.length < 8) return key || "sk-****"
  return `${key.slice(0, 3)}****${key.slice(-4)}`
}

function KeyStatusBadge({ status }: { readonly status: number }) {
  if (status === 1) {
    return (
      <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
        启用
      </Badge>
    )
  }
  return (
    <Badge variant="secondary" className="bg-gray-100 text-gray-500">
      已禁用
    </Badge>
  )
}

function KeyRow({
  token,
  onDelete,
  onToggleStatus,
}: {
  readonly token: TokenItem
  readonly onDelete: (id: number) => void
  readonly onToggleStatus: (id: number, currentStatus: number) => void
}) {
  const [showKey, setShowKey] = useState(false)
  const [fullKey, setFullKey] = useState<string | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)

  const displayKey = showKey && fullKey ? fullKey : maskKey(token.key)

  const handleRevealKey = useCallback(async () => {
    if (showKey) {
      setShowKey(false)
      return
    }
    if (fullKey) {
      setShowKey(true)
      return
    }
    const res = await tokenApi.getKey(token.id)
    if (res.success && res.data) {
      setFullKey(res.data as string)
      setShowKey(true)
    }
  }, [showKey, fullKey, token.id])

  const handleCopy = useCallback(async () => {
    let keyToCopy = fullKey
    if (!keyToCopy) {
      const res = await tokenApi.getKey(token.id)
      if (res.success && res.data) {
        keyToCopy = res.data as string
        setFullKey(keyToCopy)
      }
    }
    if (keyToCopy) {
      await navigator.clipboard.writeText(keyToCopy)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }, [fullKey, token.id])

  return (
    <tr className="border-b last:border-0">
      <td className="py-4 pr-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-blue-500" />
          <span className="font-medium">{token.name}</span>
        </div>
      </td>
      <td className="py-4 pr-4">
        <div className="flex items-center gap-2">
          <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs">
            {displayKey}
          </code>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={handleRevealKey}
          >
            {showKey ? (
              <EyeOff className="size-3" />
            ) : (
              <Eye className="size-3" />
            )}
          </Button>
        </div>
      </td>
      <td className="py-4 pr-4">
        <KeyStatusBadge status={token.status} />
      </td>
      <td className="py-4 pr-4 text-sm text-gray-500">
        {formatDate(token.created_time)}
      </td>
      <td className="py-4 pr-4 text-sm font-medium tabular-nums">
        {quotaToDollars(token.used_quota)}
      </td>
      <td className="py-4">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-xs"
            title={copySuccess ? "已复制" : "复制"}
            onClick={handleCopy}
          >
            <Copy className="size-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            title={token.status === 1 ? "禁用" : "启用"}
            onClick={() => onToggleStatus(token.id, token.status)}
          >
            {token.status === 1 ? (
              <Pause className="size-3" />
            ) : (
              <Play className="size-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            title="删除"
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(token.id)}
          >
            <Trash2 className="size-3" />
          </Button>
        </div>
      </td>
    </tr>
  )
}

function CreateKeyDialog({
  onCreated,
}: {
  readonly onCreated: () => void
}) {
  const [keyName, setKeyName] = useState("")
  const [dailyLimit, setDailyLimit] = useState("")
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleReset = () => {
    setKeyName("")
    setDailyLimit("")
    setError(null)
    setCreating(false)
  }

  const handleCreate = useCallback(async () => {
    if (!keyName.trim()) {
      setError("请输入密钥名称")
      return
    }
    setCreating(true)
    setError(null)

    const limitQuota = dailyLimit
      ? Math.round(Number(dailyLimit) * 500_000)
      : undefined

    const res = await tokenApi.create({
      name: keyName.trim(),
      remainQuota: limitQuota,
      unlimitedQuota: !limitQuota,
    })

    if (res.success) {
      setOpen(false)
      handleReset()
      onCreated()
    } else {
      setError(res.message || "创建失败")
    }
    setCreating(false)
  }, [keyName, dailyLimit, onCreated])

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) handleReset()
      }}
    >
      <DialogTrigger
        render={
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Plus className="size-4" />
            创建新密钥
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>创建 API 密钥</DialogTitle>
          <DialogDescription>
            为你的应用创建一个新的 API 密钥
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="key-name">密钥名称</Label>
            <Input
              id="key-name"
              placeholder="例如：生产环境"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="daily-limit">额度上限（可选，美元）</Label>
            <Input
              id="daily-limit"
              type="number"
              placeholder="例如：10（美元）"
              value={dailyLimit}
              onChange={(e) => setDailyLimit(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              留空表示不限制额度
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">取消</Button>} />
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            onClick={handleCreate}
            disabled={creating}
          >
            {creating ? "创建中..." : "确认创建"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function KeysPage() {
  const [tokens, setTokens] = useState<readonly TokenItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTokens = useCallback(async () => {
    setLoading(true)
    setError(null)
    const res = await tokenApi.list(1, 100)
    if (res.success && Array.isArray(res.data)) {
      setTokens(res.data as readonly TokenItem[])
    } else {
      setError(res.message || "加载密钥失败")
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTokens()
  }, [fetchTokens])

  const handleDelete = useCallback(
    async (id: number) => {
      if (!window.confirm("确定要删除这个密钥吗？")) return
      const res = await tokenApi.delete(id)
      if (res.success) {
        setTokens((prev) => prev.filter((t) => t.id !== id))
      } else {
        alert(res.message || "删除失败")
      }
    },
    []
  )

  const handleToggleStatus = useCallback(
    async (id: number, currentStatus: number) => {
      // NewAPI: status 1=enabled, 2=disabled
      const newStatus = currentStatus === 1 ? 2 : 1
      const res = await tokenApi.update(id, { status: newStatus })
      if (res.success) {
        fetchTokens()
      } else {
        alert(res.message || "操作失败")
      }
    },
    [fetchTokens]
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API 密钥管理</h2>
          <p className="text-sm text-muted-foreground">
            管理你的 API 密钥，控制访问权限
          </p>
        </div>
        <CreateKeyDialog onCreated={fetchTokens} />
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              加载中...
            </div>
          ) : error ? (
            <div className="py-8 text-center">
              <p className="text-sm text-red-500">{error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={fetchTokens}
              >
                重试
              </Button>
            </div>
          ) : tokens.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              暂无 API 密钥，点击上方按钮创建
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">名称</th>
                    <th className="pb-3 pr-4 font-medium">密钥</th>
                    <th className="pb-3 pr-4 font-medium">状态</th>
                    <th className="pb-3 pr-4 font-medium">创建时间</th>
                    <th className="pb-3 pr-4 font-medium">已用额度</th>
                    <th className="pb-3 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((token) => (
                    <KeyRow
                      key={token.id}
                      token={token}
                      onDelete={handleDelete}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">安全提示</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>- 请妥善保管你的 API 密钥，不要将其暴露在前端代码中</li>
            <li>- 建议为不同环境使用不同的密钥，方便管理和排查问题</li>
            <li>- 如果密钥泄露，请立即禁用并创建新的密钥</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
