<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Data\Tasks;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Tasks::all();

        return Inertia::render('dashboard', [
            'tasks' => $tasks,
        ]);
    }
}
