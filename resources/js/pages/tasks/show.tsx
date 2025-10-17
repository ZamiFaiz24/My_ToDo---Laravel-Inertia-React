import React from 'react'
import { Head, usePage, Link } from '@inertiajs/react'
import { ArrowLeft, Edit, Trash2, Clock } from 'lucide-react'
import AppLayout from '@/layouts/app-layout'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Task {
  id: number
  title: string
  description?: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  due_date?: string
  category?: string
  created_at?: string
}

export default function TaskShow() {
  const { task } = (usePage().props as any) as { task: Task }

  const getPriorityColor = (p: string) => {
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

  return (
    <>
      <Head title={`Tugas — ${task?.title || 'Detail'}`} />
      <div className="min-h-screen bg-[#F3F4F6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-[#2563EB]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
            </Link>
          </div>

          <Card className="bg-white border border-[#E5E7EB] shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-[#2563EB] text-xl font-semibold">{task.title}</CardTitle>
                  <CardDescription className="text-[#6B7280] mt-1">
                    {task.category ?? 'Tanpa kategori'} •{' '}
                    {task.due_date ? (
                      <span className="inline-flex items-center text-sm text-[#6B7280]">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(task.due_date).toLocaleDateString('id-ID')}
                      </span>
                    ) : (
                      <span className="text-sm text-[#6B7280]">Tidak ada tenggat</span>
                    )}
                  </CardDescription>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  <Link href={`/task/${task.id}/edit`}>
                    <Button variant="ghost" className="text-[#2563EB]">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="text-[#FB7185]"
                    onClick={() => {
                      // placeholder, ganti dengan request delete jika ada route API
                      if (confirm('Hapus tugas ini?')) {
                        alert('Hapus: ' + task.id)
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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

                <div className="mt-6 text-sm text-[#6B7280]">
                  <div>Dibuat: {task.created_at ? new Date(task.created_at).toLocaleString('id-ID') : '-'}</div>
                  <div className="mt-2">Status: {task.completed ? 'Selesai' : 'Belum selesai'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

TaskShow.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>