"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
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
  User,
  Shield,
  Users,
  AlertTriangle,
  Copy,
  Link as LinkIcon,
  Wallet,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { userApi, apiRequest, quotaToDollars } from "@/lib/api"

interface MessageState {
  readonly type: "success" | "error"
  readonly text: string
}

function ProfileSection() {
  const { user, refreshUser } = useAuth()
  const [displayName, setDisplayName] = React.useState<string>("")
  const [saving, setSaving] = React.useState(false)
  const [message, setMessage] = React.useState<MessageState | null>(null)

  React.useEffect(() => {
    if (user) {
      setDisplayName(user.display_name || "")
    }
  }, [user])

  const handleSave = React.useCallback(async () => {
    if (!displayName.trim()) {
      setMessage({ type: "error", text: "显示名称不能为空" })
      return
    }
    setSaving(true)
    setMessage(null)

    const res = await userApi.update({ display_name: displayName.trim() })
    if (res.success) {
      setMessage({ type: "success", text: "保存成功" })
      await refreshUser()
    } else {
      setMessage({ type: "error", text: res.message || "保存失败" })
    }
    setSaving(false)
  }, [displayName, refreshUser])

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="size-4" />
          基本信息
        </CardTitle>
        <CardDescription>管理你的个人资料</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">用户名</Label>
          <Input
            id="username"
            value={user.username}
            disabled
            className="max-w-sm"
          />
          <p className="text-xs text-muted-foreground">用户名不可修改</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="display-name">显示名称</Label>
          <div className="flex gap-2">
            <Input
              id="display-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="max-w-sm"
            />
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "保存中..." : "保存"}
            </Button>
          </div>
          {message && (
            <p
              className={`text-xs ${
                message.type === "success"
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {message.text}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input
            id="email"
            type="email"
            value={user.email || ""}
            disabled
            className="max-w-sm"
          />
        </div>
      </CardContent>
    </Card>
  )
}

function SecuritySection() {
  const [oldPassword, setOldPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [saving, setSaving] = React.useState(false)
  const [message, setMessage] = React.useState<MessageState | null>(null)

  const handleUpdatePassword = React.useCallback(async () => {
    if (!oldPassword) {
      setMessage({ type: "error", text: "请输入当前密码" })
      return
    }
    if (!newPassword) {
      setMessage({ type: "error", text: "请输入新密码" })
      return
    }
    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "新密码至少 8 位" })
      return
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "两次输入的密码不一致" })
      return
    }

    setSaving(true)
    setMessage(null)

    const res = await userApi.update({
      original_password: oldPassword,
      password: newPassword,
    })

    if (res.success) {
      setMessage({ type: "success", text: "密码更新成功" })
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } else {
      setMessage({ type: "error", text: res.message || "密码更新失败" })
    }
    setSaving(false)
  }, [oldPassword, newPassword, confirmPassword])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="size-4" />
          安全设置
        </CardTitle>
        <CardDescription>保护你的账号安全</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold">修改密码</Label>
          <div className="grid max-w-sm gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="old-password" className="text-xs">
                旧密码
              </Label>
              <Input
                id="old-password"
                type="password"
                placeholder="输入当前密码"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-password" className="text-xs">
                新密码
              </Label>
              <Input
                id="new-password"
                type="password"
                placeholder="输入新密码（至少 8 位）"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password" className="text-xs">
                确认新密码
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="再次输入新密码"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          {message && (
            <p
              className={`text-xs ${
                message.type === "success"
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {message.text}
            </p>
          )}
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            onClick={handleUpdatePassword}
            disabled={saving}
          >
            {saving ? "更新中..." : "更新密码"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ReferralSection() {
  const { user, refreshUser } = useAuth()
  const [transferring, setTransferring] = React.useState(false)
  const [message, setMessage] = React.useState<MessageState | null>(null)
  const [copySuccess, setCopySuccess] = React.useState<string | null>(null)

  if (!user) return null

  const affCode = user.aff_code || ""
  const affLink = affCode
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/register?aff=${affCode}`
    : ""

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopySuccess(label)
    setTimeout(() => setCopySuccess(null), 2000)
  }

  const handleTransfer = async () => {
    setTransferring(true)
    setMessage(null)

    try {
      const res = await apiRequest("/user/self/aff_transfer", {
        method: "POST",
      })
      if (res.success) {
        setMessage({ type: "success", text: "转移成功！余额已更新" })
        await refreshUser()
      } else {
        setMessage({
          type: "error",
          text: res.message || "转移失败",
        })
      }
    } catch {
      setMessage({ type: "error", text: "网络错误" })
    }
    setTransferring(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="size-4" />
          邀请返佣
        </CardTitle>
        <CardDescription>邀请好友注册，双方均可获得奖励</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Referral Code */}
        <div className="space-y-2">
          <Label>我的邀请码</Label>
          <div className="flex gap-2">
            <Input
              value={affCode}
              readOnly
              className="max-w-xs font-mono"
            />
            <Button
              variant="outline"
              size="icon"
              title={
                copySuccess === "code" ? "已复制" : "复制邀请码"
              }
              onClick={() => handleCopy(affCode, "code")}
              disabled={!affCode}
            >
              <Copy className="size-4" />
            </Button>
          </div>
        </div>

        {/* Referral Link */}
        <div className="space-y-2">
          <Label>邀请链接</Label>
          <div className="flex gap-2">
            <Input
              value={affLink}
              readOnly
              className="max-w-md text-xs"
            />
            <Button
              variant="outline"
              size="icon"
              title={
                copySuccess === "link" ? "已复制" : "复制链接"
              }
              onClick={() => handleCopy(affLink, "link")}
              disabled={!affLink}
            >
              <LinkIcon className="size-4" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Transfer */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleTransfer}
            disabled={transferring}
          >
            <Wallet className="size-4" />
            {transferring ? "转移中..." : "提现到账户余额"}
          </Button>
          {message && (
            <p
              className={`text-xs ${
                message.type === "success"
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {message.text}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function DangerSection() {
  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="size-4" />
          危险操作
        </CardTitle>
        <CardDescription>以下操作不可撤销，请谨慎操作</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-4">
          <div>
            <p className="text-sm font-medium text-red-900">注销账号</p>
            <p className="text-xs text-red-600">
              注销后所有数据将被永久删除，无法恢复
            </p>
          </div>
          <Dialog>
            <DialogTrigger
              render={<Button variant="destructive">注销账号</Button>}
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-red-600">
                  确认注销账号
                </DialogTitle>
                <DialogDescription>
                  此操作不可撤销。注销后，你的所有数据（API
                  密钥、用量记录、余额）将被永久删除。
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-lg bg-red-50 p-3">
                <p className="text-sm font-medium text-red-800">
                  请输入 &quot;DELETE&quot; 以确认注销：
                </p>
                <Input className="mt-2" placeholder='输入 "DELETE"' />
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                <p className="text-sm text-amber-800">
                  注销功能即将上线，敬请期待。如需删除账号，请联系客服。
                </p>
              </div>
              <DialogFooter>
                <DialogClose
                  render={<Button variant="outline">取消</Button>}
                />
                <Button variant="destructive" disabled>确认注销</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">账号设置</h2>
        <p className="text-sm text-muted-foreground">
          管理你的账号信息和偏好设置
        </p>
      </div>

      <ProfileSection />
      <SecuritySection />
      <ReferralSection />
      <DangerSection />
    </div>
  )
}
