import React, { useState } from 'react'
import { Link, Head, usePage } from '@inertiajs/react'
import {
  CheckCircle2,
  Clock,
  Plus,
  Calendar,
  TrendingUp,
  ListTodo,
  Target,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import AppLayout from '@/layouts/app-layout'

interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  due_date: string
  category: string
  created_at: string
}

interface PageProps {
  tasks: Todo[]
  [key: string]: unknown
}

function Dashboard() {
  const { tasks } = usePage<PageProps>().props

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all')

  const todos = tasks.map(task => ({
    ...task,
    dueDate: task.due_date,
    createdAt: task.created_at,
  }))

  const completedTodos = todos.filter((todo) => todo.completed).length
  const totalTodos = todos.length
  const completionRate = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0

  const todayTodos = todos.filter((todo) => {
    const today = new Date().toISOString().split('T')[0]
    return todo.dueDate === today && !todo.completed
  })

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterStatus === 'completed') return matchesSearch && todo.completed
    if (filterStatus === 'pending') return matchesSearch && !todo.completed
    return matchesSearch
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-app-error text-app-error-foreground'
      case 'medium':
        return 'bg-app-accent text-app-accent-foreground'
      case 'low':
        return 'bg-app-primary text-app-primary-foreground'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }

  const toggleTodo = (id: number) => {
    alert(`Toggled todo id: ${id}`)
  }

  const deleteTodo = (id: number) => {
    alert(`Hapus todo id: ${id}`)
  }

  return (
    <>
      <Head title="Dashboard" />
      <div className="min-h-screen bg-[#F3F4F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#E6F0FF] to-[#EAF4FF] shadow-sm">
                  <ListTodo className="h-6 w-6 text-[#2563EB]" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#0F172A] mb-1">Dashboard</h1>
                  <p className="text-[#6B7280]">Selamat datang kembali! Ringkasan tugas Anda hari ini.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link href="/add">
                  <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold shadow-md">
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Tugas
                  </Button>
                </Link>
                <Button variant="ghost" className="hidden md:inline-flex text-[#6B7280] hover:bg-[#F8FAFC]">
                  <Calendar className="h-4 w-4 mr-2 text-[#3B82F6]" />
                  Kalender
                </Button>
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/95 rounded-xl border border-transparent shadow-sm hover:shadow-lg transition">
              <CardHeader className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
                    <ListTodo className="h-7 w-7 text-[#3B82F6]" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium text-[#0F172A]">Total Tugas</CardTitle>
                    <div className="text-2xl font-bold text-[#2563EB]">{totalTodos}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-[#6B7280]">Semua tugas Anda</p>
              </CardContent>
            </Card>

            <Card className="bg-white/95 rounded-xl border border-transparent shadow-sm hover:shadow-lg transition">
              <CardHeader className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 text-[#10B981]" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium text-[#0F172A]">Selesai</CardTitle>
                    <div className="text-2xl font-bold text-[#2563EB]">{completedTodos}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-[#6B7280]">Tugas yang sudah selesai</p>
              </CardContent>
            </Card>

            <Card className="bg-white/95 rounded-xl border border-transparent shadow-sm hover:shadow-lg transition">
              <CardHeader className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-[#FEF3C7] flex items-center justify-center">
                    <Calendar className="h-7 w-7 text-[#D97706]" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium text-[#0F172A]">Hari Ini</CardTitle>
                    <div className="text-2xl font-bold text-[#2563EB]">{todayTodos.length}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-[#6B7280]">Tugas yang jatuh hari ini</p>
              </CardContent>
            </Card>

            <Card className="bg-white/95 rounded-xl border border-transparent shadow-sm hover:shadow-lg transition">
              <CardHeader className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
                    <TrendingUp className="h-7 w-7 text-[#6366F1]" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium text-[#0F172A]">Progress</CardTitle>
                    <div className="text-2xl font-bold text-[#2563EB]">{Math.round(completionRate)}%</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Progress value={completionRate} className="mt-2 bg-[#E0F2FE]" />
                <p className="text-xs text-[#6B7280] mt-2">Persentase tugas selesai</p>
              </CardContent>
            </Card>
          </div>

          {/* Search & Filters */}
          <Card className="mb-8 bg-white rounded-xl border border-[#E8EEF5] shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#0F172A] font-semibold">Semua Tugas</CardTitle>
                  <CardDescription className="text-[#6B7280]">Kelola dan pantau semua tugas Anda</CardDescription>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  {(['all', 'pending', 'completed'] as const).map((status) => (
                    <Button
                      key={status}
                      variant={filterStatus === status ? 'default' : 'outline'}
                      onClick={() => setFilterStatus(status)}
                      className={
                        filterStatus === status
                          ? 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
                          : 'border-[#DDE8FF] text-[#2563EB] hover:bg-[#F8FAFC]'
                      }
                    >
                      {status === 'all' ? 'Semua' : status === 'pending' ? 'Belum Selesai' : 'Selesai'}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] h-4 w-4" />
                  <Input
                    placeholder="Cari tugas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-[#E5E7EB] focus:border-[#3B82F6] rounded-md"
                  />
                </div>
                <div className="flex gap-2 items-center sm:hidden">
                  {(['all', 'pending', 'completed'] as const).map((status) => (
                    <Button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`text-sm ${filterStatus === status ? 'bg-[#3B82F6] text-white' : 'text-[#2563EB] border-[#DDE8FF]'}`}
                    >
                      {status === 'all' ? 'Semua' : status === 'pending' ? 'Belum' : 'Selesai'}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {filteredTodos.length === 0 ? (
                  <div className="text-center py-12">
                    <Target className="h-16 w-16 text-[#E5E7EB] mx-auto mb-4" />
                    <p className="text-[#6B7280] text-lg mb-2">Tidak ada tugas ditemukan</p>
                    <p className="text-sm text-[#6B7280]">
                      {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Tambahkan tugas baru untuk memulai'}
                    </p>
                  </div>
                ) : (
                  filteredTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center space-x-4 p-4 bg-white rounded-xl ring-1 ring-[#EEF3FA] hover:shadow-md transition"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTodo(todo.id)}
                        className="p-0 h-auto hover:bg-transparent"
                      >
                        <CheckCircle2
                          className={`h-6 w-6 ${todo.completed ? 'text-[#10B981]' : 'text-[#9CA3AF] hover:text-[#3B82F6]'}`}
                        />
                      </Button>

                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-semibold text-lg ${todo.completed ? 'line-through text-[#9CA3AF]' : 'text-[#0F172A]'}`}
                        >
                          {todo.title}
                        </h3>
                        <p className="text-[#6B7280] text-sm mt-1 line-clamp-2">{todo.description}</p>
                        <div className="flex items-center space-x-3 mt-3">
                          <Badge
                            className={
                              todo.priority === 'high'
                                ? 'bg-[#3B82F6] text-white'
                                : todo.priority === 'medium'
                                ? 'bg-[#2563EB] text-white'
                                : 'bg-[#E5E7EB] text-[#2563EB]'
                            }
                          >
                            {todo.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-[#E5E7EB] text-[#6B7280]">
                            {todo.category}
                          </Badge>
                          <div className="flex items-center text-xs text-[#6B7280]">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(todo.dueDate).toLocaleDateString('id-ID')}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Link href={`/task/${todo.id}`}>
                          <Button variant="ghost" size="sm" className="text-[#3B82F6] hover:bg-[#E6F3FF]">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-[#9CA3AF] hover:text-[#374151]">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-white border border-[#E5E7EB] shadow-lg text-[#0F172A]"
                          >
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/task/${todo.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                Lihat Detail
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-[#FB7185] focus:text-[#FB7185]"
                              onClick={() => deleteTodo(todo.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

Dashboard.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>
export default Dashboard
