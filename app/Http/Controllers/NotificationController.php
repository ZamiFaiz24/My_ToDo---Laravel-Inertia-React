<?php

namespace App\Http\Controllers;

use App\Models\Data\Notifications;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function read(Request $request, int $id): RedirectResponse
    {
        $notification = Notifications::where('user_id', $request->user()->id)
            ->findOrFail($id);

        // Tandai sudah dibaca
        if ($notification->read_at === null) {
            $notification->update([
                'read_at' => now(),
            ]);
        }

        // Kalau notification berhubungan dengan task
        if ($notification->task_id) {
            return to_route('tasks.show', $notification->task_id);
        }

        // Kalau tidak punya task_id
        return back();
    }

    public function markAllAsRead(Request $request): RedirectResponse
    {
        Notifications::where('user_id', $request->user()->id)
            ->whereNull('read_at')
            ->update([
                'read_at' => now(),
            ]);

        return back();
    }
}
