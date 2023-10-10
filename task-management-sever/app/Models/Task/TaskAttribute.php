<?php

namespace App\Models\Task;

use App\Enums\TaskStatus;

trait TaskAttribute
{
    function getStatusNameAttribute()
    {
        return trans('message.status.task.' . strtolower(TaskStatus::tryFrom($this->status)?->name))  ?? "";
    }
}
