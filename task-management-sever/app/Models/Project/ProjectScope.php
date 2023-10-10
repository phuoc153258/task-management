<?php

namespace App\Models\Project;

trait ProjectScope
{
    public function scopeUserHasJoined($query, $userId)
    {
        return $query->whereHas('userProjects', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        });
    }
}
