<?php

namespace App\Models\TaskReport;

use App\Models\Task\Task;

trait TaskReportRelationship
{
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
