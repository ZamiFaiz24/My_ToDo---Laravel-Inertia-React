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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Link href={`/task/${task.id}`}>
                <Button variant="ghost" className="text-app-primary hover:bg-app-primary-light">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke Detail
                </Button>
              </Link>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-app-primary mb-2">Edit Tugas</h1>
              <p className="text-app-text-secondary">Perbarui data tugas yang sudah ada.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-app-background-secondary border border-app-border hover:shadow-md hover:border-app-primary transition">
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
                        className="mt-1 border-app-border focus:border-app-primary bg-app-background text-app-text placeholder:text-app-text-muted"
                        required
                      />
                      {errors.title && <div className="text-app-error text-xs mt-1">{errors.title}</div>}
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
                        className="mt-1 min-h-[100px] border-app-border focus:border-app-primary bg-app-background text-app-text placeholder:text-app-text-muted"
                      />
                      {errors.description && <div className="text-app-error text-xs mt-1">{errors.description}</div>}
                    </div>
                  </CardContent>
                </Card>

              </div>

              <div className="space-y-6">
                <Card className="bg-app-background-secondary border border-app-border hover:shadow-md hover:border-app-primary transition">
                  <CardHeader>
                    <CardTitle className="text-app-primary">Pengaturan Tugas</CardTitle>
                    <CardDescription className="text-app-text-secondary">Atur prioritas, kategori, dan tenggat.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-app-text-secondary flex items-center mb-2">
                        <Flag className="mr-2 h-4 w-4" />
                        Prioritas
                      </Label>
                      <Select value={data.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                        <SelectTrigger className="border-app-border focus:border-app-primary bg-app-background text-app-text">
                          <SelectValue placeholder="Pilih prioritas" />
                        </SelectTrigger>
                        <SelectContent className="bg-app-background-secondary border border-app-border shadow-lg text-app-text">
                          <SelectItem value="high" className="hover:bg-app-primary-light text-app-text">Tinggi</SelectItem>
                          <SelectItem value="medium" className="hover:bg-app-warning/20 text-app-text">Sedang</SelectItem>
                          <SelectItem value="low" className="hover:bg-app-border/20 text-app-text">Rendah</SelectItem>
                        </SelectContent>
                      </Select>
                      {data.priority && <div className="mt-2"><Badge className={getPriorityColor(data.priority)}>{getPriorityText(data.priority)}</Badge></div>}
                      {errors.priority && <div className="text-app-error text-xs mt-1">{errors.priority}</div>}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-app-text-secondary flex items-center mb-2">
                        <Tag className="mr-2 h-4 w-4" />
                        Kategori
                      </Label>
                      <Select value={data.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger className="border-app-border focus:border-app-primary bg-app-background text-app-text">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent className="bg-app-background-secondary border border-app-border shadow-lg text-app-text">
                          {categories.map((category) => (
                            <SelectItem key={category} value={category} className="hover:bg-app-primary-light text-app-text">
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {data.category && <div className="mt-2"><Badge variant="outline" className="border-app-primary text-app-primary">{data.category}</Badge></div>}
                      {errors.category && <div className="text-app-error text-xs mt-1">{errors.category}</div>}
                    </div>

                    <div>
                      <Label htmlFor="dueDate" className="text-sm font-medium text-app-text-secondary flex items-center mb-2">
                        <Calendar className="mr-2 h-4 w-4" />
                        Tenggat Waktu
                      </Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={data.dueDate}
                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        className="border-app-border focus:border-app-primary bg-app-background text-app-text"
                      />
                      {errors.dueDate && <div className="text-app-error text-xs mt-1">{errors.dueDate}</div>}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-app-background-secondary border border-app-border hover:shadow-md hover:border-app-primary transition">
                  <CardContent className="pt-6 space-y-3">
                    <Button type="submit" disabled={isSubmitting || !data.title.trim()} className="w-full bg-app-primary hover:bg-app-primary-dark text-white font-semibold">
                      {isSubmitting ? 'Menyimpan...' : <><Save className="mr-2 h-4 w-4" />Simpan Perubahan</>}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleReset} className="w-full border-app-primary text-app-primary hover:bg-app-primary-light" disabled={isSubmitting}>
                      <X className="mr-2 h-4 w-4" />
                      Reset Form
                    </Button>
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