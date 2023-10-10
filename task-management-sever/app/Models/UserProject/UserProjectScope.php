<?php

namespace App\Models\UserProject;

use Illuminate\Database\Eloquent\Builder;

trait UserProjectScope
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
