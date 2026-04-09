import React from 'react';
import { Head } from '@inertiajs/react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Button } from '@/components/ui/button';
import { useAppearance, type Appearance } from '@/hooks/use-appearance';

const themes: Array<{ key: Appearance; label: string; icon: React.ReactNode }> = [
  { key: 'light', label: 'Light Mode', icon: <Sun className="h-5 w-5" /> },
  { key: 'dark', label: 'Dark Mode', icon: <Moon className="h-5 w-5" /> },
  { key: 'system', label: 'System Default', icon: <Monitor className="h-5 w-5" /> },
];

export default function Appearance() {
  const { appearance, updateAppearance } = useAppearance();

  return (
    <AppLayout>
      <Head title="Appearance Settings" />
      <SettingsLayout>
        <div className="max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-app-primary mb-2">Pengaturan Tampilan</h1>
            <p className="text-app-text-secondary">Pilih mode tampilan yang sesuai dengan preferensi Anda. Perubahan akan langsung diterapkan.</p>
          </div>

          <div className="bg-app-background-secondary border border-app-border rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.key}
                  onClick={() => updateAppearance(theme.key)}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-3 min-h-[140px] ${
                    appearance === theme.key
                      ? 'border-app-primary bg-app-primary-light shadow-lg'
                      : 'border-app-border hover:border-app-primary bg-app-background hover:bg-app-background-accent'
                  }`}
                >
                  {/* Icon */}
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    appearance === theme.key
                      ? 'bg-app-primary text-white'
                      : 'bg-app-background-secondary text-app-primary'
                  }`}>
                    {theme.icon}
                  </div>

                  {/* Label */}
                  <span className={`font-semibold text-center ${
                    appearance === theme.key
                      ? 'text-app-primary-foreground'
                      : 'text-app-text'
                  }`}>
                    {theme.label}
                  </span>

                  {/* Active Indicator */}
                  {appearance === theme.key && (
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center justify-center w-6 h-6 bg-app-primary rounded-full text-white">
                        <Check className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-8 p-6 bg-app-background-secondary border border-app-border rounded-lg">
            <h2 className="text-lg font-semibold text-app-text mb-4">Preview</h2>
            <p className="text-app-text-secondary text-sm">
              Mode tampilan saat ini: <span className="font-semibold text-app-primary capitalize">{appearance}</span>
            </p>
            <div className="mt-4 p-4 bg-app-background border border-dashed border-app-border rounded text-app-text text-sm">
              Ini adalah preview dari mode tampilan yang sedang aktif. Warna dan styling akan menyesuaikan berdasarkan pilihan Anda.
            </div>
          </div>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
