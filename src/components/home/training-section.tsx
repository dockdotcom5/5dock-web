import { GraduationCap, Code2, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const COURSES = [
  {
    icon: Code2,
    title: "AI 编程课",
    description: "零基础入门，只要会说话就能写代码。从小游戏到完整应用，AI 手把手教你。",
    tag: "热门",
  },
  {
    icon: Building2,
    title: "企业 AI 培训",
    description: "为企业定制的 AI 培训方案，让团队快速掌握 AI 工具，提升整体效能。",
    tag: "定制",
  },
  {
    icon: GraduationCap,
    title: "AI 进阶课",
    description: "深入学习提示词工程、Agent 开发、自动化工作流搭建。",
    tag: "进阶",
  },
] as const;

export function TrainingSection() {
  return (
    <section className="py-20 sm:py-24" id="training">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-sm font-semibold text-amber-600">🎓 AI 培训</div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            让每个人<span className="text-gradient">学会 AI</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            从零基础到进阶，系统化的 AI 课程体系
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {COURSES.map((course) => (
            <Card
              key={course.title}
              className="group transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50">
                    <course.icon className="size-5 text-amber-600" />
                  </div>
                  <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-600">
                    {course.tag}
                  </span>
                </div>
                <h3 className="text-base font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
