<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Data\Tasks;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $admin = User::where('email', 'admin@mytodo.test')->first();

        Tasks::insert([
            [
                'user_id' => $admin?->id,
                'title' => 'Todo List App',
                'description' => 'Membuat aplikasi todo list dengan Laravel dan Inertia.js',
                'completed' => false,
                'priority' => 'medium',
                'due_date' => now()->addDays(3),
                'category' => 'Laravel Project',
            ],
            [
                'user_id' => $admin?->id,
                'title' => 'Sistem Pakar Sapi',
                'description' => 'Implementasi metode Forward Chaining dan Certainty Factor',
                'completed' => false,
                'priority' => 'high',
                'due_date' => now()->addDays(7),
                'category' => 'Skripsi',
            ],
            [
                'user_id' => $admin?->id,
                'title' => 'Web Jual Mobil Aki',
                'description' => 'Project jual beli mobil aki anak-anak dengan Laravel dan Vue',
                'completed' => true,
                'priority' => 'low',
                'due_date' => now()->subDays(2),
                'category' => 'E-commerce',
            ],
            [
                'user_id' => $admin?->id,
                'title' => 'Coffee Shop UI',
                'description' => 'Desain frontend untuk coffee shop dengan Tailwind dan Vue',
                'completed' => false,
                'priority' => 'medium',
                'due_date' => now()->addDays(5),
                'category' => 'Frontend',
            ],
            [
                'user_id' => $admin?->id,
                'title' => 'Monitoring IoT Perangkat',
                'description' => 'Menampilkan status perangkat ON/OFF dan log aktivitas',
                'completed' => false,
                'priority' => 'high',
                'due_date' => now()->addDays(4),
                'category' => 'IoT Laravel',
            ],
            [
                'user_id' => $admin?->id,
                'title' => 'Dashboard Laravel + Inertia',
                'description' => 'Membuat tampilan dashboard user dengan Laravel Inertia Vue',
                'completed' => true,
                'priority' => 'low',
                'due_date' => now()->subDays(1),
                'category' => 'Dashboard',
            ],
            [
                'user_id' => $admin?->id,
                'title' => 'Autentikasi Multi-Level',
                'description' => 'Menambahkan login untuk admin dan user biasa dengan Laravel Breeze',
                'completed' => false,
                'priority' => 'medium',
                'due_date' => now()->addDays(6),
                'category' => 'Auth System',
            ],
            [
                'user_id' => $admin?->id,
                'title' => 'Book Chapter TI',
                'description' => 'Menulis bab tentang manajemen insiden dan continuity planning',
                'completed' => false,
                'priority' => 'high',
                'due_date' => now()->addDays(10),
                'category' => 'Penulisan',
            ],
        ]);
    }
}
