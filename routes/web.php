<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
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

    // detail task
    Route::get('/task/{id}', [TaskController::class, 'show'])->name('task.show');

    Route::put('/task/{id}', [TaskController::class, 'update'])->name('task.update');

    Route::delete('/task/{id}', [TaskController::class, 'destroy'])->name('task.destroy');

    // statistik
    Route::get('/stats', [TaskController::class, 'stats'])->name('stats');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
