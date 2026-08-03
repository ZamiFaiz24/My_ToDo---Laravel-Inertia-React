<?php

namespace Database\Seeders;

use App\Models\Data\Tasks;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => 'admin@mytodo.test'],
            [
                'name' => 'Admin Todo',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        $tester = User::updateOrCreate(
            ['email' => 'tester@mytodo.test'],
            [
                'name' => 'Tester Todo',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        Tasks::whereNull('user_id')->update(['user_id' => $admin->id]);

        Tasks::firstOrCreate(
            [
                'user_id' => $tester->id,
                'title' => 'Cek fitur multi akun',
            ],
            [
                'description' => 'Task contoh untuk mengecek apakah data sudah terpisah per akun login.',
                'priority' => 'medium',
                'completed' => false,
                'due_date' => now()->addDays(2),
                'category' => 'Testing',
            ]
        );
    }
}
