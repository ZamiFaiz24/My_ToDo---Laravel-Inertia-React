<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\NotificationController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [TaskController::class, 'index'])->name('dashboard');

    Route::get('/tambah-tugas', function () {
        return Inertia::render('tasks/tambah-tasks');
    })->name('tasks.create');

    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');

    Route::get('/calendar', [TaskController::class, 'calendar'])->name('calendar');

    Route::get('/task/{id}/edit', [TaskController::class, 'edit'])->name('task.edit');

    Route::get('/task/{id}', [TaskController::class, 'show'])->name('task.show');

    Route::put('/task/{id}', [TaskController::class, 'update'])->name('task.update');

    Route::delete('/task/{id}', [TaskController::class, 'destroy'])->name('task.destroy');

    // statistik
    Route::get('/stats', [TaskController::class, 'stats'])->name('stats');

    //notifikasi
    Route::post('/test-notification', [TaskController::class, 'testNotification'])
        ->middleware('auth')
        ->name('test.notification');

    Route::post('/notifications/{id}/read', [NotificationController::class, 'read'])
        ->middleware('auth')
        ->name('notifications.read');
    
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead'])
        ->name('notifications.read-all');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
