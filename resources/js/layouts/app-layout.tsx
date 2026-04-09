import React from 'react';
import Navbar from '@/components/navbar';
import '../../css/app.css'; // Impor CSS utama jika dibutuhkan

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div lang="id" className="font-sans bg-app-background min-h-screen text-app-text transition-colors duration-300">
      <Navbar />
      <main className="bg-app-background">{children}</main>
    </div>
  );
}
