import React from 'react'
import { Head, usePage, Link, router } from '@inertiajs/react'
import { ArrowLeft, Edit, Trash2, Clock, Calendar, Tag, CheckCircle2, Paperclip, List } from 'lucide-react'
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
        return 'bg-[#3B82F6] text-white'
      case 'medium':
        return 'bg-[#2563EB] text-white'
      case 'low':
        return 'bg-[#E5E7EB] text-[#2563EB]'
      default:
        return 'bg-[#F3F4F6] text-[#6B7280]'
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
      <div className="min-h-screen bg-[#F3F4F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-4 flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-[#2563EB]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
            </Link>
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="outline"
                className={`flex items-center gap-2 ${task.completed ? 'text-[#10B981] border-[#D1FAE5]' : 'text-[#2563EB]'}`}
                onClick={toggleComplete}
              >
                <CheckCircle2 className="h-4 w-4" />
                {task.completed ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
              </Button>
              <Link href={`/task/${task.id}/edit`}>
                <Button variant="ghost" className="text-[#2563EB]">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" className="text-[#FB7185]" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="bg-white border border-[#E5E7EB] shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-[#2563EB] text-xl font-semibold">
                        {task.title}
                      </CardTitle>
                      <CardDescription className="text-[#6B7280] mt-1">
                        {task.category ?? 'Tanpa kategori'} •{' '}
                        {task.due_date ? (
                          <span className="inline-flex items-center text-sm text-[#6B7280]">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(task.due_date).toLocaleDateString('id-ID')}
                          </span>
                        ) : (
                          <span className="text-sm text-[#6B7280]">Tidak ada tenggat</span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      {task.assigned_to && (
                        <div className="text-xs text-[#6B7280] mt-2">{task.assigned_to}</div>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="prose max-w-none text-[#0F172A]">
                    {task.description ? (
                      <p>{task.description}</p>
                    ) : (
                      <p className="text-[#6B7280]">Tidak ada deskripsi untuk tugas ini.</p>
                    )}
                  </div>

                  <Separator className="my-4" />

                  {/* Checklist */}
                  {task.checklist && task.checklist.length > 0 && (
                    <>
                      <h4 className="text-sm font-semibold text-[#2563EB] mb-2 flex items-center gap-2">
                        <List className="h-4 w-4" /> Checklist
                      </h4>
                      <ul className="space-y-2">
                        {task.checklist.map((item) => (
                          <li key={item.id} className="flex items-center gap-3">
                            <div className={`h-5 w-5 rounded-sm flex items-center justify-center ${item.done ? 'bg-[#3B82F6] text-white' : 'border border-[#E5E7EB] text-[#6B7280]'}`}>
                              {item.done ? <CheckCircle2 className="h-4 w-4" /> : null}
                            </div>
                            <span className={`${item.done ? 'line-through text-[#9CA3AF]' : 'text-[#0F172A]'}`}>
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
                    <h4 className="text-sm font-semibold text-[#2563EB] mb-2 flex items-center gap-2">
                      <Paperclip className="h-4 w-4" /> Lampiran
                    </h4>
                    {task.attachments && task.attachments.length > 0 ? (
                      <ul className="space-y-2">
                        {task.attachments.map((att) => (
                          <li key={att.id} className="flex items-center justify-between bg-[#F8FAFF] border border-[#E5E7EB] p-2 rounded-md">
                            <div className="flex items-center gap-3">
                              <Paperclip className="h-4 w-4 text-[#2563EB]" />
                              <div className="text-sm text-[#2563EB]">{att.name}</div>
                            </div>
                            {att.url ? (
                              <a href={att.url} className="text-sm text-[#2563EB] underline" target="_blank" rel="noreferrer">Download</a>
                            ) : (
                              <span className="text-xs text-[#6B7280]">—</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-[#6B7280]">Tidak ada lampiran.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right sidebar - metadata */}
            <div className="space-y-4">
              <Card className="bg-white border border-[#E5E7EB] shadow-sm">
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-[#6B7280]">ID</div>
                    <div className="text-sm font-medium text-[#0F172A]">#{task.id}</div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-[#6B7280]">Status</div>
                    <div className={`text-sm font-medium ${task.completed ? 'text-[#10B981]' : 'text-[#2563EB]'}`}>
                      {task.completed ? 'Selesai' : 'Belum Selesai'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-[#6B7280]">Prioritas</div>
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-[#6B7280]">Dibuat</div>
                    <div className="text-sm text-[#6B7280]">{task.created_at ? new Date(task.created_at).toLocaleString('id-ID') : '-'}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-[#6B7280]">Terakhir diperbarui</div>
                    <div className="text-sm text-[#6B7280]">{task.updated_at ? new Date(task.updated_at).toLocaleString('id-ID') : '-'}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-[#E5E7EB] shadow-sm">
                <CardContent>
                  <h4 className="text-sm font-semibold text-[#2563EB] mb-2">Tindakan Cepat</h4>
                  <div className="flex flex-col gap-2">
                    <Link href={`/task/${task.id}/edit`}>
                      <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white">
                        <Edit className="mr-2 h-4 w-4" /> Edit Tugas
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full text-[#FB7185]" onClick={handleDelete}>
                      <Trash2 className="mr-2 h-4 w-4" /> Hapus Tugas
                    </Button>
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