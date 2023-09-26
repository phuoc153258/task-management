<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'created_by',
    ];

    public function userProjects()
    {
        return $this->hasMany(UserProject::class);
    }

    public function scopeJoinedByUser($query, $userId)
    {
        return $query->whereHas('userProjects', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        });
    }
}
