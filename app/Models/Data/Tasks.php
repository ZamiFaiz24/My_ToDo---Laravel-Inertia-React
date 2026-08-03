<?php

namespace App\Models\Data;

use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    protected $fillable = [
        'title',
        'description',
        'priority',
        'completed',
        'due_date',
        'category',
    ];

    protected $casts = [
        'completed' => 'boolean',
        'due_date' => 'date',
    ];
}
