import React, { useState } from 'react'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { ArrowLeft, Calendar, Flag, Tag, FileText, Save, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import AppLayout from '@/layouts/app-layout'

interface Task {
  id: number
  title: string
  description?: string | null
  priority?: 'high' | 'medium' | 'low' | null
  due_date?: string | null
  category?: string | null
}

interface PageProps {
  task: Task
  [key: string]: unknown
}

const categories = ['Pekerjaan', 'Personal', 'Kesehatan', 'Belajar', 'Keluarga', 'Hobi', 'Keuangan', 'Lainnya']

function EditTask() {
  const { task } = usePage<PageProps>().props
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data, setData, put, errors, reset } = useForm({
    title: task.title ?? '',
    description: task.description ?? '',
    priority: task.priority ?? '',
    dueDate: task.due_date ? task.due_date.slice(0, 10) : '',
    category: task.category ?? '',
  })

  const handleInputChange = (field: 'title' | 'description' | 'priority' | 'dueDate' | 'category', value: string) => {
    setData(field, value)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getPriorityText = (priority: string) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!data.title.trim()) {
      return
    }

    setIsSubmitting(true)
    put(`/task/${task.id}`, {
      onSuccess: () => {
        setIsSubmitting(false)
        router.visit(`/task/${task.id}`)
      },
      onError: () => setIsSubmitting(false),
    })
  }

  const handleReset = () => {
    reset()
  }

  return (
    <>
      <Head title={`Edit Tugas - ${task.title}`} />
      <div className="min-h-screen bg-app-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-app-border bg-app-primary-light shadow-sm">
                <FileText className="h-6 w-6 text-app-primary" />
              </div>
              <div>
                <h1 className="mb-1 text-3xl font-extrabold tracking-tight text-app-text">Edit Tugas</h1>
                <p className="text-sm text-app-text-muted">Perbarui data tugas yang sudah ada.</p>
              </div>
            </div>

            <Link href={`/task/${task.id}`}>
              <Button variant="outline" className="border-app-border text-app-text-secondary hover:bg-app-primary-light hover:text-app-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Detail
              </Button>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <Card className="border border-app-border bg-app-background-secondary shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-app-primary">Informasi Dasar</CardTitle>
                    <CardDescription className="text-app-text-secondary">Sesuaikan judul dan deskripsi tugas.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-sm font-medium text-app-text-secondary">
                        Judul Tugas *
                      </Label>
                      <Input
                        id="title"
                        value={data.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Masukkan judul tugas..."
                        className="mt-1 border-app-border bg-app-background text-app-text placeholder:text-app-text-muted focus:border-app-primary"
                        required
                      />
                      {errors.title && <div className="mt-1 text-xs text-app-error">{errors.title}</div>}
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-sm font-medium text-app-text-secondary">
                        Deskripsi
                      </Label>
                      <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Jelaskan detail tugas Anda..."
                        className="mt-1 min-h-[120px] border-app-border bg-app-background text-app-text placeholder:text-app-text-muted focus:border-app-primary"
                      />
                      {errors.description && <div className="mt-1 text-xs text-app-error">{errors.description}</div>}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-app-border bg-app-background-secondary shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        disabled={isSubmitting}
                        className="flex-1 border-app-primary text-app-primary hover:bg-app-primary-light"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Reset Form
                      </Button>

                      <Button
                        type="submit"
                        disabled={isSubmitting || !data.title.trim()}
                        className="flex-1 bg-app-primary font-semibold text-white hover:bg-app-primary-dark"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                            Menyimpan...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Simpan Perubahan
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border border-app-border bg-app-background-secondary shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-app-primary">Pengaturan Tugas</CardTitle>
                    <CardDescription className="text-app-text-secondary">Atur prioritas, kategori, dan tenggat.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="mb-2 flex items-center text-sm font-medium text-app-text-secondary">
                        <Flag className="mr-2 h-4 w-4" />
                        Prioritas
                      </Label>
                      <Select value={data.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                        <SelectTrigger className="border-app-border bg-app-background text-app-text focus:border-app-primary">
                          <SelectValue placeholder="Pilih prioritas" />
                        </SelectTrigger>
                        <SelectContent className="border border-app-border bg-app-background-secondary text-app-text shadow-lg">
                          <SelectItem value="high" className="text-app-text hover:bg-app-primary-light">Tinggi</SelectItem>
                          <SelectItem value="medium" className="text-app-text hover:bg-app-warning/20">Sedang</SelectItem>
                          <SelectItem value="low" className="text-app-text hover:bg-app-border/20">Rendah</SelectItem>
                        </SelectContent>
                      </Select>
                      {data.priority && (
                        <div className="mt-2">
                          <Badge className={getPriorityColor(data.priority)}>{getPriorityText(data.priority)}</Badge>
                        </div>
                      )}
                      {errors.priority && <div className="mt-1 text-xs text-app-error">{errors.priority}</div>}
                    </div>

                    <div>
                      <Label className="mb-2 flex items-center text-sm font-medium text-app-text-secondary">
                        <Tag className="mr-2 h-4 w-4" />
                        Kategori
                      </Label>
                      <Select value={data.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger className="border-app-border bg-app-background text-app-text focus:border-app-primary">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent className="border border-app-border bg-app-background-secondary text-app-text shadow-lg">
                          {categories.map((category) => (
                            <SelectItem key={category} value={category} className="text-app-text hover:bg-app-primary-light">
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {data.category && (
                        <div className="mt-2">
                          <Badge variant="outline" className="border-app-primary text-app-primary">
                            {data.category}
                          </Badge>
                        </div>
                      )}
                      {errors.category && <div className="mt-1 text-xs text-app-error">{errors.category}</div>}
                    </div>

                    <div>
                      <Label htmlFor="dueDate" className="mb-2 flex items-center text-sm font-medium text-app-text-secondary">
                        <Calendar className="mr-2 h-4 w-4" />
                        Tenggat Waktu
                      </Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={data.dueDate}
                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        className="border-app-border bg-app-background text-app-text focus:border-app-primary"
                      />
                      {errors.dueDate && <div className="mt-1 text-xs text-app-error">{errors.dueDate}</div>}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-app-border bg-app-background-secondary shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-app-primary">
                      <FileText className="h-5 w-5" />
                      Preview Tugas
                    </CardTitle>
                    <CardDescription className="text-app-text-secondary">
                      Lihat ringkasan tugas sebelum disimpan.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-app-text">
                        {data.title?.trim() || 'Belum ada judul tugas'}
                      </h4>
                      <p className="mt-2 line-clamp-3 text-sm text-app-text-secondary">
                        {data.description?.trim() || 'Mulailah mengisi formulir di sebelah kiri untuk melihat preview tugas.'}
                      </p>
                    </div>

                    <div className="space-y-3 border-t border-app-border pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-app-text-muted">Prioritas</span>
                        {data.priority ? (
                          <Badge className={getPriorityColor(data.priority)}>{getPriorityText(data.priority)}</Badge>
                        ) : (
                          <span className="text-sm text-app-text-secondary">-</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-app-text-muted">Kategori</span>
                        {data.category ? (
                          <Badge variant="outline" className="border-app-primary text-app-primary">
                            {data.category}
                          </Badge>
                        ) : (
                          <span className="text-sm text-app-text-secondary">-</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-app-text-muted">Deadline</span>
                        <span className="text-sm text-app-text">
                          {data.dueDate ? new Date(data.dueDate).toLocaleDateString('id-ID') : '-'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

EditTask.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>

export default EditTask