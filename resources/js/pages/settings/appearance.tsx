import React from 'react';
import { Head } from '@inertiajs/react';
import { Sun, Moon, Monitor } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Button } from '@/components/ui/button';

const themes = [
  { key: 'light', label: 'Light', icon: <Sun className="h-5 w-5 text-[#FBBF24]" /> },
  { key: 'dark', label: 'Dark', icon: <Moon className="h-5 w-5 text-[#6366F1]" /> },
  { key: 'system', label: 'System', icon: <Monitor className="h-5 w-5 text-[#2563EB]" /> },
];

export default function Appearance() {
  // Simpan theme di localStorage dan state
  const [theme, setTheme] = React.useState<string>(() => localStorage.getItem('theme') || 'system');

  const handleThemeChange = (key: string) => {
    setTheme(key);
    localStorage.setItem('theme', key);
    // Terapkan theme ke html/body
    if (key === 'system') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', key);
    }
  };

  React.useEffect(() => {
    // Apply theme on mount
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <AppLayout>
      <Head title="Appearance settings" />
      <SettingsLayout>
        <div className="max-w-2xl mx-auto py-8">
          <div className="mb-8 flex items-center gap-3">
            <Monitor className="h-8 w-8 text-[#2563EB] bg-[#E6F0FF] rounded-xl p-1 shadow-sm" />
            <div>
              <h1 className="text-2xl font-bold text-[#2563EB] mb-1">Pengaturan Tampilan</h1>
              <p className="text-[#6B7280]">Pilih mode tampilan aplikasi sesuai preferensi Anda.</p>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-md p-6">
            <div className="flex flex-col gap-6">
              {themes.map((t) => (
                <Button
                  key={t.key}
                  variant={theme === t.key ? 'default' : 'outline'}
                  className={`flex items-center gap-3 w-full justify-start text-lg py-4 ${
                    theme === t.key ? 'bg-[#3B82F6] text-white font-bold shadow' : 'text-[#2563EB] hover:bg-[#E0F2FE]'
                  }`}
                  onClick={() => handleThemeChange(t.key)}
                >
                  {t.icon}
                  {t.label}
                  {theme === t.key && (
                    <span className="ml-auto text-xs bg-[#2563EB] text-white px-2 py-1 rounded">Aktif</span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
