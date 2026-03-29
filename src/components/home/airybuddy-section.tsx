import { MessageCircle, Smartphone, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: MessageCircle,
    title: "自然对话",
    description: "像和朋友聊天一样，随时提问、求助、闲聊",
  },
  {
    icon: Smartphone,
    title: "多平台接入",
    description: "微信、Telegram、网页……在你习惯的平台上使用",
  },
  {
    icon: Heart,
    title: "有记忆有个性",
    description: "记住你的偏好和习惯，越用越懂你",
  },
] as const;

export function AiryBuddySection() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24" id="airybuddy">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-sm font-semibold text-purple-600">💜 AiryBuddy</div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            你的 <span className="text-gradient">AI 伙伴</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            面向个人和家庭的 AI 助手，让每个人都有一个贴心的智能伙伴
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="group transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-center gap-3 pt-2 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-purple-50">
                  <feature.icon className="size-6 text-purple-500" />
                </div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
