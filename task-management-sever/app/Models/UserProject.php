<?php

namespace App\Models;

use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserProject extends Model
{
    use HasFactory, Fillable, SoftDeletes;

    protected $fillable = [
        'user_id',
        'project_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'id');
    }

    public function scopeOfProject(Builder $query, $id): void
    {
        $query->where('project_id', $id);
    }

    public function scopeOfUser(Builder $query, $id): void
    {
        $query->where('user_id', $id);
    }
}
