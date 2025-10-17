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

    Route::get('/calendar', [TaskController::class, 'calendar'])->name('calendar');

    // detail task
    Route::get('/task/{id}', [TaskController::class, 'show'])->name('task.show');

    // statistik
    Route::get('/stats', [TaskController::class, 'stats'])->name('stats');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
