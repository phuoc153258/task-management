<?php

namespace App\Models\Task;

use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Task extends Model
{
    use HasFactory, Notifiable, Fillable, SoftDeletes, TaskAttribute, TaskRelationship, TaskScope;

    protected $fillable = [
        'user_id',
        'project_id',
        'created_by',
        'title',
        'description',
        'status',
        'hours',
        'start_date',
        'end_date',
    ];

    protected $appends = ['status_name'];
}
