<?php

namespace App\Models;

use App\Enums\TaskStatus;
use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaskReport extends Model
{
    use HasFactory, Fillable, SoftDeletes;

    protected $fillable = [
        'task_id',
        'title',
        'description',
        'status',
    ];

    protected $appends = ['status_name'];

    function getStatusNameAttribute()
    {
        return trans('message.status.task.' . strtolower(TaskStatus::tryFrom($this->status)?->name))  ?? "";
    }

    public function scopeOfTask(Builder $query, $id): void
    {
        $query->where('task_id', $id);
    }

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
