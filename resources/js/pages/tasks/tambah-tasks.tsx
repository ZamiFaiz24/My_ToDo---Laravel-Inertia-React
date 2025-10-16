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


interface TodoForm {
  title: string
  description: string
  priority: "high" | "medium" | "low" | ""
  dueDate: string
  category: string
  notes: string
  
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
    notes: "",
    })

    const handleInputChange = (field: keyof TodoForm, value: string) => {
        setData(field, value)
    }

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case "high":
          return "bg-[#3B82F6] text-white"
        case "medium":
          return "bg-[#2563EB] text-white"
        case "low":
          return "bg-[#E5E7EB] text-[#2563EB]"
        default:
          return "bg-[#F3F4F6] text-[#6B7280]"
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
    <div className="min-h-screen bg-[#F3F4F6]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-[#2563EB] hover:bg-[#E0F2FE]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Dashboard
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#2563EB] mb-2">Tambah Tugas Baru</h1>
          <p className="text-[#6B7280]">Buat tugas baru dan atur prioritas serta tenggat waktunya</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-white border border-[#E5E7EB] hover:shadow-md hover:border-[#3B82F6] transition">
              <CardHeader>
                <CardTitle className="text-[#2563EB]">Informasi Dasar</CardTitle>
                <CardDescription className="text-[#6B7280]">Masukkan informasi dasar tentang tugas Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-[#6B7280]">
                    Judul Tugas *
                  </Label>
                  <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Masukkan judul tugas..."
                    className="mt-1 border-[#E5E7EB] focus:border-[#3B82F6]"
                    required
                  />
                  {errors.title && <div className="text-[#FB7185] text-xs mt-1">{errors.title}</div>}
                </div>
                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-[#6B7280]">
                    Deskripsi
                  </Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Jelaskan detail tugas Anda..."
                    className="mt-1 min-h-[100px] border-[#E5E7EB] focus:border-[#3B82F6]"
                  />
                  {errors.description && <div className="text-[#FB7185] text-xs mt-1">{errors.description}</div>}
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card className="bg-white border border-[#E5E7EB] hover:shadow-md hover:border-[#3B82F6] transition">
              <CardHeader>
                <CardTitle className="text-[#2563EB] flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Catatan Tambahan
                </CardTitle>
                <CardDescription className="text-[#6B7280]">Tambahkan catatan atau informasi tambahan</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={data.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Tambahkan catatan, checklist, atau informasi tambahan..."
                  className="min-h-[120px] border-[#E5E7EB] focus:border-[#3B82F6]"
                />
                {errors.notes && <div className="text-[#FB7185] text-xs mt-1">{errors.notes}</div>}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Settings */}
            <Card className="bg-white border border-[#E5E7EB] hover:shadow-md hover:border-[#3B82F6] transition">
              <CardHeader>
                <CardTitle className="text-[#2563EB]">Pengaturan Tugas</CardTitle>
                <CardDescription className="text-[#6B7280]">Atur prioritas dan kategori tugas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-[#6B7280] flex items-center mb-2">
                    <Flag className="mr-2 h-4 w-4" />
                    Prioritas
                  </Label>
                  <Select value={data.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger className="border-[#E5E7EB] focus:border-[#3B82F6]">
                      <SelectValue placeholder="Pilih prioritas" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-[#E5E7EB] shadow-lg text-[#2563EB]">
                      <SelectItem value="high" className="hover:bg-[#E0F2FE] text-[#2563EB]">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-[#3B82F6] rounded-full mr-2"></div>
                          Tinggi
                        </div>
                      </SelectItem>
                      <SelectItem value="medium" className="hover:bg-[#E0F2FE] text-[#2563EB]">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-[#2563EB] rounded-full mr-2"></div>
                          Sedang
                        </div>
                      </SelectItem>
                      <SelectItem value="low" className="hover:bg-[#E0F2FE] text-[#2563EB]">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-[#E5E7EB] rounded-full mr-2"></div>
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
                  {errors.priority && <div className="text-[#FB7185] text-xs mt-1">{errors.priority}</div>}
                </div>

                <div>
                  <Label className="text-sm font-medium text-[#6B7280] flex items-center mb-2">
                    <Tag className="mr-2 h-4 w-4" />
                    Kategori
                  </Label>
                  <Select value={data.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="border-[#E5E7EB] focus:border-[#3B82F6]">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-[#E5E7EB] shadow-lg text-[#2563EB]">
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="hover:bg-[#E0F2FE] text-[#2563EB]"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {data.category && (
                    <div className="mt-2">
                      <Badge variant="outline" className="border-[#3B82F6] text-[#2563EB]">{data.category}</Badge>
                    </div>
                  )}
                  {errors.category && <div className="text-[#FB7185] text-xs mt-1">{errors.category}</div>}
                </div>

                <div>
                  <Label
                    htmlFor="dueDate"
                    className="text-sm font-medium text-[#6B7280] flex items-center mb-2"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Tenggat Waktu
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={data.dueDate}
                    onChange={(e) => handleInputChange("dueDate", e.target.value)}
                    className="border-[#E5E7EB] focus:border-[#3B82F6]"
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.dueDate && <div className="text-[#FB7185] text-xs mt-1">{errors.dueDate}</div>}
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="bg-white border border-[#E5E7EB] hover:shadow-md hover:border-[#3B82F6] transition">
              <CardHeader>
                <CardTitle className="text-[#2563EB]">Preview</CardTitle>
                <CardDescription className="text-[#6B7280]">Pratinjau tugas yang akan dibuat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-[#2563EB]">{data.title || "Judul tugas akan muncul di sini"}</h4>
                    {data.description && (
                      <p className="text-sm text-[#6B7280] mt-1 line-clamp-2">{data.description}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.priority && (
                      <Badge className={getPriorityColor(data.priority)}>{getPriorityText(data.priority)}</Badge>
                    )}
                    {data.category && <Badge variant="outline" className="border-[#3B82F6] text-[#2563EB]">{data.category}</Badge>}
                  </div>
                  {data.dueDate && (
                    <p className="text-xs text-[#6B7280]">
                      Tenggat: {new Date(data.dueDate).toLocaleDateString("id-ID")}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="bg-white border border-[#E5E7EB] hover:shadow-md hover:border-[#3B82F6] transition">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !(data.title || "").trim()}
                    className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold"
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
                    className="w-full border-[#3B82F6] text-[#2563EB] hover:bg-[#E0F2FE]"
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
  )
}


AddTask.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>
export default AddTask