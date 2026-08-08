<?php

namespace App\Services;

use App\Models\Data\Notifications;
use App\Models\Data\Tasks;
use App\Models\User;
use Carbon\Carbon;

class NotificationService
{
    /**
     * Membuat notification berdasarkan deadline tugas user.
     */
    public function generateDeadlineNotifications(User $user): void
    {
        $today = Carbon::today();
        $tomorrow = Carbon::tomorrow();

        $tasks = Tasks::where('user_id', $user->id)
            ->where('completed', false)
            ->whereNotNull('due_date')
            ->get();

        foreach ($tasks as $task) {
            $dueDate = Carbon::parse($task->due_date);

            // Tugas terlambat
            if ($dueDate->lt($today)) {
                $this->createIfNotExists(
                    user: $user,
                    task: $task,
                    type: 'overdue',
                    title: 'Tugas terlambat',
                    message: "\"{$task->title}\" sudah melewati tenggat waktu."
                );

                continue;
            }

            // Tenggat hari ini
            if ($dueDate->isSameDay($today)) {
                $this->createIfNotExists(
                    user: $user,
                    task: $task,
                    type: 'today',
                    title: 'Tenggat hari ini',
                    message: "\"{$task->title}\" memiliki tenggat hari ini."
                );

                continue;
            }

            // Tenggat besok
            if ($dueDate->isSameDay($tomorrow)) {
                $this->createIfNotExists(
                    user: $user,
                    task: $task,
                    type: 'tomorrow',
                    title: 'Tenggat besok',
                    message: "\"{$task->title}\" memiliki tenggat besok."
                );
            }
        }
    }

    /**
     * Membuat notification hanya jika belum ada.
     */
    private function createIfNotExists(
        User $user,
        Tasks $task,
        string $type,
        string $title,
        string $message
    ): void {
        Notifications::firstOrCreate(
            [
                'user_id' => $user->id,
                'task_id' => $task->id,
                'type' => $type,
            ],
            [
                'title' => $title,
                'message' => $message,
            ]
        );
    }
}
