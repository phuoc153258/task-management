<?php

namespace App\Models;

use App\Enums\TaskStatus;
use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, Fillable, SoftDeletes;

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

    function getStatusNameAttribute()
    {
        return trans('message.status.task.' . strtolower(TaskStatus::tryFrom($this->status)?->name))  ?? "";
    }

    public function scopeOfProject(Builder $query, $id): void
    {
        $query->where('project_id', $id);
    }

    public function scopeOfUser(Builder $query, $id): void
    {
        $query->where('user_id', $id);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
