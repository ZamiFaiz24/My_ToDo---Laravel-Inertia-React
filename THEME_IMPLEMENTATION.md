# Light & Dark Mode Implementation Guide

## 📋 Overview

Aplikasi sudah diintegrasikan dengan sistem **light/dark mode** yang lengkap, menggunakan CSS variables, Tailwind CSS, dan React hooks.

---

## ✅ Apa Yang Sudah Diimplementasikan

### 1. **Backend (Server-Side)**

- ✅ Middleware `HandleAppearance` menyimpan preferensi tema di cookie
- ✅ Cookie 'appearance' di-exclude dari encryption untuk SSR
- ✅ Blade template `app.blade.php` menerapkan class `dark` berdasarkan cookie
- ✅ System preference detection untuk mode 'system' default

### 2. **Frontend (Client-Side)**

- ✅ Hook `useAppearance()` mengelola status tema (light/dark/system)
- ✅ LocalStorage untuk persistensi preferensi klien
- ✅ Media query listener untuk deteksi perubahan system preference
- ✅ Automatic class toggle pada `document.documentElement`

### 3. **UI Components**

- ✅ Appearance Settings Page (`/settings/appearance`)
    - Grid layout dengan 3 opsi tema
    - Preview section menampilkan tema aktif
    - Icons untuk setiap mode
    - Check mark indicator

- ✅ Appearance Dropdown (`AppearanceToggleDropdown`)
    - Quick access di navbar
    - Dropdown menu dengan 3 pilihan
    - Icon berubah sesuai tema aktif

- ✅ Navbar (`navbar.tsx`)
    - Menggunakan `useAppearance` hook
    - Appearance toggle terintegrasi
    - Responsive design (mobile & desktop)

### 4. **Styling**

- ✅ CSS Variables di `app.css`:
    - Light mode: `--app-*` variables dengan warna cerah
    - Dark mode: `.dark` class dengan warna gelap
    - System preference fallback

- ✅ Tailwind Config (`tailwind.config.js`):
    - `darkMode: 'class'` configuration
    - Custom color classes: `bg-app-*`, `text-app-*`
    - Smooth transitions

---

## 🎯 Cara Menggunakan

### **1. Switch Tema dari Navbar**

```
Klik icon Moon/Sun di navbar → Pilih Light / Dark / System
```

### **2. Switch Tema dari Settings**

```
Buka /settings/appearance → Klik salah satu theme card
Perubahan langsung diterapkan
```

### **3. Gunakan Hook di Component Manapun**

```typescript
import { useAppearance } from '@/hooks/use-appearance';

export default function MyComponent() {
  const { appearance, updateAppearance } = useAppearance();

  return (
    <div>
      <p>Current theme: {appearance}</p>
      <button onClick={() => updateAppearance('dark')}>
        Enable Dark Mode
      </button>
    </div>
  );
}
```

---

## 🔧 File Yang Dimodifikasi

1. **`resources/js/pages/settings/appearance.tsx`**
    - Updated untuk menggunakan `useAppearance` hook
    - Konsisten dengan implementasi global
    - Better UI dengan preview section

2. **`resources/js/layouts/app-layout.tsx`**
    - Removed bug: `.classList.remove('dark')` di useEffect
    - Added proper className untuk background & text
    - Added smooth transitions

3. **`resources/js/components/navbar.tsx`**
    - Refactored untuk menggunakan `useAppearance` hook
    - Replaced hardcoded colors dengan app-\* Tailwind classes
    - Clean up: removed duplicate theme management
    - Integrated `AppearanceToggleDropdown` component

---

## 🎨 CSS Color Variables Yang Tersedia

### Light Mode (`:root`)

```css
--app-primary: #4ecdc4 --app-primary-foreground: #1a535c --app-secondary: #1a535c --app-accent: #ffe66d --app-error: #ff6b6b --app-background: #f7fff7
    --app-background-secondary: #ffffff --app-text: #1a535c --app-text-secondary: #6b7280;
```

### Dark Mode (`.dark`)

```css
--app-primary: #4ecdc4 (sama) --app-background: #0f172a --app-background-secondary: #111827 --app-text: #f1f5f9 --app-text-secondary: #cbd5f5;
```

---

## 📱 Responsive Dengan Tailwind

Gunakan class-class ini di component:

```tsx
<div className="bg-app-background text-app-text">
  Light: bg cerah, text gelap
  Dark: bg gelap, text cerah
</div>

<button className="bg-app-primary hover:bg-app-primary-dark">
  Will automatically switch color in dark mode
</button>
```

---

## 🔄 Siklus Kerja (Flow)

1. **User klik theme button** → `updateAppearance(mode)`
2. **Hook save ke localStorage** → Persist client-side
3. **Hook save ke cookie** → Available di server (SSR)
4. **Hook apply theme** → Toggle `dark` class di html
5. **CSS media query** → Browser render dengan color scheme baru
6. **Next request** → Server read cookie → Pass ke blade → Apply class

---

## ⚠️ Important Notes

- **Cookie 'appearance'** must stay unencrypted (sudah dikonfigurasi)
- **initializeTheme()** harus dipanggil di app.tsx on load ✅
- **Media query listener** otomatis deteksi system preference changes ✅
- **Dark class** selalu di `document.documentElement` (bukan body)

---

## 🧪 Testing Checklist

- [ ] Click light mode → UI berubah cerah
- [ ] Click dark mode → UI berubah gelap
- [ ] Click system → Follow OS preference
- [ ] Refresh page → Theme tetap sama (localStorage)
- [ ] Buka settings/appearance → Current theme ter-select
- [ ] Responsive di mobile → Navbar buttons tetap clicky

---

## 🚀 Siap Digunakan!

Semuanya sudah ready. Coba buka aplikasi dan test semua theme switching! 🎉
