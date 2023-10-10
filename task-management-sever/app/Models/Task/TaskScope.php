<?php

namespace App\Models\Task;

use Illuminate\Database\Eloquent\Builder;

trait TaskScope
{
    public function scopeOfProject(Builder $query, $id): void
    {
        $query->where('project_id', $id);
    }

    public function scopeOfUser(Builder $query, $id): void
    {
        $query->where('user_id', $id);
    }
}
