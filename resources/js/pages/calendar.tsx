import React, { useState } from "react"
import Calendar from "react-calendar"
import type { CalendarType } from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AppLayout from "@/layouts/app-layout"
import { usePage, Head } from '@inertiajs/react'
import { Calendar as CalendarIcon } from "lucide-react"

export default function CalendarPage() {
    function formatDate(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
    }   

    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const { tasks } = (usePage().props as unknown) as { tasks: Array<{ id: number, title: string, date: string, priority: string }> }

    const dateStr = formatDate(selectedDate)
    const todayTasks = tasks.filter((t) => t.date === dateStr)

    function getTaskCount(date: Date) {
        const d = formatDate(date)
        return tasks.filter((t) => t.date === d).length
    }

    function getPriorityColor(priority: string): string | undefined {
        switch (priority.toLowerCase()) {
            case "tinggi":
            case "high":
                return "bg-app-error text-white"
            case "sedang":
            case "medium":
                return "bg-app-primary text-app-primary-foreground"
            case "rendah":
            case "low":
                return "bg-app-border text-app-text"
            default:
                return "bg-app-background text-app-text-secondary"
        }
    }

    function getPriorityLabel(priority: string): string {
        switch (priority.toLowerCase()) {
            case "high":
            case "tinggi":
                return "Tinggi"
            case "medium":
            case "sedang":
                return "Sedang"
            case "low":
            case "rendah":
                return "Rendah"
            default:
                return priority
        }
    }

    return (
        <div className="min-h-screen bg-app-background">
            <Head title="Kalender" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-app-primary-light flex items-center justify-center shadow-sm">
                            <CalendarIcon className="h-6 w-6 text-app-primary"/>
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold text-app-text">
                                Kalender
                            </h1>

                            <p className="text-app-text-secondary">
                                Lihat jadwal tugas berdasarkan tanggal dan pantau aktivitas Anda.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Calendar and Task List */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Calendar Section */}
                    <Card className="lg:col-span-2 bg-app-background-secondary border border-app-border shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-app-primary">
                                <CalendarIcon className="h-6 w-6" />
                                Kalender Tugas
                            </CardTitle>

                            <CardDescription className="text-app-text-secondary">
                                Pilih tanggal untuk melihat tugas yang dijadwalkan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center">
                                <Calendar
                                    onChange={(value) => value && setSelectedDate(value as Date)}
                                    value={selectedDate}
                                    calendarType={"iso8601" as CalendarType}
                                    tileContent={({ date, view }) =>
                                        view === "month" && getTaskCount(date) > 0 ? (
                                            <span className="flex justify-center mt-1">
                                                <span className="flex w-5 h-5 bg-app-primary text-white text-xs rounded-full items-center justify-center font-bold shadow hover:scale-110 transition-transform duration-150">
                                                    {getTaskCount(date)}
                                                </span>
                                            </span>
                                        ) : null
                                    }
                                    className="react-calendar text-base"
                                    tileClassName={({ date, view }) => {
                                        const d = formatDate(date)
                                        if (view === "month" && tasks.some((t) => t.date === d)) {
                                            return "font-bold text-app-primary hover:bg-app-primary-light cursor-pointer"
                                        }
                                        return ""
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Task List Section */}
                    <Card className="lg:col-span-3 bg-app-background-secondary border border-app-border shadow-sm">
                        <CardHeader className="flex flex-col items-start gap-2">
                            <CardTitle className="flex items-center gap-2 text-app-primary">
                                <CalendarIcon className="h-5 w-5" />
                                {selectedDate.toLocaleDateString("id-ID")}
                            </CardTitle>

                            <CardDescription className="text-app-text-secondary">
                                {todayTasks.length} tugas ditemukan
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-app-border" />

                            {todayTasks.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-app-border bg-app-background/60 py-8">
                                    <span className="text-lg text-app-text-secondary">Tidak ada tugas pada tanggal ini.</span>
                                    <span className="mt-1 text-sm text-app-text-secondary">Pilih tanggal lain untuk melihat tugas.</span>
                                </div>
                            ) : (
                                <ul className="space-y-3">
                                    {todayTasks.map((task) => (
                                        <li key={task.id}>
                                            <Card className="border border-app-border bg-app-background shadow-sm transition hover:shadow-md">
                                                <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                                                    <div className="flex items-start gap-3">
                                                        <Badge className={getPriorityColor(task.priority)}>
                                                            {getPriorityLabel(task.priority)}
                                                        </Badge>
                                                        <div>
                                                            <div className="font-semibold text-app-primary">{task.title}</div>
                                                            <div className="mt-1 text-xs text-app-text-secondary">
                                                                Prioritas: {getPriorityLabel(task.priority)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

CalendarPage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>