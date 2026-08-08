<?php

namespace App\Console\Commands;

use App\Models\Data\Tasks;
use App\Models\Data\Notifications;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class CheckTaskNotifications extends Command
{
    /**
     * Nama dan signature command.
     */
    protected $signature = 'notifications:check';

    /**
     * Deskripsi command.
     */
    protected $description = 'Mengecek tugas yang jatuh tempo dan membuat notifikasi';

    /**
     * Jalankan command.
     */
    public function handle()
    {
        $today = Carbon::today();

        $tasks = Tasks::whereDate('due_date', $today)
            ->where('completed', false)
            ->whereNotNull('user_id')
            ->get();

        foreach ($tasks as $task) {
            $exists = Notifications::where('user_id', $task->user_id)
                ->where('task_id', $task->id)
                ->where('type', 'task_due')
                ->exists();

            if ($exists) {
                continue;
            }

            Notifications::create([
                'user_id' => $task->user_id,
                'task_id' => $task->id,
                'type' => 'task_due',
                'title' => 'Tugas hari ini',
                'message' => 'Tugas "' . $task->title . '" memiliki tenggat hari ini.',
            ]);

            $this->info("Notifikasi dibuat untuk tugas: {$task->title}");
        }

        $this->info('Pengecekan notifikasi selesai.');

        return Command::SUCCESS;
    }
}
