import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import AppLayout from "@/layouts/app-layout"
import { usePage } from '@inertiajs/react'
import { BarChart3, CheckCircle2, ListTodo, Clock } from "lucide-react"
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-app-background-secondary border border-app-border shadow-md mb-8">
            <CardHeader className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="h-7 w-7 text-app-primary" />
                <CardTitle className="text-app-primary text-2xl">Statistik Tugas</CardTitle>
              </div>
              <CardDescription className="text-app-text-secondary">
                Lihat ringkasan statistik tugas Anda secara visual dan detail.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {totalTodos === 0 ? (
                <div className="text-center py-12 text-app-text-secondary">
                  Belum ada tugas yang tercatat.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-app-background border border-app-border shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-app-primary">Total Tugas</CardTitle>
                        <ListTodo className="h-4 w-4 text-app-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-app-primary">{totalTodos}</div>
                        <p className="text-xs text-app-text-secondary">Semua tugas yang tercatat</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-app-background border border-app-border shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-app-primary">Selesai</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-app-success" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-app-success">{completedTodos}</div>
                        <p className="text-xs text-app-text-secondary">Tugas yang sudah selesai</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-app-background border border-app-border shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-app-primary">Belum Selesai</CardTitle>
                        <Clock className="h-4 w-4 text-app-warning" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-app-warning">{pendingTodos}</div>
                        <p className="text-xs text-app-text-secondary">Tugas yang masih pending</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-app-primary font-bold mb-2">Progress Penyelesaian</h3>
                    <Progress value={completionRate} className="bg-app-primary-light" />
                    <div className="text-sm text-app-text-secondary mt-2">
                      {Math.round(completionRate)}% tugas telah selesai
                    </div>
                  </div>

                  <div>
                    <h3 className="text-app-primary font-bold mb-2">Statistik Prioritas</h3>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="w-6 h-6 bg-app-error text-white rounded-full flex items-center justify-center font-bold mb-1">
                          {priorityStats.high}
                        </span>
                        <span className="text-xs text-app-primary font-semibold">{priorityLabels.high}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="w-6 h-6 bg-app-primary text-white rounded-full flex items-center justify-center font-bold mb-1">
                          {priorityStats.medium}
                        </span>
                        <span className="text-xs text-app-primary font-semibold">{priorityLabels.medium}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="w-6 h-6 bg-app-border text-app-text rounded-full flex items-center justify-center font-bold mb-1">
                          {priorityStats.low}
                        </span>
                        <span className="text-xs text-app-primary font-semibold">{priorityLabels.low}</span>
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