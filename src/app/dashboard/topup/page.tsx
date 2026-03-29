"use client"

import { useState, useEffect, useCallback } from "react"
import type { ChangeEvent } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Wallet, Gift, CheckCircle, Clock, XCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { topupApi, quotaToDollars } from "@/lib/api"

interface TopupPlan {
  readonly id: string
  readonly cny: number
  readonly usd: string
  readonly bonus: string | null
  readonly recommended: boolean
}

const DEFAULT_PLANS: readonly TopupPlan[] = [
  { id: "p1", cny: 10, usd: "$1.43", bonus: null, recommended: false },
  { id: "p2", cny: 50, usd: "$7.14", bonus: "送 5%", recommended: true },
  { id: "p3", cny: 100, usd: "$14.29", bonus: "送 10%", recommended: false },
  { id: "p4", cny: 500, usd: "$71.43", bonus: "送 15%", recommended: false },
] as const

const PAYMENT_METHODS = [
  { id: "wechat", label: "微信支付", icon: "wx" },
  { id: "alipay", label: "支付宝", icon: "zfb" },
] as const

interface TopupRecord {
  readonly id: number
  readonly amount: number
  readonly status: string
  readonly created_at: number
  readonly trade_no?: string
}

function formatTimestamp(ts: number): string {
  const d = new Date(ts * 1000)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function StatusBadge({ status }: { readonly status: string }) {
  switch (status) {
    case "success":
    case "paid":
      return (
        <Badge
          variant="secondary"
          className="gap-1 bg-emerald-50 text-emerald-700"
        >
          <CheckCircle className="size-3" />
          成功
        </Badge>
      )
    case "pending":
      return (
        <Badge
          variant="secondary"
          className="gap-1 bg-amber-50 text-amber-700"
        >
          <Clock className="size-3" />
          处理中
        </Badge>
      )
    case "failed":
    case "expired":
      return (
        <Badge variant="secondary" className="gap-1 bg-red-50 text-red-600">
          <XCircle className="size-3" />
          失败
        </Badge>
      )
    default:
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-500">
          {status}
        </Badge>
      )
  }
}

export default function TopupPage() {
  const { user, refreshUser } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string>("p2")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("wechat")
  const [redeemCode, setRedeemCode] = useState("")
  const [records, setRecords] = useState<readonly TopupRecord[]>([])
  const [loadingRecords, setLoadingRecords] = useState(true)
  const [paying, setPaying] = useState(false)
  const [redeeming, setRedeeming] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
    setSelectedPlan("")
  }

  const fetchRecords = useCallback(async () => {
    setLoadingRecords(true)
    // topup records API may not exist on all NewAPI installs
    // gracefully handle
    try {
      const res = await topupApi.getInfo()
      // getInfo returns topup config, not records
      // records might not be available
    } catch {
      // ignore
    }
    setLoadingRecords(false)
  }, [])

  useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  const handlePay = useCallback(async () => {
    const plan = DEFAULT_PLANS.find((p) => p.id === selectedPlan)
    const amount = plan
      ? plan.cny
      : customAmount
        ? Number(customAmount)
        : 0

    if (!amount || amount <= 0) {
      setMessage({ type: "error", text: "请选择或输入充值金额" })
      return
    }

    setPaying(true)
    setMessage(null)

    const res = await topupApi.epayPay(amount, paymentMethod)
    if (res.success && res.data) {
      // data 通常是支付链接
      if (typeof res.data === "string" && res.data.startsWith("http")) {
        window.open(res.data, "_blank")
        setMessage({ type: "success", text: "已打开支付页面，支付完成后余额将自动到账" })
      } else {
        setMessage({ type: "success", text: res.message || "支付请求已提交" })
      }
    } else {
      setMessage({ type: "error", text: res.message || "支付请求失败" })
    }
    setPaying(false)
  }, [selectedPlan, customAmount, paymentMethod])

  const handleRedeem = useCallback(async () => {
    if (!redeemCode.trim()) {
      setMessage({ type: "error", text: "请输入兑换码" })
      return
    }

    setRedeeming(true)
    setMessage(null)

    const res = await topupApi.redeemCode(redeemCode.trim())
    if (res.success) {
      setMessage({ type: "success", text: "兑换成功！余额已更新" })
      setRedeemCode("")
      await refreshUser()
    } else {
      setMessage({ type: "error", text: res.message || "兑换失败" })
    }
    setRedeeming(false)
  }, [redeemCode, refreshUser])

  const balanceDisplay = user ? quotaToDollars(user.quota) : "$0.00"
  const balanceCny = user
    ? `约 ¥${((user.quota / 500_000) * 7).toFixed(2)}，参考汇率，以实际支付为准`
    : ""

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">充值</h2>
        <p className="text-sm text-muted-foreground">
          为你的账户充值以继续使用 API 服务
        </p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Current Balance */}
      <Card>
        <CardContent className="flex items-center gap-4 pt-0">
          <div className="rounded-xl bg-blue-50 p-4">
            <Wallet className="size-8 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">当前余额</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-blue-600">
                {balanceDisplay}
              </span>
              <span className="text-sm text-muted-foreground">
                ({balanceCny})
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <div>
        <Label className="mb-3 text-base font-semibold">选择充值方案</Label>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {DEFAULT_PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => handleSelectPlan(plan.id)}
                className={`relative flex flex-col items-center gap-1 rounded-xl border-2 p-4 transition-all ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                {plan.recommended && (
                  <Badge className="absolute -top-2.5 right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    推荐
                  </Badge>
                )}
                <span className="text-2xl font-bold text-gray-900">
                  ¥{plan.cny}
                </span>
                <span className="text-sm text-muted-foreground">
                  {plan.usd}
                </span>
                {plan.bonus && (
                  <Badge
                    variant="secondary"
                    className="mt-1 bg-amber-50 text-amber-700"
                  >
                    <Gift className="mr-1 size-3" />
                    {plan.bonus}
                  </Badge>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Custom Amount */}
      <div className="space-y-2">
        <Label htmlFor="custom-amount">自定义金额 (¥)</Label>
        <Input
          id="custom-amount"
          type="number"
          placeholder="输入自定义金额"
          value={customAmount}
          onChange={handleCustomAmountChange}
        />
        {customAmount && Number(customAmount) > 0 && (
          <p className="text-xs text-muted-foreground">
            约 ${(Number(customAmount) / 7).toFixed(2)} USD（参考汇率，以实际支付为准）
          </p>
        )}
      </div>

      {/* Payment Method */}
      <div>
        <Label className="mb-3 text-base font-semibold">支付方式</Label>
        <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
          {PAYMENT_METHODS.map((method) => {
            const isSelected = paymentMethod === method.id
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id)}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 p-3 text-sm font-medium transition-all ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                {method.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Submit */}
      <Button
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-5 text-base font-semibold text-white sm:w-auto sm:px-12"
        size="lg"
        onClick={handlePay}
        disabled={paying}
      >
        {paying ? "处理中..." : "立即支付"}
      </Button>

      <Separator />

      {/* Redeem Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Gift className="size-4" />
            兑换码
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">
            输入兑换码可直接充值到账户余额
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="输入兑换码"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value)}
              className="max-w-xs"
            />
            <Button
              variant="outline"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              onClick={handleRedeem}
              disabled={redeeming}
            >
              {redeeming ? "兑换中..." : "兑换"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
