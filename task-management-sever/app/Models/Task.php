<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

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

    public function scopeOfProject(Builder $query, $id): void
    {
        $query->where('project_id', $id);
    }
}
