import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import AppLayout from "@/layouts/app-layout"
import { usePage } from '@inertiajs/react'
import { BarChart3, CheckCircle2, ListTodo, Clock, TrendingUp, Sparkles } from "lucide-react"
import { Head } from '@inertiajs/react'

interface Task {
  id: number
  title: string
  completed: boolean
  priority: string
}

export default function StatsPage() {
  const { tasks = [] } = usePage().props as { tasks?: Task[] }

  const totalTodos = tasks.length
  const completedTodos = tasks.filter((t) => t.completed).length
  const pendingTodos = totalTodos - completedTodos
  const completionRate = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0

  const priorityStats = {
    high: tasks.filter((t) => t.priority === "high").length,
    medium: tasks.filter((t) => t.priority === "medium").length,
    low: tasks.filter((t) => t.priority === "low").length,
  }

  const priorityLabels = {
    high: "Tinggi",
    medium: "Sedang",
    low: "Rendah",
  }

  return (
    <>
      <Head title="Statistik" />
      <div className="min-h-screen bg-app-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-app-primary-light shadow-sm">
              <BarChart3 className="h-6 w-6 text-app-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-app-text">Statistik</h1>
              <p className="text-app-text-secondary">
                Lihat ringkasan statistik tugas Anda secara visual dan detail.
              </p>
            </div>
          </div>

          <Card className="overflow-hidden border border-app-border bg-app-background-secondary shadow-sm">
            <div className="border-b border-app-border bg-gradient-to-r from-app-primary/10 via-app-primary/5 to-transparent p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary text-white shadow-sm">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-2xl text-app-primary">Ringkasan Statistik</CardTitle>
                    </div>
                    <CardDescription className="mt-1 text-app-text-secondary">
                      Pantau progres penyelesaian tugas dan distribusi prioritas dengan lebih jelas.
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-app-border bg-app-background/70 px-3 py-1.5 text-sm font-medium text-app-text-secondary">
                  <TrendingUp className="h-4 w-4 text-app-success" />
                  {Math.round(completionRate)}% selesai
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              {totalTodos === 0 ? (
                <div className="rounded-xl border border-dashed border-app-border bg-app-background/60 py-12 text-center text-app-text-secondary">
                  Belum ada tugas yang tercatat.
                </div>
              ) : (
                <>
                  <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="border border-app-border bg-app-background shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-app-primary">Total Tugas</CardTitle>
                        <div className="rounded-lg bg-app-primary-light p-2">
                          <ListTodo className="h-4 w-4 text-app-primary" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-app-primary">{totalTodos}</div>
                        <p className="mt-1 text-xs text-app-text-secondary">Semua tugas yang tercatat</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-app-border bg-app-background shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-app-primary">Selesai</CardTitle>
                        <div className="rounded-lg bg-app-success-light p-2">
                          <CheckCircle2 className="h-4 w-4 text-app-success" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-app-success">{completedTodos}</div>
                        <p className="mt-1 text-xs text-app-text-secondary">Tugas yang sudah selesai</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-app-border bg-app-background shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-app-primary">Belum Selesai</CardTitle>
                        <div className="rounded-lg bg-app-warning-light p-2">
                          <Clock className="h-4 w-4 text-app-warning" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-app-warning">{pendingTodos}</div>
                        <p className="mt-1 text-xs text-app-text-secondary">Tugas yang masih pending</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mb-8 rounded-2xl border border-app-border bg-app-background/70 p-5 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-bold text-app-primary">Progress Penyelesaian</h3>
                      <span className="text-sm font-semibold text-app-text-secondary">{Math.round(completionRate)}%</span>
                    </div>
                    <Progress value={completionRate} className="h-3 bg-app-primary-light" />
                    <div className="mt-2 text-sm text-app-text-secondary">
                      {completedTodos} dari {totalTodos} tugas telah selesai
                    </div>
                  </div>

                  <div className="rounded-2xl border border-app-border bg-app-background/70 p-5 shadow-sm">
                    <h3 className="mb-3 font-bold text-app-primary">Statistik Prioritas</h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex min-w-[90px] flex-col items-center rounded-xl border border-app-border bg-app-background px-3 py-3">
                        <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-app-error font-bold text-white">
                          {priorityStats.high}
                        </span>
                        <span className="text-xs font-semibold text-app-primary">{priorityLabels.high}</span>
                      </div>
                      <div className="flex min-w-[90px] flex-col items-center rounded-xl border border-app-border bg-app-background px-3 py-3">
                        <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-app-primary font-bold text-white">
                          {priorityStats.medium}
                        </span>
                        <span className="text-xs font-semibold text-app-primary">{priorityLabels.medium}</span>
                      </div>
                      <div className="flex min-w-[90px] flex-col items-center rounded-xl border border-app-border bg-app-background px-3 py-3">
                        <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-app-border font-bold text-app-text">
                          {priorityStats.low}
                        </span>
                        <span className="text-xs font-semibold text-app-primary">{priorityLabels.low}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

StatsPage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>