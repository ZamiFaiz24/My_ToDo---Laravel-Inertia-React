<?php

namespace App\Models\Data;

use App\Models\User;
use app\Models\Data\Notifications;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    protected $fillable = [
        'user_id',
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notifications::class, 'task_id');
    }
}
