import { useForm, router, Link } from '@inertiajs/react'
import type React from "react"
import { useState } from "react"
import { ArrowLeft, Calendar, Flag, Tag, FileText, Save, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'


interface TodoForm {
  title: string
  description: string
  priority: "high" | "medium" | "low" | ""
  dueDate: string
  category: string
}

const categories = ["Pekerjaan", "Personal", "Kesehatan", "Belajar", "Keluarga", "Hobi", "Keuangan", "Lainnya"]

function AddTask() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm<Partial<TodoForm>>({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    category: "",
    })

    const handleInputChange = (field: keyof TodoForm, value: string) => {
        setData(field, value)
    }

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case "high":
          return "bg-app-error text-white"
        case "medium":
          return "bg-app-warning text-app-text"
        case "low":
          return "bg-app-border text-app-text"
        default:
          return "bg-app-background text-app-text-secondary"
      }
    }

    const getPriorityText = (priority: string) => {
      switch (priority) {
        case "high":
          return "Tinggi"
        case "medium":
          return "Sedang"
        case "low":
          return "Rendah"
        default:
          return priority
      }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!data.title || !data.title.trim()) {
        alert("Judul tugas harus diisi!")
        return
        }
        setIsSubmitting(true)
        post("/tasks", {
        onSuccess: () => {
            setIsSubmitting(false)
            router.visit("/dashboard")
        },
        onError: () => setIsSubmitting(false),
        })
    }

    const handleReset = () => {
        reset()
    }

  return (
    <>
      <Head title="Tambah Tugas" />
      <div className="min-h-screen bg-app-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-app-primary hover:bg-app-primary-light">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke Dashboard
                </Button>
              </Link>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-app-primary mb-2">Tambah Tugas Baru</h1>
              <p className="text-app-text-secondary">Buat tugas baru dan atur prioritas serta tenggat waktunya</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card className="bg-app-background-secondary border border-app-border hover:shadow-md hover:border-app-primary transition">
                  <CardHeader>
                    <CardTitle className="text-app-primary">Informasi Dasar</CardTitle>
                    <CardDescription className="text-app-text-secondary">Masukkan informasi dasar tentang tugas Anda</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-sm font-medium text-app-text-secondary">
                        Judul Tugas *
                      </Label>
                      <Input
                        id="title"
                        value={data.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
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
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Jelaskan detail tugas Anda..."
                        className="mt-1 min-h-[100px] border-app-border focus:border-app-primary bg-app-background text-app-text placeholder:text-app-text-muted"
                      />
                      {errors.description && <div className="text-app-error text-xs mt-1">{errors.description}</div>}
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Task Settings */}
                <Card className="bg-app-background-secondary border border-app-border hover:shadow-md hover:border-app-primary transition">
                  <CardHeader>
                    <CardTitle className="text-app-primary">Pengaturan Tugas</CardTitle>
                    <CardDescription className="text-app-text-secondary">Atur prioritas dan kategori tugas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-app-text-secondary flex items-center mb-2">
                        <Flag className="mr-2 h-4 w-4" />
                        Prioritas
                      </Label>
                      <Select value={data.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                        <SelectTrigger className="border-app-border focus:border-app-primary bg-app-background text-app-text">
                          <SelectValue placeholder="Pilih prioritas" />
                        </SelectTrigger>
                        <SelectContent className="bg-app-background-secondary border border-app-border shadow-lg text-app-text">
                          <SelectItem value="high" className="hover:bg-app-primary-light text-app-text">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-app-error rounded-full mr-2"></div>
                              Tinggi
                            </div>
                          </SelectItem>
                          <SelectItem value="medium" className="hover:bg-app-warning/20 text-app-text">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-app-warning rounded-full mr-2"></div>
                              Sedang
                            </div>
                          </SelectItem>
                          <SelectItem value="low" className="hover:bg-app-border/20 text-app-text">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-app-border rounded-full mr-2"></div>
                              Rendah
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {data.priority && (
                        <div className="mt-2">
                          <Badge className={getPriorityColor(data.priority)}>{getPriorityText(data.priority)}</Badge>
                        </div>
                      )}
                      {errors.priority && <div className="text-app-error text-xs mt-1">{errors.priority}</div>}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-app-text-secondary flex items-center mb-2">
                        <Tag className="mr-2 h-4 w-4" />
                        Kategori
                      </Label>
                      <Select value={data.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="border-app-border focus:border-app-primary bg-app-background text-app-text">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent className="bg-app-background-secondary border border-app-border shadow-lg text-app-text">
                          {categories.map((category) => (
                            <SelectItem
                              key={category}
                              value={category}
                              className="hover:bg-app-primary-light text-app-text"
                            >
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {data.category && (
                        <div className="mt-2">
                          <Badge variant="outline" className="border-app-primary text-app-primary">{data.category}</Badge>
                        </div>
                      )}
                      {errors.category && <div className="text-app-error text-xs mt-1">{errors.category}</div>}
                    </div>

                    <div>
                      <Label
                        htmlFor="dueDate"
                        className="text-sm font-medium text-app-text-secondary flex items-center mb-2"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Tenggat Waktu
                      </Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={data.dueDate}
                        onChange={(e) => handleInputChange("dueDate", e.target.value)}
                        className="border-app-border focus:border-app-primary bg-app-background text-app-text"
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {errors.dueDate && <div className="text-app-error text-xs mt-1">{errors.dueDate}</div>}
                    </div>
                  </CardContent>
                </Card>

                {/* Preview */}
                <Card className="bg-app-background-secondary border border-app-border hover:shadow-md hover:border-app-primary transition">
                  <CardHeader>
                    <CardTitle className="text-app-primary">Preview</CardTitle>
                    <CardDescription className="text-app-text-secondary">Pratinjau tugas yang akan dibuat</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-app-primary">{data.title || "Judul tugas akan muncul di sini"}</h4>
                        {data.description && (
                          <p className="text-sm text-app-text-secondary mt-1 line-clamp-2">{data.description}</p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {data.priority && (
                          <Badge className={getPriorityColor(data.priority)}>{getPriorityText(data.priority)}</Badge>
                        )}
                        {data.category && <Badge variant="outline" className="border-app-primary text-app-primary">{data.category}</Badge>}
                      </div>
                      {data.dueDate && (
                        <p className="text-xs text-app-text-secondary">
                          Tenggat: {new Date(data.dueDate).toLocaleDateString("id-ID")}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card className="bg-app-background-secondary border border-app-border hover:shadow-md hover:border-app-primary transition">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <Button
                        type="submit"
                        disabled={isSubmitting || !(data.title || "").trim()}
                        className="w-full bg-app-primary hover:bg-app-primary-dark text-white font-semibold"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Menyimpan...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Simpan Tugas
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        className="w-full border-app-primary text-app-primary hover:bg-app-primary-light"
                        disabled={isSubmitting}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Reset Form
                      </Button>
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


AddTask.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>
export default AddTask