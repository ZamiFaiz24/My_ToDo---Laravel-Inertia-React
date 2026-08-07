import React from 'react'
import { Head, usePage, Link, router } from '@inertiajs/react'
import { ArrowLeft, Edit, Trash2, Calendar, CheckCircle2, Paperclip, List, ListTodo } from 'lucide-react'
import AppLayout from '@/layouts/app-layout'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Task {
  id: number
  title: string
  description?: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  due_date?: string
  category?: string
  created_at?: string
  updated_at?: string
  attachments?: Array<{ id: number; name: string; url?: string }>
  checklist?: Array<{ id: number; text: string; done: boolean }>
  assigned_to?: string
}

export default function TaskShow() {
  const { task } = (usePage().props as any) as { task: Task }

  const getPriorityColor = (p?: string) => {
    switch (p) {
      case 'high':
        return 'bg-app-error text-white'
      case 'medium':
        return 'bg-app-warning text-app-text'
      case 'low':
        return 'bg-app-border text-app-text'
      default:
        return 'bg-app-background text-app-text-secondary'
    }
  }

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

  const handleDelete = () => {
    if (!confirm('Yakin ingin menghapus tugas ini?')) return
    // sesuaikan endpoint jika route berbeda
    router.delete(`/task/${task.id}`, {
      onSuccess: () => {
        router.visit('/dashboard')
      },
    })
  }

  const toggleComplete = () => {
    // patch ke endpoint update; sesuaikan jika backend beda
    router.put(`/task/${task.id}`, { completed: !task.completed }, {
      preserveState: true,
      onSuccess: () => {
        // optional: nothing
      },
    })
  }

  return (
    <>
      <Head title={`Detail Tugas - ${task?.title || 'Detail'}`} />
      <div className="min-h-screen bg-app-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-app-border bg-app-primary-light shadow-sm">
                <ListTodo className="h-6 w-6 text-app-primary" />
              </div>
              <div>
                <h1 className="mb-1 text-3xl font-extrabold tracking-tight text-app-text">Detail Tugas</h1>
                <p className="text-sm text-app-text-muted">Lihat informasi lengkap, status, dan lampiran tugas.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link href="/dashboard">
                <Button variant="outline" className="border-app-border text-app-text-secondary hover:bg-app-primary-light hover:text-app-primary">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali
                </Button>
              </Link>
              <Button
                variant="outline"
                className={`flex items-center gap-2 ${task.completed ? 'border-app-success/30 text-app-success' : 'border-app-border text-app-primary'}`}
                onClick={toggleComplete}
              >
                <CheckCircle2 className="h-4 w-4" />
                {task.completed ? 'Buka Selesai' : 'Tandai Selesai'}
              </Button>
              <Link href={`/task/${task.id}/edit`}>
                <Button variant="ghost" className="text-app-primary hover:bg-app-primary-light">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" className="text-app-error hover:bg-app-error-light" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main content */}
            <div className="space-y-4 lg:col-span-2">
              <Card className="overflow-hidden border border-app-border bg-app-background-secondary shadow-sm">
                <CardHeader className="border-b border-app-border bg-gradient-to-r from-app-primary/10 via-app-primary/5 to-transparent p-6">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-2xl text-app-primary">{task.title}</CardTitle>
                          <Badge
                            className={
                              task.completed
                                ? 'border border-app-success/20 bg-app-success-light text-app-success'
                                : 'border border-app-warning/20 bg-app-warning-light text-app-warning'
                            }
                          >
                            <span className="mr-1.5 h-2 w-2 rounded-full bg-current" />
                            {task.completed ? 'Selesai' : 'Belum Selesai'}
                          </Badge>
                        </div>

                        <CardDescription className="mt-2 text-app-text-secondary">
                          {task.category ?? 'Tanpa kategori'}
                          {' '}•{' '}
                          {task.due_date ? (
                            <span className="inline-flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              {new Date(task.due_date).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </span>
                          ) : (
                            <span>Tidak ada tenggat</span>
                          )}
                        </CardDescription>
                      </div>

                      <div className="flex flex-col items-start gap-2 rounded-xl border border-app-border bg-app-background px-3 py-2 md:items-end">
                        <Badge className={getPriorityColor(task.priority)}>{getPriorityLabel(task.priority)}</Badge>
                        {task.assigned_to && (
                          <div className="text-xs text-app-text-secondary">Ditugaskan ke {task.assigned_to}</div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div className="rounded-xl border border-app-border bg-app-background/70 px-4 py-3">
                        <div className="text-xs uppercase tracking-wide text-app-text-muted">Status</div>
                        <div className={`mt-1 text-sm font-semibold ${task.completed ? 'text-app-success' : 'text-app-warning'}`}>
                          {task.completed ? 'Selesai' : 'Belum Selesai'}
                        </div>
                      </div>
                      <div className="rounded-xl border border-app-border bg-app-background/70 px-4 py-3">
                        <div className="text-xs uppercase tracking-wide text-app-text-muted">Kategori</div>
                        <div className="mt-1 text-sm font-semibold text-app-text">{task.category ?? 'Tanpa kategori'}</div>
                      </div>
                      <div className="rounded-xl border border-app-border bg-app-background/70 px-4 py-3">
                        <div className="text-xs uppercase tracking-wide text-app-text-muted">Tenggat</div>
                        <div className="mt-1 text-sm font-semibold text-app-text">
                          {task.due_date ? new Date(task.due_date).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          }) : 'Tidak ada'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5 p-6">
                  <div className="rounded-2xl border border-app-border bg-app-background/70 p-5">
                    <h4 className="mb-3 text-sm font-semibold text-app-primary">Deskripsi Tugas</h4>
                    {task.description ? (
                      <p className="leading-7 text-app-text">{task.description}</p>
                    ) : (
                      <p className="text-sm text-app-text-secondary">Tidak ada deskripsi untuk tugas ini.</p>
                    )}
                  </div>

                  {/* Checklist */}
                  {task.checklist && task.checklist.length > 0 && (
                    <>
                      <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-app-primary">
                        <List className="h-4 w-4" /> Checklist
                      </h4>
                      <ul className="space-y-2 rounded-2xl border border-app-border bg-app-background/70 p-5">
                        {task.checklist.map((item) => (
                          <li key={item.id} className="flex items-start gap-3">
                            <div className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-sm ${item.done ? 'bg-app-primary text-white' : 'border border-app-border text-app-text-secondary'}`}>
                              {item.done ? <CheckCircle2 className="h-4 w-4" /> : null}
                            </div>
                            <span className={`${item.done ? 'text-app-text-muted' : 'text-app-text'}`}>
                              {item.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Separator className="my-4" />
                    </>
                  )}

                  {/* Attachments */}
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-app-primary">
                      <Paperclip className="h-4 w-4" /> Lampiran
                    </h4>
                    {task.attachments && task.attachments.length > 0 ? (
                      <ul className="space-y-2">
                        {task.attachments.map((att) => (
                          <li key={att.id} className="flex items-center justify-between rounded-xl border border-app-border bg-app-background p-3">
                            <div className="flex items-center gap-3">
                              <Paperclip className="h-4 w-4 text-app-primary" />
                              <div className="text-sm text-app-text">{att.name}</div>
                            </div>
                            {att.url ? (
                              <a href={att.url} className="text-sm text-app-primary underline" target="_blank" rel="noreferrer">Download</a>
                            ) : (
                              <span className="text-xs text-app-text-secondary">—</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-app-text-secondary">Tidak ada lampiran.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right sidebar - metadata */}
            <div className="space-y-4">
              <Card className="border border-app-border bg-app-background-secondary shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-app-primary">Metadata</CardTitle>
                  <CardDescription className="text-app-text-secondary">Informasi dasar tugas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-app-background/70 px-3 py-2">
                    <div className="text-sm text-app-text-secondary">ID</div>
                    <div className="text-sm font-medium text-app-text">#{task.id}</div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-app-background/70 px-3 py-2">
                    <div className="text-sm text-app-text-secondary">Status</div>
                    <div className={`text-sm font-medium ${task.completed ? 'text-app-success' : 'text-app-warning'}`}>
                      {task.completed ? 'Selesai' : 'Belum Selesai'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-app-background/70 px-3 py-2">
                    <div className="text-sm text-app-text-secondary">Prioritas</div>
                    <Badge className={getPriorityColor(task.priority)}>{getPriorityLabel(task.priority)}</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-app-background/70 px-3 py-2">
                    <div className="text-sm text-app-text-secondary">Dibuat</div>
                    <div className="text-sm text-app-text-secondary">{task.created_at ? new Date(task.created_at).toLocaleString('id-ID') : '-'}</div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-app-background/70 px-3 py-2">
                    <div className="text-sm text-app-text-secondary">Terakhir diperbarui</div>
                    <div className="text-sm text-app-text-secondary">{task.updated_at ? new Date(task.updated_at).toLocaleString('id-ID') : '-'}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

TaskShow.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>