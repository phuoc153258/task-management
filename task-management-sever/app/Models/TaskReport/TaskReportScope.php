<?php

namespace App\Models\TaskReport;

use Illuminate\Database\Eloquent\Builder;

trait TaskReportScope
{
    public function scopeOfTask(Builder $query, $id): void
    {
        $query->where('task_id', $id);
    }

    public function scopeOfUser(Builder $query, $id): void
    {
        $query->whereHas('task', function ($subquery) use ($id) {
            $subquery->where('user_id', $id);
        });
    }
}
