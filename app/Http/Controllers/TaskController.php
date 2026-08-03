<?php

namespace App\Http\Controllers;

use App\Models\Data\Tasks;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(): Response
    {
        $tasks = Tasks::all();

        return Inertia::render('dashboard', [
            'tasks' => $tasks,
        ]);
    }

    public function calendar(): Response
    {
        $tasks = Tasks::select('id', 'title', 'due_date as date', 'priority')->get();

        return Inertia::render('calendar', [
            'tasks' => $tasks,
        ]);
    }

    public function stats(): Response
    {
        $tasks = Tasks::select('id', 'title', 'completed', 'priority')->get();

        return Inertia::render('stats', [
            'tasks' => $tasks,
        ]);
    }

    public function show(int $id): Response
    {
        $task = Tasks::findOrFail($id);

        // render komponen React yang ada di resources/js/pages/tasks/show.tsx
        return Inertia::render('tasks/show', [
            'task' => $task,
        ]);
    }

    public function edit(int $id): Response
    {
        $task = Tasks::findOrFail($id);

        return Inertia::render('tasks/edit-task', [
            'task' => $task,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'priority' => ['nullable', 'in:low,medium,high'],
            'dueDate' => ['nullable', 'date'],
            'category' => ['nullable', 'string', 'max:255'],
        ]);

        Tasks::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'priority' => $validated['priority'] ?? 'medium',
            'due_date' => $validated['dueDate'] ?? null,
            'category' => $validated['category'] ?? null,
            'completed' => false,
        ]);

        return to_route('dashboard')->with('success', 'Tugas berhasil ditambahkan.');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $task = Tasks::findOrFail($id);

        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'priority' => ['sometimes', 'nullable', 'in:low,medium,high'],
            'dueDate' => ['sometimes', 'nullable', 'date'],
            'category' => ['sometimes', 'nullable', 'string', 'max:255'],
            'completed' => ['sometimes', 'boolean'],
        ]);

        $updates = [];

        if (array_key_exists('title', $validated)) {
            $updates['title'] = $validated['title'];
        }

        if (array_key_exists('description', $validated)) {
            $updates['description'] = $validated['description'];
        }

        if (array_key_exists('priority', $validated)) {
            $updates['priority'] = $validated['priority'] ?? 'medium';
        }

        if (array_key_exists('dueDate', $validated)) {
            $updates['due_date'] = $validated['dueDate'];
        }

        if (array_key_exists('category', $validated)) {
            $updates['category'] = $validated['category'];
        }

        if (array_key_exists('completed', $validated)) {
            $updates['completed'] = $validated['completed'];
        }

        $task->update($updates);

        return back()->with('success', 'Tugas berhasil diperbarui.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $task = Tasks::findOrFail($id);
        $task->delete();

        return to_route('dashboard')->with('success', 'Tugas berhasil dihapus.');
    }
}
