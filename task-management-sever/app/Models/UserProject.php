<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'project_id',
    ];

    public function scopeOfProject(Builder $query, $id): void
    {
        $query->where('project_id', $id);
    }
}
