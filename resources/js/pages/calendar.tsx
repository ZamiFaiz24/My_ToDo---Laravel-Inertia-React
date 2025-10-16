import React, { useState } from "react"
import Calendar from "react-calendar"
import type { CalendarType } from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AppLayout from "@/layouts/app-layout"
import { usePage } from '@inertiajs/react'
import { Calendar as CalendarIcon } from "lucide-react"

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const { tasks } = (usePage().props as unknown) as { tasks: Array<{ id: number, title: string, date: string, priority: string }> }

    const dateStr = selectedDate.toISOString().split("T")[0]
    const todayTasks = tasks.filter((t) => t.date === dateStr)

    function getTaskCount(date: Date) {
        const d = date.toISOString().split("T")[0]
        return tasks.filter((t) => t.date === d).length
    }

    function getPriorityColor(priority: string): string | undefined {
        switch (priority.toLowerCase()) {
            case "tinggi":
            case "high":
                return "bg-[#3B82F6] text-white"
            case "sedang":
            case "medium":
                return "bg-[#2563EB] text-white"
            case "rendah":
            case "low":
                return "bg-[#E5E7EB] text-[#2563EB]"
            default:
                return "bg-[#F3F4F6] text-[#6B7280]"
        }
    }

    return (
        <div className="min-h-screen bg-[#F3F4F6]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card className="bg-white border border-[#E5E7EB] shadow-md">
                    <CardHeader className="flex flex-col items-start gap-2">
                        <div className="flex items-center gap-3 mb-2">
                            <CalendarIcon className="h-7 w-7 text-[#2563EB]" />
                            <CardTitle className="text-[#2563EB] text-2xl">Kalender Tugas</CardTitle>
                        </div>
                        <CardDescription className="text-[#6B7280]">
                            Lihat dan kelola tugas berdasarkan tanggal. Tanggal dengan tugas akan diberi tanda biru.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-[420px]">
                                <Calendar
                                    onChange={(value) => value && setSelectedDate(value as Date)}
                                    value={selectedDate}
                                    calendarType={"iso8601" as CalendarType}
                                    tileContent={({ date, view }) =>
                                        view === "month" && getTaskCount(date) > 0 ? (
                                            <span className="flex justify-center mt-1">
                                                <span className="flex w-5 h-5 bg-[#3B82F6] text-white text-xs rounded-full items-center justify-center font-bold shadow hover:scale-110 transition-transform duration-150">
                                                    {getTaskCount(date)}
                                                </span>
                                            </span>
                                        ) : null
                                    }
                                    className="react-calendar text-base"
                                    tileClassName={({ date, view }) => {
                                        const d = date.toISOString().split("T")[0]
                                        if (view === "month" && tasks.some((t) => t.date === d)) {
                                            return "font-bold text-[#2563EB] hover:bg-[#E0F2FE] cursor-pointer"
                                        }
                                        return ""
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-[#2563EB] mb-2 flex items-center gap-2">
                                    <CalendarIcon className="h-5 w-5 text-[#3B82F6]" />
                                    {selectedDate.toLocaleDateString("id-ID")}
                                </h2>
                                <hr className="mb-4 border-[#E5E7EB]" />
                                {todayTasks.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-8">
                                        <span className="text-[#6B7280] text-lg">Tidak ada tugas pada tanggal ini.</span>
                                        <span className="text-sm text-[#6B7280] mt-1">Pilih tanggal lain untuk melihat tugas.</span>
                                    </div>
                                ) : (
                                    <ul className="space-y-4">
                                        {todayTasks.map((task) => (
                                            <li key={task.id}>
                                                <Card className="bg-[#F3F4F6] border border-[#E5E7EB] shadow-sm hover:shadow-md transition">
                                                    <CardContent className="flex items-center gap-3 py-3">
                                                        <Badge className={getPriorityColor(task.priority)}>
                                                            {task.priority}
                                                        </Badge>
                                                        <div>
                                                            <div className="text-[#2563EB] font-semibold">{task.title}</div>
                                                            <div className="text-xs text-[#6B7280]">Prioritas: {task.priority}</div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

CalendarPage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>