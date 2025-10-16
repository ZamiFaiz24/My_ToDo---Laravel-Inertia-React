"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ListTodo, Mail, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react"

interface AuthCardProps {
  isLogin: boolean
  toggleForm: () => void
}

const AuthCard: React.FC<AuthCardProps> = ({ isLogin, toggleForm }) => {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "", // penting untuk register
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      post("/login", {
        preserveScroll: true,
      })
    } else {
      post("/register", {
        preserveScroll: true,
      })
    }
  }

  return (
    <div className="h-full flex flex-col justify-center p-8 bg-app-secondary text-app-text-inverse">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 border border-app-border rounded-lg">
            <ListTodo className="h-8 w-8 text-app-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {isLogin ? (
            <>
              <span className="text-app-accent mr-2">👋</span>
              Selamat Datang!
            </>
          ) : (
            <>
              <span className="text-app-error mr-2">🚀</span>
              Daftar Akun Baru
            </>
          )}
        </h2>
        <p className="text-app-text-muted text-sm">
          {isLogin ? "Masuk ke akun My ToDo Anda untuk melanjutkan" : "Buat akun baru untuk mulai mengelola tugas"}
        </p>
      </div>

      {/* Display Errors */}
      {Object.keys(errors).length > 0 && (
        <Alert className="mb-6 border-app-error/30 bg-app-error-light">
          <AlertCircle className="h-4 w-4 text-app-error" />
          <AlertDescription className="text-app-error">
            {Object.values(errors).map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 flex-1">
        {!isLogin && (
          <div>
            <Label htmlFor="name" className="text-app-text-inverse font-medium mb-2 block">
              Nama Lengkap
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-input-placeholder h-4 w-4" />
              <Input
                id="name"
                type="text"
                placeholder="Full Name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className={`pl-10 bg-app-input-background text-app-input-text border border-app-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-input-border-focus placeholder:text-app-input-placeholder ${
                  errors.name ? "border-app-error focus:ring-app-error" : ""
                }`}
                required={!isLogin}
              />
            </div>
            {errors.name && <p className="text-app-error text-sm mt-1">{errors.name}</p>}
          </div>
        )}

        <div>
          <Label htmlFor="email" className="text-app-text-inverse font-medium mb-2 block">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-input-placeholder h-4 w-4" />
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className={`pl-10 bg-app-input-background text-app-input-text border border-app-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-input-border-focus placeholder:text-app-input-placeholder ${
                errors.email ? "border-app-error focus:ring-app-error" : ""
              }`}
              required
            />
          </div>
          {errors.email && <p className="text-app-error text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="password" className="text-app-text-inverse font-medium mb-2 block">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-input-placeholder h-4 w-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              className={`pl-10 pr-10 bg-app-input-background text-app-input-text border border-app-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-input-border-focus placeholder:text-app-input-placeholder ${
                errors.password ? "border-app-error focus:ring-app-error" : ""
              }`}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-app-primary-light text-app-input-placeholder"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {errors.password && <p className="text-app-error text-sm mt-1">{errors.password}</p>}
        </div>

        {!isLogin && (
          <div>
            <Label htmlFor="confirmPassword" className="text-app-text-inverse font-medium mb-2 block">
              Konfirmasi Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-input-placeholder h-4 w-4" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={data.password_confirmation}
                onChange={(e) => setData("password_confirmation", e.target.value)}
                className={`pl-10 pr-10 bg-app-input-background text-app-input-text border border-app-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-input-border-focus placeholder:text-app-input-placeholder ${
                  errors.password_confirmation ? "border-app-error focus:ring-app-error" : ""
                }`}
                required={!isLogin}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-app-primary-light text-app-input-placeholder"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.password_confirmation && (
              <p className="text-app-error text-sm mt-1">{errors.password_confirmation}</p>
            )}
          </div>
        )}

        {isLogin && (
          <div className="flex items-center justify-between text-sm text-app-text-muted">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2 accent-app-error rounded" />
              Remember me
            </label>
            <button type="button" className="text-app-accent hover:underline">
              Forgot password?
            </button>
          </div>
        )}

        <Button
          type="submit"
          disabled={processing}
          className="w-full bg-app-button-gradient hover:bg-app-button-gradient-hover text-app-button-primary-text py-3 rounded-lg font-bold shadow-lg transition-all duration-200 mt-8"
          style={{
            background: processing ? "var(--app-button-gradient-hover)" : "var(--app-button-gradient)",
          }}
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-app-button-primary-text mr-2"></div>
              {isLogin ? "Login..." : "Register..."}
            </>
          ) : (
            <>{isLogin ? "Login" : "Register"}</>
          )}
        </Button>
      </form>
    </div>
  )
}

export default AuthCard
