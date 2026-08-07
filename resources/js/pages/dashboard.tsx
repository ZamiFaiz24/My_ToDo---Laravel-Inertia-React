import React, { useEffect, useState } from 'react'
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
  Square,
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
  const [currentTime, setCurrentTime] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const todos = tasks
    .map(task => ({
      ...task,
      dueDate: task.due_date,
      createdAt: task.created_at,
    }))
    .sort((first, second) => {
      const firstDate = new Date(first.createdAt).getTime()
      const secondDate = new Date(second.createdAt).getTime()
      return secondDate - firstDate
    })

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

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Tinggi'
      case 'medium':
        return 'Sedang'
      case 'low':
        return 'Rendah'
      default:
        return priority
    }
  }

  const toggleTodo = (id: number) => {
    alert(`Status tugas dengan ID ${id} diubah`)
  }

  const deleteTodo = (id: number) => {
    alert(`Hapus todo id: ${id}`)
  }

  const todayLabel = currentTime.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const currentClock = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <>
      <Head title="Dasbor" />
      <div className="min-h-screen bg-app-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl border border-app-border bg-app-primary-light shadow-sm">
                  <ListTodo className="h-6 w-6 text-app-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-app-text mb-1">Dasbor</h1>
                  <p className="text-sm text-app-text-muted">Selamat datang kembali! Ringkasan tugas Anda hari ini.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-app-text mb-2">
                    {todayLabel}
                  </p>
                  <p className="text-xs font-bold text-app-text-secondary">
                    {currentClock} WIB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-app-background-secondary rounded-xl border border-app-border shadow-md hover:shadow-xl transition">
              <CardHeader className="flex items-start justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-app-primary-light flex items-center justify-center">
                    <ListTodo className="h-7 w-7 text-app-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium text-app-text">Total Tugas</CardTitle>
                    <div className="text-3xl font-extrabold tracking-tight text-app-primary">{totalTodos}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-app-text-secondary">Semua tugas Anda</p>
              </CardContent>
            </Card>

            <Card className="bg-app-background-secondary rounded-xl border border-app-border shadow-md hover:shadow-xl transition">
              <CardHeader className="flex items-start justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-app-success/20 flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 text-app-success" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium text-app-text">Selesai</CardTitle>
                    <div className="text-2xl font-bold text-app-success">{completedTodos}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-app-text-secondary">Tugas yang sudah selesai</p>
              </CardContent>
            </Card>

            <Card className="bg-app-background-secondary rounded-xl border border-app-border shadow-md hover:shadow-xl transition">
              <CardHeader className="flex items-start justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-app-warning/20 flex items-center justify-center">
                    <Calendar className="h-7 w-7 text-app-warning" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium text-app-text">Hari Ini</CardTitle>
                    <div className="text-2xl font-bold text-app-warning">{todayTodos.length}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-app-text-secondary">Tugas yang jatuh hari ini</p>
              </CardContent>
            </Card>

            <Card className="bg-app-background-secondary rounded-xl border border-app-border shadow-md hover:shadow-xl transition">
              <CardHeader className="flex items-start justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-app-primary-light flex items-center justify-center">
                    <TrendingUp className="h-7 w-7 text-app-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium text-app-text">Kemajuan</CardTitle>
                    <div className="text-2xl font-bold text-app-primary">{Math.round(completionRate)}%</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Progress value={completionRate} className="space-y-2 bg-app-primary-light" />
                <p className="text-xs text-app-text-secondary mt-2">Persentase tugas selesai</p>
              </CardContent>
            </Card>
          </div>

          {/* Search & Filters */}
          <Card className="mb-8 bg-app-background-secondary rounded-xl border border-app-border shadow-sm">
            <CardHeader>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <CardTitle className="text-app-text font-semibold">Semua Tugas</CardTitle>
                  <CardDescription className="text-app-text-secondary">Kelola dan pantau semua tugas Anda</CardDescription>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link href="/tambah-tugas">
                    <Button className="bg-app-primary font-semibold text-white hover:bg-app-primary-dark">
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah Tugas
                    </Button>
                  </Link>

                  {(['all', 'pending', 'completed'] as const).map((status) => (
                    <Button
                      key={status}
                      variant={filterStatus === status ? 'default' : 'outline'}
                      onClick={() => setFilterStatus(status)}
                      className={
                        filterStatus === status
                          ? 'bg-app-primary text-white hover:bg-app-primary-dark'
                          : 'border-app-border text-app-primary hover:bg-app-primary-light'
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-text-secondary h-4 w-4" />
                  <Input
                    placeholder="Cari tugas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-app-border focus:border-app-primary rounded-md bg-app-background text-app-text placeholder:text-app-text-muted"
                  />
                </div>
                <div className="flex gap-2 items-center sm:hidden">
                  {(['all', 'pending', 'completed'] as const).map((status) => (
                    <Button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`text-sm ${filterStatus === status ? 'bg-app-primary text-white' : 'text-app-primary border-app-border'}`}
                    >
                      {status === 'all' ? 'Semua' : status === 'pending' ? 'Belum' : 'Selesai'}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {filteredTodos.length === 0 ? (
                  <div className="text-center py-12">
                    <Target className="h-16 w-16 text-app-border mx-auto mb-4" />
                    <p className="text-app-text-secondary text-lg mb-2">Tidak ada tugas ditemukan</p>
                    <p className="text-sm text-app-text-secondary">
                      {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Tambahkan tugas baru untuk memulai'}
                    </p>
                  </div>
                ) : (
                  filteredTodos.map((todo) => (
                    <div
                      key={todo.id}
                          className="rounded-2xl border border-app-border bg-app-background-secondary p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start gap-3">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleTodo(todo.id)}
                                  aria-label={todo.completed ? 'Tandai belum selesai' : 'Tandai selesai'}
                                  className={
                                    `mt-0.5 h-9 w-9 shrink-0 rounded-full border p-0 transition ` +
                                    (todo.completed
                                      ? 'border-app-success/30 bg-app-success-light text-app-success hover:bg-app-success/20'
                                      : 'border-app-border bg-app-background text-app-text-muted hover:border-app-primary hover:bg-app-primary-light hover:text-app-primary')
                                  }
                                >
                                  {todo.completed ? (
                                    <CheckCircle2 className="h-5.5 w-5.5" />
                                  ) : (
                                    <Square className="h-5 w-5" />
                                  )}
                                </Button>

                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-start justify-between gap-3">
                                    <h3 className="text-lg font-semibold text-app-text">{todo.title}</h3>
                                    <Badge
                                      className={
                                        todo.completed
                                          ? 'bg-app-success-light text-app-success border border-app-success/20'
                                          : 'bg-app-warning-light text-app-warning border border-app-warning/20'
                                      }
                                    >
                                      <span className="mr-1.5 h-2 w-2 rounded-full bg-current" />
                                      {todo.completed ? 'Selesai' : 'Belum Selesai'}
                                    </Badge>
                                  </div>

                                  <p className={`mt-1 text-sm ${todo.completed ? 'text-app-text-muted' : 'text-app-text-secondary'}`}>
                                    {todo.description}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-4 flex flex-wrap items-center gap-3">
                                <Badge
                                  className={
                                    todo.priority === 'high'
                                      ? 'bg-app-error text-white'
                                      : todo.priority === 'medium'
                                      ? 'bg-app-warning text-app-text'
                                      : 'bg-app-border text-app-text'
                                  }
                                >
                                  {getPriorityLabel(todo.priority)}
                                </Badge>
                                <Badge variant="outline" className="border-app-border text-xs text-app-text-secondary">
                                  {todo.category}
                                </Badge>
                                <div className="flex items-center text-xs text-app-text-secondary">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {new Date(todo.dueDate).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                  })}
                                </div>
                              </div>
                        </div>

                            <div className="flex shrink-0 items-center justify-end gap-2 self-start lg:pt-1">
                              <Link href={`/task/${todo.id}`}>
                                <Button variant="ghost" size="sm" className="text-app-primary hover:bg-app-primary-light">
                                  <Eye className="h-4 w-4" />
                                  <span className="ml-2 hidden sm:inline">Detail</span>
                                </Button>
                              </Link>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-app-text-secondary hover:text-app-text">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="bg-app-background-secondary border border-app-border shadow-lg text-app-text"
                                >
                                  <DropdownMenuLabel>Tindakan</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem asChild>
                                    <Link href={`/task/${todo.id}`}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      Lihat Detail
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Ubah
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Duplikat</DropdownMenuItem>
                                  <DropdownMenuSeparator className="bg-app-border" />
                                  <DropdownMenuItem
                                    className="text-app-error focus:text-app-error"
                                    onClick={() => deleteTodo(todo.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Hapus
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
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
