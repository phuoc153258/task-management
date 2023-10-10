<?php

namespace App\Models\TaskReport;

use Illuminate\Database\Eloquent\Builder;

trait TaskReportScope
{
    public function scopeOfTask(Builder $query, $id): void
    {
        $query->where('task_id', $id);
    }
}
