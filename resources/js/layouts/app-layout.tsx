import React, { useEffect } from 'react';
import Navbar from '@/components/navbar';
import '../../css/app.css'; // Impor CSS utama jika dibutuhkan

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  useEffect(() => {
    document.documentElement.classList.remove('dark'); // <- Ini baris pentingnya
  }, []);

  return (
    <div lang="id" className="font-sans bg-app-background min-h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
