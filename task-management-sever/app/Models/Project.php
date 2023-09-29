<?php

namespace App\Models;

use App\Enums\ProjectStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'created_by',
    ];

    protected $appends = ['status_name'];

    function getStatusNameAttribute()
    {
        return trans('message.status.project.' . strtolower(ProjectStatus::tryFrom($this->status)?->name))  ?? "";
    }

    public static function getFields()
    {
        return (new static)->getFillable();
    }

    public function user()
    {
        return $this->belongsTo(User::class,  'created_by', 'id');
    }

    public function userProjects()
    {
        return $this->hasMany(UserProject::class);
    }

    public function scopeUserHasJoined($query, $userId)
    {
        return $query->whereHas('userProjects', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        });
    }
}
