<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use App\Models\Data\Tasks;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskReminderNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Tasks $task)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'task_reminder',
            'task_id' => $this->task->id,
            'title' => 'Tugas mendekati tenggat',
            'message' => "Tugas \"{$this->task->title}\" akan jatuh tempo.",
            'priority' => $this->task->priority,
            'due_date' => $this->task->due_date,
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
