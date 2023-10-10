<?php

namespace App\Models\TaskReport;

use App\Enums\TaskStatus;

trait TaskReportAttribute
{
    function getStatusNameAttribute()
    {
        return trans('message.status.task.' . strtolower(TaskStatus::tryFrom($this->status)?->name))  ?? "";
    }
}
